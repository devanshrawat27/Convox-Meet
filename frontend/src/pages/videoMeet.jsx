import React, { useState, useRef, useEffect, useCallback } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import styles from "../styles/videoComponent.module.css";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import VideocamIcon        from '@mui/icons-material/Videocam';
import VideocamOffIcon     from '@mui/icons-material/VideocamOff';
import CallEndIcon         from '@mui/icons-material/CallEnd';
import MicIcon             from '@mui/icons-material/Mic';
import MicOffIcon          from '@mui/icons-material/MicOff';
import ScreenShareIcon     from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon            from '@mui/icons-material/Chat';
import ArrowForwardIcon    from '@mui/icons-material/ArrowForward';

const SERVER_URL = "http://localhost:8000";

let connections = {};

const ICE_CONFIG = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const getInitials = (name = '') =>
    name.trim().split(' ').map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('') || '?';

const getGridClass = (n) => {
    if (n <= 1) return '';
    if (n === 2) return styles.tiles2;
    if (n <= 4)  return styles.tiles4;
    return styles.tiles5plus;
};

// Avatar card — camera off hone pe dikhta hai
function AvatarTile({ name, size = 'lg' }) {
    const isSmall = size === 'sm';
    return (
        <div className={isSmall ? styles.avatarSm : styles.avatarLg}>
            <div className={isSmall ? styles.initialsCircleSm : styles.initialsCircleLg}>
                <span>{getInitials(name)}</span>
            </div>
            <p className={styles.avatarName}>{name || 'User'}</p>
            <span className={styles.camOffPill}>
                <VideocamOffIcon style={{ fontSize: isSmall ? 9 : 12, marginRight: 3 }} />
                Camera off
            </span>
        </div>
    );
}

// Separate component — video ref stable rehta hai, flicker nahi hoti
function VideoTile({ stream }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current && stream) ref.current.srcObject = stream;
    }, [stream]);
    return (
        <video
            ref={ref}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
    );
}

export default function VideoMeetComponent() {

    const socketRef     = useRef(null);
    const socketIdRef   = useRef(null);
    const localVideoRef = useRef(null);
    const lobbyVideoRef = useRef(null);

    const [videoAvailable,  setVideoAvailable]  = useState(false);
    const [audioAvailable,  setAudioAvailable]  = useState(false);
    const [screenAvailable, setScreenAvailable] = useState(false);

    const [videoOn,  setVideoOn]  = useState(true);
    const [audioOn,  setAudioOn]  = useState(true);
    const [screenOn, setScreenOn] = useState(false);

    const [inLobby,    setInLobby]    = useState(true);
    const [username,   setUsername]   = useState('');
    const [videos,     setVideos]     = useState([]);
    const [messages,   setMessages]   = useState([]);
    const [msgInput,   setMsgInput]   = useState('');
    const [unread,     setUnread]     = useState(0);
    const [showChat,   setShowChat]   = useState(false);
    const [myVideoOff, setMyVideoOff] = useState(false);

    // ══════════════════════════════
    // 1. PERMISSIONS + LOBBY STREAM
    // ══════════════════════════════
    useEffect(() => {
        (async () => {
            let hasV = false, hasA = false;
            try { await navigator.mediaDevices.getUserMedia({ video: true }); hasV = true; } catch {}
            try { await navigator.mediaDevices.getUserMedia({ audio: true }); hasA = true; } catch {}

            setVideoAvailable(hasV);
            setAudioAvailable(hasA);
            setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

            if (hasV || hasA) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: hasV, audio: hasA });
                    window.localStream = stream;
                    if (lobbyVideoRef.current) lobbyVideoRef.current.srcObject = stream;
                } catch (e) { console.warn('Lobby stream error:', e); }
            }
        })();

        return () => {
            window.localStream?.getTracks().forEach(t => t.stop());
            socketRef.current?.disconnect();
            Object.values(connections).forEach(c => c.close());
            connections = {};
        };
    }, []);

    // ══════════════════════════════
    // 2. SIGNAL HANDLER
    // ══════════════════════════════
    const handleSignal = useCallback((fromId, rawMsg) => {
        const signal = JSON.parse(rawMsg);
        if (fromId === socketIdRef.current) return;
        if (!connections[fromId]) return;

        if (signal.sdp) {
            connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
                .then(() => {
                    if (signal.sdp.type !== 'offer') return;
                    return connections[fromId].createAnswer()
                        .then(ans => connections[fromId].setLocalDescription(ans))
                        .then(() => socketRef.current.emit('signal', fromId,
                            JSON.stringify({ sdp: connections[fromId].localDescription })));
                })
                .catch(e => console.error('SDP error:', e));
        }
        if (signal.ice) {
            connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice))
                .catch(e => console.error('ICE error:', e));
        }
    }, []);

    // ══════════════════════════════
    // 3. CREATE PEER
    // ══════════════════════════════
    const createPeer = useCallback((peerId) => {
        if (connections[peerId]) return;

        const pc = new RTCPeerConnection(ICE_CONFIG);
        connections[peerId] = pc;

        pc.onicecandidate = (e) => {
            if (e.candidate)
                socketRef.current.emit('signal', peerId, JSON.stringify({ ice: e.candidate }));
        };

        pc.ontrack = (event) => {
            const stream = event.streams[0];
            if (!stream) return;
            setVideos(prev => {
                const exists = prev.find(v => v.socketId === peerId);
                if (exists) return prev.map(v => v.socketId === peerId ? { ...v, stream } : v);
                return [...prev, { socketId: peerId, stream, name: '' }];
            });
        };

        if (window.localStream) {
            window.localStream.getTracks().forEach(track =>
                pc.addTrack(track, window.localStream)
            );
        }
    }, []);

    // ══════════════════════════════
    // 4. SOCKET CONNECTION
    // ══════════════════════════════
    const connectSocket = useCallback((uname) => {
        const socket = io(SERVER_URL, { secure: false });
        socketRef.current = socket;

        socket.on('signal', handleSignal);

        socket.on('connect', () => {
            socketIdRef.current = socket.id;
            socket.emit('join-call', window.location.href, uname);
            socket.emit('set-username', uname);
        });

        socket.on('user-joined', (newId, allClients) => {
            allClients.forEach(id => {
                if (id === socketIdRef.current) return;
                createPeer(id);
            });

            // Apna naam broadcast karo jab bhi koi join kare
            socket.emit('set-username', uname);

            if (newId === socketIdRef.current) {
                Object.keys(connections).forEach(peerId => {
                    connections[peerId].createOffer()
                        .then(offer => connections[peerId].setLocalDescription(offer))
                        .then(() => socket.emit('signal', peerId,
                            JSON.stringify({ sdp: connections[peerId].localDescription })))
                        .catch(e => console.error('Offer error:', e));
                });
            }
        });

        socket.on('user-left', (id) => {
            if (connections[id]) { connections[id].close(); delete connections[id]; }
            setVideos(prev => prev.filter(v => v.socketId !== id));
        });

        // ── KEY FIX: user-profile se asli naam update karo ──
        socket.on('user-profile', (userId, userName) => {
            if (!userName) return;
            setVideos(prev => prev.map(v =>
                v.socketId === userId ? { ...v, name: userName } : v
            ));
        });

        socket.on('chat-message', (data, sender, senderId) => {
            setMessages(prev => [...prev, { sender, data }]);
            if (senderId !== socketIdRef.current) setUnread(u => u + 1);
        });
    }, [handleSignal, createPeer]);

    // ══════════════════════════════
    // 5. SELF VIDEO — attach after render
    // ══════════════════════════════
    useEffect(() => {
        if (!inLobby && localVideoRef.current && window.localStream) {
            localVideoRef.current.srcObject = window.localStream;
        }
    }, [inLobby]);

    // ══════════════════════════════
    // 6. JOIN
    // ══════════════════════════════
    const joinMeeting = () => {
        if (!username.trim()) { alert('please enter name first!'); return; }
        setVideoOn(videoAvailable);
        setAudioOn(audioAvailable);
        setInLobby(false);
        connectSocket(username.trim());
    };

    // ══════════════════════════════
    // 7. CAMERA TOGGLE
    // ══════════════════════════════
    const toggleVideo = async () => {
        if (videoOn) {
            window.localStream?.getVideoTracks().forEach(t => t.stop());
            for (const id in connections) {
                const sender = connections[id].getSenders().find(s => s.track?.kind === 'video');
                if (sender) {
                    const canvas = document.createElement('canvas');
                    canvas.width = 2; canvas.height = 2;
                    canvas.getContext('2d').fillRect(0, 0, 2, 2);
                    const blank = canvas.captureStream(1).getVideoTracks()[0];
                    blank.enabled = false;
                    sender.replaceTrack(blank).catch(() => {});
                }
            }
            setVideoOn(false);
            setMyVideoOff(true);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                const newTrack = stream.getVideoTracks()[0];

                if (window.localStream) {
                    window.localStream.getVideoTracks().forEach(t => {
                        t.stop();
                        window.localStream.removeTrack(t);
                    });
                    window.localStream.addTrack(newTrack);
                } else {
                    window.localStream = stream;
                }

                if (localVideoRef.current) localVideoRef.current.srcObject = window.localStream;

                for (const id in connections) {
                    const sender = connections[id].getSenders().find(s => s.track?.kind === 'video');
                    if (sender) sender.replaceTrack(newTrack).catch(() => {});
                }
                setVideoOn(true);
                setMyVideoOff(false);
            } catch (e) { console.error('Camera on failed:', e); }
        }
    };

    // ══════════════════════════════
    // 8. MIC TOGGLE
    // ══════════════════════════════
    const toggleAudio = () => {
        if (!window.localStream) return;
        window.localStream.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
        setAudioOn(prev => !prev);
    };

    // ══════════════════════════════
    // 9. SCREEN SHARE
    // ══════════════════════════════
    const toggleScreen = async () => {
        if (screenOn) {
            window.localStream?.getTracks().forEach(t => t.stop());
            try {
                const camStream = await navigator.mediaDevices.getUserMedia({
                    video: videoAvailable, audio: audioAvailable
                });
                window.localStream = camStream;
                if (localVideoRef.current) localVideoRef.current.srcObject = camStream;
                for (const id in connections) {
                    camStream.getTracks().forEach(track => {
                        const s = connections[id].getSenders().find(s => s.track?.kind === track.kind);
                        if (s) s.replaceTrack(track).catch(() => {});
                    });
                }
            } catch {}
            setScreenOn(false);
        } else {
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
                window.localStream?.getTracks().forEach(t => t.stop());
                window.localStream = screenStream;
                if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
                for (const id in connections) {
                    screenStream.getTracks().forEach(track => {
                        const s = connections[id].getSenders().find(s => s.track?.kind === track.kind);
                        if (s) s.replaceTrack(track).catch(() => {});
                    });
                }
                screenStream.getVideoTracks()[0].onended = () => toggleScreen();
                setScreenOn(true);
            } catch { setScreenOn(false); }
        }
    };

    // ══════════════════════════════
    // 10. END CALL
    // ══════════════════════════════
    const endCall = () => {
        window.localStream?.getTracks().forEach(t => t.stop());
        socketRef.current?.disconnect();
        Object.values(connections).forEach(c => c.close());
        connections = {};
        window.location.href = '/';
    };

    // ══════════════════════════════
    // 11. CHAT
    // ══════════════════════════════
    const sendMessage = () => {
        if (!msgInput.trim()) return;
        socketRef.current?.emit('chat-message', msgInput.trim(), username);
        setMsgInput('');
    };

    const openChat = () => { setShowChat(p => !p); setUnread(0); };

    // ══════════════════════════════
    // UI
    // ══════════════════════════════
    return (
        <div>
            {inLobby ? (

                /* ── LOBBY — Google Meet style two-column ── */
                <div className={styles.lobbyContainer}>

                    {/* Left — camera preview */}
                    <div className={styles.lobbyLeft}>
                        <div className={styles.lobbyVideoWrap}>
                            <video ref={lobbyVideoRef} autoPlay muted className={styles.lobbyVideo} />
                            <div className={styles.lobbyVideoOverlay} />
                            <div className={styles.lobbyStatusBar}>
                                <span className={styles.lobbyPill}>
                                    <MicIcon style={{ fontSize: 12 }} /> Mic ready
                                </span>
                                <span className={styles.lobbyPill}>
                                    <VideocamIcon style={{ fontSize: 12 }} /> Camera on
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right — join form */}
                    <div className={styles.lobbyRight}>
                        <div className={styles.lobbyBrand}>
                            <VideocamIcon style={{ fontSize: 26, color: '#6c63ff' }} />
                            <span className={styles.lobbyBrandName}>Convox Meet</span>
                        </div>

                        <h1 className={styles.lobbyHeading}>Ready to join?</h1>
                        <p className={styles.lobbySubtitle}>Enter your name to jump into the meeting</p>

                        <div className={styles.lobbyForm}>
                            <TextField
                                fullWidth
                                label="Your name"
                                variant="outlined"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && joinMeeting()}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                className={styles.connectBtn}
                                onClick={joinMeeting}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Join Now
                            </Button>
                        </div>

                        <p className={styles.lobbyNote}>No account needed · Join instantly</p>
                    </div>
                </div>

            ) : (

                /* ── MEETING ── */
                <div className={styles.meetContainer}>

                    {/* VIDEO GRID */}
                    <div className={`${styles.grid} ${getGridClass(videos.length)}`}>
                        {videos.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyDot} />
                                <span>Waiting for others to join…</span>
                            </div>
                        ) : (
                            videos.map(v => (
                                <div key={v.socketId} className={styles.tile}>
                                    <VideoTile stream={v.stream} />
                                    <span className={styles.nameTag}>
                                        {v.name || v.socketId.slice(0, 6)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* SELF PiP */}
                    <div className={styles.selfPip}>
                        {myVideoOff
                            ? <AvatarTile name={username} size="sm" />
                            : <video ref={localVideoRef} autoPlay muted className={styles.selfVideo} />
                        }
                    </div>

                    {/* CONTROLS */}
                    <div className={styles.controls}>
                        <IconButton
                            className={`${styles.btn} ${!videoOn ? styles.btnOff : ''}`}
                            onClick={toggleVideo}
                        >
                            {videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>

                        <IconButton
                            className={`${styles.btn} ${!audioOn ? styles.btnOff : ''}`}
                            onClick={toggleAudio}
                        >
                            {audioOn ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        <IconButton className={styles.endBtn} onClick={endCall}>
                            <CallEndIcon />
                        </IconButton>

                        {screenAvailable && (
                            <IconButton
                                className={`${styles.btn} ${screenOn ? styles.btnActive : ''}`}
                                onClick={toggleScreen}
                            >
                                {screenOn ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                            </IconButton>
                        )}

                        <Badge badgeContent={unread} max={99}
                            sx={{ '& .MuiBadge-badge': { background: '#6c63ff', color: '#fff' } }}
                        >
                            <IconButton className={styles.btn} onClick={openChat}>
                                <ChatIcon />
                            </IconButton>
                        </Badge>
                    </div>

                    {/* CHAT */}
                    {showChat && (
                        <div className={styles.chatPanel}>
                            <p className={styles.chatTitle}>Chat</p>
                            <div className={styles.chatMessages}>
                                {messages.length === 0
                                    ? <p className={styles.noMsg}>No messages yet</p>
                                    : messages.map((m, i) => (
                                        <div key={i} className={styles.chatBubble}>
                                            <span className={styles.chatSender}>{m.sender}</span>
                                            <span className={styles.chatText}>{m.data}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.chatInputRow}>
                                <input
                                    className={styles.chatInput}
                                    placeholder="Type a message…"
                                    value={msgInput}
                                    onChange={e => setMsgInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                />
                                <Button className={styles.sendBtn} onClick={sendMessage}>Send</Button>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
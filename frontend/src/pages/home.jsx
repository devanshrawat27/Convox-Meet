import React, { useContext, useState, useEffect } from 'react';
import withAuth from '../utils/WithAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    Box, Typography, Button, AppBar, Toolbar, Container, 
    Stack, TextField, Card, Grid, IconButton, Avatar, Tooltip
} from "@mui/material";
import { 
    VideoCall, Restore, Logout, Add, Login, 
    Security, Speed, Devices, ContentCopy, VideoCameraFront,
    Mic, Videocam, CallEnd, ScreenShare, MoreVert
} from "@mui/icons-material";
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const { addToUserHistory } = useContext(AuthContext);
    const { handleLogout: contextLogout } = useAuth();

    // Vanta.js Initialization
    useEffect(() => {
        const effect = window.VANTA.NET({
            el: "#home-vanta-bg",
            color: 0x6366f1, 
            backgroundColor: 0x030712, 
            points: 10,
            spacing: 18,
        });
        return () => { if (effect) effect.destroy(); };
    }, []);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        try { await addToUserHistory(meetingCode); } catch (e) { console.log(e); }
        navigate(`/${meetingCode}`);
    };

    const handleCreateMeeting = () => {
        const code = Math.random().toString(36).substring(2, 9);
        const link = `${window.location.origin}/${code}`;
        setGeneratedLink(link);
        setMeetingCode(code); // Bgl wale box mein automatic fill
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
    };

    const handleLogout = () => {
        contextLogout();
    };

    return (
        <Box sx={{ minHeight: "100vh", color: "white", position: "relative", overflowX: "hidden", bgcolor: "#030712" }}>
            {/* Background Layer */}
            <div id="home-vanta-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />

            {/* NAVBAR */}
            <AppBar position="fixed" sx={{ background: "rgba(3, 7, 18, 0.9)", backdropFilter: "blur(20px)", boxShadow: "none", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", zIndex: 10 }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <Box sx={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", p: 0.8, borderRadius: "10px", display: 'flex' }}>
                                <VideoCall sx={{ color: "#fff" }} />
                            </Box>
                            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>Convox Meet</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Button onClick={
                                ()=>{
                                    navigate('/history');
                                }
                            } startIcon={<Restore />} sx={{ color: "rgba(255,255,255,0.6)", textTransform: 'none' }}>History</Button>
                            <Button onClick={handleLogout} sx={{ color: "#f87171", textTransform: "none", border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', px: 2 }} startIcon={<Logout />}>Logout</Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* MAIN CONTENT */}
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pt: { xs: 15, md: 22 } }}>
                <Grid container spacing={6} alignItems="center">
                    
                    <Grid item xs={12} md={6}>
                        {/* Live Badge */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 5, bgcolor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', mb: 3 }}>
                            <Box className="pulse-dot" sx={{ width: 6, height: 6, bgcolor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }} />
                            <Typography variant="caption" fontWeight={800} sx={{ color: '#818cf8', fontSize: '0.7rem', letterSpacing: 1 }}>SECURE • ENCRYPTED • LIVE</Typography>
                        </Box>

                        <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", md: "4rem" }, fontWeight: 900, lineHeight: 1, mb: 2, letterSpacing: '-2px' }}>
                            Your meeting, <br />
                            <span style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>starts here.</span>
                        </Typography>

                        <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 5, fontSize: "1.1rem", maxWidth: "480px" }}>
                            Experience crystal clear video calls with seamless collaboration tools.
                        </Typography>

                        <Stack spacing={3}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                {/* Create Meeting Card */}
                                <Card onClick={handleCreateMeeting} sx={{ 
                                    flex: 1, p: 3, borderRadius: 4, 
                                    bgcolor: '#1c1f2e', 
                                    border: '1px solid rgba(255,255,255,0.2)', 
                                    cursor: 'pointer', transition: '0.3s', 
                                    '&:hover': { bgcolor: '#252a41', transform: 'translateY(-5px)', borderColor: '#6366f1', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)' } 
                                }}>
                                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                        <Add sx={{ color: "#818cf8" }} />
                                    </Box>
                                    <Typography variant="body1" fontWeight={800} sx={{ color: '#fff' }}>Create Meeting</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Instant room setup</Typography>
                                </Card>

                                {/* Join Meeting Card */}
                                <Card sx={{ 
                                    flex: 1.5, p: 3, borderRadius: 4, 
                                    bgcolor: '#1c1f2e', border: '1px solid rgba(255,255,255,0.2)', 
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)' 
                                }}>
                                    <Typography variant="caption" fontWeight={900} sx={{ mb: 2, color: '#a855f7', display: 'flex', alignItems: 'center', gap: 1, letterSpacing: 1 }}>
                                        <Login sx={{ fontSize: 16 }} /> JOIN WITH CODE
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        <TextField 
                                            placeholder="Code..."
                                            size="small"
                                            fullWidth
                                            value={meetingCode}
                                            onChange={(e) => setMeetingCode(e.target.value)}
                                            sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(0,0,0,0.4)', borderRadius: '12px', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, '&:hover fieldset': { borderColor: '#6366f1' } } }}
                                        />
                                        <Button onClick={handleJoinVideoCall} disabled={!meetingCode.trim()} sx={{ borderRadius: '12px', background: "linear-gradient(90deg, #6366f1, #a855f7)", color: 'white', fontWeight: 800, px: 3, textTransform: 'none' }}>Join</Button>
                                    </Stack>
                                </Card>
                            </Stack>

                            {/* Share Link (Conditional) */}
                            {generatedLink && (
                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.1)', border: '1px dashed #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', animation: 'fadeIn 0.4s ease' }}>
                                    <Typography variant="body2" sx={{ color: '#818cf8', fontWeight: 700 }}>{generatedLink}</Typography>
                                    <IconButton onClick={copyToClipboard} size="small" sx={{ color: '#818cf8', bgcolor: 'rgba(99, 102, 241, 0.1)', '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' } }}><ContentCopy fontSize="small" /></IconButton>
                                </Box>
                            )}
                        </Stack>
                    </Grid>

                    {/* PREVIEW PANEL */}
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{ 
                            p: 2, borderRadius: 7, bgcolor: 'rgba(28, 31, 46, 0.8)', border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)'
                        }}>
                            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/10', bgcolor: '#000', borderRadius: 5, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', mb: 2 }}>
                                <Box sx={{ position: 'absolute', top: 15, left: 15, zIndex: 3, display: 'flex', gap: 1 }}>
                                    <Box className="blink-rec" sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(239, 68, 68, 0.9)', borderRadius: 1.5, fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Box sx={{ width: 5, height: 5, bgcolor: '#fff', borderRadius: '50%' }} /> REC
                                    </Box>
                                    <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(0, 0, 0, 0.6)', borderRadius: 1.5, fontSize: '0.6rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.2)' }}>00:42:15</Box>
                                </Box>
                                
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)' }}>
                                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#6366f1', border: '4px solid rgba(99,102,241,0.3)', boxShadow: '0 0 50px rgba(99, 102, 241, 0.4)' }} />
                                </Box>

                                <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 15, right: 15, zIndex: 3 }}>
                                    {[1, 2].map(i => (
                                        <Box key={i} sx={{ width: 80, height: 50, bgcolor: 'rgba(0,0,0,0.7)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Avatar sx={{ width: 24, height: 24, bgcolor: '#a855f7', fontSize: '0.6rem' }} />
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            <Box sx={{ width: '100%', p: 1.5, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, display: 'flex', justifyContent: 'center', gap: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}><Mic /></IconButton>
                                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}><Videocam /></IconButton>
                                <IconButton sx={{ bgcolor: '#ef4444', color: '#fff', '&:hover': { bgcolor: '#dc2626' } }}><CallEnd /></IconButton>
                                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}><ScreenShare /></IconButton>
                                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}><MoreVert /></IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <style>{`
                .pulse-dot { animation: pulse 2s infinite; }
                .blink-rec { animation: blink 1.5s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </Box>
    );
}

export default withAuth(HomeComponent);
import React, { useState, useRef } from 'react';   // useRef add kiya
import "../styles/videoComponent.css";

import TextField from "@mui/material/TextField";   // missing imports add kiye
import Button from "@mui/material/Button";

const serverurl="http://localhost:8000"

var connections={};

const PeerConfigConnections={
      "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
      ]
}


export default function VideoMeetComponent(){

    var socketRef = useRef();          // useRef now works
    let socketIdRef = useRef();
    
    let localVideoRef = useRef();

    let [videoAvailable,setvideoAvailable] = useState(true);

    let [audioAvailable,setaudioAvailable] = useState(true);

    let [video,setvideo] = useState();   // same rakha (logic change nahi kiya)
    
    let [audio,setaudio] = useState();

    let [screen,setScreen] = useState();

    let [showmodel,setModel] = useState();

    let [screenAvailable,setScreenAvailable] = useState();

    let [messages,setmessages] = useState([]);

    let [message,setMessage] = useState("");

    let [newMessage,setNewmessage] = useState(0);

    let [askforUsername,setaskusername] = useState(true);

    let [username,setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos,setvideos] = useState([]);

        return (
            <div>

               { askforUsername === true ?
               <div>
                
                <h2>Enter into Loby</h2>

                 <TextField
                   id="outlined-basic"
                   label="Username"     // duplicate label fix
                   value={username}
                   onChange={e => setUsername(e.target.value)}   // major bug fix
                   variant="outlined"
                 />

                 <Button variant="contained">Connect</Button>

                 <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>   
               : <></>
               }

            </div>
        )
}

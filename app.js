import express from 'express';
import {createServer} from 'node:http';

import {Server} from "socket.io";

import mongoose from 'mongoose';
import { initializeSocketIO } from './src/controllers/socketManager.js';

import cors from 'cors';
import userRoutes from "./src/routes/users.routes.js";


const app = express();
const server=createServer(app);
const io=initializeSocketIO(server);



app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:'40kb'}));
app.use(express.urlencoded({limit:'40kb',extended:true}));




app.get('/home',(req,res)=>{
    return res.json({"hello":"world"});
});

app.use("/api/v1/users", userRoutes);


const start = async()=>{

    const connectionDB=await mongoose.connect("mongodb+srv://GoogleMeet_DB:tzo64B5v2o2P7K55@googlemeet.rgoo7aw.mongodb.net/?appName=googleMeet");
    console.log(" mongo Database connected");
    server.listen(app.get("port"),()=>{
        console.log("Server started on port " + app.get("port"));
    });
}



start();
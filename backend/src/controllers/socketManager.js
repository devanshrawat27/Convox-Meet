import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};
let usernames = {}; // Store username for each socket

export const initializeSocketIO = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        // ================= JOIN ROOM =================
        socket.on("join-call", (path, username) => {

            if (!connections[path]) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            usernames[socket.id] = username || socket.id.slice(0, 6); // Store username
            timeOnline[socket.id] = new Date();

            socket.join(path);

            // Send all existing users' usernames to the newly joined user
            connections[path].forEach(id => {
                if (id !== socket.id && usernames[id]) {
                    socket.emit("user-profile", id, usernames[id]);
                }
            });

            // Broadcast new user's username to all users in the room
            io.to(path).emit("user-profile", socket.id, usernames[socket.id]);

            // VERY IMPORTANT — send full clients list
            io.to(path).emit("user-joined", socket.id, connections[path]);
        });

        // ================= SET USERNAME =================
        socket.on("set-username", (username) => {
            usernames[socket.id] = username;

            // Find the room this user is in
            let currentRoom = null;
            for (let room in connections) {
                if (connections[room].includes(socket.id)) {
                    currentRoom = room;
                    break;
                }
            }

            // Broadcast the username to all users in the room
            if (currentRoom) {
                io.to(currentRoom).emit("user-profile", socket.id, username);
            }
        });

        // ================= SIGNAL =================
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        // ================= CHAT =================
        socket.on("chat-message", (data, sender) => {

            let currentRoom = null;

            for (let room in connections) {
                if (connections[room].includes(socket.id)) {
                    currentRoom = room;
                    break;
                }
            }

            if (currentRoom) {

                if (!messages[currentRoom]) {
                    messages[currentRoom] = [];
                }

                messages[currentRoom].push({
                    sender,
                    data,
                    time: new Date(),
                    socketIdSender: socket.id
                });

                connections[currentRoom].forEach(id => {
                    io.to(id).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        // ================= DISCONNECT =================
        socket.on("disconnect", () => {

            console.log("User disconnected:", socket.id);

            for (let room in connections) {

                const index = connections[room].indexOf(socket.id);

                if (index !== -1) {

                    connections[room].splice(index, 1);

                    io.to(room).emit("user-left", socket.id);

                    if (connections[room].length === 0) {
                        delete connections[room];
                    }
                }
            }

            delete timeOnline[socket.id];
            delete usernames[socket.id]; // Clean up username
        });
    });

    return io;
};

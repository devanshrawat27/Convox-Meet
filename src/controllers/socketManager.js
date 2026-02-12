import { Server } from 'socket.io';

// Har room ka socket ids store karega
let connections = {};

// Har room ke messages store honge
let messages = {};

// Har socket ka join time
let timeOnline = {};

export const initializeSocketIO = (server) => {
     const io = new Server(server,{
          cors:{
               origin:"*",
               methods:["GET","POST"],
               allowedHeaders:["*"],
               credentials:true
          }
     });

     // Jab koi naya client connect hota hai
     io.on('connection', (socket) => {

          // Room join event
          socket.on('join', (path) => {

               // Agar room exist nahi karta to create karo
               if (connections[path] === undefined) {
                    connections[path] = [];
               }

               // Socket ko room me add karo
               connections[path].push(socket.id);

               // Join time save karo
               timeOnline[socket.id] = new Date();

               // Sab users ko notify karo ki new user join hua
               for (let a = 0; a < connections[path].length; a++) {
                    io.to(connections[path][a]).emit('user-joined', socket.id);
               }
          });

          // WebRTC signaling ke liye
          socket.on('signal', (toId, message) => {
               io.to(toId).emit('signal', socket.id, message);
          });

          // Chat message handler
          socket.on('chat-message', (data, sender) => {

               // Find karo kaunsa room current socket belong karta hai
               const [matchingRoom, found] = Object.entries(connections)
                    .reduce(([room, isFound], [roomKey, roomValue]) => {

                         if (!isFound && roomValue.includes(socket.id)) {
                              return [roomKey, true];
                         }

                         return [room, isFound];

                    }, ['', false]);

               // Agar room mil gaya
               if (found === true) {

                    // Agar messages array nahi hai to create karo
                    if (messages[matchingRoom] === undefined) {
                         messages[matchingRoom] = [];
                    }

                    // Message save karo
                    messages[matchingRoom].push({
                         sender: sender,
                         data: data,
                         time: new Date(),
                         'socket-id-sender': socket.id
                    });

                    console.log("messages", matchingRoom, ":", sender, data);

                    // Room ke sab users ko message bhejo
                    connections[matchingRoom].forEach((elem) => {
                         io.to(elem).emit('chat-message', data, sender, socket.id);
                    });
               }

          }); 

          // Jab user disconnect hota hai
          socket.on('disconnect', () => {

               var diffTime = Math.abs(timeOnline[socket.id] - new Date());

               var key;

               // Har room check karo
               for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                    for (let a = 0; a < v.length; ++a) {

                         if (v[a] === socket.id) {

                              key = k;

                              // Sab ko notify karo user left
                              for (let a = 0; a < connections[key].length; a++) {
                                   io.to(connections[key][a]).emit('user-left', socket.id);
                              }

                              // Socket remove karo room se
                              var index = connections[key].indexOf(socket.id);
                              connections[key].splice(index, 1);

                              // Agar room empty ho gaya
                              if (connections[key].length === 0) {
                                   delete connections[key];
                              }
                         }
                    }
               }
          });
     });

     return io;
};

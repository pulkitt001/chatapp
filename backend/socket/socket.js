import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "OPTIONS"], // Added OPTIONS for preflight requests
    },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    
    if (userId !== undefined) { // Fix userId undefined check
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit online users after connection

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        if (userId !== undefined) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users list after disconnection
    });
});

export { app, io, server };

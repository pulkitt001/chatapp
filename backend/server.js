import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authroute from "./routes/authroutes.js";
import messageroutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; // Ensure app and server are defined in ./socket/socket.js

dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ["http://localhost:5173"], // Adjust as necessary
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Parses JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authroute);
app.use("/api/messages", messageroutes);
app.use("/api/user", userroutes);

// Uncomment if you want to use a root route
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

connectToMongoDB(); // Connect to MongoDB before starting the server

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

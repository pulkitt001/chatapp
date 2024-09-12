import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authroute from "./routes/authroutes.js";
import messageroutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js";
import cors from 'cors'
import connectToMongoDB from "./db/connectToMongoDB.js";
import {app,server} from "./socket/socket.js";

dotenv.config();
// const app = express();
const PORT =  process.env.PORT||5000

const corsOptions = {
    origin: ["http://localhost:5173","*"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  
app.use(cors(corsOptions))
app.use(express.json());   // to parse the incoming requests with JSON payloads (from req.body)
app.use (cookieParser());

app.use("/api/auth",authroute);
app.use("/api/messages",messageroutes);
app.use("/api/user",userroutes);



// app.get("/",(req,res)=>{
//     // root route http://localhost:5000/
//     res.send("hello world!");
// });


server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});



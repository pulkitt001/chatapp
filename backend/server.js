import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authroute from "./routes/authroutes.js";
import messageroutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js";
import cors from 'cors'

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const PORT =  7000;

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies or auth headers
  };
  
  app.use(cors(corsOptions));

app.use(express.json());   // to parse the incoming requests with JSON payloads (from req.body)
app.use (cookieParser());

app.use("/api/auth",authroute);
app.use("/api/messages",messageroutes);
app.use("/api/user",userroutes);



// app.get("/",(req,res)=>{
//     // root route http://localhost:5000/
//     res.send("hello world!");
// });


app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});







// app.get("/api/auth/signup",(req,res)=>{
//     console.log("signup route");
// });

// app.get("/api/auth/login",(req,res)=>{
//     console.log("login route");
// });

// app.get("/api/auth/logout",(req,res)=>{
//     console.log("logout route");
// });

import express from "express";
import dotenv from "dotenv";

import authroute from "./routes/authroutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());   // to parse the incoming requests with JSON payloads (from req.body)
app.use("/api/auth",authroute)




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

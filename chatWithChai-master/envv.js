// checkEnv.js
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("NODE_ENV:", process.env.NODE_ENV);

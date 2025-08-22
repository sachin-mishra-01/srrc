import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import findRoutes from './routes/findRoutes.js'

import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import creditskillRoutes from './routes/creditskillRoutes.js'
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/find" , findRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/payment", creditskillRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server running `);
});

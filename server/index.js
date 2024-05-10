import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

import { UserRoute } from "./routes/user.js";
import { AuthRoute } from "./routes/auth.js";
import { verifyingToken } from "./Middlewares/verifyToken.js";
import { doNothing } from "./Controllers/AuthController.js";

// import path from 'path';

dotenv.config();

// const __dirname = path.resolve();
const app = express();

/* === middlewares === */
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);

/* === static folder === */
/** 
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,"client", "dist", "index.html"));
})
*/

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/auth/do", verifyingToken, doNothing);

const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to DB`.bgMagenta.white);
    app.listen(port, () => {
      console.log(`Server started at ${baseURL}`.bgCyan.white);
    });
  } catch (err) {
    console.log("Error in connection of DB", err);
  }
};

// ========= HOME route =========
app.get("/", (req, res) => {
  res.send("Backend Server");
});

startServer();

// ==== Middleware Handling Error ===
app.use((err, req, res, next) => {
  // console.log("printing the error",err)
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Internal server ERROR";

  return res.status(statusCode).json({
    success: false,
    msg,
    statusCode,
    // errror :err
  });
});

/**   mongoose.connect(process.env.MONGODB_URL)
  .then( () => {
    console.log(`Connected to DB`);
    app.listen(port,() => {
    console.log(`Server started at ${baseURL}`); })
  })
  .catch( (err) => {
    console.log("Error in connection of DB", err);
})
*/

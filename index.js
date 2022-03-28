import server from "./config/server.js";
import "./config/database.js";
import messageRoutes from "./routes/message.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

server.get("/", (req, res) => {
  res.send("Hello! Welcome");
});
server.use("/messages", messageRoutes);

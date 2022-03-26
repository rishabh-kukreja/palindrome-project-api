import server from "./config/server.js";
import "./config/database.js";
import messageRoutes from "./routes/message.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

server.use("/messages", messageRoutes);
server.get("/", (req, res) => {
  res.send("Hello! Welcome");
});
// const PORT = 5000;

// const CONNECTION_URL =
//   "mongodb+srv://rishadmin:rishadmin123@cluster0.dikmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.CONNECTION_URL)
//   .then(() =>
//     server.listen(PORT, () =>
//       console.log(`Server Running on port: http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);

// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to DB!"));

// app.listen(PORT, () =>
//   console.log(`Server Running on port: http://localhost:${PORT}`)
// );

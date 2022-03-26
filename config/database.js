import mongoose from "mongoose";
import dotenv from "dotenv";
import server from "./server.js";

// import server from "./server.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

export default mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

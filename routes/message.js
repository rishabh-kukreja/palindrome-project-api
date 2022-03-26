import express from "express";

// import Messages from "../models/messagesModel.js";

import {
  createdMessage,
  getMessages,
  getMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/message.js";

const router = express.Router();

router.get("/", getMessages);

router.post("/", createdMessage);

router.get("/:id", getMessage);

router.delete("/:id", deleteMessage);

router.patch("/:id", updateMessage);

export default router;

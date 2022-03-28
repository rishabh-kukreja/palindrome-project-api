import Message from "../models/message.js";
import {
  palindromCheck,
  createNewMessage,
  getAllMessages,
  getMessageById,
  deleteMessageById,
  updateMessageById,
} from "../services/service.js";

export const getMessages = async (req, res) => {
  try {
    const allMessages = await getAllMessages();
    res.json(allMessages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createdMessage = async (req, res, next) => {
  const { userName, messageBody } = req.body;
  try {
    const msg = await createNewMessage(userName, messageBody);
    // res.send(msg);
    return res.status(200).json({
      status: 200,
      data: msg,
      message: "Succesfully Msg Created",
    });
    // next();
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const messageFound = await getMessageById(req.params.id);
    res.json(messageFound);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageFound = await deleteMessageById(req.params.id);
    res.json(messageFound);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const updatedMessage = await updateMessageById(req.params.id, req.body);
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

import Message from "../models/message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createdMessage = async (req, res) => {
  const palindromic = palindromCheck(req.body.messageBody);
  const message = new Message({
    userName: req.body.userName,
    messageBody: req.body.messageBody,
    is_palindrome: palindromic,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessage = async (req, res) => {
  let message;
  // console.log(req.params.id);
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }
    res.json(message);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }
    await message.remove();
    res.json({ message: `Deleted message with id ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMessage = async (req, res) => {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  if (req.body.userName != null) {
    message.userName = req.body.userName;
  }
  if (req.body.messageBody != null) {
    message.messageBody = req.body.messageBody;
    const palindromic = palindromCheck(message.messageBody);
    message.is_palindrome = palindromic;
  }
  try {
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const palindromCheck = (string) => {
  // find the length of a string
  const len = string.length;
  let is_palindrom = false;

  // loop through half of the string
  for (let i = 0; i < len / 2; i++) {
    // check if first and last string are same
    if (string[i] !== string[len - 1 - i]) {
      is_palindrom = false;
      return is_palindrom;
    }
  }
  is_palindrom = true;
  return is_palindrom;
};

// export const getMessageById = async (req, res) => {
//   let message;
//   try {
//     message = await Message.findById(req.params.id);
//     if (message == null) {
//       return res.status(404).json({ message: "Cannot find message" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.message = message;
//   // return res;
//   // next();
// };

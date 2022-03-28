import Message from "../models/message.js";

export const getAllMessages = async () => {
  try {
    const allMessages = await Message.find();
    return allMessages;
  } catch (err) {
    throw Error(err.message);
  }
};

export const createNewMessage = async (userName, messageBody) => {
  const palindromic = palindromCheck(messageBody);
  const messageToCreate = new Message({
    userName: userName,
    messageBody: messageBody,
    is_palindrome: palindromic,
  });

  try {
    const newMessage = await messageToCreate.save();
    return newMessage;
  } catch (err) {
    // throw new Error(err.message);
    throw Error(err.message);
  }
};

export const getMessageById = async (msgId) => {
  let messageFound;
  try {
    messageFound = await Message.findById(msgId);
    if (!messageFound)
      return {
        error: true,
        statusCode: 404,
        message: "msg not found",
      };
    return messageFound;
  } catch (err) {
    throw Error(err.message);
  }
};

export const deleteMessageById = async (msgId) => {
  try {
    let messageToBeDeleted = await Message.findById(msgId);
    if (!messageToBeDeleted)
      return {
        error: true,
        statusCode: 404,
        message: "msg not found",
      };
    await messageToBeDeleted.remove();
    return { message: `Message with id ${msgId} deleted` };
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateMessageById = async (msgId, data) => {
  let messageToUpdate;

  try {
    messageToUpdate = await Message.findById(msgId);
    if (!messageToUpdate)
      return {
        error: true,
        statusCode: 404,
        message: "msg not found",
      };
  } catch (err) {
    throw Error(err.message);
  }
  if (data.userName != null) {
    messageToUpdate.userName = data.userName;
  }
  if (data.messageBody != null) {
    messageToUpdate.messageBody = data.messageBody;
    const palindromic = palindromCheck(data.messageBody);
    messageToUpdate.is_palindrome = palindromic;
  }
  try {
    const updatedMessage = await messageToUpdate.save();
    return updatedMessage;
  } catch (err) {
    throw Error(err.message);
  }
};

export function palindromCheck(string) {
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
}

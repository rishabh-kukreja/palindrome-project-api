import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  messageBody: {
    type: String,
    required: true,
  },
  messageDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  is_palindrome: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Message", MessageSchema);

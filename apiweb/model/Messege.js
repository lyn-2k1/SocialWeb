const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    content: {
      type: String
    }
});
const messagesSchema = new mongoose.Schema({
  chatsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  messeges: [chatSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// tạo model
const messages = mongoose.model("messages", messagesSchema);

module.exports = messages;
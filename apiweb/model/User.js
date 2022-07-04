const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  birthday:{
    type: String,
  },
  gender:{
    type:String,
    default: "nữ"
  },
  email: {
    type: String,
    required: true
  },
  phone:{
    type:Number,
  },
  address:{
    type:String,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
  },
  friend : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
  ],
  requestsFriend : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
  ],
  suggestsFriend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});
// tạo model
const Users = mongoose.model("users", usersSchema);


module.exports = Users
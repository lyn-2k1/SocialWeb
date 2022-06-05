const mongoose = require("./db").mongoose;


const commentSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const postsSchema = new mongoose.Schema({
  content: {
      type:String,
  },
  image: {
      type: String,
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
  ],
  comments: [commentSchema],
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  }
},{
    timestamps:true
});

// tạo model
const Posts = mongoose.model("posts", postsSchema);
module.exports = Posts
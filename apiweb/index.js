const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const fs = require("fs");
const multer = require('multer');
const bcrypt = require('bcryptjs');
var morgan = require('morgan')
const jwt = require('jsonwebtoken');
const port = 4000;
const passport = require('passport');
require("./model/db")
let users = require("./users.json");
let userModel = require("./model/User");
let postModel = require("./model/Post");
let messegeModel = require("./model/Messege")
const path = require("path");
require("./config/passport")(passport);
// const validateRegisterInput = require("./validation/register");
// Thêm log vào console
app.use(morgan('tiny'))
app.disable('etag');

// xử lý json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// xử lý cors
app.use(cors());

app.use(passport.initialize());

app.get("/", (req, res) => {
  // console.log(req)
  userModel.find().then(
    (user)=>{
    res.send(user);
  })
});

app.post("/", (req, res) => {
  // Form validation

  if(!req.body.email){
   return res.send({
      message: "Email not found"
    })
  }
  userModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new userModel({
        first_name: req.body.profile.first_name,
        last_name: req.body.profile.last_name,
        birthday: req.body.profile.birthday,
        gender: req.body.profile.gender,
        avatar: req.body.profile.avatar,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

app.get("/profile", passport.authenticate('jwt', { session: false }),
  (req,res) => {
    res.send(req.user);
});
app.get("/profile/post",passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  // const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  await postModel.find({user: {'$in': [req.user.id]}}).populate("user", '-password').then(
        (post)=>{
        res.send(post);
      })
// postModel.find({user: req.user.id}).then(dt=>{
//   res.send(dt)
// })
})
app.get("/profile/:id", async(req,res) => {
  if(!req.params.id) return res.status(404).send("Not found")
  userModel.findOne({_id: req.params.id}).then(dt=>{
    res.send(dt)

  }).catch((err)=>{
    res.send(err)
  })
})

app.post("/profile/:id/avatar", (req,res)=> {
  userModel.findOneAndUpdate({_id: req.params.id}, {
    avatar: req.body.filename
  },{upsert:true}, (e,raw) => {
    if (e) {
      res.status(400).send('Invalid Image supplied');
    }
    res.send(raw);
  })
});
// post
app.post("/profile/post",passport.authenticate('jwt', { session: false }), (req,res) => {
  const newPost = new postModel({
    content: req.body.content,
    image: req.body.image,
    like: req.body.like,
    user: req.user.id
  });
  newPost.save().then(
         (post) => { res.send(post);}, 
         (e) => {
            res.status(400).send(e);
          });
});

// post of friend and my
app.get("/post",passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  await postModel.find({user: {'$in': [req.user.id,...friend.friend]}}).populate("user", '-password').then(
        (post)=>{
        res.send(post);
      })
  // return res.send(posts)
})

app.post("/delete/post", (req,res) => {
  postModel.find({_id: req.body.id}).remove()
  .then(res.send("ok"))
})

// post of my
app.post("/profile/post/:id/image", (req,res)=> {
  postModel.findOneAndUpdate({_id: req.params.id}, {
    image: req.body.filename
  },{upsert:true}, (e,raw) => {
    if (e) {
      res.status(400).send('Invalid Image supplied');
    }
    res.send(raw);
  })
});
// like
app.post("/post/like",(req,res) => {
  postModel.findOneAndUpdate(
    { _id: req.body.post }, 
    { $push: {like: req.body.user} },
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });  
})
// dislike
app.post("/post/dislike",(req,res) => {
  postModel.findOneAndUpdate(
    { _id: req.body.post }, 
    { $pull: {like: req.body.user} },
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });  
})

app.get("/post/:id/like", async (req,res) => {
  const post = await postModel.findOne({_id: req.params.id})
  console.log(post)
  res.send(post?.like)
}) 

// post comment post
app.post("/post/comment", (req,res)=> {
  postModel.findOneAndUpdate(
    { _id: req.body.post }, 
    { $push : 
      {
        comments: {
          content: req.body.content,
          user: req.body.user
        } 
      }
    },
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });  
})
// get comment post
app.get("/post/:id/comment", async (req,res)=> {
  if(!req.params.id) return res.status(404).send("Not found")
  const post = await postModel.findOne({_id: req.params.id}).populate({
    path: "comments",
    populate: { 
      path:  'user',
      model: 'users' 
    }
  })
  res.send(post.comments)
})
// messeges
app.post("/messeges",passport.authenticate('jwt', { session: false }) , async (req,res) => {
  const {friend , content} = req.body
  const friendId = friend
  const userId = req.user._id
  console.log("bodt",{...req.body,userId})
  messegeModel.findOne( { chatsId: friendId }).then(async dt=>{
    if(!dt){
      await messegeModel.create({
        chatsId: friendId,
        messeges: [{
          user: userId,
          content: content
        }]  
         
      })
      return
      
    }
    messegeModel.findOneAndUpdate(
    { chatsId: friendId}, 
    { $push: 
      {messeges: 
        {
          user: userId,
          content: content
        }
      } 
    },
    function (error, success) {
         if (error) {
             console.log(error);
            //  res.send({"message":"failur"})
         } else {
             console.log(success);
            //  res.send({"message":"success"})
         }
     }); 
  })

  messegeModel.findOne( { chatsId: userId }).then(async dt=>{
    if(!dt){
      await messegeModel.create({
        chatsId: userId,
        messeges: [{
          user: userId,
          content: content
        }]    
         
      })
      return
         
    }
    messegeModel.findOneAndUpdate(
    { chatsId: userId}, 
    { $push: 
      {messeges: 
        {
          user: userId,
          content: content
        }
      } 
    },
    function (error, success) {
         if (error) {
             console.log(error);
             
         } else {
             console.log(success);
            
         }
     }); 
  })
  res.send({"message":"success"})
})

app.get("/messeges/:id", async (req,res) => {
  if(!req.params.id) return res.status(404).send("Not found")
  const mess = await messegeModel.findOne({chatsId: req.params.id})
  .populate({
    path: "messeges",
    populate: { 
      path:  'user',
      model: 'users' 
    }
  }).then(dt =>{
    res.send(dt)
  }).catch(err=>{
    res.send(err)
  })
  // res.send(mess)
})
// friend
app.get("/friend/suggest",passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  const suggetUser = await userModel.find({_id: {'$nin': [req.user.id,...friend.friend,...friend.requestsFriend,...friend.suggestsFriend]}})
  return res.send(suggetUser)
})

app.get("/friend/request",passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  const requestsUser = await userModel.find({_id: {'$in': [...friend.requestsFriend]}})
  return res.send(requestsUser)
})

app.get("/friend",passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  const requestsUser = await userModel.find({_id: {'$in': [...friend.friend]}})
  return res.send(requestsUser)
})

app.post("/friend/request", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.friend }, 
    { $push: {requestsFriend: req.body.id} },
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });    
})

app.post("/friend/suggest", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.id }, 
    { $push: {suggestsFriend: req.body.friend} },
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

// get friend mutual
app.get("/friend/:id/mutual", passport.authenticate('jwt', { session: false }) ,async (req,res) => {
  const friend =await userModel.findOne({_id: req.user.id})
  // return res.send(friend)
  const myfriend = await userModel.findOne({_id: req.params.id})
  // return res.send([...myfriend.friend, ...friend.friend])
  const friendMutual = friend.friend.filter(element => myfriend.friend.includes(element));
  const user = await userModel.find({_id: {'$in': [...friendMutual]}})
  return res.send([...user])
})

app.post("/friend", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.id }, 
    { $push: {friend: req.body.friend}, 
      $pull: {requestsFriend: req.body.friend }},
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

app.post("/myfriend", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.friend }, 
    { $push: {friend: req.body.id},
      $pull: {suggestsFriend: req.body.id}},
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

app.post("/friend/request/delete", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.id }, 
    { $pull: {requestsFriend: req.body.friend}},
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

app.post("/friend/delete", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.id }, 
    { $pull: {friend: req.body.friend }},
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

app.post("/myfriend/delete", (req,res) => {
  userModel.findOneAndUpdate(
    { _id: req.body.friend }, 
    { $pull: {friend: req.body.id }},
    function (error, success) {
         if (error) {
             console.log(error);
             res.send({"message":"failur"})
         } else {
             console.log(success);
             res.send({"message":"success"})
         }
     });
})

// login web
app.post("/login", (req, res) => {
  // Form validation

  // Check validation
  if (!req.body.email) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  userModel.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          birthday: user.birthday,
          email: user.email,
          avatar: user.avatar
        };

        // Sign token
        jwt.sign(
          payload,
          "PrivateKEY",
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// khai báo nơi lưu file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    let re=/\.[0-9a-zA-z]+$/
    cb(null, file.fieldname + "-" + Date.now()+re.exec(file.originalname)[0]);
  },
});
var upload = multer({ storage: storage });

// up ảnh lên
app.post("/file", upload.single("files"), (req, res, next) => {
  
  console.log("uploaded",req.file);
  res.send(req.file);
});

// load ảnh về
app.get("/img/:image", (req, res) => {
  const image = req.params?.image
  return res.sendFile(path.join(__dirname, `./upload/${image}`));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
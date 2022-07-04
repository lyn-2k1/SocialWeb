const mongoose = require("mongoose");

// require("dotenv").config();

// mongoose options
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
// };

mongoose.connect("mongodb://localhost:27017/social").then(res=>{
    console.log("Connected to mongodb")
});
module.exports = mongoose ;
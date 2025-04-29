const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    }
   ,
   gender:{
    type:String,
   },
   imageurl:{
    type:String
   }
   

})
const User = mongoose.model("User",userSchema);
module.exports = User;
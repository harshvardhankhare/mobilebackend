const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  imageurl: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false // By default, a user is not admin
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

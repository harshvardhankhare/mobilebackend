const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/myDatabase", {

}).then(() => {
    console.log("mongoDB connection successfull")
}).catch((error) => {
    console.log(error);
}) 
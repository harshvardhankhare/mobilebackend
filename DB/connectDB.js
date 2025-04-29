const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://hkhare702:dolly@cluster0.fepg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

    

}).then(() => {
    console.log("mongoDB connection successfull")
}).catch((error) => {
    console.log(error);
}) 
const mongoose = require('mongoose')

const serviceSchema =  new mongoose.Schema({

    name: {
        type: String,
        
        required: true

    },
    description: {
        type: String,
    
        required: true

    },
    category: {
        type: String,
        required: true
    },
    urlimg:{
        type:String,
    },
    price:{
        type:String,
    }
   ,
   
   
   

})
const Service = mongoose.model("Service",serviceSchema);
module.exports = Service;
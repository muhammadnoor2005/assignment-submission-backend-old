const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName:String,

    lName:String,

    email : {
        type:String,
        required:true,
    },
    password :{
        type:String,
        // select:false, 
        required:true
    },
    role:{
        type:String,
        enum:["Teacher","Student"]
    },
   
    img:{
        imgURL:String,
        public_id:String
    },
    attendance:[{
        checkInTime:Number,
        checkOutTime:Number
    }]
});

const Users = mongoose.model("Users",userSchema);
module.exports = Users;
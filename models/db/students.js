const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    first_name:String,
    last_name: String,

    NIC: String,
    batch:Number,
    roll_number:String,

    email:String,
    password:String,

    img:{
        imgURL:String,
        public_id:String
    },

    teacher_id:String,

    classroom_id:String, 

})

const Students = mongoose.model("Students", studentSchema);
module.exports = Students;
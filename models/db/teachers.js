const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,

    id:String,
    email:String,
    password:String,

    NIC:String,

    img:{
        imgURL:String,
        public_id:String
    },

    rooms:[{
        room_id:String,
        room_name:String
    }],

    //assignment ids
    assignments:[String]
})

const Teachers = mongoose.model("Teachers", teacherSchema);
module.exports = Teachers;
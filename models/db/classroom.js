const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
    room_id:String,
    name:String,
    teacher_id:String,

    students_id:[String],

    pending_assignments_id:[String], //assignemnts whose due date is remaining
    expired_assignments_id:[String] //assignemnts whose due dates completed            
});

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;
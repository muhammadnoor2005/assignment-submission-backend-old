const mongoose = require("mongoose");

const assignemntSchema = new mongoose.Schema({
    id:String,

    title:String,
    description:String,
    dueDate:Number,
    scheduledUploadTime:Number,

    teacher_id:String,
    classroom_id:String,

    assignedTo:[String],

    completedBy:[{
        student_id:String,
        submittedAt:Number,
        comments:String,
        filePath:String
    }],

    //store student ids
    toBeCompletedBy:[String],

    //store scheduled assignmnet ids
    scheduledAssignments:[String]

});

const Assignemnt = mongoose.model("Assignment", assignemntSchema);
module.exports = Assignemnt;
const Assignemnt = require("./db/assignment");
const Classroom = require("./db/classroom");
const Students = require("./db/students");
const Teachers = require("./db/teachers");

// data contains:  classroom_id, title, description, dueDate, teacher_id(NIC), scheduledUploadTime(if any)
const createAssignment = async(data) => {
    try {
        const {classroom_id, scheduledUploadTime} = data;

        // creating is for assignment
        const date = new Date();
        const id = date.getTime().toString();
        
        //setting assignment id
        data.id = id;

        if(scheduledUploadTime){
            await Teachers.updateOne({'rooms.room_id': classroom_id}, { $push: { assignments: id } });

        } else{
             //finding all the students ids of the classroom in which assignment is posted
            const studentsOfRoom = await Students.find({classroom_id}).select("NIC").exec();

            //pushing the assignment id in each of student in classroom
            // await Students.updateMany({classroom_id}, { $push: { pending_assignments: id } });

            //pushing assignment in teacher's data also
            await Teachers.updateOne({'rooms.room_id': classroom_id}, { $push: { assignments: id } });

            //pushing assignent id in classroom data also
            await Classroom.updateOne({room_id:classroom_id}, {$push: {pending_assignments_id: id}});

            data.toBeCompletedBy = studentsOfRoom.map(student => student.NIC);
            data.assignedTo = studentsOfRoom.map(student => student.NIC);
        }

            const writeData = new Assignemnt(data);
            await writeData.save();

            return "Assignment uploaded!";

       
    } catch (err) {
        throw(err);
    }
}

// data contains: assignment_id, title, description, dueDate, scheduledUploadTime(if any)
const editAssignment = async(data) => {
    try {
        const {assignment_id, scheduledUploadTime} = data;

        const assignment = await Assignemnt.findOne({id:assignment_id});

        if(assignment){
            const resp = await Assignemnt.updateOne({id:assignment_id}, {data});

            if(resp.acknowledged){
                return "Updated!";
            } else{
                throw new Error("Error while updating!");
            }
        } else{
            return "Assignment not found!";
        }
    } catch (err) {
        throw(err);
    }
};

// data contains:assignment_id
const deleteAssignment = async(data) => {
    try {
        const {assignment_id} = data;

        //deleting the assignment from db
        await Assignemnt.deleteOne({id:assignment_id});

        //removing assignment id from submiteed_assignemnt of stduents
        // await Students.updateMany({submitted_assignments: assignment_id}, { $pull: { submitted_assignments: assignment_id } });

        //removing assignment id from pending_assignemnt of stduents
        // await Students.updateMany({pending_assignments: assignment_id}, { $pull: { pending_assignments: assignment_id } });

        //removing assignment id from pending_assignemnt of classroom
        await Classroom.updateOne({pending_assignments_id: assignment_id}, { $pull: { pending_assignments_id: assignment_id } });

        //removing assignment id from expired_assignemnt of classroom
        await Classroom.updateOne({expired_assignments_id: assignment_id}, { $pull: { expired_assignments_id: assignment_id } });

        //removing assignment id from teacher of assignment
        await Teachers.updateOne({assignments: assignment_id}, {$pull:{assignments:assignment_id}});
    } catch (err) {
        throw(err);
    }
}

const scheduledAssignment = async(data) => {
    try {
        const {assignment_id, classroom_id} = data;
        const assignment = await Assignemnt.findOne({id:assignment_id});

        if(assignment){
             //finding all the students ids of the classroom in which assignment is posted
             const studentsOfRoom = await Students.find({classroom_id}).select("NIC").exec();

             //pushing the assignment id in each of student in classroom
            //  await Students.updateMany({classroom_id}, { $push: { pending_assignments: assignment_id } });
 
             //pushing assignment in teacher's data also
            //  await Teachers.updateOne({'rooms.room_id': classroom_id}, { $push: { assignments: assignment_id } });
 
             //pushing assignent id in classroom data also
             await Classroom.updateOne({room_id:classroom_id}, {$push: {pending_assignments_id: assignment_id}});

             //pulling it out from scheduled assignment section
             await Assignemnt.updateOne({room_id:classroom_id}, { $pull: { scheduledAssignments: assignment_id } });

            data.assignedTo = studentsOfRoom.map(student => student.NIC);
            data.toBeCompletedBy = studentsOfRoom.map(student => student.NIC);
        } else{
            return "Assignemnt not found!";
        }


    } catch (err) {
        throw(err);
    }
}
module.exports = {createAssignment, editAssignment, deleteAssignment, scheduledAssignment};
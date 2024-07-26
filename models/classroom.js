const { findStudent } = require("./admin_portal");
const Classroom = require("./db/classroom");
const Students = require("./db/students");
const Teachers = require("./db/teachers");

//find room by id
// const findRoomById = async (room_id) =>{
//     return new Promise((resolve,reject) => {
//         const room = Classroom.findOne({room_id});

//         if(!room){
//             reject("No classroom!");
//         }
//         resolve(room);  
//     }); 
// }

// create new class-room
// data contains: room_id, name, teacher_id
const createRoom = async(data) => {
    try {
        const date = new Date();
        const roomID = date.getTime().toString();

        // NIC of teacher and room name
        const {teacher_id, name} = data;

        data.room_id = roomID;

        const teacher = await Teachers.findOne({NIC:teacher_id});
        
        const roomData = {
            room_id:roomID,
            room_name:name
        };

        teacher.rooms.push(roomData);
        await teacher.save();

        
        const writeData = new Classroom(data);
        await writeData.save();

        return roomID;
    } catch (err) {
        throw(err);
    }
}


//student join classroom
//data includes student_id, room_id
const joinRoom = async(data) => {
    try {
        //student_id in NIC here
        const {student_id, room_id} = data;

        const student = await findStudent(student_id);
        const classroom = await Classroom.findOne({room_id});

        if(student && classroom){
            //validating that student not already exist in the room
            if(student.classroom_id !== room_id){
                //saving room_id to student data
                await Students.updateOne({NIC:student_id},{$set:{classroom_id:room_id}});
            
                // adding student to classroom student's array
                classroom.students_id.push(student_id);
                classroom.save();

                return("Room joined!");
            } else{
                return "Can't rejoin the same classroom!";
            }
            
        }else{
            return ("Invalid stduent or room!");
        }

    } catch (err) {
        throw(err);
    }
}

//returns all the students
// data contains: room_id
const getRoomStudents = async(data) => {
    try {
        const {room_id} = data;        
        
        //selecting only 3 fields
        const students = await Students.find({classroom_id:room_id}).select("first_name last_name email").exec();
        return students;

    } catch (err) {
        throw(err);
    }
};

//edits the name of classroom
// data contains: updatedName, room_id
const editRoomName = async(data) => {
    try {
        const { room_id, updatedName } = data;
        const room = await Classroom.findOne({room_id});

        if(room){
            const resp = await Classroom.updateOne({room_id}, {$set:{name:updatedName}});

            if(resp.acknowledged){
                return "Update successfull!";
            }  else{
                return "Error while updating name!";
            } 
        } else{
            return "Room not found";
        }
    } catch (err) {
        throw(err);
    }
}


//delete clasroom
// data contains: teacher_id, room_id
const deleteRoom = async (data) => {
    try {
        const {room_id, teacher_id} = data;
        await Classroom.deleteOne({room_id});

        //deleting the room from teacher record
        await Teachers.updateOne({NIC:teacher_id}, { $pull: { rooms: { room_id } } });

        //deleting room from student record
        await Students.updateMany({classroom_id:room_id},{$set:{classroom_id:null}});

        return "room deleted!";
    } catch (err) {
        throw(err);
    }
}

//remove student from class
// data contains: room_id
const removeStudent = async(data) => {
    try {
        const { studentEmail, room_id } = data;

        await Classroom.updateOne({room_id}, {$pull:{students_id:room_id}});
        await Students.updateOne({classroom_id:room_id}, {$set:{classroom_id:null}});

        return "Student removed!";
    } catch (err) {
        throw(err);
    }
}
module.exports = {createRoom, joinRoom, getRoomStudents, editRoomName, deleteRoom, removeStudent};
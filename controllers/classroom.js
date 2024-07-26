const { createRoom, joinRoom, getRoomStudents, editRoomName, deleteRoom } = require("../models/classroom");

exports.createRoom = async (data) => {
    try {
        const resp = await createRoom(data);

        // converting milllisec to number as we can send long in response
        if(typeof(resp) === "number"){
            return resp.toString();

        } else{
            return resp;
        }
    } catch (err) {
        throw(err);
    }
}

exports.joinRoom = async(data) => {
    try {   
        return await joinRoom(data);
    } catch (err) {
        throw(err);
    }
}

//return all the studentds of specific classroom
exports.getRoomStudents = async(data) => {
    try {
        return await getRoomStudents(data);
    } catch (err) {
        throw(err);
    }
}

//edit the classroom name
exports.editRoomName = async(data) =>{
    try {
        return await editRoomName(data);
    } catch (err) {
        throw(err);
    }
}

//delete a classroom
exports.deleteRoom = async(data) => {
    try {
        return await deleteRoom(data);
    } catch (err) {
        throw(err);
    }
}

//remove student
exports.removeStudent = async(data) => {
    try {
        return await removeStudent(data);
    } catch (err) {
        throw(err);
    }
}
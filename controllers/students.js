// const { getStudents, createUser, getAttendance } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");

const { studentSignup, updateStdProfile, findStudentByEmail, getStudent, assignmentHistory } = require("../models/student");
const { deleteStudent } = require("../models/admin_portal");
const { removeStudent } = require("../models/classroom");

// //returns all students
// exports.getStudents = async () => {
//     const users = await getStudents();
//     const students = [];

//     users.forEach((user) =>{
//         students.push({
//             fName: user.fName ,
//             lName: user.lName,
//             email: user.email,
//             img:{
//                 imgURL:user.img.imgURL,
//                 public_id:user.img.public_id
//             },
//         }); 
//     });
//     return students;
// };

// exports.addStudent = async (fName,lName,email,password,imgURL,imgPID) => {
//     try{
//         const hashedPass = await bcrypt.hash(password,12);
//         return await createUser(fName,lName,email,hashedPass,"Student",imgURL,imgPID);

//     } catch(err){
//         throw(err);
//     };  
// };

// //return attendance array 
// exports.getAttendance = async (email) => {
//     try {
//         return await getAttendance(email);
//     } catch (err) {
//         throw(err);
//     };
// };

//stduent create his own acc
exports.studentSignup = async(data) => {
    try {
        return await studentSignup(data);
    } catch (err) {
        throw(err);
    }
}

//student profile update
exports.updateStdProfile = async(data) =>{
    try {
        return await updateStdProfile(data);
    } catch (err) {
        throw(err);
    }
}

exports.studentLogin = async(data) => {
    try {
        const {email, password} = data;
        const student = await findStudentByEmail(email);

        if(!student){
            return "Student not found";
        }
        const decrytPass = await bcrypt.compare(password, student.password);

        if(decrytPass){
            const token = jwt.sign({email} ,SECRET_KEY);
            return {token};
        }
        return "Wrong password";
        
    } catch (err) {
        throw err;
    }
}

//delete student
exports.deleteStudent = async(data) => {
    try {
        return await deleteStudent(data);        
    } catch (err) {
        throw(err);
    }
}

//get student profile
exports.getStudent = async(data) => {
    try {
        return await getStudent(data);        
    } catch (err) {
        throw(err);
    }
}

exports.leaveRoom = async(data) => {
    try {
        return await removeStudent(data);
    } catch (err) {
        throw(err);
    }
}

exports.assignmentHistory = async(data) => {
    try {
        return await assignmentHistory(data);
    } catch (err) {
        throw(err);
    }
}
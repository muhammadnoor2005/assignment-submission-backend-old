const { teacherSignup, updateTeacherProfile, findTeacherByEmail, searchStudentInRoom, getTeacher, teacherAssignments } = require("../models/teacher");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");
const bcrypt = require("bcrypt");
const { deleteTeacher, searchStudent } = require("../models/admin_portal");

exports.teacherSignup = async(data) => {
    try {
        return await teacherSignup(data);
    } catch (err) {
        throw(err);
    }
}

//teacher profile update
exports.updateTeacherProfile = async(data) =>{
    try {
        return await updateTeacherProfile(data);
    } catch (err) {
        throw(err);
    }
}


//teacher login
exports.teacherLogin = async(data) => {
    try {
        const {email, password} = data;
        const teacher = await findTeacherByEmail(email);

        if(!teacher){
            return "Teacher not found";
        }
        const decrytPass = await bcrypt.compare(password, teacher.password);

        if(decrytPass){
            const token = jwt.sign({email} ,SECRET_KEY);
            return {token};
        }
        return "Wrong password";
        
    } catch (err) {
        throw err;
    }
}

exports.deleteTeacher = async(data) => {
    try {
        return await deleteTeacher(data);
    } catch (err) {
        throw(err);
    }
}

exports.searchStudent = async(data) => {
    try {
        return await searchStudent(data);        
    } catch (err) {
        throw(err);
    }
}

exports.searchStudentInRoom = async(data) => {
    try {
        return await searchStudentInRoom(data);        
    } catch (err) {
        throw(err);
    }
}

//get teacher profile
exports.getTeacher = async(data) => {
    try {
        return await getTeacher(data);        
    } catch (err) {
        throw(err);
    }
}

exports.teacherAssignments = async(data) => {
    try {
        return await teacherAssignments(data);        
    } catch (err) {
        throw(err);
    }
}
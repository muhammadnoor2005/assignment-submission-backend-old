const { createStudent, createTeacher, updateStudent, updateTeacher, deleteTeacher, deleteStudent, searchTeacher, searchStudent, getStudent, getTeacher } = require("../models/admin_portal");

//admin creates a basic stuednt profile witn nic, name, roll number and batch
//this info will later used to verify student while signup
exports.createStudent = async(data) => {
    try {
        return await createStudent(data);
    } catch (err) {
        throw err;
    }
}

// creates a teacher with nic, name
exports.createTeacher = async(data) => {
    try {
        return await createTeacher(data);
    } catch (err) {
        throw err;
    }
}

//admin edit an student deatil for eg change roll number or name or batch
exports.updateStudent = async(data) => {
    try {
        return await updateStudent(data);
    } catch (err) {
        throw(err);
    }
}

//admin edit an teacher detail for eg change name
exports.updateTeacher = async(data) => {
    try {
        return await updateTeacher(data);
    } catch (err) {
        throw(err);
    }
}


//delete the teacher
exports.deleteTeacher = async(data) => {
    try {
        return await deleteTeacher(data);
    } catch (err) {
        throw(err);
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

exports.searchTeacher = async(data) => {
    try {
        return await searchTeacher(data);        
    } catch (err) {
        throw(err);
    }
}

//search student
exports.searchStudent = async(data) => {
    try {
        return await searchStudent(data);        
    } catch (err) {
        throw(err);
    }
};


//get student data
exports.getStudent = async(data) => {
    try {
        return await getStudent(data);        
    } catch (err) {
        throw(err);
    }
}

//get tecaher data
exports.getTeacher = async(data) => {
    try {
        return await getTeacher(data);        
    } catch (err) {
        throw(err);
    }
}
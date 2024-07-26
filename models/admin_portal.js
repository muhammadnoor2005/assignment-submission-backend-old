const Assignemnt = require("./db/assignment");
const Classroom = require("./db/classroom");
const Students = require("./db/students");
const Teachers = require("./db/teachers");

// find student by nic
const findStudent = (NIC) => {    
    return new Promise((resolve,reject) => {
        const student = Students.findOne({NIC});
        if(!student){
            reject("No users");
        }

        resolve(student);
    });    
}; 

//find student by roll number
const findStudentByRollNo = (roll_number) => {    
    return new Promise((resolve,reject) => {
        const student = Students.findOne({roll_number});
        if(!student){
            reject("No users");
        }

        resolve(student);  
    });    
};

//checking if tecaher already exists
const findTeacherByNIC = async(NIC) => {
    return new Promise((resolve,reject) => {
        const teacher = Teachers.findOne({NIC});
        if(!teacher){
            reject("No users");
        }

        resolve(teacher);  
    });   
}

// admin creates the student
// data contains : first_name, last_name, NIC, roll_number
const createStudent = async(data) => {
    try {
        const {NIC, roll_number} = data;
        const student = await findStudent(NIC);
        const teacher = await findTeacherByNIC(NIC);

        const rollNumberExists = await findStudentByRollNo(roll_number);

        if(student || teacher){
            throw new Error("NIC already exists!");
        } 
        else if(rollNumberExists){
            throw new Error("Roll number already exists!");
        }
        else{
            const writeData = new Students(data);
            await writeData.save();
            return "Student created!";
        }
    } catch (err) {
        throw(err);
    }
};



//admin creates teacher
// data contains: first_name, last_name, NIC
const createTeacher = async(data) => {
    try {
        const {NIC} = data;

        const teacher = await findTeacherByNIC(NIC);
        const student = await findStudent(NIC);


        if(teacher || student){
            throw new Error("NIC already exists!");
        } else{     
            const writeData = new Teachers(data);

            await writeData.save();
            return "Teacher created!";
        }
    } catch (err) {   
        throw(err);
    }
}

//admin edits student info for eg name or roll number or batch
//data contains :first_name or last_name or roll_number and NIC
const updateStudent = async(data) => {
    try {
        const {NIC, roll_number} = data;
        const student = await findStudent(NIC);
        const rollNumberExists = await findStudentByRollNo(roll_number);

        // id std exists
        if(student){
            //verifying that new roll number does not already taken by other student
            if(rollNumberExists.NIC === student.NIC){
                const resp = await Students.updateOne({NIC}, {$set:data});

                if(resp.acknowledged){
                    return "Data updated!";
                }  else{
                    return "Error while updating data!";
                }
            } else{
                return "Roll number already exists!";
            }
        } else{
            throw new Error("Student not found!")
        }
    } catch (err) {
        throw(err);
    }
}

// update basic info of teacher by admin
//data contains: first_name or last_name and NIC
const updateTeacher = async (data) => {
    try {
        const {NIC} = data;
        const teacher = await findTeacherByNIC(NIC);
        
        if(teacher){
            const resp = await Teachers.updateOne({NIC}, {$set:data});

            if(resp.acknowledged){
                return "Data updated!";
            }  else{
                return "Error while updating data!";
            }
        } else{
            throw new Error("Teacher not found!")
        }
    } catch (err) {
        throw(err);
    }
}


//delete teacher
// data conatins:NIC 
const deleteTeacher = async (data) => {
    try {
        const {NIC} = data;
        const teacher = await Teachers.findOne({NIC});
        

        if(teacher){
            const teacherAssignment = teacher.assignments;
            const rooms = teacher.rooms.room_id;

            
            await Classroom.deleteOne({room_id: {$in:rooms}});
            await Students.updateMany({classroom_id : {$in:rooms}}, {$set:{classroom_id:null}});
            
            

            // clearing assignments
            await Assignemnt.deleteMany({ id: { $in: teacherAssignment } });

            await Students.updateMany({ submitted_assignments: { $in: teacherAssignment } },
                { $pull: { submitted_assignments: { $in: teacherAssignment } } });

            await Students.updateMany({ pending_assignments: { $in: teacherAssignment } },
                { $pull: { pending_assignments: { $in: teacherAssignment } } });

            await Teachers.deleteOne({NIC});
            return "Deleted";
        } else{
            throw new Error("Teacher not found!");
        }

        
    } catch (err) {
        throw(err);
    }
}

//delete student
// here data contains NIC of std
const deleteStudent = async(data) => {
    try {
        const {NIC} = data;
        const student = await Students.findOne({NIC});

        if(student){
            await Classroom.updateOne({room_id:student.classroom_id}, {$pull: {students_id:student.NIC}});
            await Assignemnt.updateMany({teacher_id: student.teacher_id}, 
                {
                    $pull:{
                        toBeCompletedBy:student.NIC,
                        assignedTo: student.NIC ,
                        completedBy: { student_id: student.NIC },
                    }
                });

            const student = await Students.deleteOne({NIC});


            if(student.acknowledged){
                return "Deleted";
            } else{
                return "Error while deleting!";
            }
        } else{
            throw new Error("Student not found!");
        }
        
        
    } catch (err) {
        throw(err);
    }
}

//search teacher 
// data contains: NIC, first_name or last_nmae or both
const searchTeacher = async(data) => {
    try {
        if(data.NIC){
            const {NIC} = data;
            const teachers = await Teachers.find({NIC});
            return teachers;
        }
        if(data.first_name){
            const {first_name} = data;
            const teachers = await Teachers.find({first_name});
            return teachers;
        }
        if(data.last_name){
            const {last_name} = data;
            const teachers = await Teachers.find({last_name});
            return teachers;
        }
        if(data.first_name && data.last_name){
            const {first_name, last_name} = data;
            const teachers = await Teachers.find({first_name,last_name});
            return teachers;
        }
        else{
            return "Not found";
        }
    } catch (err) {
        throw(err);
    }
}


//search student 
// data contains: NIC, first_name or last_name or both
const searchStudent = async(data) => {
    try {
        if(data.NIC){
            const {NIC} = data;
            const student = await Students.find({NIC});
            return student;
        }
        if(data.first_name){
            const {first_name} = data;
            const student = await Students.find({first_name});
            return student;
        }
        if(data.last_name){
            const {last_name} = data;
            const student = await Students.find({last_name});
            return student;
        }
        if(data.first_name && data.last_name){
            const {first_name, last_name} = data;
            const student = await Students.find({first_name,last_name});
            return student;
        }
        else{
            return "Not found";
        }
    } catch (err) {
        throw(err);
    }
}

//get teacher info
// data contains: NIC
const getTeacher = async(data) => {
    try {
        const {NIC} = data;
        const teacher = await Teachers.findOne({NIC}).select("first_name last_name NIC").exec();

        if(teacher){
            return teacher;
        } else{
            return "Not found!";
        }
    } catch (err) {
        throw(err);
    }
}

//get stuednt info
// data contains: NIC
const getStudent = async(data) => {
    try {
        const {NIC} = data;
        const student = await Students.findOne({NIC}).select("first_name last_name NIC roll_number").exec();

        if(student){
            return student;
        } else{
            return "Not found!";
        }
    } catch (err) {
        throw(err);
    }
}

module.exports = {
    findStudent, 
    createStudent, 
    createTeacher, 
    findTeacherByNIC, 
    updateStudent, 
    updateTeacher,
    deleteTeacher, 
    deleteStudent,
    searchTeacher,
    searchStudent,
    getTeacher,
    getStudent
};
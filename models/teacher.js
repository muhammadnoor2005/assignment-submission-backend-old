const Teachers = require("./db/teachers");
const bcrypt = require("bcrypt");

const { findTeacherByNIC } = require("./admin_portal");
const Students = require("./db/students");
const Assignemnt = require("./db/assignment");

//  data contains :first_name, last_nmae,NIC, email, password,img(optional)
const teacherSignup = async(data) => {
    try {
        //import is done here to avoid circular dependency error as node js wont be able to know which file to load first
        const { checkEmailExistence } = require("./user");

        const {email} = data;
        const isEmailExistT = await checkEmailExistence(email);
         
        // if student does not exist with given email as each student must havve unique email
        if(isEmailExistT){            
            const {first_name, last_name, NIC} = data;

            //checking if the given nic is valid
            const teacher = await findTeacherByNIC(NIC);
            
            // if given nic is valid then
            if(teacher){

                // given name, nic, roll number is correct then we hash the pass and save user
                if(teacher.first_name == first_name &&
                    teacher.last_name == last_name &&
                    teacher.NIC == NIC
                ){
                    const password = data.password;
                    const hashedPass = await bcrypt.hash(password, 12);
    
                    // saving hashsed password to original password variable
                    data.password = hashedPass;
    
                    const resp = await Teachers.updateOne({NIC}, {$set:data});

                    //
                    if(resp.acknowledged){
                        return "Signup successful";
                    }  else{
                        return "Wrong info";
                    }  
                }

            } else{
                return "Wrong NIC!"; //means that student not exists with given nic
            }
        } else{
            return "Email already exists!"
        }

        
    } catch (err) {
        throw(err);
    }
    
}

// checks whether student exist with given email

const findTeacherByEmail = (email) => {    
    return new Promise((resolve,reject) => {
        const teacher = Teachers.findOne({email});

        if(!teacher){
            reject("No users");
        }
        resolve(teacher);  
    });    
};


//UPDATE teacher ProFILE DEATILS SUCH AS email, password, profile pic
// data contains: first_name-,last_name-,password-,img-
const updateTeacherProfile = async (data) => {
    try {
        const {NIC} = data;
        const teacher = await findTeacherByNIC(NIC);

        if(teacher){
            if(data.password){
                const password = data.password;
                    const hashedPass = await bcrypt.hash(password, 12);
    
                    // saving hashsed password to original password variable
                    data.password = hashedPass;
            }

            const resp = await Teachers.updateOne({NIC}, {$set:data});

            if(resp.acknowledged){
                return "Update successful";
            }  else{
                return "Wrong info";
            } 
        } else{
            throw new Error("Teacher not found");
        }
    } catch (err) {
        throw(err);
    }
}

//search student in a classroom
// data contains: first_name or last_name or both and classroom_id
const searchStudentInRoom = async (data) => {
    try {
        const {classroom_id} = data;

        if(data.first_name){
            const {first_name} = data;
            const students = await Students({first_name, classroom_id});
            return students;
        }
        if(data.last_name){
            const {last_name} = data;
            const students = await Students({last_name, classroom_id});
            return students;
        }
        if(data.first_name && data.last_name){
            const {first_name, last_name} = data;
            const students = await Students({first_name,last_name, classroom_id});
            return students;
        }
        else{
            return "Not found!";
        }
    } catch (err) {
        throw(err);
    }
}

//get profile of student by teacher and student
// data contains: NIC
const getTeacher = async(data) => {
    try {
        const {NIC} = data;
        const teacher = await Teachers.findOne({NIC}).select("first_name last_name email").exec();

        if(teacher){
            return teacher;
        } else{
            return "Not found!";
        }
    } catch (err) {
        throw(err);
    }
}


//all assignment of the teacher
// data contains teacher_id(NIC)
const teacherAssignments = async(data) => {
    try {
        const {teacher_id} = data;
        const assignemnt_ids_obj = await Teachers.findOne({NIC:teacher_id}).select("assignments").exec();

        //all assignments given by teacher
        const teacher_assignments = [];

        if(assignemnt_ids_obj){
            const assignemnt_ids_array = assignemnt_ids_obj.assignments;

            for(let i=0; i< assignemnt_ids_array; i++){
                const assignment = await Assignemnt.find({id:assignemnt_ids_array[i]});
                teacher_assignments.push(assignment);
            }
            return teacherAssignments;
        } else{
            throw new Error("Teacher not found!");
        }
    } catch (err) {
        throw(err);
    }
}
module.exports = {
    teacherSignup, 
    findTeacherByEmail, 
    updateTeacherProfile, 
    searchStudentInRoom,
    getTeacher,
    teacherAssignments
};
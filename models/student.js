const bcrypt = require("bcrypt");

const { findStudent } = require("./admin_portal");

const Students = require("./db/students");
const Assignemnt = require("./db/assignment");
const Classroom = require("./db/classroom");

//  data contains :first_name, last_nmae,NIC, roll_number, batch, email, password,img(optional)
const studentSignup = async(data) => {
    try {
        const { checkEmailExistence } = require("./user");
        const {email} = data;
        const isEmailExist = await checkEmailExistence(email);
        

        // if student does not exist with given email as each student must havve unique email
        if(isEmailExist){            
            const {first_name, last_name, NIC, roll_number} = data;

            //checking if the given nic is valid
            const student = await findStudent(NIC);
            
            // if given nic is valid then
            if(student){

                // given name, nic, roll number is correct then we hash the pass and save user
                if(student.first_name == first_name &&
                    student.last_name == last_name &&
                    student.NIC == NIC && 
                    student.roll_number == roll_number
                ){
                    const password = data.password;
                    const hashedPass = await bcrypt.hash(password, 12);
    
                    // saving hashsed password to original password variable
                    data.password = hashedPass;
    
                    const resp = await Students.updateOne({NIC}, {$set:data});

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

// checks whther student exist with gicen email
const findStudentByEmail = (email) => {    
    return new Promise((resolve,reject) => {
        const student = Students.findOne({email});

        if(!student){
            reject("No users");
        }
        resolve(student);  
    });    
};


//UPDATE PORFILE DEATILS SUCH AS email, password, profile pic
// contains first_name-,last_name-,password-,img-
const updateStdProfile = async (data) => {
    try {
        const {NIC} = data;
        const student = await findStudent(NIC);

        if(student){
            if(data.password){
                const password = data.password;
                    const hashedPass = await bcrypt.hash(password, 12);
    
                    // saving hashsed password to original password variable
                    data.password = hashedPass;
            }

            const resp = await Students.updateOne({NIC}, {$set:data});

            if(resp.acknowledged){
                return "Update successful";
            }  else{
                return "Wrong info";
            } 
        } else{
            throw new Error("Student not found");
        }
    } catch (err) {
        throw(err);
    }
}

//get profile of student by teacher and student
// data contains: NIC
const getStudent = async(data) => {
    try {
        const {NIC} = data;
        const student = await Students.findOne({NIC}).select("first_name last_name roll_number email").exec();

        if(student){
            return student;
        } else{
            return "Not found!";
        }
    } catch (err) {
        throw(err);
    }
}

// in data:student_id(NIC)
const assignmentHistory = async (data) => {
    try {
        const {student_id} = data;

        //getting submitted assignemnt array
        const submittedAssignments = await Assignemnt.find({"completedBy.student_id":student_id});
        const toBeCompletedBy = await Assignemnt.find({"toBeCompletedBy.student_id":student_id});

        if(submittedAssignments || toBeCompletedBy){
            const stdAssignments = {
                submittedAssignments,
                toBeCompletedBy
            };

            // //finding assignemnt titles against assignment ids
            // for(let i =0; i < submittedAssignmentsArr.length; i++){
            //     const assignment = await Assignemnt.findOne({id:submittedAssignmentsArr[i]}).select("title").exec();
            //     submittedAssignTitles.push(assignment.title);
            // }

            return stdAssignments;
        } else{
            throw new Error("Student not found!");
        }

        
    } catch (err) {
        throw(err);
    }
}
module.exports = {studentSignup, findStudentByEmail, updateStdProfile, getStudent, assignmentHistory};
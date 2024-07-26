// const path = require("path");
// const fs = require("fs");
// const Users = require("./db/users");

const { findStudentByEmail } = require("./student");
const { findTeacherByEmail } = require("./teacher");

// //dbwrite   
// const findUser = (email) => {
//     return new Promise((resolve,reject) => {
//         const user = Users.findOne({email});
//         if(!user){
//             reject("No users");
//         }

//         resolve(user);  
//     });
// };

// const getStudents = () => {
//     return new Promise((res,rej) => {
//         const user = Users.find({role:"Student"});
//         if(!user){
//             rej("Error");
//         }
//         res(user);
//     })
// }
// const createUser = async (fName,lName,email,password,role,imgURL,imgPID) => {
//     try{
//         const user = await findUser(email);
//         // console.log(user)
//         if(user){
//             throw new Error("Email already exists!");
//         } else{
//             const writeData = new Users({
//                 fName,
//                 lName,
//                 email,
//                 password,
//                 role,
//                 img:{
//                     imgURL,
//                     public_id:imgPID,
//                 },
//                 attendance:[]
//             });
//             await writeData.save();
//             return("User created");
//         }
//     }  catch(err){
//         throw(err);
//     };
// };

// const updateName = async (fName,lName,email) => {
//     try{
//         const user = await Users.updateOne({email},{$set:{fName,lName}});
//         return("Updated");
//     } catch(err){
//         throw(err);
//     }
    
// }
// const updateImg = async (email,imgURL,imgPID) => {
//     try{
//         const user = await Users.updateOne({email},{$set:{
//             img:{
//                 imgURL,
//                 public_id:imgPID
//             }
//         }});
//         return("Updated");
//     } catch(err){
//         throw(err);
//     }
// }

// const updatePass = async (email,pass) => {
//     try{
//         const user = await Users.updateOne({email},{$set:{password:pass}});
//         return "Password changed";
//     } catch(err){
//         throw(err);
//     }
// }

// const deleteUser = async  (email) => {
//     try {
//         const resp = await Users.deleteOne({email});
//         return resp;
//     } catch (err) {
//         throw(err);
//     }
// }

// //stundet attendance time marker
// const checkIn = async (email,checkInTime) => {
//     try {
//         const resp = await Users.updateOne({email},{$push:{
//             attendance:{
//                 $each:[{
//                     checkInTime,
//                     checkOutTime:null,
//                 }],

//                 $position:0
//             }
            
//         }});

//         if(!resp.acknowledged){
//             return("Attendance not marked");
//         }
//         return("Attendance marked");

//     } catch (err) {
//         throw(err);
//     }
// }

// //student checkout time marker

// const checkOut = async (email,checkOutTime) => {
//     try {
//         const resp = await Users.updateOne({email,'attendance.checkInTime': { $exists: true }}, {$set:{
//             'attendance.$.checkOutTime': checkOutTime,
//         }});
//         console.log(resp);
//         if(resp.acknowledged){
//             return("Checked out");
//         }
//         return("Error while checking out");

//     } catch (err) {
//         throw(err);
//     }
// }

// //return attendance array 
// const getAttendance = async (email) => {
//     try {
//         const user = await Users.findOne({email});
//         return user.attendance;
//     } catch (err) {
//         throw(err);
//     }; 
// };

// module.exports = {findUser, createUser, updateName, updateImg, updatePass, getStudents, deleteUser, checkIn, checkOut, getAttendance};

//to check whther the email is already there in the datbase while signup
const checkEmailExistence = async(email) => {
    const stdEmail = await findStudentByEmail(email);
    const teacherEmail = await findTeacherByEmail(email);

    if(!stdEmail && !teacherEmail){
        return true;
    } else{
        return false;
    }
};

module.exports = {checkEmailExistence};
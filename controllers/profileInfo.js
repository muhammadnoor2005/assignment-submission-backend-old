const { findUser,updateName,updateImg,updatePass, checkIn,checkOut, deleteUser } = require("../models/user")
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

exports.getUser = async (email) => {
    try{
        const user = await findUser(email);
        return user;

    } catch(err){
        throw(err);
    }
}
exports.updateName = async (fName,lName,email) => {
    try{    
        return await updateName(fName,lName,email);
    } catch(err){
        throw(err);
    }
    
}
exports.updateImg = async(email,img,imgPID) => {
    try{
        const user = await findUser(email);
        const defImgUrl = process.env.DEFAULT_IMG_URL;

        //checking whether user is not havong the default image URL
        if(defImgUrl !== user.img.imgURL){
            const res = await cloudinary.uploader.destroy(user.img.public_id,{
                resource_type:"image"
            });
            if(res.result === "ok"){
                console.log("deleted");
            };
        }
       return await updateImg(email,img,imgPID);

    } catch(err){
        throw(err);
    }
}

exports.oldPassVerify = async (email,oldPass) => {
    const user = await findUser(email);
    const verifyPass = await bcrypt.compare(oldPass,user.password);
    
    if(verifyPass){
        return ("Password matched");
    } else{
        return ("Password not matched")
    }
}

exports.updatePass = async (email,password) =>{
    try{
        const isNewPassEqualOldPass = await this.oldPassVerify(email,password);

        if(isNewPassEqualOldPass == "Password matched"){
            return "New password cannot be your old password";
        } else{
            const hashedPass = await bcrypt.hash(password,12);
            return await updatePass(email,hashedPass);
        } 
    }catch(err){
        throw(err);
    }
}



exports.deleteUser = async (email) => {
    try {
        const user = await findUser(email);
        const defImgUrl = process.env.DEFAULT_IMG_URL;

        //checking whether user is not having the default image URL
        if(defImgUrl !== user.img.imgURL){
            const res = await cloudinary.uploader.destroy(user.img.public_id,{
                resource_type:"image"
            });
            if(res.result === "ok"){
                console.log("deleted");
            };
        }

        const resp = await deleteUser(email);
        return resp;
    } catch (error) {
        throw(error);
    } 
}


exports.checkIn = async (email,checkInTime) => {
    try {
        return await checkIn(email,checkInTime);
    } catch (err) {
        throw(err);
    }
}

exports.checkOut = async (email,checkOutTime) => {
    try {
        return await checkOut(email,checkOutTime);
    } catch (err) {
        throw(err);
    }
}

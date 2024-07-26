const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUser } = require("../models/user");
const { SECRET_KEY } = require("../data/key");

exports.createUser = async (fName,lName,email,password,role,imgURL,imgPID) => {
    try{
        const hashedPass = await bcrypt.hash(password,12);
        const resp = await createUser(fName,lName,email,hashedPass,role,imgURL,imgPID);

        if(resp === "User created"){
            const token = jwt.sign({email} ,SECRET_KEY);
            return {token};
        } else{
            return resp;
        }   
    } catch(err){
        throw err;
    };
};

exports.login = async (email,password) =>{
    try {
        const user = await findUser(email);

        if(!user){
            return "User not found";
        }
        const decrytPass = await bcrypt.compare(password, user.password);

        if(decrytPass){
            const token = jwt.sign({email} ,SECRET_KEY);
            return {token};
        }
        return "Wrong password";
        
    } catch (err) {
        throw err;
    }
}

const express = require("express");
const { getUser, updateName, updateImg, oldPassVerify, updatePass,deleteUser} = require("../controllers/profileInfo");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudinary");
const parser = multer({storage});

//get user porfile info
router.get("/", async(req,res) => {
    try{
        const resp = await getUser(req.user);
        const {fName,lName,email,img,role,attendance} = resp;

        res.json({fName,lName,email,img,role,attendance});
    } catch(err){
        res.send(err.message);
    }
})

//edit username
router.post("/edit",async(req,res) => {
    try{
        const resp = await updateName(req.body.newFName,req.body.newLName,req.body.email);
        res.status(200).send(resp); 
    }catch(err){
        res.send(err.message);
    }
});

//update the profile img
router.post("/editImg",parser.single("img"),async (req,res) => {
    try{        
        const resp = await updateImg(req.body.email,req.file.path,req.file.filename);
        res.status(200).send(resp);
    } catch(err){
        res.send(err.message);
    }
})

//verify old pass that old pass is correct
router.post("/verifyOldPass",async (req,res) => {
    try {
        // console.log(req.body.oldPass);
        const resp = await oldPassVerify(req.body.email,req.body.oldPass);
        res.status(200).send(resp);
    } catch (error) {
        res.send(err.message);
    }
})

//update the password
router.post("/upadtePassword",async (req,res) => {
    try{
        const resp = await updatePass(req.body.email,req.body.password);
        res.status(200).send(resp);
    } catch(err){
        res.send(err.message);
    }
})

router.post("/deleteAccount",async(req,res) => {
    try {
        const resp = await deleteUser(req.body.email);
        if(resp.acknowledged === true){
            res.status(200).send(true);
        } else{
            res.status(200).send(false);
        }
        
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;
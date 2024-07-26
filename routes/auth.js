const express = require("express");
const { createUser, login } = require("../controllers/auth");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudinary/");
const parser = multer({storage:storage});

router.post("/signup" ,parser.single("img") ,async(req,res) => {
    try{
        
        let resp;

        if(req.file){
            resp = await createUser(req.body.fName,req.body.lName,req.body.email,req.body.password,req.body.role,req.file.path,req.file.filename);
        } else{
            const defaultUrl = process.env.DEFAULT_IMG_URL;
            resp = await createUser(req.body.fName,req.body.lName,req.body.email,req.body.password,req.body.role,defaultUrl,"");
        }
        res.status(200).send(resp);
    } catch(err){
        res.send(err.message);
    };
});

router.post("/login", async(req,res) => {
    try{
        const resp = await login(req.body.email,req.body.password);
        res.status(200).send(resp);
    } catch(err){
        res.send(err.message);
    }
})

module.exports = router;
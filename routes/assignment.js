const express = require("express");
const { createAssignment, editAssignment, deleteAssignment, scheduledAssignment } = require("../controllers/assignments");
const router = express.Router();

router.post("/create-assignment", async(req,res) => {
    try {
        const resp = await createAssignment(req.body);        
        res.status(200).send(resp);
    } catch (err) {
        res.send(err);
    }
});


router.post("/edit-assignment", async(req,res) => {
    try {
        const resp = await editAssignment(req.body);        
        res.status(200).send(resp);
    } catch (err) {
        res.send(err);
    }
});

router.post("/delete-assignment", async(req,res) => {
    try {
        const resp = await deleteAssignment(req.body);  
        res.status(200).send(resp);
    } catch (err) {
        res.send(err);
    }
});

router.post("/scheduled-assignment", async(req,res) => {
    try {
        const resp = await scheduledAssignment(req.body);  
        res.status(200).send(resp);
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;
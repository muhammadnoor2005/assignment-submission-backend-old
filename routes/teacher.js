const express = require("express");
const { teacherSignup, updateTeacherProfile, teacherLogin, deleteTeacher, searchStudent, searchStudentInRoom, getTeacher, teacherAssignments } = require("../controllers/teachers");
const router = express.Router();

router.post("/signup", async(req, res)=>{
    try {
        const resp = await teacherSignup(req.body); 
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/login",async (req,res)=>{
    try {
        const resp = await teacherLogin(req.body); 
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/create-room", ()=>{

});

router.patch("/update-profile", async(req,res) => {
    try {
        const resp = await updateTeacherProfile(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/delete-teacher",async(req, res) => {
    try {
        const resp = await deleteTeacher(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/search-student", async(req,res) => {
    try {
        const resp = await searchStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/search-student-in-classroom", async(req,res) => {
    try {
        const resp = await searchStudentInRoom(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

//return single teacher data
router.post("/get-teacher", async(req,res) => {
    try {
        const resp = await getTeacher(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
})


//retruns all assignment uplaoded by teacher
router.post("/teacher-assignments", async(req,res) => {
    try {
        const resp = await teacherAssignments(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});



module.exports = router;
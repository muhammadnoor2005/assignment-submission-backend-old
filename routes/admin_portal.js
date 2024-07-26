const { createStudent, createTeacher, updateStudent, updateTeacher, deleteTeacher, deleteStudent, searchTeacher, searchStudent, getStudent, getTeacher } = require("../controllers/admin_portal");

const express = require("express");
const router = express.Router();

// admin creates student with name, nic,roll no and batch
router.post("/create-student",async (req,res) => {
    try {
        const resp = await createStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.patch("/update-student",async(req,res) => {
    try {
        const resp = await updateStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/delete-student",async(req,res) => {
    try {
        const resp = await deleteStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/create-teacher",async(req,res) => {
    try {
        const resp = await createTeacher(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.patch("/update-teacher",async (req, res) => {
    try {
        const resp = await updateTeacher(req.body);
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

router.patch("/delete-multiple-students",() => {

});

router.patch("/delete-multiple-teachers",() => {

});

router.post("/search-teacher", async(req,res) => {
    try {
        const resp = await searchTeacher(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
}) 

router.post("/search-student", async(req,res) => {
    try {
        const resp = await searchStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
}) 

//returns signle student data
router.post("/get-student", async(req,res) => {
    try {
        const resp = await getStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

//returns signle teacher data
router.post("/get-teacher", async(req,res) => {
    try {
        const resp = await getTeacher(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;

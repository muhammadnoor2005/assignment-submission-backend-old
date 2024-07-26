const express = require("express");
const { createRoom, joinRoom, getRoomStudents, editRoomName, deleteRoom, removeStudent } = require("../controllers/classroom");
const router = express.Router();

router.post("/create-room", async(req, res)=>{
    try {
        const resp = await createRoom(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/join-room", async(req,res)=>{
    try {
        const resp = await joinRoom(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/get-students", async(req, res)=>{
    try {
        const resp = await getRoomStudents(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});


router.post("/edit-room-name", async(req, res)=>{
    try {
        const resp = await editRoomName(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/delete-room", async(req, res)=>{
    try {
        const resp = await deleteRoom(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/remove-student", async(req, res)=>{
    try {
        const resp = await removeStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/get-assignment", () => {

});

router.post("/post-assignment", () => {

});


module.exports = router;
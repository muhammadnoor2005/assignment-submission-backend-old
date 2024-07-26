// const express = require("express");
// const { getUser, checkIn, checkOut } = require("../controllers/profileInfo");
// const { getStudents, addStudent, getAttendance } = require("../controllers/students");
// const {storage} = require("../cloudinary");
// const multer = require("multer");
// const parser = multer({storage});

// const router = express.Router();

// //sends role
// router.get("/",async(req,res) => { 
//     try {
//         const resp = await getUser(req.user);
//         const { role } = resp;

//         if (role === "Teacher"){
//             res.status(200).send("Teacher");
//         } else{
//             res.status(200).send("Student");
//         }
//     } catch (err) {
//         res.send(err.message);
//     }            
// })

// //shows teacher the list of all student
// router.get("/allStudents", async(req,res) => {
//     try {
//         const resp = await getStudents();
//         res.status(200).send(resp);
//     } catch (err) {
//         res.send(err.message);
//     };
// });

// //when a teacher adds a student
// router.post("/addStudent",parser.single("img"),async(req,res) => {
//     try {
//         console.log(req.body);
//         let resp;

//         if(req.file){
//             resp = await addStudent(req.body.fName,req.body.lName,req.body.email,req.body.password,req.file.path,req.file.filename);
//         } else{
//             const defaultUrl = process.env.DEFAULT_IMG_URL;
//             // const defImgPublicID = "my-folder/userImg_uyy5m9.jpg";
//             resp = await addStudent(req.body.fName,req.body.lName,req.body.email,req.body.password,defaultUrl,"");
//         }
//         res.status(200).send(resp);
//     } catch (err) {
//         res.send(err.message);
//     }
// });

// //student checkin
// router.post("/checkin",async(req,res) => {
//     try {
//         const resp = await checkIn(req.user,req.body.checkInTime);
//         res.status(200).send(resp);
//     } catch (err) {
//         res.send(err.message);
//     }
   

// })

// router.post("/checkout",async(req,res) => {
//     try {
//         const resp = await checkOut(req.user,req.body.checkOutTime);
//         res.status(200).send(resp);
//     } catch (err) {
//         res.send(err.message);
//     }
// });

// //sends a single student's attendance record
// router.post("/attendance", async(req,res) => {
//     try {
//         const resp = await getAttendance(req.body.email);
//         console.log(resp);
//         res.status(200).send(resp);
//     } catch (err) {
//         res.send(err.message);
//     }
// })

// module.exports = router;


const express = require("express");
const { studentSignup, updateStdProfile, studentLogin, deleteStudent, getStudent, assignmentHistory } = require("../controllers/students");
const router = express.Router();

router.get("/get-assignment",async (req ,res) => {
    try {
        
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/signup", async(req,res) => {
    try {
        const resp = await studentSignup(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/login",async (req,res) => {
    try {
        const resp = await studentLogin(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

router.patch("/update-profile",async (req, res) => {
    try {
        const resp = await updateStdProfile(req.body);
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

//retruns a signle student data
router.post("/get-student", async(req,res) => {
    try {
        const resp = await getStudent(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
})

//student leave a classroom 
router.post("/leave-room", async(req,res) => {
    try {
        const resp = await leaveRoom(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
})

//assignemnt histiry of all submitted and pending assignments
router.post("/assignment-history", async(req,res) => {
    try {
        const resp = await assignmentHistory(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});

//submit assignment
router.post("/submit-assignment", async(req,res) => {
    try {
        const resp = await submitAssignment(req.body);
        res.status(200).send(resp);
    } catch (err) {
        res.send(err.message);
    }
});



module.exports = router;

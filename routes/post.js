const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")
const { USER } = require("../models/index");
const { verifyToken } = require("../middleware/tokenVerify");


/* Middleware Function */

// router.use(async (req, res, next) => {
//     try {
//         console.log("----------------------------------", req.body);
//         const data = await USER.find({ _id: req.body.authorInformation });
//         console.log("data us =>>>>>>>>>>> ", data);
//         if (data.length != 0) {
//             return next();
//         }
//         return res.status(400).json({ messgae: "User Not Found" });

//     } catch (error) {
//         return res.status(400).json({ messgae: error.message });
//     }
// });





router.post('/add', verifyToken,postController.postRegister)
router.get('/getAll', postController.postGetAll)
router.get('/get/:_id', postController.postgetById)
router.patch('/update/:_id', postController.postUpdate)
router.delete('/delete/:_id', postController.postDelete)



module.exports = router;
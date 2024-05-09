import express from "express";
import { RegisterUser, loginUser } from "../controller/userController";
import { upload } from "../library/helpers/uploadImage";


const router = express.Router();

/* register user. */
router.post('/registerUser', upload.single("profile_picture"), RegisterUser);
router.post('/loginUser', loginUser);


export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controller/blogController");
const auth_1 = require("../middlewares/auth");
const uploadImage_1 = require("../library/helpers/uploadImage");
const router = express_1.default.Router();
router.get("/singlePost/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.singlePost);
router.get("/getUserPosts/:userId", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.getUserPosts);
router.get("/getAllPosts", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.getAllPosts);
router.post("/create_post", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.createPost);
router.put("/update_post/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.updatePost);
router.delete("/deletePost/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), blogController_1.deletePost);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ecommController_1 = require("../controller/ecommController");
const auth_1 = require("../middlewares/auth");
const uploadImage_1 = require("../library/helpers/uploadImage");
const router = express_1.default.Router();
router.get("/singleItem/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.singleItem);
router.get("/getUserItems/:userId", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.getUserItems);
router.get("/getAllItems", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.getAllItems);
router.post("/createItem", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.createItem);
router.put("/updateItem/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.updateItem);
router.delete("/deleteItem/:id", auth_1.auth, uploadImage_1.upload.array("pictures", 6), ecommController_1.deleteItem);
exports.default = router;

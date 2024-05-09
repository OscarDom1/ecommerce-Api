import express from "express";
import {
  updateItem,
  createItem,
  singleItem,
  getUserItems,
  getAllItems,
  deleteItem
} from "../controller/ecommController";
import { auth } from "../middlewares/auth";
import { upload } from "../library/helpers/uploadImage";

const router = express.Router();

/* GET home page. */
router.get("/singleItem/:id", auth, upload.array("pictures", 6), singleItem);
router.get("/getUserItems/:userId", auth, upload.array("pictures", 6), getUserItems);
router.get("/getAllItems", auth, upload.array("pictures", 6), getAllItems);
router.post("/createItem", auth, upload.array("pictures", 6), createItem);
router.put("/updateItem/:id", auth, upload.array("pictures", 6), updateItem);
router.delete("/deleteItem/:id", auth, upload.array("pictures", 6), deleteItem);

export default router;

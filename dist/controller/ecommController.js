"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.getAllItems = exports.getUserItems = exports.singleItem = exports.updateItem = exports.createItem = void 0;
const cloudinary_1 = require("cloudinary");
const utilis_1 = require("../utilis/utilis");
const ecomModel_1 = __importDefault(require("../model/ecomModel"));
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = req.user;
        const validateUser = utilis_1.createItemSchema.validate(req.body, utilis_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        let links = [];
        if (Array.isArray(req.files) && req.files.length > 0) {
            links = yield Promise.all(req.files.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield cloudinary_1.v2.uploader.upload(item.path);
                return result.secure_url;
            })));
        }
        const newItem = yield ecomModel_1.default.create(Object.assign(Object.assign({}, validateUser.value), { user: verify._id, pictures: links }));
        return res
            .status(200)
            .json({ message: "Item created successfully", newItem });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { pictures } = _a, rest = __rest(_a, ["pictures"]);
        const { id } = req.params;
        const validateUser = utilis_1.updateItemSchema.validate(req.body, utilis_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const item = yield ecomModel_1.default.findById({ _id: id });
        if (!item) {
            return res.status(400).json({
                error: "Item not found",
            });
        }
        const updateRecord = yield ecomModel_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, rest), { pictures }), {
            new: true,
            runValidators: true,
            context: "query",
        });
        if (!updateRecord) {
            return res.status(404).json({
                msg: "Item not updated",
            });
        }
        return res.status(200).json({
            message: "Item updates successfully",
            updateRecord,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateItem = updateItem;
const singleItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getsingleItem = yield ecomModel_1.default.findById(id);
        if (!getsingleItem) {
            return res.status(400).json({
                error: "Item not found",
            });
        }
        res.status(200).json({
            msg: "Item successfully fetched",
            getsingleItem
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.singleItem = singleItem;
const getUserItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const getAllUserItems = yield ecomModel_1.default.find({ user: userId });
        res.status(200).json({
            msg: "Item successfully fetched",
            getAllUserItems,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserItems = getUserItems;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield ecomModel_1.default.find().populate('user', 'email');
        res.status(200).json({
            msg: "All Items successfully fetched",
            allItems
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllItems = getAllItems;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const deletedItem = yield ecomModel_1.default.findByIdAndDelete(postId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteItem = deleteItem;

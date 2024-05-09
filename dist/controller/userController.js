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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.RegisterUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const cloudinary_1 = require("cloudinary");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utilis_1 = require("../utilis/utilis");
const jwtsecret = process.env.JWT_SECRET;
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, confirm_password, country, phoneNumber } = req.body;
        const validateUser = utilis_1.RegisterSchema.validate(req.body, utilis_1.option);
        if (validateUser.error) {
            return res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(12));
        const user = yield userModel_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let pictureUrl = "";
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            pictureUrl = result.secure_url;
        }
        if (!user) {
            const newUser = yield userModel_1.default.create({
                fullName,
                email,
                password: passwordHash,
                profile_picture: pictureUrl,
                country,
                phoneNumber,
            });
            return res.status(200).json({
                message: "Registration Successful",
                data: newUser,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.RegisterUser = RegisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const validateUser = utilis_1.LoginSchema.validate(req.body, utilis_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const user = (yield userModel_1.default.findOne({
            email: email,
        }));
        if (!userModel_1.default) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        const { _id } = user;
        const token = jsonwebtoken_1.default.sign({ _id }, jwtsecret, { expiresIn: "30d" });
        const validUser = yield bcryptjs_1.default.compare(password, user.password);
        if (validUser) {
            return res.status(200).json({
                msg: "Login Successful",
                user,
                token,
            });
        }
        return res.status(400).json({
            error: "Invalid password",
        });
    }
    catch (error) {
        console.error("Something went wrong login in");
    }
});
exports.loginUser = loginUser;

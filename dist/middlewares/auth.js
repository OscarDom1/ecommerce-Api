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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtsecret = process.env.JWT_SECRET;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const autorization = req.headers.authorization;
        if (!autorization) {
            return res.status(401).json({ message: "Kindly sign in as a user" });
        }
        const token = autorization.slice(7, autorization.length);
        let verify = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!verify) {
            return res.status(400).json({
                message: "Invalid token",
            });
        }
        const { _id } = verify;
        const user = yield userModel_1.default.findById(_id);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        req.user = verify;
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.auth = auth;

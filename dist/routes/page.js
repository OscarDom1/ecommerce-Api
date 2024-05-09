"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/Login', (req, res) => {
    res.render("Login");
});
router.get('/index', (req, res) => {
    res.render("index");
});
exports.default = router;

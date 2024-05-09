"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    country: { type: String },
    phoneNumber: { type: String },
    profile_picture: { type: String },
    ecomm: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "ecommerce"
        }
    ]
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', userSchema);
module.exports = User;

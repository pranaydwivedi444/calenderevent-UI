"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ error: "Access denied, Login Again" });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret_key");
        req.userId = data.userId;
        next();
    }
    catch (error) {
        res.json({ error: error });
        return res.status(401).json({ error: "Invalid token , Login Again" });
    }
};
exports.default = authentication;

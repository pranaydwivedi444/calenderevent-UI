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
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zodValidation_js_1 = __importDefault(require("../lib/zodValidation.js"));
const db_js_1 = __importDefault(require("../db/db.js"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, zodValidation_js_1.default)(req.body);
    if (!result.isValid) {
        return res.status(400).json(result.errors);
    }
    const { name, password, email } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield db_js_1.default.user.create({
            data: {
                name,
                password: hashedPassword,
                email: email,
            },
        });
        console.log(user);
        res.json({ message: "User registered successfully , Now Login Again" });
    }
    catch (error) {
        res.status(400).json({ error: "Phone number already registered" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_js_1.default.user.findFirst({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
        //not mentioning the problem because of security issues
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "7d" });
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
        maxAge: 60 * 60 * 1000,
    });
    res.json({ message: "Login successful" });
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("access_token");
    res.json({ message: "Logged out successfully" });
};
exports.logout = logout;

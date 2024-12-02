"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_1 = __importDefault(require("express"));
// import authRouter from "./Routes/authRoutes";
// import contactRouter from "./Routes/contactRoutes.js";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//rate limites security
app.use(exports.limiter);
//cross xss attacks
app.use((0, helmet_1.default)());
//prevent paramter pullution
app.use((0, hpp_1.default)());
//body parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Welcome to calender events api ");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../Middlewares/authMiddleware"));
const eventController_1 = require("../controllers/eventController");
const eventRouter = (0, express_1.Router)();
eventRouter.use(authMiddleware_1.default);
eventRouter.post("/event", eventController_1.createEvent);
eventRouter.get("/events", eventController_1.getUserEvents);
exports.default = eventRouter;

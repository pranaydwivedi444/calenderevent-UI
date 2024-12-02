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
exports.getUserEvents = exports.createEvent = void 0;
const db_js_1 = __importDefault(require("../db/db.js"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { title, startTime, endTime, tag } = req.body;
        if (!title || !startTime || !endTime) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (start >= end) {
            return res.status(400).json({
                message: "Start time must be before end time",
            });
        }
        const overlappingEvent = yield db_js_1.default.event.findFirst({
            where: {
                userId,
                AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
            },
        });
        if (overlappingEvent) {
            return res.status(409).json({
                message: "This time slot is already occupied by another event",
                code: "EVENT_CONFLICT",
            });
        }
        const event = yield db_js_1.default.event.create({
            data: {
                title,
                startTime: start,
                endTime: end,
                tag,
                userId,
            },
        });
        res.status(201).json(event);
    }
    catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({
            message: "Failed to create event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createEvent = createEvent;
const getUserEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { tag, startDate, endDate, page = "1", limit = "10" } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const where = { userId };
        if (tag)
            where.tag = tag;
        if (startDate)
            where.startTime = { gte: new Date(startDate) };
        if (endDate)
            where.endTime = { lte: new Date(endDate) };
        const events = yield db_js_1.default.event.findMany({
            where,
            orderBy: { startTime: "asc" },
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
        });
        res.json({
            events,
            pagination: {
                page: pageNum,
                limit: limitNum,
            },
        });
    }
    catch (error) {
        console.log("Get events error:", error);
        res.status(500).json({
            message: "Failed to retrieve events",
        });
    }
});
exports.getUserEvents = getUserEvents;

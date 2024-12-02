import { Router } from "express";
import authentication from "../Middlewares/authMiddleware";
import { createEvent, getUserEvents } from "../controllers/eventController";
const eventRouter = Router();
eventRouter.use(authentication as any);
eventRouter.post("/event",  createEvent as any);
eventRouter.get("/events", getUserEvents);
export default eventRouter;
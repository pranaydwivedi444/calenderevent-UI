// src/controllers/eventController.ts
import { Request, Response } from "express";
import prisma from "../db/db.js";


export const createEvent = async (req: Request, res: Response) => {
  try {

     const userId = (req as any).userId;
     const { title, startTime, endTime, tag } = req.body;

     if (!title || !startTime || !endTime ) {
       return res.status(400).json({ error: "All fields are required" });
     }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({
        message: "Start time must be before end time",
      });
    }

    const overlappingEvent = await prisma.event.findFirst({
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

    const event = await prisma.event.create({
      data: {
        title,
        startTime: start,
        endTime: end,
        tag,
        userId,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({
      message: "Failed to create event",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { tag, startDate, endDate, page = "1", limit = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);


    const where: any = { userId };
    if (tag) where.tag = tag as any;
    if (startDate) where.startTime = { gte: new Date(startDate as string) };
    if (endDate) where.endTime = { lte: new Date(endDate as string) };

    const events = await prisma.event.findMany({
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
  } catch (error) {
    console.log("Get events error:", error);
    res.status(500).json({
      message: "Failed to retrieve events",
    });
  }
};



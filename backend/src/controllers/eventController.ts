import { Request, Response } from "express";
import eventRepository from "../repository/eventRepository";


export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
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

    const overlappingEvent = await eventRepository.findOverlappingEvent(
      userId,
      start,
      end
    );
    if (overlappingEvent) {
      return res.status(409).json({
        message: "This time slot is already occupied!!",
      });
    }

    const event = await eventRepository.createEvent({
      title,
      startTime: start,
      endTime: end,
      userId,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({
      message: "Failed to create event",
    });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { tag, startDate, endDate, page = "1", limit = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const filters: any = { userId };
    if (tag) filters.tag = tag as string;
    if (startDate) filters.startTime = { gte: new Date(startDate as string) };
    if (endDate) filters.endTime = { lte: new Date(endDate as string) };

    const events = await eventRepository.getUserEvents( filters, {
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

import prisma from "../db/db.js";

class EventRepository {
  async createEvent(data: {
    title: string;
    startTime: Date;
    endTime: Date;
    userId: string;
  }) {
    return await prisma.event.create({
      data,
    });
  }

  async findOverlappingEvent(userId: string, start: Date, end: Date) {
    return await prisma.event.findFirst({
      where: {
        userId,
        AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
      },
    });
  }

  async getUserEvents(
    filters: any,
    pagination: { skip: number; take: number }
  ) {
    return await prisma.event.findMany({
      where: filters,
      orderBy: { startTime: "asc" },
      skip: pagination.skip,
      take: pagination.take,
    });
  }
}

export default new EventRepository();

// Utility function to check for event overlaps
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
export const checkEventOverlap = (existingEvents, newEvent) => {
  return existingEvents.some((event) => {
    const existingStart = new Date(event.startTime);
    const existingEnd = new Date(event.endTime);
    const newStart = new Date(newEvent.startTime);
    const newEnd = new Date(newEvent.endTime);

    // Check if the new event overlaps with any existing event
    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};


// Utility function to format time to AM/PM
export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const combineDateAndTime = (baseDate, timeString) => {
   const combinedDateTime = new Date(baseDate);

  if (timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    combinedDateTime.setHours(hours, minutes, 0, 0);
  }

  return combinedDateTime;
};

export const isEventInCurrentWeek = (eventDate, currentWeek) => {
  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 }); 
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 0 });

  return isWithinInterval(eventDate, {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });
};

// Utility function to check for event overlaps
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
  // Create a new date object from the selected slot's date
  const combinedDateTime = new Date(baseDate);

  // If time is provided, set the hours and minutes
  if (timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    combinedDateTime.setHours(hours, minutes, 0, 0);
  }

  return combinedDateTime;
};
import EventMarker from "./EventMarker";
import { isSameWeek } from "date-fns";
const DayCell = ({ day, hour, events, handleGridClick, currentWeek }) => {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getDay() === day &&
      eventDate.getHours() === hour &&
      isSameWeek(currentWeek, eventDate)
    );
  });

  return (
    <div
      key={`hour-${hour}-day-${day}`}
      className="border-r h-12 relative"
      onClick={() => handleGridClick(hour, day)}
    >
      {filteredEvents.map((event) => (
        <EventMarker key={event.createdAt} event={event} />
      ))}
    </div>
  );
};

export default DayCell;
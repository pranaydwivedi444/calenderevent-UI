import React from "react";
import { isEventInCurrentWeek, formatTime } from "../../utils/dateHelper";

const HourLabel = ({ hour }) => {
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const amPm = hour < 12 ? "AM" : "PM";
  return (
    <div className="w-16 flex items-start justify-center text-sm">
      {`${displayHour} ${amPm}`}
    </div>
  );
};

const DayCell = ({ day, hour, events, handleGridClick, currentWeek }) => {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getDay() === day &&
      eventDate.getHours() === hour &&
      isEventInCurrentWeek(eventDate, currentWeek)
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

const EventMarker = ({ event }) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const durationHours = (endTime - startTime) / (1000 * 60 * 60);

  return (
    <div
      className="absolute inset-x-0 bg-blue-200 text-xs p-1 overflow-hidden"
      style={{
        height: `${durationHours * 3}rem`,
        top: `${(startTime.getMinutes() / 60) * 3}rem`,
      }}
    >
      <span className="text-base">{event.title}</span>
      <br />
      <span className="text-sm">
        {formatTime(startTime)} - {formatTime(endTime)}
      </span>
      <span className="text-sm">{event.tag ?? ""}</span>
    </div>
  );
};

const GenerateHourGrid = ({ events, handleGridClick, currentWeek }) => {
  const renderHourRow = (hour) => (
    <div key={`hour-row-${hour}`} className="flex">
      <HourLabel hour={hour} />
      <div className="grid grid-cols-7 flex-grow border-t">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <DayCell
            key={`day-${day}`}
            day={day}
            hour={hour}
            events={events}
            handleGridClick={handleGridClick}
            currentWeek={currentWeek}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="border border-r-0 border-l-0">
      {Array.from({ length: 24 }, (_, hour) => renderHourRow(hour))}
    </div>
  );
};

export default GenerateHourGrid;

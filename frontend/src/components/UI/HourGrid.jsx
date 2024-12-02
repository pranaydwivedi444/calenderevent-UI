import React from 'react'
import { formatTime, isEventInCurrentWeek } from '../../utils/dateHelper';

  const GenerateHourGrid = ({events, handleGridClick , currentWeek}) => {
    const hourGrid = [];
    for (let hour = 0; hour < 24; hour++) {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const amPm = hour < 12 ? "AM" : "PM";

      hourGrid.push(
        <div key={`hour-row-${hour}`} className="flex">
          <div className="w-16 flex items-start justify-center text-sm">
            {`${displayHour} ${amPm}`}
          </div>
         <div className="grid grid-cols-7 flex-grow border-t">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
              const dayEvents = events.filter((event) => {
                const eventDate = new Date(event.startTime);
                return (
                  eventDate.getDay() === day &&
                  eventDate.getHours() === hour &&  isEventInCurrentWeek(eventDate, currentWeek)
                );
              });

              return (
                <div
                  key={`hour-${hour}-day-${day}`}
                  className="border-r h-12 relative"
                  onClick={() => handleGridClick(hour, day)}
                >
                  {dayEvents.map((event) => {
                    const startTime = new Date(event.startTime);
                    const endTime = new Date(event.endTime);
                    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
                    return (
                      <div
                        key={event.createdAt}
                        className="absolute inset-x-0 bg-blue-200 text-xs p-1 overflow-hidden"
                        style={{
                          height: `${durationHours * 3}rem`,
                          top: `${(startTime.getMinutes() / 60) * 3}rem`,
                        }}
                      >
                        <span className="text-base "> {event.title} </span>
                        <br />
                        <span className="text-sm">
                          {" "}
                          {formatTime(startTime)} - {formatTime(endTime)}
                        </span>
                        <span className="text-sm">{event.tag ?? " "} </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="border border-r-0 border-l-0">{hourGrid}</div>
    );
  };

export default GenerateHourGrid;
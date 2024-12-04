import React from "react";
import { isEventInCurrentWeek, formatTime } from "../../utils/dateHelper";
import DayCell from "./DayCell";

const HourLabel = ({ hour }) => {
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const amPm = hour < 12 ? "AM" : "PM";
  return (
    <div className="w-16 flex items-start justify-center text-sm">
      {`${displayHour} ${amPm}`}
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

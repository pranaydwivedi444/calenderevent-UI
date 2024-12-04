import { formatTime } from "../../utils/dateHelper";
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

export default EventMarker;

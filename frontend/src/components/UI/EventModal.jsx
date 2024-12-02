import React, { useState } from 'react'
import {
  format,
} from "date-fns";
import { combineDateAndTime } from '../../utils/dateHelper';


const EventModal = ({
  onClose,
  onCreateEvent,
  selectedSlot,
  setSelectedSlot,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState(`${selectedSlot.hour<10 ?`0${selectedSlot.hour}`:selectedSlot.hour}:00`);
  const [endTime, setEndTime] = useState(
    `${selectedSlot.hour < 10 ? `0${selectedSlot.hour}` : selectedSlot.hour}:30`
  );
  const [selectedDate, setSelectedDate] = useState(
    format(selectedSlot.date, "yyyy-MM-dd")
  );
  console.log(selectedSlot)
  const [description,setDescription] = useState('');
 
    function handleDateChange(event) {
        const newDate = new Date(event.target.value);
        setSelectedDate(event.target.value);
        const updatedDate = new Date(selectedSlot.date);
        updatedDate.setFullYear(newDate.getFullYear());
        updatedDate.setMonth(newDate.getMonth());
        updatedDate.setDate(newDate.getDate());
        setSelectedSlot((prevSlot) => ({
        ...prevSlot,
        date: updatedDate,
        }));
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateTime = combineDateAndTime(selectedSlot.date, startTime);
    const endDateTime = combineDateAndTime(selectedSlot.date, endTime);
    const duration = (endDateTime - startDateTime) / (1000 * 60 * 60);

    if (duration <= 0) {
      alert("End time must be after start time");
      return;
    }

    onCreateEvent({
      title: eventTitle,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      duration: duration,
      tag : description,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">
          Create Event for{" "}
          {selectedSlot && format(selectedSlot.date, "EEEE, MMMM dd")}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={description}
            placeholder='Enter Tag'
            className="w-full mb-2 p-2 border rounded"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex mb-2">
            <div className="mr-2">
              <label className="block text-sm">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal

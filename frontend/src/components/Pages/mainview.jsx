import React, { useState, useEffect } from "react";

import { checkEventOverlap, combineDateAndTime } from "../../utils/dateHelper";
import GenerateHourGrid from "../UI/HourGrid";
import EventModal from "../UI/EventModal";
import Header from "../UI/Header";
import axios from "axios";
// import { getTimezoneOffset, utcToZonedTime }  from "date-fns-tz";





//utility function to get timezone 
// function getTimeZoneInfo() {
//   const timeZone = getTimeZone();
//   const now = new Date();
//   const zonedTime = utcToZonedTime(now, timeZone);
//   const gmtOffset = format(zonedTime, "xxx"); // GMT offset as ±hh:mm
//   return `GMT ${gmtOffset} `;
// }




const WeeklyCalendar = () => {
 
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({
    date: new Date().toISOString(),
    hour: new Date().getHours(),
    day: new Date().getDay(),
  });
    const [currentWeek, setCurrentWeek] = useState(new Date());
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events", {
          withCredentials: true, 
        });
        if(response.data.events)
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        // alert("Failed to load events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  

  useEffect(() => {
    const postLatestEvent = async () => {
      if (events.length === 0) return;
      // since id can be compared due to dateobjs
      const latestEvent = events.reduce((latest, current) =>
        current.id > latest.id ? current : latest
      );

      try {
        const response = await axios.post("/api/events", latestEvent, {
          withCredentials: true, 
        });
        console.log("Latest event saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving the latest event:", error);
        // alert("Failed to save the latest event. Please try again later.");
      }
    };

    postLatestEvent();
  }, [events]);

  const handleGridClick = (hour, day) => {
    const selectedDate = new Date(currentWeek); 
    console.log(selectedDate, day);
    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + day);
    selectedDate.setHours(hour);
    
    setSelectedSlot({
      date: selectedDate,
      hour,
      day,
    });
    setShowModal(true);
  };

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
    };

    if (checkEventOverlap(events, newEvent)) {
      alert(
        "Event overlaps  choose a different time!!!"
      );
      return;
    }

    setEvents([...events, newEvent]);
    setShowModal(false);
  };

 

  return (
    <div className="container mx-auto p-4">
      <Header currentWeek={currentWeek} setCurrentWeek={setCurrentWeek}/>
      <GenerateHourGrid  handleGridClick={handleGridClick} events={events}/>
      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onCreateEvent={handleCreateEvent}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;

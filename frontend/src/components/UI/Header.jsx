import React, { useState } from "react";
import {
  format,
  addWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
function Header({currentWeek , setCurrentWeek}) {

  const changeWeek = (direction) => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, direction));
  };

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek),
    end: endOfWeek(currentWeek),
  });
//   const [search,setSearch] = useState('');
  return (
    <div className="sticky top-0 z-40 bg-white ">
      <div className="flex  items-center gap-3 bg-slate-50 mb-4 p-3">
        <div>
          <button
            onClick={() => changeWeek(-1)}
            className="px-4 py-2 rounded hover:bg-gray-300"
          >
            {"<"}
          </button>
          <button
            onClick={() => changeWeek(1)}
            className="px-4 py-2 rounded  hover:bg-gray-300"
          >
            {">"}
          </button>
        </div>
        <h2 className="text-xl font-normal ">
          {format(currentWeek, "MMMM yyyy")}
        </h2>
        {/* <input type="text" className="mb-2 p-2 border rounded" placeholder="Find your friends"  value={search} onChange={(e) => setSearch(e.target.value)}/> */}
        {/* Include a search Bar here  */}
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b-2 drop-shadow-sm pb-2">
        {weekDays.map((day) => {
          const isToday =
            format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

          return (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`text-center text-sm ${
                  isToday ? "text-blue-600" : ""
                }`}
              >
                {format(day, "EEE").toUpperCase()}
              </div>
              <div
                className={`
                                  text-center 
                                  w-10 
                                  h-10 
                                  flex 
                                  items-center 
                                  justify-center 
                                  text-3xl
                                  ${
                                    isToday
                                      ? "bg-blue-700 text-white rounded-full"
                                      : ""
                                  }
          `}
              >
                {format(day, "dd")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;

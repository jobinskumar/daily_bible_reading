import { useEffect, useState } from "react";
import { getDailyStateFromDB } from "../utils/utils";

export default function Calendar({
  handleSelection,
  isDailyStatusUpdated,
  userBibleReadingData,
}) {
  const [dailyUserBibleReadingData, setDailyUserBibleReadingData] = useState(
    {}
  );
  const [selectedDate, setSelectedDate] = useState({});
  const [currentDate] = useState(new Date());
  const [state, setState] = useState(getCalendarState(currentDate.getMonth()));
  const [days, setDays] = useState(getDays());

  useEffect(() => {
    setDays(getDays());
  }, [selectedDate, dailyUserBibleReadingData]);

  useEffect(() => {
    if (localStorage.getItem("dailyStatus")) {
      const dataString = localStorage.getItem("dailyStatus");
      setDailyUserBibleReadingData(JSON.parse(dataString) || {});
    } else {
      getDailyStateFromDB((data) => {
        setDailyUserBibleReadingData(data || {});
      });
    }
  }, [isDailyStatusUpdated]);

  useEffect(() => {
    if (userBibleReadingData) {
      setDailyUserBibleReadingData(userBibleReadingData);
    }
  }, [userBibleReadingData]);

  function getCalendarState(currentMonth) {
    const displayMonth = currentDate.toLocaleDateString("en-US", {
      month: "long",
    });

    return {
      currentMonth: currentMonth,
      displayMonth: displayMonth,
    };
  }

  function updateCalendar(currentMonth) {
    currentDate.setMonth(currentMonth, 1);
    const { displayMonth } = getCalendarState();

    setState({
      currentMonth: currentMonth,
      displayMonth: displayMonth,
    });
    setDays(getDays());
  }

  function onDaySelection(event) {
    const day = event.target.getAttribute("data-day");
    const month = (+event.target.getAttribute("data-month") + 1).toString();
    if (day && month) {
      setSelectedDate({ day, month });
      handleSelection({ day, month });
    }
  }

  function getDays() {
    const days = [];
    const startDayInWeek = getStartDate(currentDate).getDay();
    const endDay = getEndDate(currentDate).getDate();
    const rows = Math.ceil((startDayInWeek + endDay) / 7);
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    let day = 1;
    for (let i = 0; i < rows * 7; i++) {
      const displayDay = i >= startDayInWeek && day <= endDay ? day++ : "";
      const isBibleRead =
        dailyUserBibleReadingData[
          currentDate.getFullYear() +
            "-" +
            (currentDate.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            displayDay.toString().padStart(2, "0")
        ]?.bibleReading;
      days.push(
        <div
          role="button"
          key={i}
          className={`day border rounded ${
            currentDay === displayDay && currentMonth === currentDate.getMonth()
              ? "current highlighted border-stone-500"
              : "muted"
          } ${
            +selectedDate.day === displayDay &&
            selectedDate.month - 1 === currentDate.getMonth()
              ? "selected bg-stone-500 border-stone-300"
              : "day-bg border-gray-300"
          }`}
          data-day={displayDay}
          data-month={currentDate.getMonth()}
          onClick={onDaySelection}
        >
          {displayDay}
          {isBibleRead && <span className="marker"></span>}
        </div>
      );
    }

    return days;
  }

  function getStartDate(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  function getEndDate(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  function showPrevMonth() {
    if (currentDate.getMonth() === 0) {
      return;
    }

    updateCalendar(currentDate.getMonth() - 1);
  }

  function showNextMonth() {
    if (currentDate.getMonth() === 11) {
      return;
    }

    updateCalendar(currentDate.getMonth() + 1);
  }

  function getWeekDays() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const displayDays = [];
    days.forEach((day) => {
      displayDays.push(
        <div key={day} className="day weekday">
          {day}
        </div>
      );
    });

    return displayDays;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header flex items-center justify-center m-4">
        <p className="month-title flex-grow text-lg font-medium">
          {state.displayMonth} {currentDate.getFullYear()}
        </p>
        <button
          type="button"
          className="btn-prev w-6 h-6"
          disabled={currentDate.getMonth() === 0}
          onClick={showPrevMonth}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          className="btn-next w-6 h-6 disabled:opacity-20"
          disabled={currentDate.getMonth() === 11}
          onClick={showNextMonth}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 font-bold">
           <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="calendar">
        {getWeekDays()}
        {days}
      </div>
    </div>
  );
}

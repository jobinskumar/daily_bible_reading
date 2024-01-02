import { useState } from "react";

export default function Calendar({currentDate}) {
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const [state, setState] = useState(getCalendarState(currentDate.getMonth()));

  function getCalendarState(currentMonth) {
    const displayMonth = currentDate.toLocaleDateString('en-US', {month: 'long'});
    const startDayInWeek = getStartDate(currentDate).getDay();
    const endDay = getEndDate(currentDate).getDate();
    const days = getDays(startDayInWeek, endDay);

    return {
      currentMonth: currentMonth,
      displayMonth: displayMonth,
      days: days
    };
  }

  function updateCalendar(currentMonth) {
    currentDate.setMonth(currentMonth);
    const { displayMonth, days } = getCalendarState();

    setState({
      currentMonth: currentMonth,
      displayMonth: displayMonth,
      days: days
    });
  }

  function getDays(startDayInWeek, endDay) {
    const days = [];
    const rows = Math.ceil((startDayInWeek + endDay) / 7);
    let day = 1;
    for (let i = 0; i < rows * 7; i++) {
      const displayDay = i >= startDayInWeek && day <= endDay
        ? day++
        : "";
      days.push(<div key={i} className={`day bg-light bg-opacity-50 ${ currentDay === displayDay ? "fw-bold ": ""}`}>{displayDay}</div>)      
    }

    return days;
  }

  function getStartDate(currentDate) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
  }

  function getEndDate(currentDate) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
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
      displayDays.push(<div key={day} className="day bg-light bg-opacity-50 fw-bold">{day}</div>)
    })

    return displayDays;
  }

  return (
    <>
      <div className="d-flex mb-2">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm h-100"
          onClick={showPrevMonth}
        >
          Prev
        </button>
        <p className="align-self-center flex-grow-1 m-0 text-center fw-bold">{state.displayMonth} 2023</p>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm h-100"
          onClick={showNextMonth}
        >
          Next
        </button>
      </div>
      <div className="calendar">
        {getWeekDays()}
        {state.days}
      </div>
    </>
  );
}

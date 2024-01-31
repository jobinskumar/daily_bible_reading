import { useEffect, useState } from "react";

export default function Calendar({handleSelection, isDailyStatusUpdated}) {
  const [selectedDate, setSelectedDate] = useState({});
  const [currentDate] = useState(new Date());
  const [state, setState] = useState(getCalendarState(currentDate.getMonth()));
  const [days, setDays] = useState(getDays());

  useEffect(() => {
    setDays(getDays());
  }, [selectedDate, isDailyStatusUpdated])

  function getCalendarState(currentMonth) {
    const displayMonth = currentDate.toLocaleDateString('en-US', {month: 'long'});

    return {
      currentMonth: currentMonth,
      displayMonth: displayMonth
    };
  }

  function updateCalendar(currentMonth) {
    currentDate.setMonth(currentMonth, 1);
    const { displayMonth } = getCalendarState();

    setState({
      currentMonth: currentMonth,
      displayMonth: displayMonth
    });
    setDays(getDays());
  }

  function onDaySelection(event) {
    const day = event.target.getAttribute("data-day");
    const month = (+event.target.getAttribute("data-month") + 1).toString();
    if (day && month) {
      setSelectedDate({day, month});
      handleSelection({day, month});
    }
  }

  function getDays() {
    const days = [];
    const startDayInWeek = getStartDate(currentDate).getDay();
    const endDay = getEndDate(currentDate).getDate();
    const rows = Math.ceil((startDayInWeek + endDay) / 7);
    const currentDay = (new Date()).getDate();
    const currentMonth = (new Date()).getMonth();
    let day = 1;
    const dailyStatus = JSON.parse(localStorage.getItem('dailyStatus') || '{}');
    for (let i = 0; i < rows * 7; i++) {
      const displayDay = i >= startDayInWeek && day <= endDay
        ? day++
        : "";
      const isBibleRead = dailyStatus[
        currentDate.getFullYear() + '-' +
        (currentDate.getMonth() + 1).toString().padStart(2,'0') + '-' +
        displayDay.toString().padStart(2,'0')
      ]?.bibleReading;
      days.push(
        <div
          key={i}
          className={`day ${
            currentDay === displayDay && currentMonth === currentDate.getMonth()
              ? "current text-decoration-underline bg-white"
              : "bg-opacity-50"
          } ${
            +selectedDate.day === displayDay &&
            selectedDate.month - 1 === currentDate.getMonth()
              ? "selected"
              : "bg-white"
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
      displayDays.push(<div key={day} className="day bg-white fw-bold">{day}</div>)
    })

    return displayDays;
  }

  return (
    <div className="container mt-3 px-3">
      <div className="d-flex mb-2">
        <p className="align-self-center flex-grow-1 m-0 fw-bold">
          {state.displayMonth} {currentDate.getFullYear()}
        </p>
        <button
            type="button"
            className="btn btn-outline-primary h-100 border-0 me-1"
            disabled={currentDate.getMonth() === 0}
            onClick={showPrevMonth}
          >
            <i className="bi-arrow-left"></i>
        </button>
        <button
            type="button"
            className="btn btn-outline-primary h-100 border-0"
            disabled={currentDate.getMonth() === 11}
            onClick={showNextMonth}
          >
            <i className="bi-arrow-right"></i>
          </button>
      </div>
      <div className="calendar">
        {getWeekDays()}
        {days}
      </div>
    </div>
  );
}

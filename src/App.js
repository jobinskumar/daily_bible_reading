import { useState } from "react";
import Header from "./Header";
import ShowDailyVerses from "./ShowDailyVerses";
import Calendar from "./calendar/Calendar";

export default function App() {
  const [day, setDay] = useState(getDayOfTheYear((new Date()).toISOString()));

  function getDayOfTheYear(currentDate) {
    var now = new Date(currentDate);
    //var now = currentDate;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  }

  function handleSelection({day, month}) {
    if (day && month) {
      const dateString = '2023-' + month.padStart(2,'0') + '-' + day.padStart(2,'0') + 'T00:00:00.000Z';
      setDay(getDayOfTheYear(dateString));
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <ShowDailyVerses day={day} />
        <Calendar handleSelection={handleSelection} />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { formatDateString, getDayInWords } from "../utils/utils";
import { DailVerseData } from "./DailyVerseData";

export default function ShowDailyVerses({
  dateString,
  dailyStatusData,
  onDailyStatusUpdate,
}) {
  const dailyStatusKey = dateString.split("T")[0];
  const [dailyStatus, setDailyStatus] = useState(false);
  const day = getDayOfTheYear(dateString);
  const dailyReading =
    DailVerseData.find((value) => +value.day === day)?.readingVerses ?? "";

  useEffect(() => {
    setDailyStatus(dailyStatusData);
  }, [dailyStatusData]);

  function getDayOfTheYear(date) {
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  }

  function markAsRead() {
    const newState = {
      bibleReading: true,
    };
    setDailyStatus(newState);
    onDailyStatusUpdate(dailyStatusKey, newState);
  }

  function markAsUnread() {
    const newState = {
      bibleReading: false,
    };
    setDailyStatus(newState);
    onDailyStatusUpdate(dailyStatusKey, newState);
  }

  return (
    <div className="border-bottom px-2 pt-3 border-info show-daily-verse">
      <div className="d-flex">
        <h2 className="h3 ms-2 my-2">Day {day}</h2>
        {dailyStatus?.bibleReading && (
          <span className="badge text-bg-success m-auto ms-2">Read</span>
        )}
        <div className="ms-auto">
          <p className="mb-0 me-3 date">{formatDateString(dateString)}</p>
          <p className="m-0 me-3 text-end day">{getDayInWords(dateString)}</p>
        </div>
      </div>
      <ul className="fs-4">
        {dailyReading.map((chapter) => (
          <li> {chapter} </li>
        ))}
      </ul>
      <div className="d-grid gap-2 col-6 mx-auto mb-2">
        {dailyStatus?.bibleReading ? (
          <button
            className="btn btn-secondary mb-3 reset-btn"
            onClick={markAsUnread}
          >
            Reset
          </button>
        ) : (
          <button className="btn btn-primary mb-3" onClick={markAsRead}>
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

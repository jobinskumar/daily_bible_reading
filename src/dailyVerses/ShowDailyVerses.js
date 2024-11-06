import { useEffect, useState } from "react";
import { formatDateString } from "../utils/utils";
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
    <div className="border-bottom px-2 border-info show-daily-verse">
      <h1 className="h3 pb-4 text-center">Daily Bible Reading</h1>
      <blockquote className="blockquote mx-2">
        <p>
          Day - {day} ({formatDateString(dateString)})
          {dailyStatus?.bibleReading && (
            <span className="badge text-bg-success ms-2">Read</span>
          )}
        </p>
        <p className="min-h-50">{dailyReading}</p>
      </blockquote>
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

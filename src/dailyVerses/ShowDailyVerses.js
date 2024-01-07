import { useEffect, useState } from "react";
import { getDailyStateFromLocalStorage, setDailyStateInLocalStorage } from "../utils/utils";
import { DailVerseData } from "./DailyVerseData";

export default function ShowDailyVerses({ dateString, onDailyStatusUpdate }) {
  const dailyStatusKey = dateString.split('T')[0];
  const [dailyStatus, setDailyStatus] = useState(false);
  const day = getDayOfTheYear(dateString);
  const dailyReading = DailVerseData.find(value => +value.day === day)?.readingVerses ?? "";

  useEffect(() => {
    setDailyStatus(getDailyStateFromLocalStorage(dailyStatusKey));
  }, [dailyStatusKey])

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
      bibleReading: true
    };
    setDailyStateInLocalStorage(dailyStatusKey, newState);
    setDailyStatus(newState);
    onDailyStatusUpdate(newState);
  }

  function markAsUnread() {
    const newState = {
      bibleReading: false
    };
    setDailyStateInLocalStorage(dailyStatusKey, newState);
    setDailyStatus(newState);
    onDailyStatusUpdate(newState);
  }

  return (
    <div className="border-bottom border-info container show-daily-verse">
      <h1 className="h3 py-3 text-center">Daily Bible Reading</h1>
      <blockquote className="blockquote mx-2">
        <p className="mb-1">Day - {day}</p>
        <p className="min-h-50">{dailyReading}</p>
      </blockquote>
      <div className="d-grid gap-2 col-6 mx-auto">
        {
          dailyStatus?.bibleReading
          ? <button className="btn btn-secondary mb-3" onClick={markAsUnread}>Mark as unread</button>
          : <button className="btn btn-primary mb-3" onClick={markAsRead}>Mark as read</button>
        }
      </div>
    </div>
  );
}

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
      ...dailyStatus,
      bibleReading: true,
    };
    setDailyStatus(newState);
    onDailyStatusUpdate(dailyStatusKey, newState);
  }

  function markAsUnread() {
    const newState = {
      ...dailyStatus,
      bibleReading: false,
    };
    setDailyStatus(newState);
    onDailyStatusUpdate(dailyStatusKey, newState);
  }

  return (
    <div className="show-daily-verse verse-row bg-white p-5 rounded-3xl shadow-md bg-white/40 backdrop-blur-sm">
      <div className="verse-row-top">
        <div className="flex justify-between items-center">
          <h2 className="verse-day text-2xl font-semibold mb-2">
            Today's reading
          </h2>
          <h3 className="verse-title text-white text-sm font-semibold bg-stone-500 px-3 py-1 rounded-3xl shadow-md shadow-stone-500/30">Day {day}</h3>
        </div>
        <div className="verse-meta flex items-center gap-2 mb-2">
          <p className="day uppercase text-base font-medium">{getDayInWords(dateString)},</p>
          <p className="date uppercase text-base font-medium">{formatDateString(dateString)}</p>
          {dailyStatus?.bibleReading && <span className="badge-read text-xs bg-emerald-500 px-2 rounded-xl">Read</span>}
        </div>
      </div>
      <ul className="verse-list list-disc mx-6 my-4">
        {dailyReading.map((chapter, index) => (
          <li className="text-xl" key={index}> {chapter} </li>
        ))}
      </ul>
      <div className="verse-actions">
        {dailyStatus?.bibleReading ? (
          <button className="btn-reset font-semibold px-2 underline" onClick={markAsUnread}>
            Reset
          </button>
        ) : (
          <button className="btn-mark-read underline" onClick={markAsRead}>
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

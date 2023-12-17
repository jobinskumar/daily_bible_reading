import { DailVerseData } from "./DailyVerseData";

export default function ShowDailyVerses({ day }) {
  const dailyReading = DailVerseData.find(value => +value.day === day)?.readingVerses ?? "";

  return (
    <blockquote className="blockquote mt-4">
      <p className="lead mb-1">Day - {day}</p>
      <p>{dailyReading}</p>
    </blockquote>
  );
}

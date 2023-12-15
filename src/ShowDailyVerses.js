import { DailVerseData } from "./DailyVerseData";

export default function ShowDailyVerses({ day }) {
  const dailyReading = DailVerseData.find(value => +value.day === day)?.readingVerses ?? "";

  return (
    <blockquote className="blockquote m-4">
      <p>{dailyReading}</p>
    </blockquote>
  );
}

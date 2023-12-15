import ShowDailyVerses from "./ShowDailyVerses";

export default function App() {

  function getDayOfTheYear(currentDate) {
    //var now = new Date(currentDate + 'T00:00:00.000Z');
    var now = currentDate;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  }

  const day = getDayOfTheYear(new Date());

  return (
    <>
      <h1 className="mt-4">Bible Daily Reading</h1>
      <ShowDailyVerses day={day} />
    </>
  );
}

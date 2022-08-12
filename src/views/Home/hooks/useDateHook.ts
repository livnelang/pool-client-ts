import { useState } from "react";

const useDateHook = () => {
  const [date, setDate] = useState<Date>(new Date());
  const daysMap: Record<number, string> = {
    0: "ראשון",
    1: "שני",
    2: "שלישי",
    3: "רביעי",
    4: "חמישי",
    5: "שישי",
    6: "שבת",
  };

  const monthsMap: Record<number, string> = {
    0: "ינואר",
    1: "פברואר",
    2: "מרץ",
    3: "אפריל",
    4: "מאי",
    5: "יוני",
    6: "יולי",
    7: "אוגוסט",
    8: "ספטמבר",
    9: "אוקטובר",
    10: "נובמבר",
    11: "דצמבר",
  };

  const formattedTime = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).format(date);
  const hebrewDay = daysMap[date.getDay()];
  const hebrewMonth = monthsMap[date.getMonth()];
  const dayText = ` יום ${hebrewDay}`;
  const concatedFormattedDate = `${hebrewMonth} ${date.getDate()}, ${date.getFullYear()}`;

  const updateClock = () => {
    setDate(new Date());
  };

  setInterval(updateClock, 1000);
  return { date, formattedTime, dayText, concatedFormattedDate };
};

export default useDateHook;

import { AppSelectOption } from "../../../components/forms/AppSelect/AppSelect";

export interface MonthRange {
  startDate: Date;
  endDate: Date;
}

export interface Month {
  name: string;
  range: MonthRange;
}

export const months: Month[] = [
  { name: "מאי", range: setMonthTime(4) },
  { name: "יוני", range: setMonthTime(5) },
  { name: "יולי", range: setMonthTime(6) },
  { name: "אוגוסט", range: setMonthTime(7) },
  { name: "ספטמבר", range: setMonthTime(8) },
  { name: "אוקטובר", range: setMonthTime(9) },
];

export function setMonthTime(monthNumber: number): MonthRange {
  const st = new Date();
  st.setHours(0, 0, 0, 0);
  st.setMonth(monthNumber, 1);

  return {
    startDate: new Date(st),
    endDate: new Date(st.getFullYear(), st.getMonth() + 1, 1),
  };
}

export function getCurrentMonthRange(): MonthRange {
  const currentDate = new Date();
  for (let i = 0; i < months.length; i++) {
    if (currentDate.getMonth() === months[i].range.startDate.getMonth()) {
      return months[i].range;
    }
  }

  throw Error("Cannot find relevant month to initiate");
}

export function getCurrentMonthSelectOption(): AppSelectOption<Month> {
  const currentDate = new Date();
  for (let i = 0; i < months.length; i++) {
    if (currentDate.getMonth() === months[i].range.startDate.getMonth()) {
      return {
        label: months[i].name,
        value: months[i],
      };
    }
  }

  throw Error("Cannot find relevant month to initiate");
}

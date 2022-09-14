import { useEffect, useState } from "react";

interface Props {
  monthName: string;
}
const useTitle = ({ monthName }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [formatterDate, setformatterDate] = useState<string>("");

  useEffect(() => {
    const monthFormattedDate = `${monthName} ${new Date().getFullYear()}`;
    setformatterDate(monthFormattedDate);
    setTitle(`כל הלקוחות - ${monthFormattedDate}`);
  }, [monthName]);
  return { dialogTitle: title, formatterDate };
};

export default useTitle;

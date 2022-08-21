import { useEffect, useState } from "react";

interface Props {
  monthName: string;
}
const useTitle = ({ monthName }: Props) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const formattedDate = `${monthName} ${new Date().getFullYear()}`;
    setTitle(`כל הלקוחות - ${formattedDate}`);
  }, [monthName]);
  return { dialogTitle: title };
};

export default useTitle;

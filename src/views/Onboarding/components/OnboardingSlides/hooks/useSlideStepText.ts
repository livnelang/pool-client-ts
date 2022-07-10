import { useState } from "react";

export type StepText = "התחל" | "הבא" | "המשך";
const MAX_STEPS = 4;

interface SlideText {
  mainText: string;
  secondaryText: string;
}

export interface SlideMetaData {
  counter: number;
  image: string;
  texts: SlideText;
}

import image1 from "../images/cuate_01.svg";
import image2 from "../images/cuate_02.svg";
import image3 from "../images/cuate_03.svg";
import image4 from "../images/cuate_04.svg";

const slideRecords: Record<number, SlideMetaData> = {
  1: {
    image: image1,
    texts: {
      mainText: "ברוך הבא לקיוסק של עוזן",
      secondaryText: "ניהול כולל של כל הלקוחות",
    },
    counter: 1,
  },
  2: {
    image: image2,
    texts: {
      mainText: "אפשרות להזמין ממבחר ההצעות",
      secondaryText: "בירה, קולה, קרטיב ועוד הפתעות!",
    },
    counter: 2,
  },
  3: {
    image: image3,
    texts: {
      mainText: "צפייה בנתונים",
      secondaryText: "צפיה לפי לקוח, סיכום כולל לפי חודש, שליחה במייל",
    },
    counter: 3,
  },
  4: {
    image: image4,
    texts: {
      mainText: "בואו נצא לדרך!",
      secondaryText: "",
    },
    counter: 4,
  },
};

const useSlideStepText = (stepCounter: number) => {
  const [stepText, setStepText] = useState<StepText>("התחל");

  const handleStepChange = () => {
    setStepText(stepCounter === MAX_STEPS - 1 ? "המשך" : "הבא");
  };

  return { stepText, handleStepChange, slideRecords };
};

export default useSlideStepText;

import { useState } from "react";
import useSlideStepText from "./hooks/useSlideStepText";
import SlideIndicator from "./SlideIndicator/SlideIndicator";
import "./OnboardingSlides.css";
import SlideInfo from "./SlideInfo/SlideInfo";
import AppButton from "../../../../components/AppButton/AppButton";
import MotionPage from "../../../../components/MotionPage/MotionPage";
import { useNavigate } from "react-router-dom";

interface OnboardingSlidesProps {
  onLastSlidingClick: () => void;
}

const OnboardingSlides = (props: OnboardingSlidesProps) => {
  const MAX_STEPS = 4;
  const [stepCounter, setStepCounter] = useState<number>(1);
  const { stepText, handleStepChange, slideRecords } =
    useSlideStepText(stepCounter);

  const handleStepButton = () => {
    if (stepCounter === MAX_STEPS) {
      props.onLastSlidingClick();
    } else {
      handleStepChange();
      setStepCounter(stepCounter + 1);
    }
  };

  return (
    <div className="OnboardingSlides">
      <SlideInfo slide={slideRecords[stepCounter]} />
      <SlideIndicator counter={stepCounter} numOfSteps={MAX_STEPS} />
      <AppButton text={stepText} onClick={handleStepButton} />
    </div>
  );
};

export default MotionPage(OnboardingSlides);

import "./SlideIndicator.css";

interface ChildBarProps {
  isActive: boolean;
}

const ChildBar = (props: ChildBarProps) => {
  return (
    <div className={`bar ${props.isActive ? "activeBar" : ""}`}>
      {props.isActive}
    </div>
  );
};

interface SlideIndicatorProps {
  counter: number;
  numOfSteps: number;
}

const SlideIndicator = (props: SlideIndicatorProps) => {
  const arr = new Array(props.numOfSteps);

  const childBars: JSX.Element[] = [];
  for (let i = 1; i <= props.numOfSteps; i++) {
    childBars.push(<ChildBar key={i} isActive={props.counter === i} />);
  }
  return <div className="SlideIndicator">{childBars}</div>;
};

export default SlideIndicator;

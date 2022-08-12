import "./Home.scss";
import AnimatedHomeThing from "./components/AnimatedHomeThing/AnimatedHomeThing";
import useDateHook from "./hooks/useDateHook";

const Home = () => {
  const { concatedFormattedDate, dayText, formattedTime } = useDateHook();
  return (
    <div className="Home">
      <div className="dayDaetails">
        <div className="dayText">{dayText}</div>
        <div className="dateAndTime">
          <div className="date">{concatedFormattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </div>

      <div className="content">
        <AnimatedHomeThing />
      </div>
    </div>
  );
};

export default Home;

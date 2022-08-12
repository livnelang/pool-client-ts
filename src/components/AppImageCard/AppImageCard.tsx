import { LazyLoadImage } from "react-lazy-load-image-component";
import "./AppImageCard.scss";

type CardContentType = "BULLETS" | "TEXT";

interface BaseProps {
  header?: string;
  imageUrl: string;
  variant: CardContentType;
}

interface TextProps extends BaseProps {
  variant: "TEXT";
  content: string;
}

interface BulletsProps extends BaseProps {
  variant: "BULLETS";
  bullets: string[];
}

type PropsType = TextProps | BulletsProps;

const AppImageCard = (props: PropsType): JSX.Element => {
  const renderContent = () => {
    switch (props.variant) {
      case "TEXT": {
        return <div className="text">{props.content}</div>;
      }
      case "BULLETS": {
        return (
          <div className="bullets">
            {props.bullets.map((b, idx) => {
              return <span key={idx}>{b}</span>;
            })}
          </div>
        );
      }
    }
  };
  return (
    <div className="AppImageCard">
      <div className="upperImageContainer">
        <LazyLoadImage
          key={`profile-bar-img`}
          src={props.imageUrl}
          height={250}
        />
      </div>
      <div className="content">
        {props.header ? <div className="header">{props.header}</div> : null}
        {renderContent()}
      </div>
    </div>
  );
};

export default AppImageCard;

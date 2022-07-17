import "./ProfileBar.scss";
import ProfileBarImg from "../../assets/images/profile_bar.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ProfileBarProps {
  userName: string;
}

const ProfileBar = (props: ProfileBarProps) => {
  return (
    <div className="ProfileBar">
      <div className="profileDetails">
        <div className="avatarBox">
        <LazyLoadImage
          key={`profile-bar-img`}
          src={ProfileBarImg}
          width={28}
          height={28}
        />
        </div>
        <div className="texts">
          <div className="welcome">ברוך הבא 👋</div>
          <div className="userName">{props.userName}</div>
        </div>
      </div>
      <div className="logoutText">התנתק</div>
    </div>
  );
};

export default ProfileBar;

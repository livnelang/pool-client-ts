import "./ProfileBar.scss";
import ProfileBarImg from "../../assets/images/profile_bar.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import {
  removeLoggedUser,
  setSlidingIndicator,
} from "../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";

interface ProfileBarProps {
  userName: string;
}

const ProfileBar = (props: ProfileBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    dispatch(removeLoggedUser());
    dispatch(setSlidingIndicator());
    navigate("/");
  };

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
      <div className="logoutText" onClick={() => handleClickLogOut()}>
        התנתק
      </div>
    </div>
  );
};

export default ProfileBar;

import "./Onboarding.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rtkStore";
import APIService from "../../helpers/api/API";
import LoginPage from "./components/LoginPage/LoginPage";
import OnboardingSlides from "./components/OnboardingSlides/OnboardingSlides";
import { LoginResponse } from "../../interfaces/Authentication";
import {
  setLoginResponse,
  setSlidingIndicator,
} from "../../store/slices/authenticationSlice";

interface OnboardingProps {
  api: APIService;
}

const Onboarding = (props: OnboardingProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedUser, seenOnboardingSlides } = useSelector(
    (state: RootState) => state.auth
  );
  const handleSuccessfullLogin = (loginResponse: LoginResponse) => {
    dispatch(setLoginResponse({ loginResponse: loginResponse }));
  };

  const handleFinishedOnboardingSlides = () => {
    if (loggedUser === null) {
      throw Error("Cannot dispatch finish slides without login first");
    }
    dispatch(setSlidingIndicator());
    navigate("/main");
  };

  if (loggedUser !== null && seenOnboardingSlides) {
    return <Navigate replace to={{ pathname: "/main" }} />;
  }

  return (
    <div className={`Onboarding ${loggedUser ? "centered" : ""}`}>
      {loggedUser !== null && !seenOnboardingSlides ? (
        <OnboardingSlides onLastSlidingClick={handleFinishedOnboardingSlides} />
      ) : (
        <LoginPage
          api={props.api}
          onSuccessFullLogin={handleSuccessfullLogin}
        />
      )}
    </div>
  );
};

export default Onboarding;

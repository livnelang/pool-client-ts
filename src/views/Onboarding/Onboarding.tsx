import "./Onboarding.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rtkStore";
import APIService from "../../helpers/API";
import LoginPage from "./components/LoginPage/LoginPage";
import OnboardingSlides from "./components/OnboardingSlides/OnboardingSlides";
import { LoginResponse } from "../../interfaces/Authentication";
import { useEffect, useState } from "react";
import { setLoginResponse } from "../../store/slices/authenticationSlice";

interface OnboardingProps {
  api: APIService;
}

const Onboarding = (props: OnboardingProps) => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const [loginResponse, setloginResponse] = useState<LoginResponse | null>(
    null
  );
  const isLoggedUser = useSelector(
    (state: RootState) => state.auth.loggedUser !== null
  );
  const handleSuccessfullLogin = (loginResponse: LoginResponse) => {
    setloginResponse(loginResponse);
    // disptach(setLoginResponse({ loginResponse: loginResponse }));
  };

  const handleFinishedOnboardingSlides = () => {
    if (loginResponse === null) {
      throw Error("Cannot dispatch login response which is null");
    }
    disptach(setLoginResponse({ loginResponse: loginResponse }));
    navigate("/main");
  };

  if (isLoggedUser) {
    return <Navigate replace to={{ pathname: "/main" }} />;
  }

  return (
    <div className={`Onboarding ${loginResponse ? "centered" : ""}`}>
      {loginResponse ? (
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

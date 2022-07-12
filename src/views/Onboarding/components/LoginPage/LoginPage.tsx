import "./LoginPage.scss";
import OnboardingImg from "../../../../assets/images/onboarding_top_image.svg";
import { useDispatch } from "react-redux";
import APIService from "../../../../helpers/api/API";
import { useRef, useState } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import InputField from "../../../../components/forms/InputField/InputField";
import MotionPage from "../../../../components/MotionPage/MotionPage";
import { setLoginResponse } from "../../../../store/slices/authenticationSlice";
import useLoginPageHook from "./hooks/useLoginPageHook";
import { CgSpinner } from "react-icons/cg";
import { LoginResponse } from "../../../../interfaces/Authentication";

export interface FormFields {
  email: string;
  password: string;
}

export interface LoginForm {
  fields: FormFields;
  errors: { [key in keyof FormFields]: boolean };
}

export interface LoginPageProps {
  api: APIService;
  onSuccessFullLogin: (loginResponse: LoginResponse) => void;
}

const LoginPage = (props: LoginPageProps) => {
  const { loginDetails, handleLoginFormFieldChange, validateLoginForm } =
    useLoginPageHook();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { login } = props.api;
  const mailInputRef = useRef<any>(null);

  const handleClickSubmitForm = () => {
    if (loginDetails === null) {
      throw Error("Cannot post to login with empty details");
    }
    const isFormValid = validateLoginForm();
    if (!isFormValid) {
      if (mailInputRef.current === null) return;
      mailInputRef.current.handleSomeStuff();
      return;
    }

    setisLoading(true);
    login(loginDetails.fields)
      .then((res) => {
        console.log(res);
        props.onSuccessFullLogin(res)
        // disptach(setLoginResponse({ loginResponse: res }));
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  return (
    <div className="LoginPage">
      <div className="ImgContainer">
        <img src={OnboardingImg} alt="" />
      </div>
      <div className="description">
        <h2 className="topText">הבריכה של עוזן</h2>
        <p className="secondaryText">
          המקום בו הכל קורה, החבר’ה יושבים ועוד ..
        </p>
      </div>

      <div className="formContainer">
        <form className="loginForm" onSubmit={handleClickSubmitForm}>
          <InputField
            ref={mailInputRef}
            label="מייל"
            type="email"
            onChange={(e) =>
              handleLoginFormFieldChange("email", e.target.value)
            }
            error={loginDetails.errors.email}
          />
          <InputField
            label="סיסמא"
            type="password"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={(e) =>
              handleLoginFormFieldChange("password", e.target.value)
            }
            error={loginDetails.errors.password}
          />
        </form>
        <AppButton
          disabled={isLoading}
          text="התחבר"
          onClick={() => {
            handleClickSubmitForm();
          }}
        >
          {isLoading ? <CgSpinner className="spinner" /> : null}
        </AppButton>
      </div>
    </div>
  );
};

export default MotionPage(LoginPage);

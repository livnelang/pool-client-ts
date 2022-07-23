import { useState } from "react";
import { LoginFormFields, LoginForm } from "../LoginPage";

const initialLoginForm: LoginForm = {
  fields: {
    email: "",
    password: "",
  },
  errors: { email: false, password: false },
};

const useLoginPageHook = () => {
  const [loginDetails, setloginDetails] = useState<LoginForm>(initialLoginForm);

  const validateLoginForm = (): boolean => {
    for (const [fieldKey, fieldValue] of Object.entries(loginDetails.fields)) {
      if (fieldValue === "") {
        setloginDetails({
          ...loginDetails,
          errors: {
            ...loginDetails.errors,
            [fieldKey]: true,
          },
        });
        return false;
      }
      // switch (fieldKey as keyof LoginFormFields) {
      //   case "email": {
      //     if (fieldValue) {
      //     }

      //     break;
      //   }

      //   case "password": {
      //     break;
      //   }
      // }
    }
    return true;
  };

  const handleLoginFormFieldChange = <P extends keyof LoginFormFields>(
    key: P,
    value: LoginFormFields[P]
  ) => {
    setloginDetails({
      errors: loginDetails.errors,
      fields: {
        ...loginDetails.fields,
        [key]: value,
      },
    });
  };

  return { loginDetails, handleLoginFormFieldChange, validateLoginForm };
};

export default useLoginPageHook;

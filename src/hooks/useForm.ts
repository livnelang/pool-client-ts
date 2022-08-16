import { useState } from "react";

const useForm = <T>(formInitialState: T) => {
  const [formState, setFormState] = useState<T>(formInitialState);
  const handleFormStateFieldChange = <P extends keyof T>(
    key: P,
    newValue: T[P]
  ) => {
    setFormState({
      ...formState,
      [key]: newValue,
    });
  };

  return { formState, setFormState, handleFormStateFieldChange };
};

export default useForm;

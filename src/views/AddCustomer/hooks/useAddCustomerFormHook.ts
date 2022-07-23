import { useState } from "react";
import { AddCustomerForm, AddCustomerFormFields } from "../AddCustomer";

const initialAddCustomerForm: AddCustomerForm = {
  fields: {
    firstName: "",
    lastName: ""
  },
  errors: { firstName: false, lastName: false },
};

const useAddCustomerFormHook = () => {
  const [addCustomerForm, setAddCustomerForm] = useState<AddCustomerForm>(initialAddCustomerForm);

  const validateForm = (): boolean => {
    for (const [fieldKey, fieldValue] of Object.entries(addCustomerForm.fields)) {
      if (fieldValue === "") {
        setAddCustomerForm({
          ...addCustomerForm,
          errors: {
            ...addCustomerForm.errors,
            [fieldKey]: true,
          },
        });
        return false;
      }
      // switch (fieldKey as keyof AddCustomerFormFields) {
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

  const handleFormFieldChange = <P extends keyof AddCustomerFormFields>(
    key: P,
    value: AddCustomerFormFields[P]
  ) => {
    setAddCustomerForm({
      errors: addCustomerForm.errors,
      fields: {
        ...addCustomerForm.fields,
        [key]: value,
      },
    });
  };

  return { addCustomerForm, handleFormFieldChange: handleFormFieldChange, validateForm: validateForm };
};

export default useAddCustomerFormHook;

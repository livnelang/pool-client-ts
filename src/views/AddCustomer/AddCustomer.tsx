import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import AppButton from "../../components/AppButton/AppButton";
import AppModal, { BaseModalProps } from "../../components/AppModal/AppModal";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import InputField from "../../components/forms/InputField/InputField";
import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import useModal from "../../hooks/useModal";
import { NewCustomerRequest } from "../../interfaces/Customer";
import useAddCustomerFormHook from "./hooks/useAddCustomerFormHook";

export interface AddCustomerFormFields {
  firstName: string;
  lastName: string;
}

export interface AddCustomerForm {
  fields: AddCustomerFormFields;
  errors: { [key in keyof AddCustomerFormFields]: boolean };
}

interface Props {
  api: APIService;
}

type ModalType = "SUCCESS" | "FAIL";

let modalTypeOptions: Record<ModalType, BaseModalProps> = {
  SUCCESS: {
    text: "לקוח נוסף בהצלחה",
    type: "success",
    secondaryText: "כעת ניתן להוסיף, לצפות בהזמנות הלקוח",
    confirmButtonText: "אישור",
  },
  FAIL: {
    text: "ההוספה נכשלה",
    type: "fail",
    confirmButtonText: "סגירה",
  },
};

const AddCustomer = (props: Props) => {
  const { addCustomer } = props.api;

  const { addCustomerForm, handleFormFieldChange, validateForm } =
    useAddCustomerFormHook();

  const [isLoading, setisLoading] = useState<boolean>(false);
  const { isModalOpen, setIsModalOpen } = useModal();
  const [modalType, setModalType] = useState<ModalType>("SUCCESS");

  const handleClickSubmitForm = () => {
    if (addCustomerForm === null) {
      throw Error("Cannot post to login with empty details");
    }
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    setisLoading(true);

    const body: NewCustomerRequest = {
      newClient: addCustomerForm.fields,
    };
    addCustomer(body)
      .then((res) => {
        // props.onSuccessFullLogin(res);
        setModalType("SUCCESS");
      })
      .catch((err) => {
        modalTypeOptions.FAIL.secondaryText = err.response.data.message;
        setModalType("FAIL");
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpen(true);
      });
  };

  return (
    <div className="AddCustomer">
      <PageHeader text="הוספת לקוח חדש" />
      <FormContainer>
        <form onSubmit={handleClickSubmitForm}>
          <InputField
            label="שם"
            type="text"
            onChange={(e) => handleFormFieldChange("firstName", e.target.value)}
            error={addCustomerForm.errors.firstName}
          />
          <InputField
            label="שם משפחה"
            type="text"
            onChange={(e) => handleFormFieldChange("lastName", e.target.value)}
            error={addCustomerForm.errors.lastName}
          />
        </form>
        <AppButton
          disabled={isLoading}
          text="הוסף"
          onClick={() => {
            handleClickSubmitForm();
          }}
        >
          {isLoading ? <CgSpinner className="spinner" /> : null}
        </AppButton>
      </FormContainer>
      <AppModal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        {...modalTypeOptions[modalType]}
      />
    </div>
  );
};

export default AddCustomer;

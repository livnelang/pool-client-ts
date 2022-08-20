import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";
import AppModal, { BaseModalProps } from "../../components/AppModal/AppModal";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import InputField from "../../components/forms/InputField/InputField";
import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import useModal from "../../hooks/useModal";
import { NewCustomerRequest } from "../../interfaces/Customer";
import useAddCustomerFormHook from "./hooks/useAddCustomerFormHook";

type ResponseType = "SUCCESS" | "FAIL";

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

let modalTypeOptions: Record<ResponseType, BaseModalProps> = {
  SUCCESS: {
    text: "לקוח נוסף בהצלחה",
    type: "SUCCESS",
    secondaryText: "כעת ניתן להוסיף, לצפות בהזמנות הלקוח",
    confirmButtonText: "אישור",
  },
  FAIL: {
    text: "ההוספה נכשלה",
    type: "FAIL",
    confirmButtonText: "סגירה",
  },
};

const AddCustomer = (props: Props) => {
  const { addCustomer } = props.api;

  const { addCustomerForm, handleFormFieldChange, validateForm } =
    useAddCustomerFormHook();

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ResponseType>("SUCCESS");
  const { isModalOpen, setIsModalOpen } = useModal();
  const navigate = useNavigate();

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
      .then(() => {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalType === "SUCCESS") {
      navigate("/main/orders");
    }
  };

  return (
    <div className="AddCustomer">
      <PageHeader text="הוספת לקוח חדש" />
      <FormContainer>
        <form onSubmit={handleClickSubmitForm}>
          <InputField
            label="שם"
            type="text"
            placeholder="הקלד שם"
            onChange={(e) => handleFormFieldChange("firstName", e.target.value)}
            error={addCustomerForm.errors.firstName}
          />
          <InputField
            label="שם משפחה"
            type="text"
            placeholder="הקלד שם משפחה"
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
        onCloseModal={handleCloseModal}
        {...modalTypeOptions[modalType]}
      />
    </div>
  );
};

export default AddCustomer;

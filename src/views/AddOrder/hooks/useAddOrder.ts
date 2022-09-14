import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseModalProps } from "../../../components/AppModal/AppModal";
import { AppSelectOption } from "../../../components/forms/AppSelect/AppSelect";
import APIService from "../../../helpers/api/API";
import useCustomers from "../../../hooks/useCustomers";
import useModal from "../../../hooks/useModal";
import useProducts from "../../../hooks/useProducts";
import { Customer } from "../../../interfaces/Customer";
import { AddOrderRequest } from "../../../interfaces/Order";
import { Product } from "../../../interfaces/Product";
import {} from "../../Orders/hooks/useOrders";

interface FormStateFields {
  selectedCustomerOption: AppSelectOption<Customer> | null;
  selectedtProductOption: AppSelectOption<Product> | null;
  quantity: number | null;
  date: Date | null;
}

interface FormState {
  fields: FormStateFields;
  errors: { [key in keyof FormStateFields]: boolean };
}

const initialFormState: FormState = {
  fields: {
    selectedCustomerOption: null,
    selectedtProductOption: null,
    quantity: null,
    date: null,
  },
  errors: {
    selectedCustomerOption: false,
    selectedtProductOption: false,
    quantity: false,
    date: false,
  },
};

let modalTypeOptions: Record<ResponseType, BaseModalProps> = {
  SUCCESS: {
    text: "ההזמנה נשמרה בהצלחה",
    type: "SUCCESS",
    confirmButtonText: "אישור",
  },
  FAIL: {
    text: "ההזמנה נכשלה",
    type: "FAIL",
    confirmButtonText: "סגירה",
  },
};

type ResponseType = "SUCCESS" | "FAIL";

interface Props {
  api: APIService;
}

const useAddOrder = (props: Props) => {
  const { addOrder } = props.api;
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isModalOpen, setIsModalOpen } = useModal();
  const navigate = useNavigate();

  const { isLoadingCustomers, customersOptions } = useCustomers(props);
  const { isLoadingProducts, proudctsOptions } = useProducts(props);
  const [modalType, setModalType] = useState<ResponseType | null>("SUCCESS");

  const toggleFieldErrorState = (fieldKey: string, isError: boolean) => {
    setFormState((state) => {
      return {
        ...state,
        errors: {
          ...formState.errors,
          [fieldKey]: isError,
        },
      };
    });
  };

  const validateForm = (): boolean => {
    for (const [fieldKey, fieldValue] of Object.entries(formState.fields)) {
      if (fieldValue === "" || !fieldValue) {
        toggleFieldErrorState(fieldKey, true);
        return false;
      }
    }
    return true;
  };

  const handleFormStateFieldChange = <P extends keyof FormStateFields>(
    key: P,
    newValue: FormStateFields[P]
  ) => {
    setFormState({
      ...formState,
      fields: {
        ...formState.fields,
        [key]: newValue,
      },
      errors: {
        ...formState.errors,
        [key]: false,
      },
    });
  };

  const handleClickSubmitForm = () => {
    if (formState === null) {
      throw Error("Cannot post to login with empty details");
    }
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    formState.fields.date!.setHours(now.getHours());
    formState.fields.date!.setMinutes(now.getMinutes());
    const body: AddOrderRequest = {
      clientId: formState.fields.selectedCustomerOption!.value.id,
      productId: formState.fields.selectedtProductOption!.value.id,
      quantity: formState.fields.quantity!,
      date: formState.fields.date!.toString(),
    };
    addOrder(body)
      .then(() => {
        setModalType("SUCCESS");
      })
      .catch((err) => {
        modalTypeOptions.FAIL.secondaryText = err.response.data.message;
        setModalType("FAIL");
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (modalType === "SUCCESS") {
      navigate("/main/orders");
    }
    setModalType(null);
  };

  return {
    formState,
    setFormState,
    handleFormStateFieldChange,
    addCustomerForm: formState,
    validateForm: validateForm,
    handleClickSubmitForm,
    isSubmitting,
    isLoadingCustomers,
    customersOptions,
    isLoadingProducts,
    proudctsOptions,
    isModalOpen,
    modalType,
    modalTypeOptions,
    handleCloseModal,
  };
};

export default useAddOrder;

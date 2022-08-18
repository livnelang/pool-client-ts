import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import AppButton from "../../components/AppButton/AppButton";
import AppSelect from "../../components/forms/AppSelect/AppSelect";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import InputField from "../../components/forms/InputField/InputField";
import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import "./AddOrder.scss";
import useAddOrder from "./hooks/useAddOrder";

interface Props {
  api: APIService;
}

const AddOrder = (props: Props) => {
  const {
    formState,
    handleClickSubmitForm,
    handleFormStateFieldChange,
    isSubmitting,
    isLoadingCustomers,
    customersOptions,
    isLoadingProducts,
    proudctsOptions,
  } = useAddOrder(props);

  useEffect(() => {
    console.log("errors changed: ", formState.errors);
  }, [formState.errors]);
  return (
    <div>
      <PageHeader text="הוספת הזמנה" />
      <FormContainer>
        <form>
          <AppSelect
            isDisabled={isLoadingCustomers}
            label="בחר לקוח"
            defaultOption={formState.fields.selectedCustomerOption ?? undefined}
            onValueChange={(newValue) =>
              handleFormStateFieldChange("selectedCustomerOption", newValue)
            }
            options={customersOptions}
            placeholder="בחר"
            error={formState.errors.selectedCustomerOption}
          />
          <AppSelect
            isDisabled={isLoadingProducts}
            label="בחר מוצר"
            defaultOption={formState.fields.selectedtProductOption ?? undefined}
            onValueChange={(newValue) =>
              handleFormStateFieldChange("selectedtProductOption", newValue)
            }
            options={proudctsOptions}
            placeholder="בחר"
            error={formState.errors.selectedtProductOption}
          />
          <InputField
            label="כמות"
            type="number"
            onChange={(e) =>
              handleFormStateFieldChange("quantity", Number(e.target.value))
            }
            placeholder="הקלד כמות"
            error={formState.errors.quantity}
          />
          <InputField
            label="כמות"
            type="date"
            placeholder="בחר תאריך"
            onChange={(e) => handleFormStateFieldChange("date", e.target.value)}
            error={formState.errors.date}
          />
        </form>
        <AppButton
          disabled={isSubmitting}
          text="הוסף"
          onClick={() => {
            handleClickSubmitForm();
          }}
        >
          {isSubmitting ? <CgSpinner className="spinner" /> : null}
        </AppButton>
      </FormContainer>
    </div>
  );
};

export default AddOrder;

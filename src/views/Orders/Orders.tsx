import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import "./Orders.scss";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import AppSelect from "../../components/forms/AppSelect/AppSelect";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import AppButton from "../../components/AppButton/AppButton";
import OrdersTotalAmount from "./components/OrdersTotalAmount/OrdersTotalAmount";
import { LinearProgress } from "@mui/material";
import useOrders from "./hooks/useOrders";

interface Props {
  api: APIService;
}

const Orders = (props: Props) => {
  const {
    formState,
    setFormState,
    isLoadingCustomers,
    customersOptions,
    handleClickShowOrders,
    handleFormStateFieldChange,
    isLoadingOrders,
    ordersData,
    monthsOptions,
  } = useOrders(props);

  return (
    <div className="Orders">
      <PageHeader text="הזמנות" />
      <FormContainer>
        <form>
          <AppSelect
            isDisabled={isLoadingCustomers}
            label="בחר לקוח"
            defaultOption={formState.selectedCustomerOption ?? undefined}
            onValueChange={(newValue) => {
              setFormState({
                ...formState,
                isAllClients: newValue.label === "כל הלקוחות",
                selectedCustomerOption: newValue,
              });
            }}
            options={customersOptions}
          />
          <AppSelect
            label="בחר חודש"
            defaultOption={formState.selectedtMonthOption}
            onValueChange={(newValue) => {
              handleFormStateFieldChange("selectedtMonthOption", newValue);
            }}
            options={monthsOptions}
          />

          <AppButton
            size="small"
            text="הצג"
            onClick={() => handleClickShowOrders()}
          />
          <AppButton size="small" text="שלח במייל" onClick={() => {}} />
          {isLoadingOrders ? (
            <LinearProgress />
          ) : ordersData === null ? null : (
            <>
              <OrdersTotalAmount
                sum={ordersData.total}
                isAllClients={formState.isAllClients}
              />
              {ordersData ? <OrdersTable rows={ordersData.orders} /> : null}
            </>
          )}
        </form>
      </FormContainer>
    </div>
  );
};

export default Orders;

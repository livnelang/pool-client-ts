import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import { Customer } from "../../interfaces/Customer";
import { setCustomersResponse } from "../../store/slices/customersSlice";
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
  const { api } = props;
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const {
    formState,
    setFormState,
    customers,
    customersOptions,
    handleClickShowOrders,
    handleFormStateFieldChange,
    isLoadingOrders,
    mapCustomersOptions,
    ordersData,
    monthsOptions,
  } = useOrders(props);

  const dispatch = useDispatch();

  useEffect(() => {
    if (customers !== null) {
      mapCustomersOptions();
      return;
    }
    setIsLoadingCustomers(true);
    api
      .getAllClients()
      .then((res: Customer[]) => {
        dispatch(setCustomersResponse({ customersResponse: res }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoadingCustomers(false));
  }, [customers]);

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

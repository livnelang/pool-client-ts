import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import APIService from "../../helpers/api/API";
import { Customer } from "../../interfaces/Customer";
import { RootState } from "../../store/rtkStore";
import { setCustomersResponse } from "../../store/slices/customersSlice";
import "./Orders.scss";
import {
  getCurrentMonth,
  getCurrentMonthSelectOption,
  Month,
  months,
} from "./utils/ordersUtils";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import AppSelect, {
  AppSelectOption,
} from "../../components/forms/AppSelect/AppSelect";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { Order, OrdersRequest } from "../../interfaces/Order";
import AppButton from "../../components/AppButton/AppButton";
import OrdersTotalAmount from "./components/OrdersTotalAmount/OrdersTotalAmount";
import { LinearProgress } from "@mui/material";

const monthsOptions: AppSelectOption[] = months.map((m) => {
  return {
    label: m.name,
    value: m.range,
  };
});

interface FormState {
  selectedCustomer: AppSelectOption | null;
  currentMonth: Month;
  currentMonthOption: AppSelectOption;
  isAllClients: boolean;
}

const initialFormState: FormState = {
  currentMonth: getCurrentMonth(),
  currentMonthOption: getCurrentMonthSelectOption(),
  selectedCustomer: null,
  isAllClients: false,
};

interface Props {
  api: APIService;
}

interface CustomerOption {
  label: string;
  value: string;
}

interface OrdersDataExtended {
  orders: Order[];
  total: number;
}

const Orders = (props: Props) => {
  const { api } = props;
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [customersOptions, setCustomersOptions] = useState<CustomerOption[]>(
    []
  );
  const [ordersData, setOrdersData] = useState<OrdersDataExtended | null>(null);

  const dispatch = useDispatch();
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );

  const mapCustomersOptions = () => {
    if (customers === null) {
      throw Error("cannot map customers to options when it is null");
    }

    const allCustomersOption: AppSelectOption = {
      label: "כל הלקוחות",
      value: "allClients",
    };

    const mappedCustomers: AppSelectOption[] = customers.map((c) => {
      return {
        label: c.firstName + " " + c.lastName,
        value: {
          firstName: c.firstName,
          lastName: c.lastName,
        },
      };
    });
    mappedCustomers.unshift(allCustomersOption);
    setCustomersOptions(mappedCustomers);

    setFormState({
      ...formState,
      selectedCustomer: mappedCustomers[0],
      isAllClients: mappedCustomers[0].label === "כל הלקוחות",
    });
  };

  useEffect(() => {}, [formState.selectedCustomer]);

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

  const handleFormStateFieldChange = <P extends keyof FormState>(
    key: P,
    newValue: FormState[P]
  ) => {
    setFormState({
      ...formState,
      [key]: newValue,
    });
  };

  const handleClickShowOrders = () => {
    if (formState.selectedCustomer === null) {
      return;
    }

    const body: OrdersRequest = {
      formObject: {
        date: {
          startDate: formState.currentMonth.range.startDate,
          endDate: formState.currentMonth.range.endDate,
        },
        isAllClients: formState.isAllClients,
        client: formState.selectedCustomer.value,
      },
    };

    setIsLoadingOrders(true);
    api
      .getOrders(body)
      .then((res) => {
        const data: OrdersDataExtended = {
          orders: res,
          total: res.reduce((acc, o) => {
            return (acc += o.total);
          }, 0),
        };
        setOrdersData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoadingOrders(false));
  };

  return (
    <div className="Orders">
      <PageHeader text="הזמנות" />
      <FormContainer>
        <form>
          <AppSelect
            isDisabled={isLoadingCustomers}
            label="בחר לקוח"
            defaultOption={formState.selectedCustomer ?? undefined}
            onValueChange={(newValue) => {
              setFormState({
                ...formState,
                isAllClients: newValue.label === "כל הלקוחות",
                selectedCustomer: newValue,
              });
            }}
            options={customersOptions}
          />
          <AppSelect
            label="בחר חודש"
            defaultOption={formState.currentMonthOption}
            onValueChange={(newValue) => {
              handleFormStateFieldChange("currentMonthOption", newValue);
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

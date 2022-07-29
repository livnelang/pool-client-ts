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
import { Order } from "../../interfaces/Order";
import AppButton from "../../components/AppButton/AppButton";

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
}

const initialFormState: FormState = {
  currentMonth: getCurrentMonth(),
  currentMonthOption: getCurrentMonthSelectOption(),
  selectedCustomer: null,
};

interface Props {
  api: APIService;
}

interface CustomerOption {
  label: string;
  value: string;
}

const rows: Order[] = [
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
  {
    date: "2022-07-01T07:32:00.000Z",
    firstName: "רון",
    lastName: "וולקון",
    pricePerProduct: 4,
    productName: "קרטיב",
    quantity: 1,
    total: 4,
    _id: "62bea331b486d50004593afd",
  },
];

const Orders = (props: Props) => {
  const { api } = props;
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [customersOptions, setCustomersOptions] = useState<CustomerOption[]>(
    []
  );

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
        value: c.id,
      };
    });
    mappedCustomers.unshift(allCustomersOption);
    setCustomersOptions(mappedCustomers);

    setFormState({
      ...formState,
      selectedCustomer: mappedCustomers[0],
    });
  };

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
    console.log(newValue);
    setFormState({
      ...formState,
      [key]: newValue,
    });
  };

  const handleClickShowOrders = () => {

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
              handleFormStateFieldChange("selectedCustomer", newValue);
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

          <AppButton size="small" text="הצג" onClick={() => handleClickShowOrders()} />
          <AppButton size="small" text="שלח במייל" onClick={() => {}} />
          <OrdersTable rows={rows} />
        </form>
      </FormContainer>

      {/* {isLoadingCustomers ? (
        <div>loading customers ..</div>
      ) : customers !== null ? (
        <div>
          {customers.map((c, idx) => {
            return (
              <div key={idx}>
                {c.firstName} {c.lastName}
              </div>
            );
          })}
        </div>
      ) : null} */}
    </div>
  );
};

export default Orders;

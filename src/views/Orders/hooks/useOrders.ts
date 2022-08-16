import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSelectOption } from "../../../components/forms/AppSelect/AppSelect";
import APIService from "../../../helpers/api/API";
import useForm from "../../../hooks/useForm";
import { Customer } from "../../../interfaces/Customer";
import { Order, OrdersRequest } from "../../../interfaces/Order";
import { RootState } from "../../../store/rtkStore";
import { setCustomersResponse } from "../../../store/slices/customersSlice";
import {
  getCurrentMonthSelectOption,
  MonthRange,
  months,
} from "../utils/ordersUtils";

interface FormState {
  selectedCustomerOption: AppSelectOption<CustomerName> | null;
  selectedtMonthOption: AppSelectOption<MonthRange>;
  isAllClients: boolean;
}

const initialFormState: FormState = {
  selectedtMonthOption: getCurrentMonthSelectOption(),
  selectedCustomerOption: null,
  isAllClients: false,
};

export interface CustomerName {
  firstName: string;
  lastName: string;
}

interface OrdersDataExtended {
  orders: Order[];
  total: number;
}

interface Props {
  api: APIService;
}

const useOrders = ({ api }: Props) => {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const dispatch = useDispatch();
  const { formState, setFormState, handleFormStateFieldChange } =
    useForm<FormState>(initialFormState);

  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [ordersData, setOrdersData] = useState<OrdersDataExtended | null>(null);

  const [customersOptions, setCustomersOptions] = useState<
    AppSelectOption<CustomerName>[]
  >([]);

  const monthsOptions: AppSelectOption<MonthRange>[] = months.map((m) => {
    return {
      label: m.name,
      value: m.range,
    };
  });

  const mapCustomersOptions = () => {
    if (customers === null) {
      throw Error("cannot map customers to options when it is null");
    }

    const allCustomersOption: AppSelectOption<CustomerName> = {
      label: "כל הלקוחות",
      value: {
        firstName: "allClients",
        lastName: "",
      },
    };

    const mappedCustomers: AppSelectOption<CustomerName>[] = customers.map(
      (c) => {
        return {
          label: c.firstName + " " + c.lastName,
          value: {
            firstName: c.firstName,
            lastName: c.lastName,
          },
        };
      }
    );
    mappedCustomers.unshift(allCustomersOption);
    setCustomersOptions(mappedCustomers);

    setFormState({
      ...formState,
      selectedCustomerOption: mappedCustomers[0],
      isAllClients: mappedCustomers[0].label === "כל הלקוחות",
    });
  };
  const handleClickShowOrders = () => {
    if (formState.selectedCustomerOption === null) {
      return;
    }

    const body: OrdersRequest = {
      formObject: {
        date: formState.selectedtMonthOption.value,
        isAllClients: formState.isAllClients,
        client: formState.selectedCustomerOption.value,
      },
    };

    setIsLoadingOrders(true);
    api
      .getOrders(body)
      .then((res) => {
        res.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
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

  return {
    formState,
    setFormState,
    isLoadingCustomers,
    customers,
    customersOptions,
    mapCustomersOptions,
    handleClickShowOrders,
    handleFormStateFieldChange,
    isLoadingOrders,
    ordersData,
    monthsOptions,
  };
};

export default useOrders;

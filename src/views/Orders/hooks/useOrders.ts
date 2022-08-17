// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppSelectOption } from "../../../components/forms/AppSelect/AppSelect";
import APIService from "../../../helpers/api/API";
import useCustomers from "../../../hooks/useCustomers";
import useForm from "../../../hooks/useForm";
import { Order, OrdersRequest } from "../../../interfaces/Order";
import { RootState } from "../../../store/rtkStore";
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

const useOrders = (props: Props) => {
  const { api } = props;
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const { formState, setFormState, handleFormStateFieldChange } =
    useForm<FormState>(initialFormState);

  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [ordersData, setOrdersData] = useState<OrdersDataExtended | null>(null);

  const { isLoadingCustomers, customersOptions } = useCustomers(props);

  const monthsOptions: AppSelectOption<MonthRange>[] = months.map((m) => {
    return {
      label: m.name,
      value: m.range,
    };
  });

  useEffect(() => {
    if (customersOptions.length > 0) {
      setFormState({
        ...formState,
        selectedCustomerOption: customersOptions[0],
        isAllClients: customersOptions[0].label === "כל הלקוחות",
      });
    }
  }, [customersOptions]);

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

  return {
    formState,
    setFormState,
    isLoadingCustomers,
    customers,
    customersOptions,
    handleClickShowOrders,
    handleFormStateFieldChange,
    isLoadingOrders,
    ordersData,
    monthsOptions,
  };
};

export default useOrders;

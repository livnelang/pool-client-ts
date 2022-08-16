import { useState } from "react";
import { useSelector } from "react-redux";
import { AppSelectOption } from "../../../components/forms/AppSelect/AppSelect";
import APIService from "../../../helpers/api/API";
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

const useOrders = ({ api }: Props) => {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const { formState, setFormState, handleFormStateFieldChange } =
    useForm<FormState>(initialFormState);

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

  return {
    formState,
    setFormState,
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

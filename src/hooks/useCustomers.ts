import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSelectOption } from "../components/forms/AppSelect/AppSelect";
import APIService from "../helpers/api/API";
import { Customer } from "../interfaces/Customer";
import { RootState } from "../store/rtkStore";
import { setCustomersResponse } from "../store/slices/customersSlice";
import { CustomerName } from "../views/Orders/hooks/useOrders";

interface Props {
  api: APIService;
}

const useCustomers = ({ api }: Props) => {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const [customersOptions, setCustomersOptions] = useState<
    AppSelectOption<CustomerName>[]
  >([]);
  const dispatch = useDispatch();

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

  return { customers, isLoadingCustomers, customersOptions };
};

export default useCustomers;

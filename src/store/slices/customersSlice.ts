import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../interfaces/Customer";

export interface CustomersState {
  customers: Customer[] | null;
}

const customersInitialState: CustomersState = {
  customers: null,
};

const customersSlice = createSlice({
  name: "customersData",
  initialState: customersInitialState,
  reducers: {
    setCustomersResponse: (
      state: CustomersState,
      { payload }: PayloadAction<{ customersResponse: Customer[] }>
    ) => {
      state.customers = payload.customersResponse;
    },
  },
});

// ACTIONS
export const { setCustomersResponse: setCustomersResponse } =
  customersSlice.actions;

// REDUCER
export default customersSlice;

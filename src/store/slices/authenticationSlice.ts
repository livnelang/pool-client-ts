import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppMails, LoggedUser, LoginResponse } from "../../interfaces/Authentication";

export interface AuthenticationState {
  loggedUser: LoggedUser | null;
  mails: AppMails | null;
}

const authenticationInitialState: AuthenticationState = {
  loggedUser: null,
  mails: null
};

// SLICES
const authSlice = createSlice({
  name: "authData",
  initialState: authenticationInitialState,
  reducers: {
    setLoginResponse: (
      state,
      { payload }: PayloadAction<{ loginResponse: LoginResponse }>
    ) => {
      state.loggedUser = payload.loginResponse.loggedUser;
      state.mails = payload.loginResponse.mails;
    },
  },
});

// ACTIONS
export const { setLoginResponse: setLoginResponse } = authSlice.actions;

// REDUCER
export default authSlice;
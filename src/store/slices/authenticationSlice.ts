import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppMails,
  LoggedUser,
  LoginResponse,
} from "../../interfaces/Authentication";

export interface AuthenticationState {
  loggedUser: LoggedUser | null;
  mails: AppMails | null;
  seenOnboardingSlides: boolean;
}

const authenticationInitialState: AuthenticationState = {
  loggedUser: null,
  mails: null,
  seenOnboardingSlides: false,
};

// SLICES
const authSlice = createSlice({
  name: "authData",
  initialState: authenticationInitialState,
  reducers: {
    setLoginResponse: (
      state: AuthenticationState,
      { payload }: PayloadAction<{ loginResponse: LoginResponse }>
    ) => {
      state.loggedUser = payload.loginResponse.loggedUser;
      state.mails = payload.loginResponse.mails;
    },
    setSlidingIndicator: (state: AuthenticationState) => {
      state.seenOnboardingSlides = !state.seenOnboardingSlides;
    },
    removeLoggedUser: (state: AuthenticationState) => {
      state.loggedUser = null;
      state.mails = null;
    },
  },
});

// ACTIONS
export const {
  setLoginResponse: setLoginResponse,
  removeLoggedUser: removeLoggedUser,
  setSlidingIndicator: setSlidingIndicator,
} = authSlice.actions;

// REDUCER
export default authSlice;

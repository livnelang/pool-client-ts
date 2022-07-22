import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from "axios";
import { LoggedUser } from "../../interfaces/Authentication";
import { store } from "../../store/rtkStore";
import {
  removeLoggedUser,
} from "../../store/slices/authenticationSlice";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const loggedUser: LoggedUser | null = store.getState().auth.loggedUser;

  config.headers = config.headers || {};

  if (loggedUser) {
    config.headers["x-access-token"] = loggedUser.token;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const url = error.request.responseURL;
  const isAuthenticateUrl = url.includes("api/authenticate");

  if (error.response?.status === 401 && !isAuthenticateUrl) {
    store.dispatch(removeLoggedUser());
    location.replace("/");
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from "axios";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../../interfaces/Authentication";
import { store } from "../../store/rtkStore";
import {
  removeLoggedUser,
  setLoginResponse,
} from "../../store/slices/authenticationSlice";

const loggedUser: LoggedUser | null = store.getState().auth.loggedUser;
console.log("tore inerceptos: ", loggedUser);

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const loggedUser: LoggedUser | null = store.getState().auth.loggedUser;
  console.log("tore inerceptos: ", loggedUser);

  config.headers = config.headers || {};

  if (loggedUser) {
    config.headers["x-access-token"] = loggedUser.token;
  }

  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
//   const navigate = useNavigate();
  if (error.response?.status === 401) {
    // disp
    store.dispatch(removeLoggedUser()); 
    location.replace("/");
    // setLoginResponse({ loginResponse: loginResponse })
  }

  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

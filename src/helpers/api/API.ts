import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginRequest, LoginResponse } from "../../interfaces/Authentication";
import { setupInterceptorsTo } from "./interceptors";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://oz-pool.herokuapp.com/api/";

// setupInterceptorsTo(axios);

class APIService {
  constructor() {
    setupInterceptorsTo(axios);
  }
    public async getAllClients(): Promise<any> {
      return axios.post(BASE_URL + "getAllClients");
    }

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return axios
      .post(BASE_URL + "authenticate", body)
      .then((res) => res.data);
  }

  //   public async createRecipe(body: RecipeCreateParams): Promise<Recipe> {
  //     return axios.post(BASE_URL + "recipes", body).then((res) => res.data);
  //   }
}

export default APIService;

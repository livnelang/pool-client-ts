import axios from "axios";
import { LoginRequest, LoginResponse } from "../../interfaces/Authentication";
import { NewCustomerRequest } from "../../interfaces/Customer";
import { setupInterceptorsTo } from "./interceptors";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "https://oz-pool.herokuapp.com/api/";
const BASE_URL = "http://localhost:5000/api/";

// setupInterceptorsTo(axios);

class APIService {
  constructor() {
    setupInterceptorsTo(axios);
  }
  public async getAllClients(): Promise<any> {
    return axios.post(BASE_URL + "getAllClients");
  }

  public async getAllProducts(): Promise<any> {
    return axios.post(BASE_URL + "getAllProducts").then((res) => res.data);
  }

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return axios.post(BASE_URL + "authenticate", body).then((res) => res.data);
  }

  public async addCustomer(body: NewCustomerRequest): Promise<any> {
    return axios.post(BASE_URL + "addClient", body).then((res) => res.data);
  }

  //   public async createRecipe(body: RecipeCreateParams): Promise<Recipe> {
  //     return axios.post(BASE_URL + "recipes", body).then((res) => res.data);
  //   }
}

export default APIService;

import axios from "axios";
import { LoginRequest, LoginResponse } from "../../interfaces/Authentication";
import { Customer, NewCustomerRequest } from "../../interfaces/Customer";
import { SendOrderByMailRequest } from "../../interfaces/Mail";
import { AddOrderRequest, Order, OrdersRequest } from "../../interfaces/Order";
import { Product } from "../../interfaces/Product";
import { setupInterceptorsTo } from "./interceptors";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "https://oz-pool.herokuapp.com/api/";
export const BASE_URL = "https://ozpoolws-livnelang.b4a.run/api/";
// export const BASE_URL = "http://localhost:5000/api/";

// setupInterceptorsTo(axios);https://ozpoolws-livnelang.b4a.run/

class APIService {
  constructor() {
    setupInterceptorsTo(axios);
  }
  public async getAllClients(): Promise<Customer[]> {
    return axios.post(BASE_URL + "getAllClients").then((res) => res.data);
  }

  public async getAllProducts(): Promise<Product[]> {
    return axios.post(BASE_URL + "getAllProducts").then((res) => res.data);
  }

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return axios.post(BASE_URL + "authenticate", body).then((res) => res.data);
  }

  public async addCustomer(body: NewCustomerRequest): Promise<any> {
    return axios.post(BASE_URL + "addClient", body).then((res) => res.data);
  }

  public async addOrder(body: AddOrderRequest): Promise<any> {
    return axios.post(BASE_URL + "addOrder2", body).then((res) => res.data);
  }

  public async getOrders(body: OrdersRequest): Promise<Order[]> {
    return axios.post(BASE_URL + "getOrders", body).then((res) => res.data);
  }

  public async sendOrdersByMail(body: SendOrderByMailRequest): Promise<void> {
    return axios
      .post(BASE_URL + "sendMonthlyOrdersByEmail", body)
      .then((res) => res.data);
  }
}

export default APIService;

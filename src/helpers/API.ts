import axios from "axios";
import { LoginRequest, LoginResponse } from "../interfaces/Authentication";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://oz-pool.herokuapp.com/";
class APIService {
//   public async getItems(): Promise<Recipes> {
//     return axios.get(BASE_URL + "recipes");
//   }

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return axios.post(BASE_URL + "api/authenticate", body).then(res => res.data);
  }

//   public async createRecipe(body: RecipeCreateParams): Promise<Recipe> {
//     return axios.post(BASE_URL + "recipes", body).then((res) => res.data);
//   }
}

export default APIService;

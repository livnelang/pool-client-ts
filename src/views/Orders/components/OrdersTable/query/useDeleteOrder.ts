import { useMutation } from "react-query";
import { DeleteOrderRequest } from "../../../../../interfaces/Order";
import axios from "axios";
import { BASE_URL } from "../../../../../helpers/api/API";

const deleteOrder = (body: DeleteOrderRequest): Promise<any> => {
  return axios.post(BASE_URL + "deleteOrder", body).then((res) => res.data);
};

export const useDeleteOrder = () => {
  return useMutation((body: DeleteOrderRequest) => deleteOrder(body), {
    onSuccess: () => {
      // Success actions
    },
    onError: () => {
      // Error actions
    },
  });
};

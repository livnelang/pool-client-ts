export interface Order {
  _id: string;
  date: string;
  firstName: string;
  lastName: string;
  pricePerProduct: number;
  productName: string;
  quantity: number;
  total: number;
}

export interface OrdersRequest {
  formObject: {
    date: {
      startDate: Date;
      endDate: Date;
    };
    client: {
      firstName: string;
      lastName: string;
    };
    isAllClients: boolean;
  };
}

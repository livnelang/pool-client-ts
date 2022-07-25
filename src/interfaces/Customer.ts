export interface NewCustomerRequest {
  newClient: {
    firstName: string;
    lastName: string;
  };
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductsResponse {
    products: Product[];
}
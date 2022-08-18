import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSelectOption } from "../components/forms/AppSelect/AppSelect";
import APIService from "../helpers/api/API";
import { Product } from "../interfaces/Product";
import { RootState } from "../store/rtkStore";
import { setProductsResponse } from "../store/slices/productsSlice";

interface Props {
  api: APIService;
}

const useProducts = ({ api }: Props) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [proudctsOptions, setProudctsOptions] = useState<
    AppSelectOption<Product>[]
  >([]);

  const mapProductOptions = () => {
    if (products === null) {
      throw Error("cannot map products to options when it is null");
    }

    const mappedProducts: AppSelectOption<Product>[] = products.map((p) => {
      return {
        label: p.name,
        value: p,
      };
    });
    setProudctsOptions(mappedProducts);
  };

  useEffect(() => {
    if (products !== null) {
      mapProductOptions();
      return;
    }
    setIsLoadingProducts(true);
    api
      .getAllProducts()
      .then((res: Product[]) => {
        dispatch(setProductsResponse({ productsResponse: res }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoadingProducts(false));
  }, [products]);

  return { isLoadingProducts, proudctsOptions };
};

export default useProducts;

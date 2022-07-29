import "./Main.scss";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineBarcode,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";
import APIService from "../../helpers/api/API";
import ProfileBar from "../ProfileBar/ProfileBar";
import { RootState } from "../../store/rtkStore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProductsResponse } from "../../store/slices/productsSlice";
import { ProductsResponse } from "../../interfaces/Product";
import PageLayout from "../PageLayout/PageLayout";

interface MainProps {
  api: APIService;
}

function Main(props: MainProps) {
  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);
  const [isLoadingInitialData, setisLoadingInitialData] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  if (loggedUser === null) {
    throw Error("Cannot initiate main screen without being logged in");
  }

  useEffect(() => {
    if (products !== null) {
      return;
    }
    setisLoadingInitialData(true);
    props.api
      .getAllProducts()
      .then((res: ProductsResponse) => {
        dispatch(setProductsResponse({ productsResponse: res }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setisLoadingInitialData(false));
  }, []);

  return (
    <>
      <div className="Main">
        <ProfileBar userName={loggedUser.userName} />
        {isLoadingInitialData ? null : (
          <PageLayout>
            <Outlet />
          </PageLayout>
        )}
      </div>
      <Menu
        items={[
          { text: "בית", icon: <AiOutlineHome />, path: "main" },
          {
            text: "הוסף לקוח",
            icon: <AiOutlineUserAdd />,
            path: "addCustomer",
          },
          { text: "הוסף הזמנה", icon: <AiOutlineBarcode />, path: "addOrder" },
          { text: "הזמנות", icon: <AiOutlineCalendar />, path: "orders" },
        ]}
      />
    </>
  );
}

export default Main;

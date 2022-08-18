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
import ProfileBar from "../ProfileBar/ProfileBar";
import { RootState } from "../../store/rtkStore";
import PageLayout from "../PageLayout/PageLayout";

function Main() {
  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

  if (loggedUser === null) {
    throw Error("Cannot initiate main screen without being logged in");
  }

  return (
    <>
      <div className="Main">
        <ProfileBar userName={loggedUser.userName} />
        <PageLayout>
          <Outlet />
        </PageLayout>
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

import "./Main.scss";
import Menu from "../Menu/Menu";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineBarcode,
  AiOutlineUserAdd,
} from "react-icons/ai";
import APIService from "../../helpers/api/API";
import { useEffect } from "react";

interface MainProps {
  api: APIService;
}

const Main = (props: MainProps) => {
  useEffect(() => {
    const getAllClients = async () => {
      const allClients = await props.api.getAllClients();
      console.log("allClinets res: ", allClients);
    };
    getAllClients();
  }, []);
  return (
    <div className="Main">
      <h2>Hello Main!</h2>
      <Menu
        items={[
          { text: "בית", icon: <AiOutlineHome />, isActive: true },
          { text: "הוסף לקוח", icon: <AiOutlineUserAdd />, isActive: false },
          { text: "הוסף הזמנה", icon: <AiOutlineBarcode />, isActive: false },
          { text: "הזמנות", icon: <AiOutlineCalendar />, isActive: false },
        ]}
      />
    </div>
  );
};

export default Main;

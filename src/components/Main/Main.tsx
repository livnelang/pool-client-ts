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
import ProfileBar from "../ProfileBar/ProfileBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rtkStore";

interface MainProps {
  api: APIService;
}

const Main = (props: MainProps) => {
  const loggedUser = useSelector(
    (state: RootState) => state.auth.loggedUser
  );

  if (loggedUser === null) {
    throw Error("Cannot initiate main screen without being logged in");
  }

  useEffect(() => {
    const getAllClients = async () => {
      const allClients = await props.api.getAllClients();
      console.log("allClinets res: ", allClients);
    };
    getAllClients();
  }, []);
  return (
    <div className="Main">
      <ProfileBar userName={loggedUser.userName}/>
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

import './Main.scss';
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineBarcode,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import {
  Route, Routes,
} from 'react-router-dom';
import Menu from '../Menu/Menu';
import APIService from '../../helpers/api/API';
import ProfileBar from '../ProfileBar/ProfileBar';
import { RootState } from '../../store/rtkStore';
import Home from '../../views/Home/Home';
import AddCustomer from '../../views/AddCustomer/AddCustomer';


interface MainProps {
  api: APIService;
}

// eslint-disable-next-line no-unused-vars
function Main(props: MainProps) {
  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

  if (loggedUser === null) {
    throw Error('Cannot initiate main screen without being logged in');
  }

  // useEffect(() => {
  //   const getAllClients = async () => {
  //     const allClients = await props.api.getAllClients();
  //     console.log("allClinets res: ", allClients);
  //   };
  //   getAllClients();
  // }, []);

  return (
    <div className="Main">
      <ProfileBar userName={loggedUser.userName} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
      </Routes>
      <Menu
        items={[
          { text: 'בית', icon: <AiOutlineHome />, path: 'home' },
          { text: 'הוסף לקוח', icon: <AiOutlineUserAdd />, path: 'addCustomer' },
          { text: 'הוסף הזמנה', icon: <AiOutlineBarcode />, path: '' },
          { text: 'הזמנות', icon: <AiOutlineCalendar />, path: '' },
        ]}
      />
    </div>
  );
}

export default Main;

import "./App.css";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store/rtkStore";
import AllScreens from "../../views/AllScreens/AllScreens";
import Onboarding from "../../views/Onboarding/Onboarding";
import APIService from "../../helpers/api/API";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const api = new APIService();
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes>
            <Route path="/" element={<Onboarding api={api} />}></Route>
            <Route path="/screens" element={<AllScreens />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<Main api={new APIService()} />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;

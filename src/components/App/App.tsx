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
import AddCustomer from "../../views/AddCustomer/AddCustomer";
import Home from "../../views/Home/Home";
import Orders from "../../views/Orders/Orders";
import AddOrder from "../../views/AddOrder/AddOrder";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const App = () => {
  const api = new APIService();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes>
              <Route path="/" element={<Onboarding api={api} />}></Route>
              <Route path="/screens" element={<AllScreens />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/main/" element={<Main />}>
                  <Route index element={<Home />} />
                  <Route
                    path="/main/addCustomer"
                    element={<AddCustomer api={api} />}
                  />
                  <Route
                    path="/main/addOrder"
                    element={<AddOrder api={api} />}
                  />
                  <Route path="/main/orders" element={<Orders api={api} />} />
                </Route>
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

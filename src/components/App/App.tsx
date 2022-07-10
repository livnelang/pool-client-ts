import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store/rtkStore";
import AllScreens from "../../views/AllScreens/AllScreens";
import Onboarding from "../../views/Onboarding/Onboarding";
import APIService from "../../helpers/API";
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
              <Route path="/main" element={<Main />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            {/* <ProtectedRoute
              path="/main"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            ></ProtectedRoute> */}
            {/*
        <ProtectedRoute
          exact
          path="/upload"
          component={() => <UploadRecipe api={apiService} />}
        /> */}
          </Routes>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;

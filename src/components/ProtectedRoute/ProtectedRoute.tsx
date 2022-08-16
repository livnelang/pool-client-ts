import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/rtkStore";

export const ProtectedRoute = () => {
  const authenticationPath = "/";

  const isLoggedUser = useSelector(
    (state: RootState) => state.auth.loggedUser !== null
  );

  return isLoggedUser ? (
    <Outlet />
  ) : (
    <Navigate replace to={{ pathname: authenticationPath }} />
  );
};

export default ProtectedRoute;

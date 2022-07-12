import { useSelector } from "react-redux";
import { RouteProps, Route } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/rtkStore";

export const ProtectedRoute = (props: RouteProps) => {
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

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  return !isLoggedIn ? <Redirect to="/login" /> : <Route {...props} />;
};

export default PrivateRoute;

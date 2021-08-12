import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../Context";

const AdminOnlyRoute = ({ component: Component, ...restOfProps }) => {
  const { authState } = useContext(AuthContext);
  const { isAdmin } = authState;

  useEffect(() => {
    console.log("Aa", isAdmin);
  });
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin === 1 ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminOnlyRoute;

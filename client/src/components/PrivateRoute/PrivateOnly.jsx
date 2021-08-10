import { useContext, useEffect, useState } from "react";
import {
  matchPath,
  Redirect,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { AuthContext } from "../../Context";

const PrivateRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const { authState } = useContext(AuthContext);
  let location = useLocation();
  let loc = window.location;
  const [params, setParams] = useState([]);

  const match = matchPath(`/users/${authState.id}`, {
    path: "/users/:id",
  });

  //   let params = useParams();

  useEffect(() => {
    // if (params.length !== 0) {
    //   setParams(location.pathname.match(authState.id)[0]);
    // }
    console.log("Token", match, loc);
  }, [authState, location, params]);
  //   if (authState.status && authState.id === id) {
  //   }
  return (
    <Route
      {...restOfProps}
      render={
        (props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />

        // <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;

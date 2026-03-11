import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  const auth = localStorage.getItem("auth");

  if (!auth) {

    return <Navigate to="/login" />;

  }

  return children;

}

export default PrivateRoute;
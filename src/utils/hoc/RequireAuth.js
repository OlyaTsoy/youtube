import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = (props) => {
  const location = useLocation();
  const auth = localStorage.getItem("activeUser") || false;

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return props.children;
};

export default RequireAuth;
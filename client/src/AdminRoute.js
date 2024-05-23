import { Navigate } from "react-router-dom";
import { getUser } from "./services/authorize";

const AdminRoute = ({ children }) => {
  return getUser() ? children : <Navigate to="/login" />;
};

export default  AdminRoute;

import { Navigate } from "react-router-dom";

const LoggedInRoute = ({children}) =>{

    const isLoggedIn = Boolean(localStorage.getItem('authToken'));

    return isLoggedIn ? children : <Navigate to="/login"/>;

}

export default LoggedInRoute;
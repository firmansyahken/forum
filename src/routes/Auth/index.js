import { Navigate } from "react-router-dom";

const Auth = (props) => {
    const auth_token = localStorage.getItem('auth_token')
    if(!auth_token) return <Navigate to='/login' />

    return props.children
};

export default Auth;

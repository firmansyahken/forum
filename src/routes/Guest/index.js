import { Navigate } from "react-router-dom";

const Guest = (props) => {
    const auth_token = localStorage.getItem('auth_token')
    if(auth_token) return <Navigate to='/' />

    return props.children
};

export default Guest;

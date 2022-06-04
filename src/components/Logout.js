import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../Services/axio";


const Logout = () => {

    let history = useNavigate();

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    delete axios.defaults.headers.common.Authorization
    window.location.href = "/"
}

export default Logout
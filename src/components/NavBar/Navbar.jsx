import React from 'react';
import logo from "../../img/logo.png"
import './NavBar.css';
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
                <img src={logo} alt="Hacker News Logo"/>
                <p style={{marginLeft: "15px"}}>Hacker News</p>
            </div>
        </nav>
    );
};

export default Navbar;
import React from "react";
import Logo from '../assets/img/logo.png';
import Perfil from "../assets/img/perfil.svg";
import './header.css';
import Nav from "./Nav";
import { Link } from "react-router-dom";


function Header(){

    return(
        <>
    <header>

        <div className="layout-logo">
        <img src={Logo} alt="Logo"/>
        </div>

        <div className="layout-titulo">
            <h1>CRESCER CIDADÃO</h1>
        </div>

        <div className="layout-perfil">
            <Link to={'Login'}><img src={Perfil} alt="Perfil"/></Link>
        </div>
    </header>

    <Nav />
        </>
    )
}

export default Header
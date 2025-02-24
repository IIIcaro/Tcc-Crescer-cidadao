import React from "react";
import './nav.css';
import { Link } from "react-router-dom";
function Nav(){

    return(
        <>
        <nav>
        <div className="layout-navegacao">
            
        <div className="link-layout">
           <Link to={'/'}>Início</Link>
            </div>

            <div className="link-layout">
            <Link to={'SobreNos'}>Sobre Nos</Link>
           </div>

           <div className="link-layout">
           <Link to={'Blog'}>Blog</Link>
           </div>

            <div className="link-layout">
            <Link to={'Servicosl'}>Serviços</Link>
           </div>

            <div className="link-layout">
           <Link to={'Doacao'}>Apoie-Nos</Link>
           </div>

           </div>
           </nav>
        </>
    )
}

export default Nav
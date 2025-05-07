import React from "react";
import Header from "../components/Header"
import Carrosel from "../components/carrosel"
import { Footer } from "../components/footer"
import "./inicial.css"

function Inicial(){
    return(
        <div className="inicial-page">
            <Header />
            <Carrosel/>
            <Footer />
        </div>
    )
}

export default Inicial

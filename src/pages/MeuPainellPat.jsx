import React, { useState } from "react";
import "./MeuPainelPat.css";
import Header from "../components/Header";
import Perfil from '../assets/img/Perfil.png';
import img from '../assets/img/img4.png';
import img2 from '../assets/img/img5.png';

export const MeuPainellPat = () => {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  return (
    <>
      <Header />
      <main>
        <nav className="buttons-op">
          <button>Perfil</button>
          <button>Segurança</button>
          <button>Carteira</button>
        </nav>

        <section className="container-sec-painel">
          <div className="container-div-meio">
            <h2 className="titulo">Patrocinador</h2>
                
            <div className="layout-perfil">
              <img src={Perfil} alt="Perfil" className="perfil"/>
              <form action=" "className="icons">
                <div>
                  <input type="text" id="email" placeholder="Email"  /> 
                  <img src={img} id="img1" className={mostrarTexto ? "layout-user-shifted" : "layout-user"} />
                </div>
                <div>
                  <input type="password" id="password" placeholder="Password"  /> 
                  <img src={img2} id="img2" alt=""  className={mostrarTexto ? "layout-user-shifted" : "layout-user"} />
                </div>
              </form>
              <button className="edit-button" onClick={() => setMostrarTexto(!mostrarTexto)}>
                {mostrarTexto ? "Ocultar Texto" : "Mostrar Texto"}
              </button>
              {mostrarTexto && (
                <p>
                  A fisioterapia é uma área da saúde que desempenha um papel crucial na reabilitação e na promoção do bem-estar físico. 
                  Com foco na prevenção, diagnóstico e tratamento de uma variedade de condições, 
                  a fisioterapia emprega uma abordagem holística para ajudar os pacientes a recuperarem sua funcionalidade e qualidade de vida.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MeuPainellPat;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import imagemSobrenos from "../assets/imagem-sobrenos.png";
import Equipe from "../components/Equipe";
import Timeline from "../components/Timeline";
import CardsODS from "../components/CardsODS";
import "./SobreNos.css";

function Sobrenos() {
  return (
    <div className="sobre-nos">
      <Header />
      <section className="hero-section">
        <img
          src={imagemSobrenos}
          alt="Imagem Sobre Nós"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Sobre Nós</h1>
          <p>
            Conheça mais sobre nossa missão, valores e a equipe por trás do
            projeto.
          </p>
        </div>
      </section>
      <section className="content-section">
        <h2>Quem Somos</h2>
        <p>
          Somos uma equipe dedicada a transformar o cenário educacional e
          promover a cidadania digital através de soluções inovadoras e
          acessíveis.
        </p>
      </section>
      <Equipe />
      <Timeline />
      <CardsODS />
      <Footer />
    </div>
  );
}

export default Sobrenos;

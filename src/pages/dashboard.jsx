import React from "react";
import Navbar from "../components/Navbar";
import CardEixos from "../components/CardEixos";
import "./dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="dashboard-container">
        <h1 className="dashboard-title">Bem-vindo ao Painel</h1>
        <section className="cards-section">
          <CardEixos
            title="Eixo 1"
            description="Descrição do Eixo 1"
            link="/eixo1"
          />
          <CardEixos
            title="Eixo 2"
            description="Descrição do Eixo 2"
            link="/eixo2"
          />
          <CardEixos
            title="Eixo 3"
            description="Descrição do Eixo 3"
            link="/eixo3"
          />
        </section>
      </main>
    </>
  );
}

export default Dashboard;
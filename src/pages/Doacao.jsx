"use client"

import { useState } from "react"
import "./doacao.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

// Importando os arquivos SVG originais do seu projeto
import abacaxi from "../assets/img/abacaxi.svg"
import moeda from "../assets/img/moeda.svg"
import roupa from "../assets/img/roupa.svg"

export const Doacao = () => {
  const [activeTab, setActiveTab] = useState("financeira")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="doacao-page">
      <Header />

      <main className="doacao-container">
        <section className="doacao-hero">
          <div className="doacao-hero-content">
            <span className="pre-title">Faça parte da mudança</span>
            <h1 className="doacao-title">APOIE NOSSA CAUSA</h1>
            <div className="doacao-divider"></div>
            <p className="doacao-subtitle">Sua contribuição transforma vidas e fortalece nossa comunidade</p>
            <a href="#opcoes-doacao" className="doacao-cta-button">
              Como Posso Ajudar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon-arrow"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
          <div className="hero-overlay"></div>
        </section>

        <section id="opcoes-doacao" className="doacao-options">
          <div className="doacao-intro">
            <span className="section-tag">Opções de Doação</span>
            <h2>
              Aqui, você faz a <span className="doacao-highlight">diferença</span>!
            </h2>
            <p className="doacao-description">
              Escolha a forma de doação que melhor se adapta a você e ajude-nos a continuar nosso trabalho
            </p>
          </div>

          <div className="doacao-tabs">
            <button
              className={`doacao-tab ${activeTab === "financeira" ? "active" : ""}`}
              onClick={() => handleTabChange("financeira")}
            >
              <span className="tab-icon">💰</span>
              Financeira
            </button>
            <button
              className={`doacao-tab ${activeTab === "alimentos" ? "active" : ""}`}
              onClick={() => handleTabChange("alimentos")}
            >
              <span className="tab-icon">🍎</span>
              Alimentos
            </button>
            <button
              className={`doacao-tab ${activeTab === "roupas" ? "active" : ""}`}
              onClick={() => handleTabChange("roupas")}
            >
              <span className="tab-icon">👕</span>
              Roupas
            </button>
          </div>

          <div className="doacao-cards">
            {activeTab === "financeira" && (
              <div className="doacao-card active">
                <div className="doacao-card-header">
                  <div className="doacao-card-image">
                    <img src={moeda || "/placeholder.svg"} alt="Doação financeira" className="doacao-img" />
                  </div>
                  <div className="card-badge">Mais Popular</div>
                </div>
                <h3 className="doacao-card-title">Contribuição Financeira</h3>
                <p className="doacao-card-text">
                  Seu apoio financeiro permite que continuemos e expandamos nossos projetos sociais, beneficiando mais
                  crianças e famílias em situação de vulnerabilidade.
                </p>
                <div className="donation-options">
                  <button className="donation-amount">R$25</button>
                  <button className="donation-amount">R$50</button>
                  <button className="donation-amount active">R$100</button>
                  <button className="donation-amount">Outro</button>
                </div>
                <button className="doacao-button primary" onClick={() => window.open("#", "_blank")}>
                  <span className="button-icon">❤️</span>
                  Doar Agora
                </button>
                <div className="secure-payment">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-lock"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Pagamento 100% seguro
                </div>
              </div>
            )}

            {activeTab === "alimentos" && (
              <div className="doacao-card active">
                <div className="doacao-card-header">
                  <div className="doacao-card-image">
                    <img src={abacaxi || "/placeholder.svg"} alt="Doação de alimentos" className="doacao-img" />
                  </div>
                </div>
                <h3 className="doacao-card-title">Alimentos</h3>
                <p className="doacao-card-text">
                  Doe alimentos não perecíveis e ajude a combater a fome em nossa comunidade. Sua contribuição alimenta
                  famílias inteiras e proporciona nutrição adequada para crianças em desenvolvimento.
                </p>
                <div className="donation-info">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span className="info-text">Entrega na sede: R. São Domingos, 76</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <span className="info-text">Segunda a sexta: 8h às 17h</span>
                  </div>
                </div>
                <button className="doacao-button" onClick={() => window.open("#", "_blank")}>
                  <span className="button-icon">📋</span>
                  Ver Lista de Necessidades
                </button>
              </div>
            )}

            {activeTab === "roupas" && (
              <div className="doacao-card active">
                <div className="doacao-card-header">
                  <div className="doacao-card-image">
                    <img src={roupa || "/placeholder.svg"} alt="Doação de roupas" className="doacao-img" />
                  </div>
                </div>
                <h3 className="doacao-card-title">Roupas</h3>
                <p className="doacao-card-text">
                  Doe roupas em bom estado e ajude a aquecer e vestir quem mais precisa. Aceitamos roupas para todas as
                  idades, com foco especial em itens infantis e juvenis.
                </p>
                <div className="donation-info">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span className="info-text">Entrega na sede: R. São Domingos, 76</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <span className="info-text">Segunda a sexta: 8h às 17h</span>
                  </div>
                </div>
                <button className="doacao-button" onClick={() => window.open("#", "_blank")}>
                  <span className="button-icon">📱</span>
                  Agendar Coleta
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="doacao-impact">
          <div className="impact-container">
            <div className="impact-header">
              <span className="section-tag">Nosso Impacto</span>
              <h2>Seu impacto é real</h2>
              <div className="impact-divider"></div>
            </div>

            <div className="doacao-stats">
              <div className="doacao-stat">
                <div className="stat-icon-container">
                  <span className="stat-icon">👨‍👩‍👧‍👦</span>
                </div>
                <span className="doacao-stat-number">1.200+</span>
                <span className="doacao-stat-label">Pessoas ajudadas</span>
              </div>

              <div className="doacao-stat">
                <div className="stat-icon-container">
                  <span className="stat-icon">🧺</span>
                </div>
                <span className="doacao-stat-number">350+</span>
                <span className="doacao-stat-label">Cestas básicas</span>
              </div>

              <div className="doacao-stat">
                <div className="stat-icon-container">
                  <span className="stat-icon">👕</span>
                </div>
                <span className="doacao-stat-number">500+</span>
                <span className="doacao-stat-label">Peças de roupa</span>
              </div>
            </div>

            <div className="impact-testimonial">
              <div className="testimonial-quote">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="quote-icon"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
                <p>
                  Cada doação, independente do valor ou tipo, faz uma diferença significativa na vida de quem precisa.
                  Junte-se a nós nessa missão de transformar vidas e construir um futuro melhor para todos.
                </p>
              </div>
              <a href="#opcoes-doacao" className="impact-cta">
                Faça Parte Dessa História
              </a>
            </div>
          </div>
        </section>

        <section className="doacao-partners">
          <div className="partners-container">
            <h3>Parceiros que confiam em nosso trabalho</h3>
            <div className="partners-logos">
              <div className="partner-logo">
                <div className="logo-placeholder">Empresa A</div>
              </div>
              <div className="partner-logo">
                <div className="logo-placeholder">Empresa B</div>
              </div>
              <div className="partner-logo">
                <div className="logo-placeholder">Empresa C</div>
              </div>
              <div className="partner-logo">
                <div className="logo-placeholder">Empresa D</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Doacao


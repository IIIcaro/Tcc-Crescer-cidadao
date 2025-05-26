"use client"

import { useState } from "react"
import "./Doacao.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

// Importando os ícones/imagens
import moedaIcon from "../assets/img/moeda.svg"
import alimentosIcon from "../assets/img/abacaxi.svg"
import roupasIcon from "../assets/img/roupa.svg"
import qrCodePix from "../assets/img/qr-code-pix.png"

export const Doacao = () => {
  const [activeTab, setActiveTab] = useState("financeira")
  const [selectedAmount, setSelectedAmount] = useState("100")
  const [showQrCode, setShowQrCode] = useState(false)

  // Número de WhatsApp fictício para demonstração
  const whatsappNumber = "5575999999999"
  
  // Mensagens pré-definidas para WhatsApp
  const necessidadesMessage = encodeURIComponent("Olá! Gostaria de saber a lista de necessidades para doação de alimentos.")
  const coletaMessage = encodeURIComponent("Olá! Gostaria de agendar uma coleta de roupas para doação.")
  
  // Links do WhatsApp
  const necessidadesLink = `https://wa.me/${whatsappNumber}?text=${necessidadesMessage}`
  const coletaLink = `https://wa.me/${whatsappNumber}?text=${coletaMessage}`

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
  }

  const handleDonate = () => {
    setShowQrCode(true)
  }

  const closeQrCode = () => {
    setShowQrCode(false)
  }

  return (
    <div className="doacao-page">
      <Header />

      <main className="doacao-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">FAÇA PARTE DA MUDANÇA</span>
            <h1 className="hero-title">APOIE NOSSA CAUSA</h1>
            <p className="hero-subtitle">Sua contribuição transforma vidas e fortalece nossa comunidade</p>
            <a href="#opcoes-doacao" className="hero-button">
              Como Posso Ajudar
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
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Donation Options Section */}
        <section id="opcoes-doacao" className="options-section">
          <div className="section-header">
            <span className="section-tag">OPÇÕES DE DOAÇÃO</span>
            <h2 className="section-title">
              Aqui, você faz a <span className="highlight">diferença</span>!
            </h2>
            <p className="section-description">
              Escolha a forma de doação que melhor se adapta a você e ajude-nos a continuar nosso trabalho
            </p>
          </div>

          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "financeira" ? "active" : ""}`}
                onClick={() => handleTabChange("financeira")}
              >
                <img src={moedaIcon || "/placeholder.svg"} alt="" className="tab-icon" />
                Financeira
              </button>
              <button
                className={`tab ${activeTab === "alimentos" ? "active" : ""}`}
                onClick={() => handleTabChange("alimentos")}
              >
                <img src={alimentosIcon || "/placeholder.svg"} alt="" className="tab-icon" />
                Alimentos
              </button>
              <button
                className={`tab ${activeTab === "roupas" ? "active" : ""}`}
                onClick={() => handleTabChange("roupas")}
              >
                <img src={roupasIcon || "/placeholder.svg"} alt="" className="tab-icon" />
                Roupas
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "financeira" && (
                <div className="donation-card">
                  <div className="card-badge">Mais Popular</div>
                  <div className="card-icon">
                    <img src={moedaIcon || "/placeholder.svg"} alt="Doação financeira" />
                  </div>
                  <h3 className="card-title">Contribuição Financeira</h3>
                  <p className="card-description">
                    Seu apoio financeiro permite que continuemos e expandamos nossos projetos sociais, beneficiando mais
                    crianças e famílias em situação de vulnerabilidade.
                  </p>
                  <div className="amount-options">
                    <button
                      className={`amount-button ${selectedAmount === "25" ? "active" : ""}`}
                      onClick={() => handleAmountSelect("25")}
                    >
                      R$25
                    </button>
                    <button
                      className={`amount-button ${selectedAmount === "50" ? "active" : ""}`}
                      onClick={() => handleAmountSelect("50")}
                    >
                      R$50
                    </button>
                    <button
                      className={`amount-button ${selectedAmount === "100" ? "active" : ""}`}
                      onClick={() => handleAmountSelect("100")}
                    >
                      R$100
                    </button>
                    <button
                      className={`amount-button ${selectedAmount === "outro" ? "active" : ""}`}
                      onClick={() => handleAmountSelect("outro")}
                    >
                      Outro
                    </button>
                  </div>
                  <button className="donate-button" onClick={handleDonate}>
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
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Doar Agora
                  </button>
                  <div className="secure-payment">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Pagamento 100% seguro
                  </div>
                </div>
              )}

              {activeTab === "alimentos" && (
                <div className="donation-card">
                  <div className="card-icon">
                    <img src={alimentosIcon || "/placeholder.svg"} alt="Doação de alimentos" />
                  </div>
                  <h3 className="card-title">Alimentos</h3>
                  <p className="card-description">
                    Doe alimentos não perecíveis e ajude a combater a fome em nossa comunidade. Sua contribuição
                    alimenta famílias inteiras e proporciona nutrição adequada para crianças em desenvolvimento.
                  </p>
                  <div className="info-list">
                    <div className="info-item">
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
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Entrega na sede: R. São Domingos, 76</span>
                    </div>
                    <div className="info-item">
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
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>Segunda a sexta: 8h às 17h</span>
                    </div>
                  </div>
                  <a href={necessidadesLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
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
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    Ver Lista de Necessidades
                  </a>
                </div>
              )}

              {activeTab === "roupas" && (
                <div className="donation-card">
                  <div className="card-icon">
                    <img src={roupasIcon || "/placeholder.svg"} alt="Doação de roupas" />
                  </div>
                  <h3 className="card-title">Roupas</h3>
                  <p className="card-description">
                    Doe roupas em bom estado e ajude a aquecer e vestir quem mais precisa. Aceitamos roupas para todas
                    as idades, com foco especial em itens infantis e juvenis.
                  </p>
                  <div className="info-list">
                    <div className="info-item">
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
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Entrega na sede: R. São Domingos, 76</span>
                    </div>
                    <div className="info-item">
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
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>Segunda a sexta: 8h às 17h</span>
                    </div>
                  </div>
                  <a href={coletaLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
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
                      className="whatsapp-icon"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Agendar Coleta
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="impact-section">
          <div className="section-header">
            <span className="section-tag">NOSSO IMPACTO</span>
            <h2 className="section-title">Seu impacto é real</h2>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-number">1.200+</div>
              <div className="stat-label">Pessoas ajudadas</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="stat-number">350+</div>
              <div className="stat-label">Cestas básicas</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Peças de roupa</div>
            </div>
          </div>

          <div className="testimonial-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="quote-icon"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <p className="testimonial-text">
              Cada doação, independente do valor ou tipo, faz uma diferença significativa na vida de quem precisa.
              Junte-se a nós nessa missão de transformar vidas e construir um futuro melhor para todos.
            </p>
            <button className="cta-button">Faça Parte Dessa História</button>
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <h3 className="partners-title">Parceiros que confiam em nosso trabalho</h3>
          <div className="partners-grid">
            <div className="partner-logo">Empresa A</div>
            <div className="partner-logo">Empresa B</div>
            <div className="partner-logo">Empresa C</div>
            <div className="partner-logo">Empresa D</div>
          </div>
        </section>
      </main>

      {/* QR Code Modal */}
      {showQrCode && (
        <div className="qr-code-modal-overlay" onClick={closeQrCode}>
          <div className="qr-code-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeQrCode}>
              &times;
            </button>
            <h3 className="qr-code-title">Faça sua doação via PIX</h3>
            <p className="qr-code-description">
              Escaneie o QR Code abaixo com o aplicativo do seu banco para fazer uma doação de{" "}
              <strong>R${selectedAmount},00</strong>
            </p>
            <div className="qr-code-container">
              <img src={qrCodePix || "/placeholder.svg"} alt="QR Code para PIX" className="qr-code-image" />
            </div>
            <div className="qr-code-instructions">
              <p>
                <strong>Como usar:</strong>
              </p>
              <ol>
                <li>Abra o aplicativo do seu banco</li>
                <li>Escolha a opção de pagamento via PIX</li>
                <li>Escaneie o QR Code acima</li>
                <li>Confirme os dados e valor</li>
                <li>Conclua o pagamento</li>
              </ol>
            </div>
            <p className="qr-code-thanks">Agradecemos sua generosidade!</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Doacao

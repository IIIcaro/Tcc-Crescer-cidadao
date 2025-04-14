"use client"
import "./doacao.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"

// Importando os arquivos SVG originais do seu projeto
import abacaxi from "../assets/img/abacaxi.svg"
import moeda from "../assets/img/moeda.svg"
import roupa from "../assets/img/roupa.svg"

export const Doacao = () => {
  return (
    <>
      <Header />

      <main className="doacao-container">
        <section className="doacao-hero">
          <div className="doacao-hero-content">
            <h1 className="doacao-title">APOIE NOSSA CAUSA</h1>
            <div className="doacao-divider"></div>
            <p className="doacao-subtitle">Sua contribuição transforma vidas e fortalece nossa comunidade</p>
          </div>
        </section>

        <section className="doacao-options">
          <div className="doacao-intro">
            <h2>
              Aqui, você faz a <span className="doacao-highlight">diferença</span>!
            </h2>
            <p className="doacao-description">
              Escolha a forma de doação que melhor se adapta a você e ajude-nos a continuar nosso trabalho
            </p>
          </div>

          <div className="doacao-cards">
            <div className="doacao-card">
              <div className="doacao-card-image">
                <img src={abacaxi || "/placeholder.svg"} alt="Doação de alimentos" className="doacao-img" />
              </div>
              <h3 className="doacao-card-title">Alimentos</h3>
              <p className="doacao-card-text">
                Doe alimentos não perecíveis e ajude a combater a fome em nossa comunidade
              </p>
              <button className="doacao-button" onClick={() => window.open("#", "_blank")}>
                Doar Alimentos
              </button>
            </div>

            <div className="doacao-card">
              <div className="doacao-card-image">
                <img src={moeda || "/placeholder.svg"} alt="Doação financeira" className="doacao-img" />
              </div>
              <h3 className="doacao-card-title">Contribuição Financeira</h3>
              <p className="doacao-card-text">
                Seu apoio financeiro permite que continuemos e expandamos nossos projetos sociais
              </p>
              <button className="doacao-button primary" onClick={() => window.open("#", "_blank")}>
                Doar Agora
              </button>
            </div>

            <div className="doacao-card">
              <div className="doacao-card-image">
                <img src={roupa || "/placeholder.svg"} alt="Doação de roupas" className="doacao-img" />
              </div>
              <h3 className="doacao-card-title">Roupas</h3>
              <p className="doacao-card-text">Doe roupas em bom estado e ajude a aquecer e vestir quem mais precisa</p>
              <button className="doacao-button" onClick={() => window.open("#", "_blank")}>
                Doar Roupas
              </button>
            </div>
          </div>
        </section>

        <section className="doacao-impact">
          <h2>Seu impacto é real</h2>
          <div className="doacao-stats">
            <div className="doacao-stat">
              <span className="doacao-stat-number">1.200+</span>
              <span className="doacao-stat-label">Pessoas ajudadas</span>
            </div>
            <div className="doacao-stat">
              <span className="doacao-stat-number">350+</span>
              <span className="doacao-stat-label">Cestas básicas</span>
            </div>
            <div className="doacao-stat">
              <span className="doacao-stat-number">500+</span>
              <span className="doacao-stat-label">Peças de roupa</span>
            </div>
          </div>
          <p className="doacao-impact-text">
            Cada doação, independente do valor ou tipo, faz uma diferença significativa na vida de quem precisa.
            Junte-se a nós nessa missão de transformar vidas e construir um futuro melhor para todos.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}


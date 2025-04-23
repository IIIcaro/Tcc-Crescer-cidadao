import "./servicos.css"
import Header from "../components/Header"
import Coisa from "../components/Coisa"
import Cards from "../components/Cards"
import { Footer } from "../components/footer"

export const Servicosl = () => {
  return (
    <div className="services-page">
      <Header />
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Serviços Especializados</h1>
          <p>Conheça nossos serviços dedicados ao desenvolvimento e bem-estar de crianças e adolescentes</p>
        </div>
      </div>
      <Coisa />
      <div className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">O Que Dizem Sobre Nós</h2>
          <div className="testimonials-divider"></div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "A equipe do Crescer Cidadão transformou a vida do meu filho. O progresso que ele teve com a
                fisioterapia foi incrível!"
              </div>
              <div className="testimonial-author">Maria Silva, mãe do Pedro</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "Profissionais extremamente dedicados e atenciosos. Minha filha adora as sessões de terapia
                ocupacional."
              </div>
              <div className="testimonial-author">Carlos Oliveira, pai da Ana</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "O apoio psicológico foi fundamental para ajudar nossa família a lidar com os desafios. Somos muito
                gratos!"
              </div>
              <div className="testimonial-author">Juliana Santos, mãe do Lucas</div>
            </div>
          </div>
        </div>
      </div>
      <Cards />
      <section className="cta-section">
        <div className="cta-container">
          <h2>Agende uma Consulta</h2>
          <p>Entre em contato conosco para agendar uma avaliação inicial ou tirar suas dúvidas sobre nossos serviços</p>
          <div className="cta-buttons">
            <a href="/contato" className="cta-button primary">
              Agendar Agora
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Servicosl

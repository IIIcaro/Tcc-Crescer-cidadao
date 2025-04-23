import "./servicos.css"
import Header from "../components/Header"
import Coisa from "../components/Coisa"
import Cards from "../components/Cards"

export const Servicosl = () => {
  return (
    <div className="services-page">
      <Header />

      <section className="services-hero">
        <div className="services-hero-overlay">
          <div className="services-hero-content">
            <h1>Serviços Especializados</h1>
            <p>Conheça nossos serviços dedicados ao desenvolvimento e bem-estar de crianças e adolescentes</p>
          </div>
        </div>
      </section>

      <Coisa />

      <section className="services-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="feature-icon-heart"></i>
              </div>
              <h3>Atendimento Humanizado</h3>
              <p>Cuidamos de cada criança com atenção, carinho e respeito às suas particularidades</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="feature-icon-certificate"></i>
              </div>
              <h3>Profissionais Qualificados</h3>
              <p>Nossa equipe é formada por especialistas com ampla experiência e formação contínua</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="feature-icon-users"></i>
              </div>
              <h3>Abordagem Multidisciplinar</h3>
              <p>Integramos diferentes especialidades para um tratamento completo e eficaz</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>O Que Dizem Sobre Nós</h2>
            <div className="section-divider"></div>
            <p>Histórias reais de famílias que confiam em nosso trabalho</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "A equipe do Crescer Cidadão transformou a vida do meu filho. O progresso que ele teve com a
                fisioterapia foi incrível!"
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar"></div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Maria Silva</div>
                  <div className="testimonial-relation">mãe do Pedro</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                "Profissionais extremamente dedicados e atenciosos. Minha filha adora as sessões de terapia
                ocupacional."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar"></div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Carlos Oliveira</div>
                  <div className="testimonial-relation">pai da Ana</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                "O apoio psicológico foi fundamental para ajudar nossa família a lidar com os desafios. Somos muito
                gratos!"
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar"></div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Juliana Santos</div>
                  <div className="testimonial-relation">mãe do Lucas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Agende uma Consulta</h2>
            <p>
              Entre em contato conosco para agendar uma avaliação inicial ou tirar suas dúvidas sobre nossos serviços
            </p>
            <a href="/contato" className="cta-button">
              Agendar Agora
            </a>
          </div>
        </div>
      </section>

      <Cards />
    </div>
  )
}

export default Servicosl

"use client"

import { useState } from "react"
import "./servicos.css"
import Header from "../components/Header"
import Coisa from "../components/Coisa"
import Cards from "../components/Cards"

export const Servicosl = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "A equipe do Crescer Cidadão transformou a vida do meu filho. O progresso que ele teve com a fisioterapia foi incrível!",
      name: "Maria Silva",
      relation: "mãe do Pedro",
      avatar: "/src/assets/img/avatar1.jpg",
    },
    {
      quote: "Profissionais extremamente dedicados e atenciosos. Minha filha adora as sessões de terapia ocupacional.",
      name: "Carlos Oliveira",
      relation: "pai da Ana",
      avatar: "/src/assets/img/avatar2.jpg",
    },
    {
      quote:
        "O apoio psicológico foi fundamental para ajudar nossa família a lidar com os desafios. Somos muito gratos!",
      name: "Juliana Santos",
      relation: "mãe do Lucas",
      avatar: "/src/assets/img/avatar3.jpg",
    },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const features = [
    {
      icon: "heart",
      title: "Atendimento Humanizado",
      description: "Cuidamos de cada criança com atenção, carinho e respeito às suas particularidades",
      color: "var(--primary-color)",
    },
    {
      icon: "certificate",
      title: "Profissionais Qualificados",
      description: "Nossa equipe é formada por especialistas com ampla experiência e formação contínua",
      color: "var(--blue)",
    },
    {
      icon: "users",
      title: "Abordagem Multidisciplinar",
      description: "Integramos diferentes especialidades para um tratamento completo e eficaz",
      color: "var(--purple)",
    },
  ]

  return (
    <div className="services-page">
      <Header />

      <section className="services-hero">
        <div className="services-hero-overlay">
          <div className="services-hero-content animate-fade-in">
            <h1>Serviços Especializados</h1>
            <div className="hero-divider"></div>
            <p>Conheça nossos serviços dedicados ao desenvolvimento e bem-estar de crianças e adolescentes</p>
            <a href="#servicos" className="hero-button">
              Conheça Nossos Serviços
            </a>
          </div>
        </div>
      </section>

      <div id="servicos">
        <Coisa />
      </div>

      <section className="services-features">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Diferenciais</h2>
            <div className="section-divider"></div>
            <p>O que torna nosso atendimento especial</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card animate-slide-up delay-${index}`}>
                <div className="feature-icon" style={{ backgroundColor: `${feature.color}20` }}>
                  <i className={`feature-icon-${feature.icon}`} style={{ color: feature.color }}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
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

          <div className="testimonials-carousel">
            <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Depoimento anterior">
              <i className="nav-arrow-left">‹</i>
            </button>

            <div className="testimonials-wrapper">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`testimonial-card ${index === activeTestimonial ? "active" : ""}`}>
                  <div className="testimonial-quote-icon">❝</div>
                  <div className="testimonial-quote">{testimonial.quote}</div>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      <img
                        src={testimonial.avatar || "/placeholder.svg?height=60&width=60"}
                        alt={`Foto de ${testimonial.name}`}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=60&width=60"
                        }}
                      />
                    </div>
                    <div className="testimonial-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-relation">{testimonial.relation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Próximo depoimento">
              <i className="nav-arrow-right">›</i>
            </button>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === activeTestimonial ? "active" : ""}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Depoimento ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-scale-in">
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

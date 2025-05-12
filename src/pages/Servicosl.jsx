"use client"

import { useState } from "react"
import "./servicos.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"
import fisioterapia from "../assets/img/fisioterapia.png"
import tocupacional from "../assets/img/tocupacional.png"
import apoiopsicologico from "../assets/img/apoiopsicologico.png"

export const Servicosl = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedService, setExpandedService] = useState(null)

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

  const services = [
    {
      id: "service1",
      image: fisioterapia,
      title: "Fisioterapia",
      description:
        "A fisioterapia é uma área da saúde que desempenha um papel crucial na reabilitação e na promoção do bem-estar físico. Nossos profissionais utilizam técnicas especializadas para ajudar crianças e adolescentes a desenvolverem suas capacidades motoras e melhorarem sua qualidade de vida.",
      color: "#3498db",
      benefits: [
        "Melhora da coordenação motora",
        "Fortalecimento muscular",
        "Aumento da flexibilidade",
        "Redução de dores e desconfortos",
      ],
    },
    {
      id: "service2",
      image: tocupacional,
      title: "Terapia Ocupacional",
      description:
        "A terapia ocupacional auxilia no desenvolvimento de habilidades necessárias para atividades diárias e participação social. Trabalhamos com abordagens personalizadas que promovem a independência e autonomia, respeitando as necessidades específicas de cada criança e adolescente.",
      color: "#2ecc71",
      benefits: [
        "Desenvolvimento de habilidades para atividades diárias",
        "Melhora da coordenação motora fina",
        "Aumento da independência",
        "Adaptação ao ambiente escolar e social",
      ],
    },
    {
      id: "service3",
      image: apoiopsicologico,
      title: "Apoio Psicológico",
      description:
        "O apoio psicológico é fundamental para o desenvolvimento emocional saudável. Nossa equipe oferece suporte tanto para as crianças e adolescentes quanto para suas famílias, criando um ambiente acolhedor onde todos podem expressar seus sentimentos e desenvolver estratégias de enfrentamento.",
      color: "#9b59b6",
      benefits: [
        "Desenvolvimento de habilidades sociais",
        "Gestão de emoções",
        "Aumento da autoestima",
        "Suporte para familiares",
      ],
    },
  ]

  const toggleService = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null)
    } else {
      setExpandedService(serviceId)
    }
  }

  const features = [
    {
      icon: "heart",
      title: "Atendimento Humanizado",
      description: "Cuidamos de cada criança com atenção, carinho e respeito às suas particularidades",
      color: "#27c193",
    },
    {
      icon: "certificate",
      title: "Profissionais Qualificados",
      description: "Nossa equipe é formada por especialistas com ampla experiência e formação contínua",
      color: "#1a9ad7",
    },
    {
      icon: "users",
      title: "Abordagem Multidisciplinar",
      description: "Integramos diferentes especialidades para um tratamento completo e eficaz",
      color: "#9b59b6",
    },
  ]

  const team = [
    {
      name: "Marcos Felipe",
      role: "Fisioterapia",
      specialty: "Especialista em Reabilitação Neurológica",
      color: "#3498db",
    },
    {
      name: "Ana Carolina",
      role: "Nutrição",
      specialty: "Especialista em Nutrição Funcional",
      color: "#2ecc71",
    },
    {
      name: "Power Guido",
      role: "Psicologia",
      specialty: "Especialista em Terapia Cognitivo-Comportamental",
      color: "#9b59b6",
    },
  ]

  return (
    <div className="services-page">
      <Header />

      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Serviços Especializados</h1>
            <div className="hero-divider"></div>
            <p>Conheça nossos serviços dedicados ao desenvolvimento e bem-estar de crianças e adolescentes</p>
            <a href="#servicos" className="hero-button">
              Conheça Nossos Serviços
            </a>
          </div>
        </div>
      </section>

      <section id="servicos" className="services-section">
        <div className="section-header">
          <h2>NOSSOS SERVIÇOS</h2>
          <div className="section-divider"></div>
          <p>Atendimento especializado para cada necessidade</p>
        </div>

        <div className="services-container">
          {services.map((service, index) => (
            <div key={service.id} className="service-card">
              <div className="service-image-container">
                <img src={service.image || "/placeholder.svg"} alt={service.title} className="service-image" />
                <div className="service-overlay" style={{ backgroundColor: `${service.color}20` }}>
                  <h3 className="service-title">{service.title}</h3>
                  <button
                    className="service-button"
                    onClick={() => toggleService(service.id)}
                    style={{ backgroundColor: service.color }}
                  >
                    VER MAIS
                  </button>
                </div>
              </div>
              
              {expandedService === service.id && (
                <div className="service-details">
                  <p>{service.description}</p>
                  <div className="service-benefits">
                    <h4>Benefícios:</h4>
                    <ul>
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>NOSSOS DIFERENCIAIS</h2>
          <div className="section-divider"></div>
          <p>O que torna nosso atendimento especial</p>
        </div>

        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                <i className={`feature-icon-${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2>O QUE DIZEM SOBRE NÓS</h2>
          <div className="section-divider"></div>
          <p>Histórias reais de famílias que confiam em nosso trabalho</p>
        </div>

        <div className="testimonials-container">
          <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Depoimento anterior">
            ‹
          </button>

          <div className="testimonial-card">
            <div className="testimonial-quote-icon">❝</div>
            <p className="testimonial-quote">{testimonials[activeTestimonial].quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                <img
                  src={testimonials[activeTestimonial].avatar || "/placeholder.svg?height=60&width=60"}
                  alt={`Foto de ${testimonials[activeTestimonial].name}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=60&width=60"
                  }}
                />
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonials[activeTestimonial].name}</div>
                <div className="testimonial-relation">{testimonials[activeTestimonial].relation}</div>
              </div>
            </div>
          </div>

          <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Próximo depoimento">
            ›
          </button>
        </div>

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
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Agende uma Consulta</h2>
          <p>Entre em contato conosco para agendar uma avaliação inicial ou tirar suas dúvidas sobre nossos serviços</p>
          <a href="/contato" className="cta-button">
            AGENDAR AGORA
          </a>
        </div>
      </section>

      <section className="team-section">
        <div className="section-header">
          <h2>NOSSA EQUIPE</h2>
          <div className="section-divider"></div>
          <p>Conheça os profissionais dedicados que fazem parte da nossa equipe multidisciplinar</p>
        </div>

        <div className="team-container">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-card-header" style={{ backgroundColor: `${member.color}20` }}>
                <div className="team-avatar">
                  <div className="team-avatar-placeholder" style={{ borderColor: member.color }}></div>
                </div>
              </div>
              <div className="team-card-body">
                <h3 className="team-role" style={{ color: member.color }}>{member.role}</h3>
                <h4 className="team-name">{member.name}</h4>
                <p className="team-specialty">{member.specialty}</p>
                <button className="team-button" style={{ color: member.color, borderColor: member.color }}>
                  Ler Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Servicosl

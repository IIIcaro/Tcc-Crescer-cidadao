"use client"

import { useState } from "react"
import "./Coisa.css"
import Retangulo from "../assets/img/retangulo-1.svg"
import Retangulo2 from "../assets/img/retangulo-2.svg"
import fisioterapia from "../assets/img/fisioterapia.png"
import tocupacional from "../assets/img/tocupacional.png"
import apoiopsicologico from "../assets/img/apoiopsicologico.png"

const Coisa = () => {
  const [expandedService, setExpandedService] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)

  const toggleService = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null)
    } else {
      setExpandedService(serviceId)
    }
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

  return (
    <>
      <section className="section-header">
        <div className="section-title-container">
          <div className="line-decoration">
            <img src={Retangulo || "/placeholder.svg"} alt="Decoração" />
          </div>
          <h2 className="section-title">NOSSOS SERVIÇOS</h2>
          <div className="line-decoration">
            <img src={Retangulo2 || "/placeholder.svg"} alt="Decoração" />
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${expandedService === service.id ? "expanded" : ""}`}
              style={{ "--service-color": service.color }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="service-image-container">
                <img src={service.image || "/placeholder.svg"} alt={service.title} className="service-image" />
                <div className="service-overlay">
                  <h3 className="service-title">{service.title}</h3>
                  <button
                    className="service-button"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={expandedService === service.id}
                  >
                    {expandedService === service.id ? "Ver Menos" : "Ver Mais"}
                  </button>
                </div>
              </div>

              <div className="service-description">
                <p>{service.description}</p>
                <div className="service-benefits">
                  <h4>Benefícios:</h4>
                  <ul>
                    {service.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-header">
        <div className="section-title-container">
          <div className="line-decoration">
            <img src={Retangulo || "/placeholder.svg"} alt="Decoração" />
          </div>
          <h2 className="section-title">PROFISSIONAIS</h2>
          <div className="line-decoration">
            <img src={Retangulo2 || "/placeholder.svg"} alt="Decoração" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Coisa

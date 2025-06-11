"use client"

import { useState, useEffect } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"
import "./Sobrenos.css"
import Logo1 from "../assets/img/img10.jpg"
import Logo2 from "../assets/img/img20.jpg"
import Logo3 from "../assets/img/mulher.png"

const SobreNos = () => {
  const [activeTab, setActiveTab] = useState("equipe")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const NextArrow = (props) => {
    const { style, onClick } = props
    return (
      <button
        className="custom-arrow next-arrow"
        style={{ ...style }}
        onClick={onClick}
        aria-label="Próximo"
        type="button"
      >
        <span aria-hidden="true">›</span>
      </button>
    )
  }

  const PrevArrow = (props) => {
    const { style, onClick } = props
    return (
      <button
        className="custom-arrow prev-arrow"
        style={{ ...style }}
        onClick={onClick}
        aria-label="Anterior"
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>
    )
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
        },
      },
    ],
  }

  const teamMembers = [
    {
      name: "Carla",
      image: Logo1,
      role: "Assistente Social",
      bio: "Carla dedica sua carreira a apoiar famílias em situação de vulnerabilidade. Com especialização em desenvolvimento infantil e familiar, ela implementa programas que fortalecem vínculos comunitários e promovem autonomia. Seu trabalho incansável tem transformado a vida de centenas de crianças e adolescentes, criando oportunidades de crescimento e desenvolvimento integral.",
      experience: "12 anos",
      specialty: "Desenvolvimento Familiar",
    },
    {
      name: "Angela",
      image: Logo3,
      role: "Coordenadora de Projetos",
      bio: "Angela é uma profissional dedicada e confiável, conhecida por sua ética de trabalho exemplar e sua atenção aos detalhes. Com habilidades de comunicação eficazes, ela facilita a colaboração entre departamentos. Profissionalmente competente, ela resolve problemas rapidamente e busca constantemente oportunidades de aprendizado. Sua personalidade gentil e empática cria um ambiente de trabalho positivo e acolhedor para todos ao seu redor.",
      experience: "8 anos",
      specialty: "Gestão de Projetos Sociais",
    },
    {
      name: "Roberto",
      image: Logo2,
      role: "Diretor Executivo",
      bio: "Roberto é um líder visionário com mais de 15 anos de experiência no terceiro setor. Sua paixão por transformação social e desenvolvimento comunitário tem sido o motor por trás de diversos projetos bem-sucedidos. Com formação em Gestão Social, ele coordena nossa equipe com empatia e determinação, sempre buscando novas formas de ampliar o impacto positivo da nossa organização.",
      experience: "15 anos",
      specialty: "Liderança e Gestão Social",
    },
  ]

  return (
    <div className="sobre-nos-page">
      <Header />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1 className={`page-title ${isVisible ? "fade-in" : ""}`}>SOBRE NÓS</h1>
          <p className={`subtitle ${isVisible ? "fade-in-delay" : ""}`}>
            Conheça nossa história, equipe e missão para transformar vidas e construir um futuro inclusivo
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "equipe" ? "active" : ""}`}
              onClick={() => setActiveTab("equipe")}
            >
              <span className="tab-icon">👥</span>
              <span>Nossa Equipe</span>
            </button>
            <button
              className={`tab-button ${activeTab === "historia" ? "active" : ""}`}
              onClick={() => setActiveTab("historia")}
            >
              <span className="tab-icon">📚</span>
              <span>Nossa História</span>
            </button>
            <button
              className={`tab-button ${activeTab === "missao" ? "active" : ""}`}
              onClick={() => setActiveTab("missao")}
            >
              <span className="tab-icon">🏆</span>
              <span>Missão e Valores</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="container">
          {/* Team Members Section - REDESIGNED */}
          {activeTab === "equipe" && (
            <div className={`team-section-elegant ${isVisible ? "fade-in" : ""}`}>
              <div className="section-header">
                <h2 className="section-title-elegant">NOSSA EQUIPE</h2>
                <div className="section-subtitle">
                  Profissionais dedicados que trabalham diariamente para fazer a diferença
                </div>
              </div>

              <div className="team-grid-elegant">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-card-elegant">
                    <div className="card-image-section">
                      <div className="member-photo">
                        <img
                          src={member.image || "/placeholder.svg?height=200&width=200"}
                          alt={`Foto de ${member.name}`}
                          className="photo-image"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "/placeholder.svg?height=200&width=200"
                          }}
                        />
                        <div className="experience-badge-elegant">{member.experience}</div>
                      </div>
                    </div>

                    <div className="card-content-section">
                      <div className="member-info">
                        <h3 className="member-name-elegant">{member.name}</h3>
                        <div className="member-role-elegant">{member.role}</div>
                        <div className="member-specialty-elegant">{member.specialty}</div>
                      </div>

                      <div className="member-bio-section">
                        <p className="member-bio-elegant">{member.bio}</p>
                      </div>

                      <div className="social-section">
                        <button className="social-btn-elegant linkedin">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                        </button>
                        <button className="social-btn-elegant email">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Section - REDESIGNED WITHOUT IMAGE */}
          {activeTab === "historia" && (
            <div className={`history-section-elegant ${isVisible ? "fade-in" : ""}`}>
              <div className="section-header">
                <h2 className="section-title-elegant">NOSSA HISTÓRIA</h2>
                <div className="section-subtitle">
                  Uma jornada de dedicação, superação e compromisso com a transformação social
                </div>
              </div>

              <div className="timeline-container-elegant">
                <div className="timeline-item-elegant">
                  <div className="timeline-marker-elegant">
                    <div className="timeline-icon-elegant">🌱</div>
                  </div>
                  <div className="timeline-content-elegant">
                    <div className="timeline-year-elegant">2010</div>
                    <h3>O Início</h3>
                    <p>
                      Marcos era um homem de meia-idade com um sorriso amável e olhos que brilhavam de determinação. Ele
                      trabalhava como contador em uma pequena empresa familiar chamada "Soluções Financeiras
                      Integradas". Desde o momento em que entrou na empresa, Marcos mostrou um compromisso inabalável
                      com seu trabalho.
                    </p>
                  </div>
                </div>

                <div className="timeline-item-elegant">
                  <div className="timeline-marker-elegant">
                    <div className="timeline-icon-elegant">🤝</div>
                  </div>
                  <div className="timeline-content-elegant">
                    <div className="timeline-year-elegant">2015</div>
                    <h3>Expansão Comunitária</h3>
                    <p>
                      No entanto, a vida de Marcos não era apenas sobre números e planilhas. Ele também era um grande
                      apoiador da comunidade local. Sempre que havia eventos de caridade ou oportunidades de
                      voluntariado, Marcos estava lá na linha de frente, oferecendo seu tempo e recursos para ajudar os
                      outros.
                    </p>
                  </div>
                </div>

                <div className="timeline-item-elegant">
                  <div className="timeline-marker-elegant">
                    <div className="timeline-icon-elegant">💪</div>
                  </div>
                  <div className="timeline-content-elegant">
                    <div className="timeline-year-elegant">2018</div>
                    <h3>Superando Desafios</h3>
                    <p>
                      Ao longo dos anos, Marcos se tornou um pilar da empresa. Um dia, a empresa enfrentou uma crise
                      financeira inesperada devido a mudanças no mercado. Marcos permaneceu calmo e focado, trabalhando
                      incansavelmente para encontrar soluções criativas.
                    </p>
                  </div>
                </div>

                <div className="timeline-item-elegant">
                  <div className="timeline-marker-elegant">
                    <div className="timeline-icon-elegant">🏆</div>
                  </div>
                  <div className="timeline-content-elegant">
                    <div className="timeline-year-elegant">2023</div>
                    <h3>Legado e Reconhecimento</h3>
                    <p>
                      Marcos foi elogiado por sua liderança excepcional e recebeu reconhecimento não apenas da direção
                      da empresa, mas também de toda a comunidade. Sua história continuou a inspirar não apenas seus
                      colegas de trabalho, mas todos aqueles que tiveram a sorte de cruzar seu caminho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Section - REDESIGNED */}
          {activeTab === "missao" && (
            <div className={`mission-section-elegant ${isVisible ? "fade-in" : ""}`}>
              <div className="section-header">
                <h2 className="section-title-elegant">MISSÃO E VALORES</h2>
                <div className="section-subtitle">
                  Nossos princípios fundamentais guiam cada ação em busca de um mundo mais justo
                </div>
              </div>

              <div className="mission-content-elegant">
                <div className="mission-card-elegant">
                  <div className="mission-icon-elegant">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <h3>Nossa Missão</h3>
                  <p>
                    Promover o desenvolvimento integral de crianças e adolescentes em situação de vulnerabilidade
                    social, através de educação, cultura e cidadania, contribuindo para a construção de uma sociedade
                    mais justa e igualitária.
                  </p>
                </div>

                <div className="values-grid-elegant">
                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h4>Respeito à Diversidade</h4>
                    <p>Valorizamos e respeitamos as diferenças individuais, culturais e sociais.</p>
                  </div>

                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h4>Transparência</h4>
                    <p>Mantemos uma gestão transparente e ética em todas as nossas ações e projetos.</p>
                  </div>

                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h4>Compromisso Social</h4>
                    <p>Trabalhamos com dedicação para transformar realidades e promover justiça social.</p>
                  </div>

                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                    <h4>Inovação</h4>
                    <p>Buscamos constantemente novas abordagens e soluções para os desafios sociais.</p>
                  </div>

                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h4>Colaboração</h4>
                    <p>Acreditamos no poder do trabalho em equipe e das parcerias para ampliar nosso impacto.</p>
                  </div>

                  <div className="value-card-elegant">
                    <div className="value-icon-elegant">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h4>Excelência</h4>
                    <p>Buscamos sempre a excelência em nossos serviços e no atendimento às comunidades.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SobreNos

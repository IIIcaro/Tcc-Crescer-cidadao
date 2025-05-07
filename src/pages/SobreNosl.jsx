"use client"

import { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Header from "../components/Header"
import { Footer } from "../components/footer"
import "./SobreNos.css"
import Logo1 from "../assets/img/img10.jpg"
import Logo2 from "../assets/img/img20.jpg"
import Logo3 from "../assets/img/mulher.png"
import Logo4 from "../assets/img/PuloCrianças.png"

const SobreNosl = () => {
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
      name: "Angela",
      image: Logo1,
      role: "Coordenadora de Projetos",
      bio: "Angela é uma profissional dedicada e confiável, conhecida por sua ética de trabalho exemplar e sua atenção aos detalhes. Com habilidades de comunicação eficazes, ela facilita a colaboração entre departamentos. Profissionalmente competente, ela resolve problemas rapidamente e busca constantemente oportunidades de aprendizado. Sua personalidade gentil e empática cria um ambiente de trabalho positivo e acolhedor para todos ao seu redor.",
    },
    {
      name: "Roberto",
      image: Logo2,
      role: "Diretor Executivo",
      bio: "Roberto é um líder visionário com mais de 15 anos de experiência no terceiro setor. Sua paixão por transformação social e desenvolvimento comunitário tem sido o motor por trás de diversos projetos bem-sucedidos. Com formação em Gestão Social, ele coordena nossa equipe com empatia e determinação, sempre buscando novas formas de ampliar o impacto positivo da nossa organização.",
    },
    {
      name: "Carla",
      image: Logo3,
      role: "Assistente Social",
      bio: "Carla dedica sua carreira a apoiar famílias em situação de vulnerabilidade. Com especialização em desenvolvimento infantil e familiar, ela implementa programas que fortalecem vínculos comunitários e promovem autonomia. Seu trabalho incansável tem transformado a vida de centenas de crianças e adolescentes, criando oportunidades de crescimento e desenvolvimento integral.",
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
          {/* Team Members Section */}
          {activeTab === "equipe" && (
            <div className={`team-section ${isVisible ? "fade-in" : ""}`}>
              <h2 className="section-title">NOSSA EQUIPE</h2>
              <p className="section-description">
                Conheça os profissionais dedicados que trabalham diariamente para fazer a diferença na vida de nossas
                crianças e adolescentes.
              </p>
              <div className="team-slider-container">
                <Slider {...sliderSettings}>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                      <div className="member-image-container">
                        <img
                          src={member.image || "/placeholder.svg?height=200&width=200"}
                          alt={`Foto de ${member.name}`}
                          className="member-image"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "/placeholder.svg?height=200&width=200"
                          }}
                        />
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <p className="member-bio">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* History Section */}
          {activeTab === "historia" && (
            <div className={`history-section ${isVisible ? "fade-in" : ""}`}>
              <h2 className="section-title">NOSSA HISTÓRIA</h2>
              <p className="section-description">
                A jornada que nos trouxe até aqui é marcada por dedicação, superação e um compromisso inabalável com a
                transformação social.
              </p>
              <div className="history-content">
                <div className="history-text">
                  <p>
                    Marcos era um homem de meia-idade com um sorriso amável e olhos que brilhavam de determinação. Ele
                    trabalhava como contador em uma pequena empresa familiar chamada "Soluções Financeiras Integradas".
                    Desde o momento em que entrou na empresa, Marcos mostrou um compromisso inabalável com seu trabalho.
                    Ele era conhecido por sua ética profissional impecável e sua capacidade de resolver problemas
                    financeiros complexos com facilidade.
                  </p>
                  <p>
                    No entanto, a vida de Marcos não era apenas sobre números e planilhas. Ele também era um grande
                    apoiador da comunidade local. Sempre que havia eventos de caridade ou oportunidades de voluntariado,
                    Marcos estava lá na linha de frente, oferecendo seu tempo e recursos para ajudar os outros.
                  </p>
                </div>
                <div className="history-image">
                  <img
                    src={Logo4 || "/placeholder.svg?height=400&width=600"}
                    alt="Crianças pulando"
                    className="history-img"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=400&width=600"
                    }}
                  />
                </div>
                <div className="history-text">
                  <p>
                    Ao longo dos anos, Marcos se tornou um pilar da empresa. Ele não apenas cuidava das finanças, mas
                    também atuava como mentor para os funcionários mais jovens, compartilhando sua sabedoria e
                    experiência com generosidade. Um dia, a empresa enfrentou uma crise financeira inesperada devido a
                    mudanças no mercado. Todos estavam preocupados com o futuro da empresa, mas Marcos permaneceu calmo
                    e focado.
                  </p>
                  <p>
                    Ele trabalhou incansavelmente para encontrar soluções criativas para estabilizar as finanças da
                    empresa e manter todos os funcionários empregados. Graças aos esforços hercúleos de Marcos e sua
                    equipe, a empresa conseguiu superar a crise e emergir mais forte do que nunca.
                  </p>
                  <p>
                    Marcos foi elogiado por sua liderança excepcional e recebeu reconhecimento não apenas da direção da
                    empresa, mas também de toda a comunidade. Com o tempo, Marcos se aposentou da "Soluções Financeiras
                    Integradas", deixando um legado de integridade, trabalho árduo e compaixão. Sua história continuou a
                    inspirar não apenas seus colegas de trabalho, mas todos aqueles que tiveram a sorte de cruzar seu
                    caminho.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mission Section */}
          {activeTab === "missao" && (
            <div className={`mission-section ${isVisible ? "fade-in" : ""}`}>
              <h2 className="section-title">MISSÃO E VALORES</h2>
              <p className="section-description">
                Nossos princípios fundamentais guiam cada ação e decisão que tomamos em busca de um mundo mais justo e
                igualitário.
              </p>
              <div className="mission-content">
                <div className="mission-card">
                  <div className="mission-icon">
                    <span className="mission-icon-symbol">❤️</span>
                  </div>
                  <h3>Nossa Missão</h3>
                  <p>
                    Promover o desenvolvimento integral de crianças e adolescentes em situação de vulnerabilidade
                    social, através de educação, cultura e cidadania, contribuindo para a construção de uma sociedade
                    mais justa e igualitária.
                  </p>
                </div>

                <div className="values-container">
                  <h3>Nossos Valores</h3>
                  <ul className="values-list">
                    <li>
                      <strong>Respeito à diversidade</strong>
                      <p>Valorizamos e respeitamos as diferenças individuais, culturais e sociais.</p>
                    </li>
                    <li>
                      <strong>Transparência</strong>
                      <p>Mantemos uma gestão transparente e ética em todas as nossas ações e projetos.</p>
                    </li>
                    <li>
                      <strong>Compromisso social</strong>
                      <p>Trabalhamos com dedicação para transformar realidades e promover justiça social.</p>
                    </li>
                    <li>
                      <strong>Inovação</strong>
                      <p>Buscamos constantemente novas abordagens e soluções para os desafios sociais.</p>
                    </li>
                    <li>
                      <strong>Colaboração</strong>
                      <p>Acreditamos no poder do trabalho em equipe e das parcerias para ampliar nosso impacto.</p>
                    </li>
                  </ul>
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

export default SobreNosl

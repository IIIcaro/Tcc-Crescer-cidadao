import "./carrosel.css"
import Imagem1 from "../assets/img/img1.jpeg"
import Imagem2 from "../assets/img/img2.png"
import Imagem3 from "../assets/img/img3.png"
import Imagem4 from "../assets/img/img15.png"
import salaespera from "../assets/img/salaespera.png"
import festacomida from "../assets/img/festacomida.png"
import cuidandosenhora from "../assets/img/cuidandosenhora.png"
import entrevista from "../assets/img/entrevista.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Footer } from "../components/footer"

function Carrosel() {
  const data = [
    { id: "1", image: Imagem1, alt: "Crianças em atividade" },
    { id: "2", image: Imagem2, alt: "Atividades em grupo" },
    { id: "3", image: Imagem3, alt: "Crianças brincando" },
    { id: "4", image: Imagem4, alt: "Atividades educativas" },
    { id: "5", image: salaespera, alt: "Sala de espera acolhedora" },
    { id: "6", image: festacomida, alt: "Evento com refeição comunitária" },
    { id: "7", image: cuidandosenhora, alt: "Cuidados com idosos" },
    { id: "8", image: entrevista, alt: "Entrevista com profissionais" },
  ]

  const impactNumbers = [
    { number: "500+", label: "Crianças Atendidas" },
    { number: "50+", label: "Profissionais Voluntários" },
    { number: "12", label: "Anos de Atuação" },
    { number: "20+", label: "Projetos Realizados" },
  ]

  return (
    <main className="main-content">
      {/* Hero Section com Banner de Captação de Recursos */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Crescer Cidadão</h1>
            <p>Transformando vidas e construindo um futuro inclusivo</p>
            <h2 className="hero-cta-text">Sua doação pode transformar a vida de uma criança</h2>
            <div className="donation-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "65%" }}></div>
              </div>
              <div className="progress-stats">
                <span className="progress-current">R$ 32.500</span>
                <span className="progress-target">Meta: R$ 50.000</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="/doacao" className="hero-button primary">
                Quero Doar Agora
              </a>
              <a href="/projetos" className="hero-button secondary">
                Conheça Nossos Projetos
              </a>
            </div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Seção de Impacto */}
      <section className="impact-section">
        <div className="impact-container">
          {impactNumbers.map((item, index) => (
            <div className="impact-card" key={index}>
              <div className="impact-number">{item.number}</div>
              <div className="impact-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Missão */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="section-header left-aligned">
              <h2>Nossa Missão</h2>
              <div className="title-underline left-aligned"></div>
            </div>
            <p>
              Promover o desenvolvimento integral de crianças e adolescentes com deficiência, oferecendo suporte
              especializado e inclusivo que valorize suas potencialidades e fortaleça suas famílias.
            </p>
            <div className="mission-values">
              <div className="mission-value">
                <div className="value-icon inclusion"></div>
                <h3>Inclusão</h3>
                <p>Garantimos que todas as crianças tenham acesso a oportunidades de desenvolvimento</p>
              </div>
              <div className="mission-value">
                <div className="value-icon respect"></div>
                <h3>Respeito</h3>
                <p>Valorizamos a diversidade e as características únicas de cada indivíduo</p>
              </div>
              <div className="mission-value">
                <div className="value-icon empowerment"></div>
                <h3>Empoderamento</h3>
                <p>Fortalecemos famílias e crianças para que alcancem sua autonomia</p>
              </div>
            </div>
          </div>
          <div className="mission-image">
            <img src={Imagem3 || "/placeholder.svg"} alt="Crianças em atividade inclusiva" />
          </div>
        </div>
      </section>

      {/* Seção Quem Somos com Carrossel */}
      <section className="about-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Quem Somos</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-tagline">Trabalhando com crianças e adolescentes PCD's e suas famílias</p>
        </div>

        <div className="about-content">
          <div className="about-carousel-container">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="about-swiper"
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="about-slide">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={`Nossa equipe em ação ${item.id}`}
                      className="about-carousel-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="about-text-container">
            <div className="about-text">
              <p>
                A ONG "Crescer Cidadão" é uma instituição dedicada a fornecer serviços e assistência abrangente para
                crianças e adolescentes com deficiência, além de auxiliar mães solteiras a encontrar trabalho.
              </p>
              <p>
                Seu objetivo é garantir igualdade de oportunidades de desenvolvimento para todos, oferecendo terapias
                especializadas, educação inclusiva, orientação familiar e atividades recreativas adaptadas.
              </p>
              <p>
                Além disso, a ONG promove a conscientização e a inclusão na comunidade. Com uma equipe comprometida de
                profissionais e voluntários, o "Crescer Cidadão" capacita crianças com deficiência a alcançar seu
                potencial máximo, fortalecendo as famílias em situação de vulnerabilidade e contribuindo para uma
                sociedade mais inclusiva e solidária.
              </p>
              <div className="about-cta">
                <a href="/sobre-nos" className="about-button">
                  Conheça Nossos Projetos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Depoimentos</h2>
            <div className="section-divider"></div>
            <p>O que as famílias dizem sobre nosso trabalho</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "A equipe do Crescer Cidadão transformou a vida do meu filho. O progresso que ele teve com a
                fisioterapia foi incrível!"
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar testimonial-avatar-woman"></div>
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
                <div className="testimonial-avatar testimonial-avatar-man"></div>
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
                <div className="testimonial-avatar testimonial-avatar-woman"></div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Juliana Santos</div>
                  <div className="testimonial-relation">mãe do Lucas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Carrosel

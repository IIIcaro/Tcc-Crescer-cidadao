import "./carrosel.css"
import Imagem1 from "../assets/img/img1.jpeg"
import Imagem2 from "../assets/img/img2.png"
import Imagem3 from "../assets/img/img3.png"
import Imagem4 from "../assets/img/img15.png"
import OS from "../assets/img/sobre-nos.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

function Carrosel() {
  const data = [
    { id: "1", image: Imagem1 },
    { id: "2", image: Imagem2 },
    { id: "3", image: Imagem3 },
    { id: "4", image: Imagem4 },
  ]

  return (
    <main className="main-content">
      {/* Hero Section com Carrossel */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Crescer Cidadão</h1>
            <p>Transformando vidas e construindo um futuro inclusivo</p>
            <button className="hero-button">Saiba Como Ajudar</button>
          </div>
        </div>
        <div className="hero-carousel">
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
            className="hero-swiper"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="hero-slide">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`Imagem de destaque ${item.id}`}
                    className="hero-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section className="about-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Quem Somos</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-tagline">Trabalhando com crianças e adolescentes PCD's e suas famílias</p>
        </div>

        <div className="about-content">
          <div className="about-image-container">
            <img src={OS || "/placeholder.svg"} alt="Equipe Crescer Cidadão" className="about-image" />
            <div className="about-image-decoration"></div>
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
                <button className="about-button">Conheça Nossos Projetos</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Carrosel

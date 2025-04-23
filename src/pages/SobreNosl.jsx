import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header";
import { Footer } from "../components/footer";
import "./SobreNos.css";
import Logo1 from "../assets/img/img10.jpg";
import Logo2 from "../assets/img/img20.jpg";
import Logo3 from "../assets/img/mulher.png";
import Logo4 from "../assets/img/PuloCrianças.png";

export const SobreNosl = () => {
  // Custom arrows for the slider
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className="custom-arrow next-arrow" style={{ ...style }} onClick={onClick}>
        <span>›</span>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" style={{ ...style }} onClick={onClick}>
        <span>‹</span>
      </div>
    );
  };

  // Slider settings
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
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Header />

      {/* Page Title Section */}
      <div className="sobre-nos-container">
        <svg
          className="svg-left"
          width="674"
          height="13"
          viewBox="0 0 674 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H667.5C671.09 0 674 2.91015 674 6.5V6.5C674 10.0899 671.09 13 667.5 13H0V0Z" fill="#333333" />
        </svg>
        <h1>SOBRE-NÓS</h1>
        <svg
          className="svg-right"
          width="679"
          height="13"
          viewBox="0 0 679 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 6.5C0 2.91015 2.91015 0 6.5 0H689V13H6.50002C2.91016 13 0 10.0899 0 6.5Z" fill="#333333" />
        </svg>
      </div>

      {/* Team Members Slider Section */}
      <div className="line-container">
        <div className="line"></div>
        <Slider {...sliderSettings}>
          <div>
            <img src={Logo1 || "/placeholder.svg"} alt="Slide 1" />
            <h1>Angela</h1>
            <h3>
              Angela é uma funcionária dedicada e confiável, conhecida por sua ética de trabalho exemplar e sua atenção
              aos detalhes. Com habilidades de comunicação eficazes, ela facilita a colaboração entre departamentos.
              Profissionalmente competente, ela resolve problemas rapidamente e busca constantemente oportunidades de
              aprendizado. Sua personalidade gentil e empática cria um ambiente de trabalho positivo e acolhedor para
              todos ao seu redor
            </h3>
          </div>
          <div>
            <img src={Logo2 || "/placeholder.svg"} alt="Slide 2" />
            <h1>Angela</h1>
            <h3>
              Angela é uma funcionária dedicada e confiável, conhecida por sua ética de trabalho exemplar e sua atenção
              aos detalhes. Com habilidades de comunicação eficazes, ela facilita a colaboração entre departamentos.
              Profissionalmente competente, ela resolve problemas rapidamente e busca constantemente oportunidades de
              aprendizado. Sua personalidade gentil e empática cria um ambiente de trabalho positivo e acolhedor para
              todos ao seu redor
            </h3>
          </div>
          <div>
            <img src={Logo3 || "/placeholder.svg"} alt="Slide 3" />
            <h1>Angela</h1>
            <h3>
              Angela é uma funcionária dedicada e confiável, conhecida por sua ética de trabalho exemplar e sua atenção
              aos detalhes. Com habilidades de comunicação eficazes, ela facilita a colaboração entre departamentos.
              Profissionalmente competente, ela resolve problemas rapidamente e busca constantemente oportunidades de
              aprendizado. Sua personalidade gentil e empática cria um ambiente de trabalho positivo e acolhedor para
              todos ao seu redor.
            </h3>
          </div>
        </Slider>

        {/* Nossa Historia Section */}
        <div className="nossa-historia-container">
          <svg
            className="svg-left"
            width="674"
            height="13"
            viewBox="0 0 674 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H667.5C671.09 0 674 2.91015 674 6.5V6.5C674 10.0899 671.09 13 667.5 13H0V0Z" fill="#333333" />
          </svg>
          <h1>NOSSA HISTÓRIA</h1>
          <svg
            className="svg-right"
            width="679"
            height="13"
            viewBox="0 0 679 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 6.5C0 2.91015 2.91015 0 6.5 0H689V13H6.50002C2.91016 13 0 10.0899 0 6.5Z" fill="#333333" />
          </svg>
        </div>

        <div className="historia-instituição">
          <h2>
            Marcos era um homem de meia-idade com um sorriso amável e olhos que brilhavam de determinação. Ele
            trabalhava como contador em uma pequena empresa familiar chamada "Soluções Financeiras Integradas". Desde o
            momento em que entrou na empresa, Marcos mostrou um compromisso inabalável com seu trabalho. Ele era
            conhecido por sua ética profissional impecável e sua capacidade de resolver problemas financeiros complexos
            com facilidade. No entanto, a vida de Marcos não era apenas sobre números e planilhas. Ele também era um
            grande apoiador da comunidade local. Sempre que havia eventos de caridade ou oportunidades de voluntariado,
            Marcos estava lá na linha de frente, oferecendo seu tempo e recursos para ajudar os outros.
          </h2>
        </div>
      </div>

      <div className="outra-linha">
        <img src={Logo4 || "/placeholder.svg"} alt="Imagem tres" />
      </div>

      <div className="resto-da-historia">
        <h2>
          Ao longo dos anos, Marcos se tornou um pilar da empresa. Ele não apenas cuidava das finanças, mas também
          atuava como mentor para os funcionários mais jovens, compartilhando sua sabedoria e experiência com
          generosidade. Um dia, a empresa enfrentou uma crise financeira inesperada devido a mudanças no mercado. Todos
          estavam preocupados com o futuro da empresa, mas Marcos permaneceu calmo e focado. Ele trabalhou
          incansavelmente para encontrar soluções criativas para estabilizar as finanças da empresa e manter todos os
          funcionários empregados. Graças aos esforços hercúleos de Marcos e sua equipe, a empresa conseguiu superar a
          crise e emergir mais forte do que nunca. Marcos foi elogiado por sua liderança excepcional e recebeu
          reconhecimento não apenas da direção da empresa, mas também de toda a comunidade. Com o tempo, Marcos se
          aposentou da "Soluções Financeiras Integradas", deixando um legado de integridade, trabalho árduo e compaixão.
          Sua história continuou a inspirar não apenas seus colegas de trabalho, mas todos aqueles que tiveram a sorte
          de cruzar seu caminho.
        </h2>
      </div>

      <Footer />
    </>
  );
};

export default SobreNosl;
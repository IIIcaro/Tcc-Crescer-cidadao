import React, { useState } from 'react';
import './Cards.css'; 
import iconFisioterapia from "../assets/img/iconFisioterapia.png";
import iconNutricao from "../assets/img/iconNutricao.png";
import iconPsicologia from "../assets/img/iconPsicologia.png";
import footerimgI from "../assets/img/footerimgI.png";
import footerimgW from "../assets/img/footerimgW.png";
import footerimgY from "../assets/img/footerimgY.png";

const Cards = () => {
  const [showFisioterapia, setShowFisioterapia] = useState(false);
  const [showNutricao, setShowNutricao] = useState(false);
  const [showPsicologia, setShowPsicologia] = useState(false);

  return (
    <>
    <div className="container">
      
      <div className="block">
        
          <div className="profile-img">
            <img src={iconFisioterapia} alt="Ícone Fisioterapia" className="icon" />
          </div>
        
        <div className="name">Fisioterapia</div>
        {showFisioterapia && <div className="text">Olá, sou um fisioterapeuta dedicado com experiência em reabilitação física e melhoria da qualidade de vida dos meus pacientes. Meu foco é proporcionar tratamentos personalizados e eficazes, utilizando técnicas modernas e baseadas em evidências. Com um compromisso inabalável com o bem-estar dos meus pacientes, estou aqui para oferecer suporte e orientação em sua jornada de recuperação e saúde. Estou entusiasmado para colaborar com você em sua busca por uma vida mais ativa e sem dor.</div>}
        <div className="professional">Marcos Felipe</div>
        <button className="button" onClick={() => setShowFisioterapia(!showFisioterapia)}> Leia Mais </button>
      </div>

      <div className="block" >
        
          <div className="profile-img">
            <img src={iconNutricao} alt="Ícone Nutrição" className="icon" />
          </div>
       
        <div className="name">Nutrição</div>
        {showNutricao && <div className="text">Olá, sou um nutricionista comprometido com a saúde e o bem-estar dos meus clientes. Com anos de experiência em nutrição clínica e esportiva, meu objetivo é ajudá-lo a alcançar seus objetivos de saúde e forma física de maneira sustentável e personalizada. Utilizo abordagens baseadas em evidências e individualizadas para criar planos alimentares que atendam às suas necessidades específicas e estilo de vida. Estou aqui para guiá-lo em sua jornada rumo a uma alimentação mais saudável, equilibrada e prazerosa, proporcionando o apoio e a motivação necessários para alcançar seus objetivos. Estou ansioso para trabalhar juntos para transformar sua saúde e promover um estilo de vida vibrante e cheio de energia.</div>}
        <div className="professional">Nome do Profissional de Nutrição</div>
        <button className="button"  onClick={() => setShowNutricao(!showNutricao)}> Leia Mais </button>
      </div>

      <div className="block">
        
          <div className="profile-img">
            <img src={iconPsicologia} alt="Ícone Psicologia" className="icon" />
          </div>
       
        <div className="name">Psicologia</div>
        {showPsicologia && <div className="text">Olá, sou um psicólogo comprometido em fornecer suporte emocional e orientação para aqueles que buscam melhorar sua saúde mental e bem-estar emocional. Com uma abordagem empática e centrada no cliente, estou aqui para ajudá-lo a navegar pelos desafios da vida, superar obstáculos e encontrar soluções para seus problemas. Meu objetivo é criar um ambiente seguro e acolhedor, onde você se sinta confortável para explorar seus pensamentos, sentimentos e experiências sem julgamento. Utilizo técnicas terapêuticas comprovadas e individualizadas para ajudá-lo a desenvolver habilidades de enfrentamento saudáveis, promover o autoconhecimento e cultivar relacionamentos mais satisfatórios consigo mesmo e com os outros. Estou pronto para acompanhá-lo em sua jornada de autodescoberta e crescimento pessoal, capacitando-o a alcançar uma vida mais plena e gratificante.</div>}
        <div className="professional">Power Guido</div>
        <button className="button"  onClick={() => setShowPsicologia(!showPsicologia)}> Leia Mais </button>
      </div>
    </div>
    <footer className='footer'>
      <div className='footertxtmain'>
      <div className='footertxt1'>
        <p>Contato:</p>
        <p>crescercidadao@gmail.com</p>
        <p>3224-8975</p>
      </div>
      <div className='footertxt2'>
        <p>Endereço:</p>
        <p>R.São Domingos, 76 - Santa Monica, Feira de Santana</p>
        <p>BA, 44050-081</p>
      </div>
      </div>
    
      <div className='imgfooter'> 
      <a href="https://www.whatsapp.com/" target="_blank" rel="noopenner noreferrer">
      <img src={footerimgW} alt='footerW'/>
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
      <img src={footerimgI} alt='footerI'/>
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
      <img src={footerimgY} alt='footerY'/>
      </a>
      </div> 
    </footer>

    </>
  );
};

export default Cards;

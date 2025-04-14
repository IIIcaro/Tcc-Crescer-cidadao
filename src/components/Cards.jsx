import React, { useState } from 'react';
import './Cards.css'; 
import iconFisioterapia from "../assets/img/iconFisioterapia.png";
import iconNutricao from "../assets/img/iconNutricao.png";
import iconPsicologia from "../assets/img/iconPsicologia.png";
import footerimgI from "../assets/img/footerimgI.png";
import footerimgW from "../assets/img/footerimgW.png";
import footerimgY from "../assets/img/footerimgY.png";

const Cards = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardName) => {
    if (expandedCard === cardName) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardName);
    }
  };

  const professionals = [
    {
      id: 'fisioterapia',
      icon: iconFisioterapia,
      title: 'Fisioterapia',
      name: 'Marcos Felipe',
      description: 'Olá, sou um fisioterapeuta dedicado com experiência em reabilitação física e melhoria da qualidade de vida dos meus pacientes. Meu foco é proporcionar tratamentos personalizados e eficazes, utilizando técnicas modernas e baseadas em evidências. Com um compromisso inabalável com o bem-estar dos meus pacientes, estou aqui para oferecer suporte e orientação em sua jornada de recuperação e saúde.',
      specialty: 'Especialista em Reabilitação Neurológica',
      color: '#3498db'
    },
    {
      id: 'nutricao',
      icon: iconNutricao,
      title: 'Nutrição',
      name: 'Ana Carolina',
      description: 'Olá, sou uma nutricionista comprometida com a saúde e o bem-estar dos meus clientes. Com anos de experiência em nutrição clínica e esportiva, meu objetivo é ajudá-lo a alcançar seus objetivos de saúde e forma física de maneira sustentável e personalizada. Utilizo abordagens baseadas em evidências e individualizadas para criar planos alimentares que atendam às suas necessidades específicas e estilo de vida.',
      specialty: 'Especialista em Nutrição Funcional',
      color: '#2ecc71'
    },
    {
      id: 'psicologia',
      icon: iconPsicologia,
      title: 'Psicologia',
      name: 'Power Guido',
      description: 'Olá, sou um psicólogo comprometido em fornecer suporte emocional e orientação para aqueles que buscam melhorar sua saúde mental e bem-estar emocional. Com uma abordagem empática e centrada no cliente, estou aqui para ajudá-lo a navegar pelos desafios da vida, superar obstáculos e encontrar soluções para seus problemas. Meu objetivo é criar um ambiente seguro e acolhedor, onde você se sinta confortável para explorar seus pensamentos e sentimentos.',
      specialty: 'Especialista em Terapia Cognitivo-Comportamental',
      color: '#9b59b6'
    }
  ];

  return (
    <>
      <section className="professionals-section">
        <div className="section-header">
          <h2 className="section-title">Nossa Equipe</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Conheça os profissionais dedicados que fazem parte da nossa equipe multidisciplinar
          </p>
        </div>

        <div className="professionals-container">
          {professionals.map((professional) => (
            <div 
              key={professional.id} 
              className={`professional-card ${expandedCard === professional.id ? 'expanded' : ''}`}
              style={{'--card-color': professional.color}}
            >
              <div className="card-header">
                <div className="icon-container">
                  <img src={professional.icon || "/placeholder.svg"} alt={`Ícone ${professional.title}`} className="professional-icon" />
                </div>
                <h3 className="professional-title">{professional.title}</h3>
              </div>
              
              <div className="card-content">
                <div className="professional-name">{professional.name}</div>
                <div className="professional-specialty">{professional.specialty}</div>
                
                <div className="professional-description">
                  <p>{professional.description}</p>
                </div>
                
                <button 
                  className="read-more-button"
                  onClick={() => toggleCard(professional.id)}
                  aria-expanded={expandedCard === professional.id}
                >
                  {expandedCard === professional.id ? 'Ler Menos' : 'Ler Mais'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className='footer'>
        <div className='footertxtmain'>
          <div className='footertxt1'>
            <p>Contato</p>
            <p>crescercidadao@gmail.com</p>
            <p>3224-8975</p>
          </div>
          <div className='footertxt2'>
            <p>Endereço</p>
            <p>R.São Domingos, 76 - Santa Monica, Feira de Santana</p>
            <p>BA, 44050-081</p>
          </div>
        </div>
      
        <div className='imgfooter'> 
          <a href="https://www.whatsapp.com/" target="_blank" rel="noopenner noreferrer" aria-label="WhatsApp">
            <img src={footerimgW || "/placeholder.svg"} alt='WhatsApp'/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={footerimgI || "/placeholder.svg"} alt='Instagram'/>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src={footerimgY || "/placeholder.svg"} alt='YouTube'/>
          </a>
        </div> 
      </footer>
    </>
  );
};

export default Cards;

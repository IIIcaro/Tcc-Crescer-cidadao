import React, { useState } from 'react';
import './Coisa.css'; // Importe o arquivo CSS com os estilos necessários
import Retangulo from "../assets/img/retangulo-1.svg";
import Retangulo2 from "../assets/img/retangulo-2.svg";
import serv from "../assets/img/serv.png"
import serv1 from "../assets/img/serv1.png"
import serv2 from "../assets/img/serv2.png"

const Coisa = () => {
  const [showText1, setShowText1] = useState(false); // Estado para controlar a exibição do texto para a primeira imagem
  const [showText2, setShowText2] = useState(false); // Estado para controlar a exibição do texto para a segunda imagem
  const [showText3, setShowText3] = useState(false); // Estado para controlar a exibição do texto para a terceira imagem
  const ocultar = () => {
    <div className="ocultar">
      setShowText1(!showText1);
    </div>
    
  }
  return (
    <>
      <div className='ablue'>

        <div className="linha-1">
          <img src={Retangulo} alt="Imagem Retângulo"/>
        </div>

        <div className="titulo1">
          <h2>NOSSOS SERVIÇOS</h2>
        </div>

        <div className="linha-2">
          <img src={Retangulo2} alt="Imagem Retângulo 2"/>
        </div>

      </div>

      <section className='icaro'>

        <div className='layoutserv'>

          <div className='layoutimg'>
            <button className="expand-button" onClick={() => setShowText1(!showText1)}>Expandir</button>
            <img src={serv} alt="Imagem do serviço 1" />
          </div>
          {showText1 && <div className="text-left">A fisioterapia é uma área da saúde que desempenha um papel crucial na reabilitação e na promoção do bem-estar físico.</div>}
          <div className='layoutimg1'>
            <button className="expand-button" onClick={() => setShowText2(!showText2)}>Expandir</button>
            <img src={serv1} alt="Imagem do serviço 2" />
          </div>
          {showText2 && <div className="text-left">A fisioterapia é uma área da saúde que desempenha um papel crucial na reabilitação e na promoção do bem-estar físico.</div>}
          <div className='layoutimg2'>
            <button className="expand-button" onClick={() => setShowText3(!showText3)}>Expandir</button>
            <img src={serv2} alt="Imagem do serviço 3" />
          </div>
          {showText3 && <div className="text-left">A fisioterapia é uma área da saúde que desempenha um papel crucial na reabilitação e na promoção do bem-estar físico.</div>}

        </div>

      </section>

      <div className="ablue1">

        <div className="linha-1">
          <img src={Retangulo} alt="Imagem Retângulo" />
        </div>

        <div className="titulo">
          <h2>NOSSOS PROFISSIONAIS</h2>
        </div>

        <div className="linha-2">
          <img src={Retangulo2} alt="Imagem Retângulo 2" />
        </div>

      </div>
    </>
  );
}

export default Coisa;

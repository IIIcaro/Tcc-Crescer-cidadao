import React from 'react'
import './Header'
import './Footer'
import "./doacao.css"

const Doacao = () => {
  return (
    <div className="doacao-container">
      <div className="doacao-container-header">
        <div className="image-text-container">
          <img src="/imgs/Image-7.png" alt="" />
          <div className="doacao-text">
            <h1>Doe Agora</h1>
            <p>
              A SOS Crescer Cidadão funciona exclusivamente com a ajuda de
              doações. São elas que nos permitem manter os espaços, providenciar
              refeições nutritivas, materiais educativos e todo o suporte
              necessário para que as crianças e jovens possam se desenvolver
              plenamente. Cada contribuição, por menor que seja, faz uma enorme
              diferença na vida de quem mais precisa.
            </p>
          </div>
        </div>
      </div>

      <div className="doacao-container-body">
        <div className="doacao-body-text">
          <p>
            Ao doar para a SOS Crescer Cidadão, você está investindo no futuro
            dessas crianças, oferecendo a elas a oportunidade de sonhar, aprender
            e crescer em um ambiente seguro e acolhedor. Sua generosidade nos
            ajuda a transformar vidas e a construir um futuro melhor para toda a
            comunidade. Faça parte dessa corrente do bem e doe agora. Cada gesto
            conta, e juntos podemos fazer muito mais!
          </p>
        </div>

        <div className="doacao-body-links">
          <h3>Formas de Doar</h3>

          <div className="doacao-links">
            <div className="doacao-link-item">
              <img src="/imgs/Image-8.png" alt="Chave PIX" />
              <a
                href="https://nubank.com.br/cobrar/1h8qxj/678e8e2a-fcf5-4a04-8bdd-e83f98e7cdfb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Chave PIX</p>
              </a>
            </div>

            <div className="doacao-link-item">
              <img src="/imgs/Image-9.png" alt="Vakinha" />
              <a
                href="https://www.vakinha.com.br/vaquinha/ajude-a-cesta-natalina-da-oscip-crescer-cidadao"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Vakinha</p>
              </a>
            </div>

            <div className="doacao-link-item">
              <img src="/imgs/Image-10.png" alt="Outras Formas de Doar" />
              <a
                href="https://doacaodoagasalho.curitiba.pr.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Outras Formas de Doar</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doacao
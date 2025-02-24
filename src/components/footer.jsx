import React from "react";
import './footer.css'
import Instagram from "../assets/img/Icon-color.svg"
import WhatsApp from "../assets/img/Vector.svg"
import Youtube from "../assets/img/Youtube.svg"

export const Footer = () => {
    return(
        <>
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
      <img src={WhatsApp} alt='footerW'/>
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
      <img src={Instagram} alt='footerI'/>
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
      <img src={Youtube} alt='footerY'/>
      </a>
      </div> 
    </footer>
        </>
    )
}
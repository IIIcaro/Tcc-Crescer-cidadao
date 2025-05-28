import "./footer.css"
import Instagram from "../assets/img/Icon-color.svg"
import WhatsApp from "../assets/img/Vector.svg"
import Youtube from "../assets/img/Youtube.svg"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footertxtmain">
        <div className="footertxt1">
          <p>Contato</p>
          <p>crescercidadao@gmail.com</p>
          <p>3224-8975</p>
        </div>
        <div className="footertxt2">
          <p>Endereço</p>
          <p>R.São Domingos, 76 - Santa Monica, Feira de Santana</p>
          <p>BA, 44050-081</p>
        </div>
      </div>

      <div className="imgfooter">
        <a href="https://wa.me/5575988081908" target="_blank" rel="noopenner noreferrer" aria-label="WhatsApp">
          <img src={WhatsApp || "/placeholder.svg"} alt="WhatsApp" />
        </a>
        <a
          href="https://www.instagram.com/crescercidadao/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src={Instagram || "/placeholder.svg"} alt="Instagram" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <img src={Youtube || "/placeholder.svg"} alt="YouTube" />
        </a>
      </div>
    </footer>
  )
}


import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Header.css"
import logo from "/src/assets/img/logo.png"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <div className="header-content">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img src={logo || "/placeholder.svg"} alt="Crescer Cidadão Logo" className="logo" />
            </Link>
          </div>
          
          <div className="title-container">
            <h1>CRESCER CIDADÃO</h1>
            <p className="tagline">Transformando vidas e construindo um futuro inclusivo</p>
          </div>
          
          <div className="actions-container">
            <a href="/doacao" className="donate-button">
              <span className="donate-icon">❤</span>
              <span className="donate-text">Doar Agora</span>
            </a>
            
            <a href="/cadastro" className="user-link" aria-label="Área do usuário">
              <div className="user-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </a>
            
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Menu">
              <span className={`menu-bar ${mobileMenuOpen ? "open" : ""}`}></span>
              <span className={`menu-bar ${mobileMenuOpen ? "open" : ""}`}></span>
              <span className={`menu-bar ${mobileMenuOpen ? "open" : ""}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      <nav className={`navigation ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                INÍCIO
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/SobreNos" className="nav-link">
                SOBRE NÓS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/servicosl" className="nav-link">
                SERVIÇOS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doacao" className="nav-link">
                APOIE-NOS
              </Link>
            </li>
            <li className="nav-item mobile-only">
              <Link to="/doacao" className="nav-link donate-mobile">
                DOAR AGORA
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

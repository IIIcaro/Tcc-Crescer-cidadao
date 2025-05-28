"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"
import logo from "/src/assets/img/logo.png"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

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

  useEffect(() => {
    // Verificar se há usuário logado
    const verificarUsuarioLogado = () => {
      const token = localStorage.getItem("usuarioToken")
      const nome = localStorage.getItem("usuarioNome")
      const tipo = localStorage.getItem("usuarioTipo")

      if (token && nome) {
        setUsuario({ nome, tipo, token })
      } else {
        setUsuario(null)
      }
    }

    verificarUsuarioLogado()

    // Escutar mudanças no localStorage
    window.addEventListener("storage", verificarUsuarioLogado)

    return () => {
      window.removeEventListener("storage", verificarUsuarioLogado)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    
    // Animação de logout
    setTimeout(() => {
      localStorage.removeItem("usuarioToken")
      localStorage.removeItem("usuarioNome")
      localStorage.removeItem("usuarioTipo")
      setUsuario(null)
      setIsLoggingOut(false)
      navigate("/")
      // Forçar atualização da página para garantir que o estado seja limpo
      window.location.reload()
    }, 1500) // 1.5 segundos para a animação
  }

  const handleLogin = () => {
    navigate("/Login")
  }

  return (
    <>
      {/* Overlay de logout */}
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-animation">
            <div className="logout-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logout-svg"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <div className="logout-message">
              <h3>Até logo, {usuario?.nome.split(" ")[0]}!</h3>
              <p>Saindo do sistema...</p>
            </div>
            <div className="logout-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      )}

      <header className={`header-container ${scrolled ? "scrolled" : ""} ${isLoggingOut ? "logging-out" : ""}`}>
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

              {usuario ? (
                <div className={`user-info-container ${isLoggingOut ? "fade-out" : ""}`}>
                  {/* Nome do usuário fixo */}
                  <div className="user-greeting">
                    <span className="greeting-text">Olá, {usuario.nome.split(" ")[0]}</span>
                  </div>

                  {/* Botão pequeno de logout */}
                  <button 
                    className={`logout-button-small ${isLoggingOut ? "loading" : ""}`} 
                    onClick={handleLogout} 
                    aria-label="Sair do sistema"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <div className="mini-spinner"></div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    )}
                  </button>
                </div>
              ) : (
                <button className="user-link" onClick={handleLogin} aria-label="Fazer login">
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
                </button>
              )}

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
                <Link to="/Sobrenos" className="nav-link">
                  SOBRE NÓS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">
                  BLOG
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/servicos" className="nav-link">
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
              {usuario && (
                <li className="nav-item mobile-only">
                  <button className="nav-link logout-mobile" onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "SAINDO..." : "SAIR"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header

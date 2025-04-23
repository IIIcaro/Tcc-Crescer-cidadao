import "./Header.css"
import logo from "/src/assets/img/logo.png" // Ajuste o caminho conforme necessário

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-background">
        <div className="header-main">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="Crescer Cidadão Logo" className="logo" />
          </div>
          <div className="title-container">
            <h1>CRESCER CIDADÃO</h1>
          </div>
          <div className="user-container">
            <a href="/cadastro" className="user-link">
              <button className="user-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </button>
            </a>
          </div>
        </div>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              INÍCIO
            </a>
          </li>
          <li className="nav-item">
            <a href="/SobreNos" className="nav-link">
              SOBRE NÓS
            </a>
          </li>
          <li className="nav-item">
            <a href="/blog" className="nav-link active">
              BLOG
            </a>
          </li>
          <li className="nav-item">
            <a href="/servicosl" className="nav-link">
              SERVIÇOS
            </a>
          </li>
          <li className="nav-item">
            <a href="/Doacao" className="nav-link">
              APOIE-NOS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

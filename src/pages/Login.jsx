import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Logo from "../assets/img/logo.png"
import googleIcon from "../assets/img/googleIcon.png"
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add("login-body")
    return () => {
      document.body.classList.remove("login-body")
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: email,
          senha: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )

      const data = response.data

      // Armazenar dados do usuário incluindo is_admin
      localStorage.setItem("usuarioToken", data.token)
      localStorage.setItem("usuarioNome", data.nome)
      localStorage.setItem("usuarioIsAdmin", data.is_admin ? "true" : "false")

      // Mostrar mensagem de sucesso diferente para admin
      if (data.is_admin) {
        alert(`Bem-vindo, ${data.nome}! Você tem privilégios de administrador.`)
      } else {
        alert(`Bem-vindo, ${data.nome}!`)
      }

      navigate("/")
    } catch (error) {
      console.error("Erro detalhado:", error)

      if (error.response) {
        // Erro do servidor
        setError(`Erro: ${error.response.data.message || "Credenciais inválidas"}`)
      } else if (error.request) {
        // Erro de rede
        setError("Erro de conexão. Verifique sua internet e tente novamente.")
      } else {
        // Outro tipo de erro
        setError("Erro inesperado. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-content">
          <button onClick={() => navigate("/")} className="home-button" aria-label="Voltar para página inicial">
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Início</span>
          </button>

          <div className="login-card">
            <div className="logo-container">
              <img src={Logo || "/placeholder.svg"} alt="Logo Crescer Cidadão" className="logo-image" />
            </div>

            <h1 className="login-title">Já Faço Parte</h1>
            <p className="login-subtitle">Acesse sua conta para continuar</p>

            {error && (
              <div className="error-alert">
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
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-container">
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
                    className="input-icon"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                    className="login-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-container">
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
                    className="input-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="login-input"
                  />
                </div>
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox"
                  />
                  <label htmlFor="rememberMe">Lembrar de mim</label>
                </div>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => alert("Funcionalidade em desenvolvimento")}
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button type="submit" disabled={isLoading} className="login-button">
                {isLoading ? (
                  <>
                    <svg
                      className="spinner"
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
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span>Entrando...</span>
                  </>
                ) : (
                  "Entrar"
                )}
              </button>

              <div className="divider">
                <span>ou</span>
              </div>

              <button type="button" className="google-button">
                <img src={googleIcon || "/placeholder.svg"} alt="Google" className="google-icon" />
                <span>Continuar com Google</span>
              </button>

              <div className="signup-link">
                <span>Não tem uma conta?</span>
                <button type="button" onClick={() => navigate("/Cadastro")} className="signup-button">
                  Cadastre-se agora
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../assets/img/logo.png"
import userIcon from "../assets/img/img4.png"
import keyIcon from "../assets/img/keyIcon.png"
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
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      })

      const responseText = await response.text()
      if (!responseText) {
        throw new Error("O servidor não retornou dados")
      }

      const data = JSON.parse(responseText)

      if (!response.ok) {
        throw new Error(data.message || "Erro no servidor")
      }

      localStorage.setItem("usuarioToken", data.token)
      localStorage.setItem("usuarioNome", data.nome)
      navigate("/Inicio")
    } catch (error) {
      console.error("Erro detalhado:", error)
      setError(`Erro: ${error.message}. Verifique:
        1. XAMPP está rodando (Apache e MySQL)
        2. Arquivos PHP estão em htdocs/backend
        3. Não há erros no console do navegador (F12)`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <button onClick={() => navigate("/")} className="home-button" aria-label="Voltar para página inicial">
        ← Início
      </button>
      <div className="auth-card">
        <div className="logo-container">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="logo-image" />
        </div>

        <h1 className="auth-title">Já Faço Parte</h1>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <div className="input-container">
              <img src={userIcon || "/placeholder.svg"} alt="User" className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <img src={keyIcon || "/placeholder.svg"} alt="Password" className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="auth-input"
              />
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
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? "Carregando..." : "Entrar"}
          </button>

          <button type="button" className="google-button">
            <img src={googleIcon || "/placeholder.svg"} alt="Google" className="google-icon" />
            <span>Faça login com o Google</span>
          </button>

          <div className="auth-link-container">
            <span>Não tem uma conta?</span>
            <button type="button" onClick={() => navigate("/Cadastro")} className="auth-link">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

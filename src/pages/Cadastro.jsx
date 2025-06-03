"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../assets/img/logo.png"
import userIcon from "../assets/img/img4.png"
import emailIcon from "../assets/img/emailIcon.png"
import keyIcon from "../assets/img/keyIcon.png"
import "./Cadastro.css"

const Cadastro = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleCadastro = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!nome || !email || !senha || !confirmarSenha) {
      setError("Preencha todos os campos")
      return
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost/backend/cadastro.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Erro no servidor")
      }

      if (result.error) {
        setError(result.message)
      } else {
        setSuccess(result.message)
        setTimeout(() => navigate("/Login"), 2000)
      }
    } catch (error) {
      setError(error.message || "Erro ao conectar com o servidor")
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

        <h1 className="auth-title">Criar Conta</h1>

        {error && <div className="error-alert">{error}</div>}
        {success && <div className="success-alert">{success}</div>}

        <form onSubmit={handleCadastro} className="auth-form">
          <div className="form-group">
            <div className="input-container">
              <img src={userIcon || "/placeholder.svg"} alt="User" className="input-icon" />
              <input
                type="text"
                id="nome"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                autoComplete="name"
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <img src={emailIcon || "/"} alt="Email" className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <img src={keyIcon || "/placeholder.svg"} alt="Password" className="input-icon" />
              <input
                type="password"
                id="senha"
                placeholder="Senha (mínimo 6 caracteres)"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength="6"
                autoComplete="new-password"
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <img src={keyIcon || "/placeholder.svg"} alt="Confirm Password" className="input-icon" />
              <input
                type="password"
                id="confirmarSenha"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                autoComplete="new-password"
                className="auth-input"
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <div className="auth-link-container">
            <span>Já tem uma conta?</span>
            <button type="button" onClick={() => navigate("/Login")} className="auth-link">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro

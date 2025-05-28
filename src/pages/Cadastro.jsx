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
  const [tipoUsuario, setTipoUsuario] = useState("usuario_normal")
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
          tipo_usuario: tipoUsuario,
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

          {/* Seleção do tipo de usuário */}
          <div className="form-group">
            <label className="form-label">Tipo de Conta</label>
            <div className="user-type-container">
              <div
                className={`user-type-option ${tipoUsuario === "usuario_normal" ? "selected" : ""}`}
                onClick={() => setTipoUsuario("usuario_normal")}
              >
                <div className="user-type-icon">
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="user-type-content">
                  <h3>Usuário Normal</h3>
                  <p>Acesso às informações e conteúdos da plataforma</p>
                </div>
                <input
                  type="radio"
                  name="tipoUsuario"
                  value="usuario_normal"
                  checked={tipoUsuario === "usuario_normal"}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  className="user-type-radio"
                />
              </div>

              <div
                className={`user-type-option ${tipoUsuario === "voluntario" ? "selected" : ""}`}
                onClick={() => setTipoUsuario("voluntario")}
              >
                <div className="user-type-icon">
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="user-type-content">
                  <h3>Voluntário</h3>
                  <p>Acesso completo + permissões para fazer doações</p>
                </div>
                <input
                  type="radio"
                  name="tipoUsuario"
                  value="voluntario"
                  checked={tipoUsuario === "voluntario"}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  className="user-type-radio"
                />
              </div>
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

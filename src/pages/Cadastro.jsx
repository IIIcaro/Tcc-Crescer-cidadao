import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import axios from "axios"
import Logo from "../assets/img/logo.png"
import "./Cadastro.css"

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Clear general error
    if (error) setError("")
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório"
    } else if (formData.nome.trim().length < 2) {
      errors.nome = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido"
    }

    if (!formData.senha) {
      errors.senha = "Senha é obrigatória"
    } else if (formData.senha.length < 6) {
      errors.senha = "Senha deve ter pelo menos 6 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.senha)) {
      errors.senha = "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    }

    if (!formData.confirmarSenha) {
      errors.confirmarSenha = "Confirmação de senha é obrigatória"
    } else if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCadastro = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          nome: formData.nome.trim(),
          email: formData.email.trim().toLowerCase(),
          senha: formData.senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )

      const result = response.data

      if (result.error) {
        setError(result.message)
      } else {
        setSuccess(result.message || "Cadastro realizado com sucesso!")
        // Clear form
        setFormData({
          nome: "",
          email: "",
          senha: "",
          confirmarSenha: "",
        })
        setTimeout(() => navigate("/Login"), 2000)
      }
    } catch (error) {
      console.error("Registration error:", error)

      if (error.response) {
        // Erro do servidor
        setError(error.response.data.message || "Erro no servidor")
      } else if (error.request) {
        // Erro de rede
        setError("Erro de conexão. Verifique se o servidor está rodando.")
      } else {
        // Outro tipo de erro
        setError("Erro inesperado. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" }

    let strength = 0
    if (password.length >= 6) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const labels = ["", "Muito fraca", "Fraca", "Média", "Forte", "Muito forte"]
    const colors = ["", "#ff4444", "#ff8800", "#ffaa00", "#88cc00", "#00cc44"]

    return { strength, label: labels[strength], color: colors[strength] }
  }

  const passwordStrength = getPasswordStrength(formData.senha)

  return (
    <div className="auth-container">
      <button
        onClick={() => navigate("/")}
        className="home-button"
        aria-label="Voltar para página inicial"
        type="button"
      >
        <ArrowLeft size={20} />
        Início
      </button>

      <div className="auth-card">
        <div className="logo-container">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="logo-image" />
        </div>

        <h1 className="auth-title">Criar Conta</h1>
        <p className="auth-subtitle">Preencha os dados abaixo para criar sua conta</p>

        {error && (
          <div className="error-alert" role="alert">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-alert" role="alert">
            <span className="alert-icon">✅</span>
            {success}
          </div>
        )}

        <form onSubmit={handleCadastro} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="nome" className="form-label">
              Nome completo
            </label>
            <div className={`input-container ${fieldErrors.nome ? "error" : ""}`}>
              <User className="input-icon" size={20} />
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
                autoComplete="name"
                className="auth-input"
                aria-describedby={fieldErrors.nome ? "nome-error" : undefined}
              />
            </div>
            {fieldErrors.nome && (
              <span id="nome-error" className="field-error" role="alert">
                {fieldErrors.nome}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className={`input-container ${fieldErrors.email ? "error" : ""}`}>
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                autoComplete="email"
                className="auth-input"
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
            </div>
            {fieldErrors.email && (
              <span id="email-error" className="field-error" role="alert">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <div className={`input-container ${fieldErrors.senha ? "error" : ""}`}>
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={(e) => handleInputChange("senha", e.target.value)}
                required
                minLength="6"
                autoComplete="new-password"
                className="auth-input"
                aria-describedby={fieldErrors.senha ? "senha-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.senha && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <span className="strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {fieldErrors.senha && (
              <span id="senha-error" className="field-error" role="alert">
                {fieldErrors.senha}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha" className="form-label">
              Confirmar senha
            </label>
            <div className={`input-container ${fieldErrors.confirmarSenha ? "error" : ""}`}>
              <Lock className="input-icon" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                required
                autoComplete="new-password"
                className="auth-input"
                aria-describedby={fieldErrors.confirmarSenha ? "confirmar-senha-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.confirmarSenha && (
              <span id="confirmar-senha-error" className="field-error" role="alert">
                {fieldErrors.confirmarSenha}
              </span>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="auth-button" aria-describedby="loading-text">
            {isLoading ? (
              <>
                <Loader2 className="loading-spinner" size={20} />
                <span id="loading-text">Cadastrando...</span>
              </>
            ) : (
              "Cadastrar"
            )}
          </button>

          <div className="auth-link-container">
            <span>Já tem uma conta?</span>
            <button type="button" onClick={() => navigate("/Login")} className="auth-link" disabled={isLoading}>
              Fazer login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro

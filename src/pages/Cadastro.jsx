import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import Logo from '../assets/img/logo.png';
import userIcon from '../assets/img/img4.png';
import emailIcon from '../assets/img/emailIcon.png';
import keyIcon from '../assets/img/keyIcon.png';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    
    if (!nome || !email || !senha || !confirmarSenha) {
      setError('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/backend/cadastro.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Erro no servidor');
      }

      if (result.error) {
        setError(result.message);
      } else {
        setSuccess(result.message);
        setTimeout(() => navigate('/Login'), 2000);
      }
    } catch (error) {
      setError(error.message || 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <h1>CRIAR CONTA</h1>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form onSubmit={handleCadastro}>
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="text"
              id="nome"
              placeholder="NOME COMPLETO"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoComplete="name"
            />
            <img src={userIcon} alt="User Icon" className="input-icon" />
          </div>
        </div>
        
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="email"
              id="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <img src={emailIcon} alt="Email Icon" className="input-icon" />
          </div>
        </div>
        
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="password"
              id="senha"
              placeholder="SENHA (MÍNIMO 6 CARACTERES)"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength="6"
              autoComplete="new-password"
            />
            <img src={keyIcon} alt="Key Icon" className="input-icon" />
          </div>
        </div>
        
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="password"
              id="confirmarSenha"
              placeholder="CONFIRMAR SENHA"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              autoComplete="new-password"
            />
            <img src={keyIcon} alt="Key Icon" className="input-icon" />
          </div>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'CADASTRANDO...' : 'CADASTRAR'}
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate('/Login')} 
          className="register-btn"
        >
          <span>Já tem uma conta? <strong>Login</strong></span>
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
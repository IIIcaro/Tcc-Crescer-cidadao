import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../assets/img/logo.png';
import userIcon from '../assets/img/img4.png';
import keyIcon from '../assets/img/keyIcon.png';
import googleIcon from '../assets/img/googleIcon.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Limpa a mensagem de erro ao tentar fazer login
    
    try {
      const response = await fetch('http://localhost/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }) // Correto
      });
      
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      
      if (data.error) {
        setError(data.error);
      } else {
        alert('Login realizado com sucesso! Bem-vindo, ' + data.nome);
        navigate('/Inicio');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <h1>JÁ FAÇO PARTE</h1>
      {error && <p className="error-message">{error}</p>} {/* Exibir mensagens de erro */}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="email"
              id="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img src={userIcon} alt="User Icon" className="input-icon" />
          </div>
        </div>
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="password"
              id="password"
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img src={keyIcon} alt="Key Icon" className="input-icon" />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Lembrar de mim</label>
            <span className="forgot-password">Esqueceu a senha?</span>
          </div>
        </div>
        <button type="submit">ENTRAR</button>
        <div className="alternative-login">
          <img src={googleIcon} alt="Google Icon" className="google-icon" />
          <span className="google-text">Faça login com o Google</span>
        </div>
        <button type="button" onClick={() => navigate('/Cadastro')} className="register-btn">
          <span>Não tem uma conta? <strong>Cadastrar</strong></span>
        </button>
      </form>
    </div>
  );
};

export default Login;

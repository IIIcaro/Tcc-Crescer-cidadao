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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      // URL absoluta para garantir
      const response = await fetch('http://localhost/backend/login.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email, 
          senha: password 
        })
      });
  
      // Verifica se a resposta está vazia
      const responseText = await response.text();
      if (!responseText) {
        throw new Error('O servidor não retornou dados');
      }
  
      const data = JSON.parse(responseText);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro no servidor');
      }
  
      // Login bem-sucedido
      localStorage.setItem('usuarioToken', data.token);
      localStorage.setItem('usuarioNome', data.nome);
      navigate('/Inicio');
      
    } catch (error) {
      console.error('Erro detalhado:', error);
      setError(`Erro: ${error.message}. Verifique:
        1. XAMPP está rodando (Apache e MySQL)
        2. Arquivos PHP estão em htdocs/backend
        3. Não há erros no console do navegador (F12)`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <h1>JÁ FAÇO PARTE</h1>
      {error && <p className="error-message">{error}</p>}
      
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
            <img src={keyIcon} alt="Key Icon" className="input-icon" />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Lembrar de mim</label>
            <span className="forgot-password">Esqueceu a senha?</span>
          </div>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'CARREGANDO...' : 'ENTRAR'}
        </button>
        
        <div className="alternative-login">
          <img src={googleIcon} alt="Google Icon" className="google-icon" />
          <span className="google-text">Faça login com o Google</span>
        </div>
        
        <button 
          type="button" 
          onClick={() => navigate('/Cadastro')} 
          className="register-btn"
        >
          <span>Não tem uma conta? <strong>Cadastrar</strong></span>
        </button>
      </form>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import './Cadastro.css';
import Logo from '../assets/img/logo.png';
import userIcon from '../assets/img/img4.png';
import keyIcon from '../assets/img/keyIcon.png';
import googleIcon from '../assets/img/googleIcon.png';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook para mudar de página

  useEffect(() => {
    document.body.classList.add('cadastro-body');

    return () => {
      document.body.classList.remove('cadastro-body');
    };
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    if (nome && email && password) {
      // Aqui você pode adicionar a lógica para enviar os dados do cadastro, se necessário.
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', password);
      // Redireciona para a página de login após o cadastro
      navigate('/Login'); // Redireciona para a página de Login
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <h1>CADASTRE-SE</h1>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="text"
              id="nome"
              placeholder="NOME"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
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
            />
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
        </div>
        <div className="input-group">
          <div className="input-icon-wrapper">
            <input
              type="password"
              id="confirmPassword"
              placeholder="CONFIRMAR SENHA"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img src={keyIcon} alt="Key Icon" className="input-icon" />
          </div>
        </div>
        <button type="submit">CADASTRAR</button>
        <div className="alternative-login">
          <img src={googleIcon} alt="Google Icon" className="google-icon" />
          <span className="google-text">Cadastre-se com o Google</span>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
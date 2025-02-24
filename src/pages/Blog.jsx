import React from 'react';
import './Blog.css'; 

const Blog = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="/perfil" className="navbar-link">Perfil</a>
        </li>
        <li className="navbar-item">
          <a href="/seguranca" className="navbar-link">Segurança</a>
        </li>
        <li className="navbar-item">
          <a href="/privacidade" className="navbar-link">Privacidade</a>
        </li>
        <li className="navbar-item">
          <a href="/blog" className="navbar-link">Blog</a>
        </li>
        <li className="navbar-item">
          <a href="/crescer-cidadao" className="navbar-link">Crescer Cidadão</a>
        </li>
        <li className="navbar-item">
          <a href="/servicos" className="navbar-link">Serviços</a>
        </li>
        <li className="navbar-item">
          <a href="/" className="navbar-link">Início</a>
        </li>
        <li className="navbar-item">
          <a href="/sobre-nos" className="navbar-link">Sobre-Nós</a>
        </li>
        <li className="navbar-item">
          <a href="/carregue-sua-imagem" className="navbar-link">Carregue Sua Imagem</a>
        </li>
        <li className="navbar-item">
          <a href="/apoie-nos" className="navbar-link">Apoie-Nos</a>
        </li>
      </ul>
    </nav>
  );
};
export default Blog
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom'
import App from './App.jsx'
import Servicos from './pages/Servicos.jsx'
import Inicial from './pages/Inicial.jsx'
import SobreNos from './pages/Sobrenos.jsx'
import { Doacao } from './pages/Doacao.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Blog from './pages/Blog.jsx'
import './pages/inicial.css'
import MeuPainellPat from './pages/MeuPainellPat.jsx'


const router = createBrowserRouter([ {
  path: '/',
  element: <Inicial />,
  errorElement: <notfoundpage/>,
},
{
  path: '/Servicos',
  element: <Servicos />,
},
{
  path:'/SobreNos',
  element: <SobreNos />, 
},
{
  path: '/Doacao',
  element: <Doacao/>,
},
{
  path: '/Login',
  element: <Login/>,
},

{
  path: '/Cadastro',
  element: <Cadastro/>,
},
{
  path: '/Blog',
  element: <Blog/>,
},

{
  path: '/MeuPainellPat',
  element: <MeuPainellPat/>,
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
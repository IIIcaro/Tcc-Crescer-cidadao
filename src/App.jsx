import { useState } from 'react'
import './App.css'
import Inicial from './pages/Inicial'
import { Doacao } from './pages/Doacao'
import {register} from 'swiper/element/bundle'

register();
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function App() {

  return (
    <>
      <Doacao/>
    </>
  )
}

export default App

import "./App.css"
import Inicial from "./pages/Inicial"
import { register } from "swiper/element/bundle"

register()
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

function App() {
  return (
    <div className="app-container">
      <Inicial />
    </div>
  )
}

export default App

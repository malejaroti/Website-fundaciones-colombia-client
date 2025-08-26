import './App.css'
import MyNavbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Fundaciones from './pages/Fundaciones'
import NotFoundPage from './pages/NotFoundPage'
import AddFoundation from './pages/AddFoundation'
import AboutPage from './pages/AboutPage'
import 'bootstrap/dist/css/bootstrap.min.css';

import { departamentos_ciudades_Colombia, type Departamento } from "./data/departments-cities";



function App() {

  return (
    <>
      <MyNavbar></MyNavbar>
      <div className="h-screen overflow-y-scroll border-4 border-amber-800">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fundaciones" element={<Fundaciones />} />
          <Route path="/fundaciones/nueva-fundacion" element={<AddFoundation />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </div>


    </>
  )
}

export default App

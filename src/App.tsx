import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Fundaciones from './pages/Fundaciones'
import FoundationDetails from './pages/FoundationDetails'
import AddFoundation from './pages/AddFoundation'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <MyNavbar></MyNavbar>
      <div className="h-screen overflow-y-scroll border-4 border-amber-800">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fundaciones" element={<Fundaciones />} />
          <Route path="/fundaciones/nueva-fundacion" element={<AddFoundation />} />
          <Route path="/fundaciones/:id" element={<FoundationDetails />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </div>
    </>
  )
}

export default App

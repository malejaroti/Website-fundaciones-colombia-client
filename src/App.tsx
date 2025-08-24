import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Fundaciones from './pages/Fundaciones'
import NotFoundPage from './pages/NotFoundPage'


function App() {

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fundaciones" element={<Fundaciones />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App

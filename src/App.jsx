import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LetterPage from './pages/LetterPage'
import GalleryPage from './pages/GalleryPage'
import SecretPage from './pages/SecretPage'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  return (
    <BrowserRouter>
      <MusicPlayer />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/letter"  element={<LetterPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/secret"  element={<SecretPage />} />
      </Routes>
    </BrowserRouter>
  )
}
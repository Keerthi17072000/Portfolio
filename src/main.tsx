import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/gsap' // registers plugins once
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

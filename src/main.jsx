import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Thème PrimeReact
import 'primereact/resources/primereact.min.css';                  // CSS de base PrimeReact
import 'primeicons/primeicons.css';                                // Icônes PrimeIcons

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

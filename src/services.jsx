
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Proceses from './components/Proceses'
import Divider from './components/Devider'

function ServicesPage() {
  return (
    <>
      <Header />
      <div className="h-12" />
      <Proceses />
      <Divider />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServicesPage />
  </StrictMode>,
)

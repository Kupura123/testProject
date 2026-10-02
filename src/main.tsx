import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ProductThemeProvider } from './hooks/useProductTheme'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductThemeProvider>
      <App />
    </ProductThemeProvider>
  </StrictMode>,
)

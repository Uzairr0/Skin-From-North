import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import { ErrorProvider } from './context/ErrorContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorProvider>
        <CartProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CartProvider>
      </ErrorProvider>
    </HelmetProvider>
  </StrictMode>,
)

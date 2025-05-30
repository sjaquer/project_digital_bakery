import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <App />
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#FFFDD0',
              border: '1px solid #8B4513',
              color: '#8B4513',
              fontSize: '14px',
            },
            success: {
              style: {
                background: '#ECFDF5',
                border: '1px solid #16A34A',
                color: '#16A34A',
              },
              iconTheme: {
                primary: '#16A34A',
                secondary: '#ECFDF5',
              },
            },
            error: {
              style: {
                background: '#FEF2F2',
                border: '1px solid #DC2626',
                color: '#DC2626',
              },
              iconTheme: {
                primary: '#DC2626',
                secondary: '#FEF2F2',
              },
            },
          }} />
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
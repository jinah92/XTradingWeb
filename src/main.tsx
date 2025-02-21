import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import App from './App';
import { QueryProvider, GoogleOAuthProvider } from './app/provider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
);

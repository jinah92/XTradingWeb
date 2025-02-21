import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';

import App from './App';
import { QueryProvider } from './app/provider/queryProvider';

import './index.css';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
);

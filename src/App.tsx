import { CookiesProvider } from 'react-cookie';

import { Toaster } from '@shared';

import { GoogleOAuthProvider, QueryProvider, RouterProvider } from '@/app/provider';
import { AuthProvider } from '@/router/AuthContext';

import { ThemeProvider } from './ThemeProvider';

import './App.css';

function App() {
  return (
    <QueryProvider>
      <GoogleOAuthProvider>
        <AuthProvider>
          <CookiesProvider>
            <ThemeProvider>
              <Toaster />
              <RouterProvider />
            </ThemeProvider>
          </CookiesProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryProvider>
  );
}

export default App;

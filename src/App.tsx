import { CookiesProvider } from 'react-cookie';

import { Toaster } from '@shared';

import CommonRouter from '@/router/CommonRouter';

import { AuthProvider } from './router/AuthContext';
import { ThemeProvider } from './ThemeProvider';

import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <CookiesProvider>
          <ThemeProvider>
            <Toaster />
            <CommonRouter />
          </ThemeProvider>
        </CookiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;

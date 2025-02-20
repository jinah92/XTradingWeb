import CommonRouter from '@/router/CommonRouter';
import './App.css';
import { Toaster } from '@shared/ui';
import { ThemeProvider } from './ThemeProvider';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './router/AuthContext';

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

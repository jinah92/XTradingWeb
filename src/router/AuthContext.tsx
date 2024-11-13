// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getCookie, setCookie } from "../common/Cookie";

interface AuthContextType {
  isAuthenticated: boolean | null;
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  userId: string | null;
  login: (
    email: string,
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => void;
  loginRefresh: (
    accessToken: string,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // 비동기 함수로 로그인 상태를 체크
    const checkAuth = async () => {
      const userId = getCookie("userId");
      if (userId) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      const userAccessToken = getCookie("accessToken");
      if (userAccessToken) {
        setAccessToken(accessToken);
      } else {
        setAccessToken(null);
      }
    };
    checkAuth();
  }, []);

  const login = (
    email: string,
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    setEmail(email);
    setUserId(userId);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    setCookie('email', email, {
      path: '/',
      secure: '/',
    });
    setCookie('userId', userId, {
      path: '/',
      secure: '/',
    });
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: '/',
    });
    setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: '/',
    });
  };

  const loginRefresh = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setCookie('accessToken', newAccessToken, {
      path: '/',
      secure: '/',
    });
  };



  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, refreshToken, userId, email, login, loginRefresh, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

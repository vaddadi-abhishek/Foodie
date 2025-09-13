import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check token validity and refresh if expired
  const validateToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      const now = Date.now() / 1000;
      
      if (decoded.exp < now) {
        // Access token expired, try refreshing
        if (!refreshToken) throw new Error("No refresh token");

        const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) throw new Error("Failed to refresh token");

        const data = await res.json();
        localStorage.setItem("access_token", data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Auth validation error:", err);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initialize auth state on mount
  useEffect(() => {
    validateToken();
  }, []);

  // ✅ Login saves both tokens
  const login = (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        await fetch("http://127.0.0.1:8000/api/users/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        console.error("Logout failed on server:", err);
      }
    }
    // Always clear local storage and state regardless of server outcome
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};

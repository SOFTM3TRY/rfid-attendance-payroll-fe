import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login } from "@/services/User_service";
import { User } from "@/types/Login";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    loading: boolean;
  }>({
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setAuthState({
        user: JSON.parse(storedUser),
        token: storedToken,
        loading: false,
      });
    } else {
      setAuthState({ user: null, token: null, loading: false });
    }
  }, []);

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({ ...authState, loading: true });

    try {
      const response = await login({ email, password });

      console.log("Login response:", response);

      localStorage.setItem("token", response.token);
      setAuthState({
        user: response.user,
        token: response.token,
        loading: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setAuthState({ ...authState, loading: false });
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    setAuthState({ user: null, token: null, loading: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        loading: authState.loading,
        login: loginUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

"use client";

import React, { createContext, useState, ReactNode } from "react";
import { login } from "@/services/User_service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const token = getAuthToken();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login({ email, password });
      setAuthToken(response.token);
      setUser(response);
      await queryClient.invalidateQueries({ queryKey: ["user-details"] });
      toast.success(
        `Login successful as ${response?.role_id === 1 ? "Super Admin" : response?.role_id === 2 ? "Admin" : response?.role_id === 3 ? "Teacher" : response?.role_id === 4 && "Student"}`,
      );
      if (response.role_id === 1 || response.role_id === 2) {
        router.replace("/dashboard");
      } else if (response.role_id === 3) {
        router.replace("/teacher/dashboard");
      } else if (response.role_id === 4) {
        router.replace("/student/dashboard");
      }
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    clearAuthToken();
    setUser(null);
    queryClient.clear();
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginUser,
        logout: logoutUser,
        token: token || null,
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

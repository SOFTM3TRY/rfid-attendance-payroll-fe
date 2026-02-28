"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { login } from "@/services/User_service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";

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
  const token = getCookie("token") as string | null;
  const router = useRouter();

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login({ email, password });
      setCookie("token", response.token, {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "lax",
      });
      setUser(response);
      console.log("User logged in:", response);
      toast.success(
        `Login successful as ${response?.role_id === 1 ? "Super Admin" : response?.role_id === 2 ? "Admin" : response?.role_id === 3 ? "Teacher" : "Student"}`,
      );
      if (response.role_id === 1 || response.role_id === 2) {
        router.push("/dashboard");
      } else if (response.role_id === 2) {
        router.push("/teacher/dashboard");
      } else if (response.role_id === 3) {
        router.push("/student/dashboard");
      }
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
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

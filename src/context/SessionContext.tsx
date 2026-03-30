"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { useUserDetails } from "@/hooks/useUserDetails";

type SessionContextValue = {
  token: string | null;
  user: any;
  roleId: number | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const { data, isLoading, isError, refetch } = useUserDetails(token);

  const user = data?.data ?? null;
  const roleId = typeof user?.role_id === "number" ? user.role_id : null;

  const value = useMemo<SessionContextValue>(
    () => ({
      token,
      user,
      roleId,
      isLoading,
      isAuthenticated: !!token && !!user,
      isError,
      refetch: () => refetch().then((result) => result.data),
    }),
    [token, user, roleId, isLoading, isError, refetch],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}

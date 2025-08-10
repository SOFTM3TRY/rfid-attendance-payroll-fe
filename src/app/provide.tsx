"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { apihealth } from "@/services/Apihealth";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {

useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await apihealth();
      } catch (error) {
        toast.error("The API is currently down. Please try again later.");
      }
    };

    checkApiHealth();
  }, []);
      
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 0,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

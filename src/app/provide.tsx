"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "@/context/SessionContext";
import { apihealth } from "@/services/Apihealth";
import { isApiUnavailableError } from "@/lib/api-error";
import {
  DEFAULT_GC_TIME,
  DEFAULT_STALE_TIME,
} from "@/lib/query";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    let isMounted = true;

    const checkApiHealth = async () => {
      try {
        const response = await apihealth();

        if (!isMounted) {
          return;
        }

        if (response.status >= 200 && response.status < 300) {
          toast.dismiss("api-unavailable");
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (isApiUnavailableError(error)) {
          // toast.error("The API is currently down. Please try again later.", {
          //   id: "api-unavailable",
          // });
          return;
        }

        toast.dismiss("api-unavailable");
      }
    };

    void checkApiHealth();

    return () => {
      isMounted = false;
    };
  }, []);
      
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: DEFAULT_STALE_TIME,
            gcTime: DEFAULT_GC_TIME,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

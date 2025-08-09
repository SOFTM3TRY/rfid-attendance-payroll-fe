// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { checkToken } from "@/services/User_service";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = getCookie("token");
      console.log("Token from cookies:", token);

      try {
        await checkToken(token as string);
      } catch (error) {
        toast.error("Your token is invalid or expired. Please log in again.");
        router.push("/");
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/");
      toast.error("You must be logged in to access this page.");
    }
  }, [router]);

  return <>{children}</>;
}

// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { checkToken } from "@/services/User_service";
import { useUserDetails } from "@/hooks/useUserDetails";
import { User } from "lucide-react";
export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const router = useRouter();
  const { data: userDetails, isLoading: isLoadingUserDetails } = useUserDetails(
    getCookie("token") as string
  );

  // Check user role and redirect if unauthorized
  useEffect(() => {
    if (!isLoadingUserDetails && userDetails) {
      const userRole = userDetails?.data.role_id;
      console.log("User role:", userRole);
      if (role && userRole !== parseInt(role)) {
        toast.error("You do not have access to this page.");
        router.push("/unauthorized");
      }
    }
  }, [isLoadingUserDetails, userDetails, role, router]);

  // Validate token on initial load
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

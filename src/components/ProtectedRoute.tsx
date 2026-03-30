"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/context/SessionContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string[];
}) {
  const router = useRouter();
  const { token, roleId, isLoading, isAuthenticated, isError } = useSession();

  useEffect(() => {
    if (!isLoading && roleId !== null && role && !role.includes(String(roleId))) {
      toast.error("You do not have access to this page.");
      router.replace("/unauthorized");
    }
  }, [isLoading, role, roleId, router]);

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to access this page.");
      router.replace("/");
      return;
    }

    if (!isLoading && (isError || !isAuthenticated)) {
      toast.error("Your token is invalid or expired. Please log in again.");
      router.replace("/");
    }
  }, [isAuthenticated, isError, isLoading, router, token]);

  return <>{children}</>;
}

// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // useEffect(() => {
  //   const token = getCookie("token");
  //   if (!token) {
  //     router.push("/");  
  //     toast.error("You must be logged in to access this page.");
  //   }
  // }, [router]);

  return <>{children}</>;
}

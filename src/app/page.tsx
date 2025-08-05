"use client";

import React, { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Boxes } from "@/components/ui/background-boxes";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/Login";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, setValue, handleSubmit } = useForm<User>();
  const { login,user } = useAuth();
  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      const { email, password } = data;
      await login({ email, password });   
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row-reverse">
      <ModeToggle />
      <div className="flex flex-col justify-center items-center flex-1 p-8 bg-white shadow-lg dark:bg-black">
        <div className="w-full max-w-sm text-start">
          <h1 className="text-3xl font-bold mb-2">Sign In to your account</h1>
          <p className="mb-6">to continue to the dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          <div>
            <label htmlFor="email" className="block mb-2 font-normal text-sm">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="email@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 text-sm"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 font-normal text-sm"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9.5 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-700"
              />
              <label htmlFor="remember" className="text-sm select-none">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-normal mt-3 md:mt-0 text-blue-800 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-800 text-white py-1 rounded-sm hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>

      <div className="hidden md:flex relative flex-1 overflow-hidden bg-cyan-900 dark:bg-black items-center justify-center p-8">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <div className="text-white z-25 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] flex justify-center items-center">
          <img src="/logo.png" alt="logo" className="w-26 h-26 mr-2" />
          <h2 className="text-5xl mt-2 text-start font-bold mb-4 uppercase bg-gradient-to-r from-teal-300 to-sky-50 bg-clip-text text-transparent transition-colors duration-500">
            Young Generation <br /> Academy
          </h2>
        </div>
        <Boxes />
      </div>
    </main>
  );
}

// Fake login function for demo
async function fakeLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Invalid credentials" });
      }
    }, 1500);
  });
}

// Eye icons
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.083.183-2.127.52-3.105M3 3l18 18"
    />
  </svg>
);

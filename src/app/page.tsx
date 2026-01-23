"use client";

import React, { useState, useEffect } from "react";
// import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Boxes } from "@/components/ui/background-boxes";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/Login";
import toast from "react-hot-toast";
import { useRememberMe } from "@/hooks/useRememberMe";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { remember, setRemember, saveEmail, clearEmail, getEmail } =
    useRememberMe();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<User>();

  useEffect(() => {
    const email = getEmail();
    if (email) {
      setValue("email", email);
    }
  }, [getEmail, setValue]);

  const { login } = useAuth();
  const onSubmit = async (data: User) => {
    setLoading(true);

    try {
      const { email, password } = data;

      await login({ email, password });

      remember ? saveEmail(email) : clearEmail();
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row-reverse">
      <div className="absolute top-5 right-5">
        <AnimatedThemeToggler />
      </div>

      <div className="flex flex-col justify-center items-center flex-1 p-8 shadow-lg">
        <div className="w-full max-w-sm text-start">
          <Label className="text-xl font-bold">Sign In to your account</Label>
          <Label className="text-sm mb-6">to continue to the dashboard</Label>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          <div>
            <Label htmlFor="email" className="block mb-2 font-normal text-xs">
              Email
            </Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="email@gmail.com"
              className="w-full rounded-md text-xs"
              required
            />
          </div>

          <div className="relative">
            <Label
              htmlFor="password"
              className="block mb-2 font-normal text-xs"
            >
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter Password"
              className="w-ful rounded-md text-xs"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-muted-foreground/50"
              aria-Label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="check"
                  onChange={() => setRemember(!remember)}
                  checked={remember}
                />
                <span className="select-none text-xs">Remember me</span>
            </div>
            {/* <a
              href="#"
              className="text-xs font-normal mt-3 md:mt-0 text-blue-800 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Forgot your password?
            </a> */}
          </div>

          <Button
            type="submit"
            variant="outline"
            disabled={loading}
            className="w-full transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"} <LogIn />
          </Button>
        </form>

        <img
          src="https://avatars.githubusercontent.com/u/221351242?s=200&v=4"
          alt="Avatar"
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full"
        />
      </div>

      <div className="hidden md:flex relative flex-1 overflow-hidden bg-cyan-900 dark:bg-accent items-center justify-center p-8">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <div className="text-white z-25 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] flex justify-center items-center">
          <img src="/logo.png" alt="logo" className="w-26 h-26 mr-2" />
          <h2 className="text-5xl mt-2 text-start font-bold mb-4 uppercase bg-teal-300 bg-clip-text text-transparent transition-colors duration-500">
            Young Generation <br /> Academy
          </h2>
        </div>
        <Boxes />
      </div>
    </main>
  );
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

"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <main className="min-h-screen flex flex-col md:flex-row-reverse">
      <ModeToggle />
      <div className="flex flex-col justify-center items-center flex-1 p-8 bg-white shadow-lg dark:bg-black">
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
        <form className="w-full max-w-sm space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-normal text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 text-sm "
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
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-sm "
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9.5 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
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
              ) : (
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
              )}
            </button>
          </div>

          <div className="flex justify-between">
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
              className="text-sm font-normal text-blue-800 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#15548D] text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>
      </div>

      <div className="hidden md:flex flex-1 bg-indigo-600 items-center justify-center p-8">
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4">Young Generation Academy</h2>
          <p className="text-lg">
            Empowering the youth through innovative learning and technology.
          </p>
        </div>
      </div>
    </main>
  );
}

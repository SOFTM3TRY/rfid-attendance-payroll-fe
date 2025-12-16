import { useEffect, useState } from "react";

const STORAGE_KEY = "remember_email";

export function useRememberMe() {
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);

    if (savedEmail) {
      setRemember(true);
    }
  }, []);

  const saveEmail = (email: string) => {
    localStorage.setItem(STORAGE_KEY, email);
    setRemember(true);
  };

  const clearEmail = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRemember(false);
  };

  const getEmail = () => {
    return localStorage.getItem(STORAGE_KEY);
  };

  return {
    remember,
    setRemember,
    saveEmail,
    clearEmail,
    getEmail,
  };
}

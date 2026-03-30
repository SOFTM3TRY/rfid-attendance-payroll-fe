import { deleteCookie, getCookie, setCookie } from "cookies-next";

const TOKEN_COOKIE_KEY = "token";

function canUseBrowserCookies() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function getAuthToken() {
  if (!canUseBrowserCookies()) {
    return null;
  }

  const token = getCookie(TOKEN_COOKIE_KEY);
  return typeof token === "string" ? token : null;
}

export function setAuthToken(token: string) {
  if (!canUseBrowserCookies()) {
    return;
  }

  setCookie(TOKEN_COOKIE_KEY, token, {
    maxAge: 60 * 60 * 24 * 7,
    secure: window.location.protocol === "https:",
    sameSite: "lax",
  });
}

export function clearAuthToken() {
  if (!canUseBrowserCookies()) {
    return;
  }

  deleteCookie(TOKEN_COOKIE_KEY);
}

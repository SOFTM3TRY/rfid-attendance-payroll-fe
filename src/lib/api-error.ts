import axios from "axios";

type ErrorPayload = {
  message?: string;
  error?: string | { message?: string };
  errors?: Record<string, string[]>;
};

export function isApiUnavailableError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return true;
    }

    return [502, 503, 504].includes(error.response.status);
  }

  return false;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong.",
) {
  if (axios.isAxiosError<ErrorPayload>(error)) {
    if (!error.response) {
      return "Unable to reach the server. Please try again.";
    }

    const data = error.response.data;
    const validationMessage = data?.errors
      ? Object.values(data.errors).flat()[0]
      : undefined;

    if (validationMessage) {
      return validationMessage;
    }

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }

    if (
      data?.error &&
      typeof data.error === "object" &&
      typeof data.error.message === "string" &&
      data.error.message.trim()
    ) {
      return data.error.message;
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}


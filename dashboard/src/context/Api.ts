// import { useAuth } from "../context/AuthContext";

export const authFetch = (url: string, token: string | null, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options as any).headers
    }
  });
};

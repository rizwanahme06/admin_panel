// import { useAuth } from "../context/AuthContext";

// export const authFetch = (url: string, token: string | null, options = {}) => {
//   return fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//       ...(options as any).headers
//     }
//   });
// };

const BASE_URL = "http://localhost:5000";

export const authFetch = async (
  endpoint: string,
  token: string | null,
  options: RequestInit = {}
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};

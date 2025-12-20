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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API Error");
  }

  return res.json();
};

export const updateUserRole = async (
  id: number,
  role: string,
  token: string
) => {
  const res = await fetch(`${BASE_URL}/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    throw new Error("Failed to update role");
  }

  return res.json();
};

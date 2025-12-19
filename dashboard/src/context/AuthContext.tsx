// import React, { createContext, useContext, useState } from "react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: 'admin' | 'user';
// };

// type AuthContextType = {
//   user: User | null;
//   token: string | null;
//   login: (data: any) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     const saved = localStorage.getItem("auth");
//     return saved ? JSON.parse(saved).user : null;
//   });

//   const [token, setToken] = useState<string | null>(() => {
//     const saved = localStorage.getItem("auth");
//     return saved ? JSON.parse(saved).token : null;
//   });

//   const login = (data: any) => {
//     setUser(data.user);
//     setToken(data.token);
//     localStorage.setItem("auth", JSON.stringify(data));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext)!;

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Restore auth on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);

    // Optional persistence
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

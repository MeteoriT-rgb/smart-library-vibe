import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  name: string;
  email: string;
  grade?: string;
  joinedAt: string;
};

type AuthCtx = {
  user: User | null;
  signUp: (u: Omit<User, "joinedAt">) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, signUp: () => {}, signOut: () => {} });
const KEY = "ssl.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signUp: AuthCtx["signUp"] = (u) => {
    const next = { ...u, joinedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(next));
    setUser(next);
  };

  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, signUp, signOut }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

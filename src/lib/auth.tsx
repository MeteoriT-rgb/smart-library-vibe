import { createContext, useContext, useEffect, useState } from "react";

export type Role = "admin" | "student";

export type User = {
  name: string;
  email: string;
  grade?: string;
  role: Role;
  joinedAt: string;
};

type AuthCtx = {
  user: User | null;
  signUp: (u: Omit<User, "joinedAt" | "role"> & { role?: Role }) => void;
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  signUp: () => {},
  signIn: () => ({ ok: false, error: "not ready" }),
  signOut: () => {},
});
const KEY = "ssl.user";

// Hardcoded mock admin accounts
export const ADMIN_ACCOUNTS = [
  { email: "jonibekdream2014@gmail.com", password: "islomkarimov", name: "Jonibek Admin" },
  { email: "kenjayevjasurbek2011@gmail.com", password: "islomkarimov", name: "Jasurbek Kenjayev" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: User) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const signUp: AuthCtx["signUp"] = (u) => {
    persist({ ...u, role: u.role ?? "student", joinedAt: new Date().toISOString() });
  };

  const signIn: AuthCtx["signIn"] = (email, password) => {
    const admin = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    );
    if (admin) {
      persist({ name: admin.name, email: admin.email, role: "admin", joinedAt: new Date().toISOString() });
      return { ok: true };
    }
    // Fall back: any account previously signed up via localStorage with matching email
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const existing = JSON.parse(raw) as User;
        if (existing.email.toLowerCase() === email.trim().toLowerCase()) {
          // mock — accept any password for demo student accounts
          setUser(existing);
          return { ok: true };
        }
      }
    } catch {}
    return { ok: false, error: "Invalid email or password" };
  };

  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, signUp, signIn, signOut }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

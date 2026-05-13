import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { BookOpen, Moon, Sun, Bell, Menu, X, Search, LogOut, User as UserIcon, ShieldCheck, LogIn } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const initials = user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-bold tracking-tight">Smart School</div>
              <div className="text-xs text-muted-foreground -mt-0.5">Library</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <Badge>New</Badge>
                    <span className="font-medium">Book reservation ready</span>
                  </div>
                  <span className="text-xs text-muted-foreground">"Quantum Gardens" is ready for pickup.</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Return reminder</span>
                  <span className="text-xs text-muted-foreground">Due in 2 days: "Letters from the Lighthouse".</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">New arrivals</span>
                  <span className="text-xs text-muted-foreground">120 books added to the catalog.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs gradient-primary text-primary-foreground">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <DropdownMenuItem onSelect={() => navigate({ to: "/admin" })}>
                      <ShieldCheck className="h-4 w-4 mr-2" /> Admin panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={() => navigate({ to: "/profile" })}>
                    <UserIcon className="h-4 w-4 mr-2" /> My profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => { signOut(); navigate({ to: "/" }); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-1 ml-1">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login"><LogIn className="h-4 w-4 mr-1" /> Sign in</Link>
                </Button>
                <Button asChild size="sm" className="gradient-primary shadow-glow">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              {!user && (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">
                    Sign in
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-muted">
                    Sign up
                  </Link>
                </>
              )}
              {user && (
                <Link to="/profile" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">
                  My profile
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-muted">
                  Admin panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

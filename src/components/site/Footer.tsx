import { Link } from "@tanstack/react-router";
import { BookOpen, Github, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-mesh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="leading-tight">
                <div className="font-bold">Smart School</div>
                <div className="text-xs text-muted-foreground -mt-0.5">Library</div>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The modern home of curiosity — explore, borrow and reserve thousands of titles across every subject.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link></li>
              <li><Link to="/reservations" className="hover:text-primary transition-colors">Reservations</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Library</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/borrowers" className="hover:text-primary transition-colors">Borrowers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Stay in touch</h4>
            <p className="text-sm text-muted-foreground mb-3">Mon–Fri · 8 AM – 9 PM</p>
            <div className="flex gap-2">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Smart School Library. All rights reserved.</p>
          <p>Crafted with care for curious minds.</p>
        </div>
      </div>
    </footer>
  );
}

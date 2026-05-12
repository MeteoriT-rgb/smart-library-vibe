import { Link } from "@tanstack/react-router";
import { Star, BookmarkPlus } from "lucide-react";
import type { Book } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BookCard({ book, view = "grid" }: { book: Book; view?: "grid" | "list" }) {
  const reserve = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`Reserved "${book.title}"`, { description: "We'll notify you when it's ready for pickup." });
  };

  if (view === "list") {
    return (
      <Link to="/book/$bookId" params={{ bookId: book.id }} className="group flex gap-4 p-4 rounded-2xl glass-strong hover-lift">
        <img src={book.cover} alt={book.title} loading="lazy" className="h-32 w-24 object-cover rounded-lg shadow-md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
            <Badge variant="secondary">{book.genre}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{book.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {book.rating.toFixed(1)}</span>
              <span className={book.available ? "text-success" : "text-destructive"}>
                {book.available ? `${book.available} available` : "Out of stock"}
              </span>
            </div>
            <Button size="sm" onClick={reserve} disabled={!book.available}>Reserve</Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/book/$bookId" params={{ bookId: book.id }} className="group block">
      <div className="relative overflow-hidden rounded-2xl glass-strong hover-lift">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={book.cover} alt={book.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
          <Badge className="absolute top-3 left-3 backdrop-blur" variant="secondary">{book.genre}</Badge>
          <button onClick={reserve} className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Reserve">
            <BookmarkPlus className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3 right-3">
            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${book.available ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${book.available ? "bg-success" : "bg-destructive"}`} />
              {book.available ? `${book.available} of ${book.copies} available` : "Out of stock"}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {book.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">{book.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

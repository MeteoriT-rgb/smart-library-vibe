import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { books } from "@/lib/mock-data";
import { BookCard } from "@/components/site/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Smart School Library" },
      { name: "description", content: "Browse the full catalog of books, filter by genre and reserve in seconds." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);

  const genres = useMemo(() => Array.from(new Set(books.map(b => b.genre))), []);

  const filtered = books.filter(b =>
    (!genre || b.genre === genre) &&
    b.rating >= minRating &&
    (b.title + b.author).toLowerCase().includes(q.toLowerCase())
  );

  const Filters = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Categories</h3>
        <div className="flex flex-col gap-1">
          <button onClick={() => setGenre(null)} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${!genre ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}>All books <span className="text-muted-foreground ml-2">{books.length}</span></button>
          {genres.map(g => {
            const count = books.filter(b => b.genre === g).length;
            return (
              <button key={g} onClick={() => setGenre(g)} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${genre === g ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}>
                {g} <span className="text-muted-foreground ml-2">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Min rating: {minRating.toFixed(1)}</h3>
        <Slider value={[minRating]} onValueChange={(v) => setMinRating(v[0])} min={0} max={5} step={0.5} />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Books Catalog</h1>
        <p className="text-muted-foreground mt-2">Explore our entire collection — {books.length} titles and growing.</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block">
          <Card><CardContent className="p-6">{Filters}</CardContent></Card>
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search title or author…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 h-11" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-11"><SlidersHorizontal className="h-4 w-4 mr-2" />Filters</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6">{Filters}</div>
              </SheetContent>
            </Sheet>
            <div className="flex rounded-lg border bg-card p-1">
              <Button variant={view === "grid" ? "default" : "ghost"} size="sm" onClick={() => setView("grid")} className="h-9"><LayoutGrid className="h-4 w-4" /></Button>
              <Button variant={view === "list" ? "default" : "ghost"} size="sm" onClick={() => setView("list")} className="h-9"><List className="h-4 w-4" /></Button>
            </div>
          </div>

          {genre && (
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setGenre(null)}>{genre} ✕</Badge>
              <span className="text-sm text-muted-foreground">{filtered.length} results</span>
            </div>
          )}

          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold">No books found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
            </Card>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          ) : (
            <div className="grid gap-3">
              {filtered.map(b => <BookCard key={b.id} book={b} view="list" />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, Sparkles, Users, BookOpen, BookmarkCheck, BookCheck, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/library-hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/site/Counter";
import { BookCard } from "@/components/site/BookCard";
import { announcements, books, stats } from "@/lib/mock-data";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart School Library — Home" },
      { name: "description", content: "Search, borrow and reserve from thousands of books at the Smart School Library." },
    ],
  }),
  component: Home,
});

const statCards = [
  { label: "Total Books", value: stats.totalBooks, icon: BookOpen, gradient: "from-primary to-primary-glow" },
  { label: "Total Students", value: stats.totalStudents, icon: Users, gradient: "from-primary-glow to-accent" },
  { label: "Borrowed", value: stats.borrowed, icon: BookCheck, gradient: "from-accent to-warning" },
  { label: "Available", value: stats.available, icon: BookmarkCheck, gradient: "from-success to-primary" },
];

function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => sliderRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Library" width={1920} height={1024} className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-up">
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur mb-5 hover:bg-white/20">
              <Sparkles className="h-3 w-3 mr-1" /> Welcome to Smart School Library
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Where curiosity finds its <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">next chapter</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto">
              Discover thousands of books across every subject. Reserve in one tap, borrow in seconds, and track your reading journey.
            </p>

            <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto rounded-2xl p-2 bg-white/10 backdrop-blur-md border border-white/20">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input placeholder="Search books, authors, ISBN…" className="pl-10 h-12 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-white/60" />
              </div>
              <Button asChild size="lg" className="h-12 gradient-primary shadow-glow">
                <Link to="/catalog">Search <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <Card key={s.label} className="glass-strong border-0 hover-lift animate-scale-in" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-6">
                <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} text-primary-foreground shadow-md`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold tracking-tight"><Counter to={s.value} /></div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge variant="secondary" className="mb-2">Featured</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Popular this month</h2>
            <p className="text-muted-foreground mt-1">Hand-picked highlights students are loving right now.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/catalog">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.filter(b => b.featured).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      {/* Recently added slider */}
      <section className="bg-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">Just in</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Recently added</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => scroll(-1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" onClick={() => scroll(1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div ref={sliderRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-thin">
            {books.slice(4).map(b => (
              <div key={b.id} className="snap-start shrink-0 w-[260px]">
                <BookCard book={b} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-8">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {announcements.map((a) => (
            <Card key={a.id} className="hover-lift overflow-hidden">
              <div className="h-1.5 gradient-primary" />
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">{a.tag}</Badge>
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{a.body}</p>
                <div className="mt-4 text-xs text-muted-foreground">{a.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

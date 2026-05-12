import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { books } from "@/lib/mock-data";
import { Star, ArrowLeft, BookmarkPlus, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookCard } from "@/components/site/BookCard";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$bookId")({
  head: ({ params }) => {
    const book = books.find(b => b.id === params.bookId);
    return {
      meta: [
        { title: book ? `${book.title} — Smart School Library` : "Book — Smart School Library" },
        { name: "description", content: book?.description ?? "Book details" },
      ],
    };
  },
  component: BookDetails,
});

const reviews = [
  { name: "Lily T.", rating: 5, body: "Couldn't put it down — beautifully written and gripping." },
  { name: "Marcus R.", rating: 4, body: "Engaging characters and a satisfying ending. Highly recommend." },
  { name: "Sofia K.", rating: 5, body: "Required reading for anyone curious about the topic." },
];

function BookDetails() {
  const { bookId } = useParams({ from: "/book/$bookId" });
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <Button asChild className="mt-4"><Link to="/catalog">Back to catalog</Link></Button>
      </div>
    );
  }

  const similar = books.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);
  const pct = (book.available / book.copies) * 100;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/catalog"><ArrowLeft className="h-4 w-4 mr-2" /> Back to catalog</Link>
      </Button>

      <div className="grid lg:grid-cols-[400px_1fr] gap-10">
        <div>
          <div className="relative group animate-scale-in">
            <div className="absolute -inset-4 rounded-3xl gradient-primary opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
            <img src={book.cover} alt={book.title} className="relative w-full rounded-2xl shadow-elegant aspect-[3/4] object-cover" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button onClick={() => toast.success("Reserved!", { description: `"${book.title}" is queued for you.` })} className="gradient-primary shadow-glow"><BookmarkPlus className="h-4 w-4 mr-2" />Reserve</Button>
            <Button variant="outline"><Heart className="h-4 w-4 mr-2" />Favorite</Button>
          </div>
        </div>

        <div className="animate-fade-up">
          <Badge variant="secondary" className="mb-3">{book.genre}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">by <span className="text-foreground font-medium">{book.author}</span></p>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> <strong>{book.rating.toFixed(1)}</strong> · 124 reviews</span>
            <Button variant="ghost" size="sm"><Share2 className="h-4 w-4 mr-1" />Share</Button>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{book.description} {book.description}</p>

          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Availability</span>
                <span className="text-sm text-muted-foreground">{book.available} of {book.copies} copies</span>
              </div>
              <Progress value={pct} className="h-2" />
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div><div className="text-muted-foreground">ISBN</div><div className="font-medium">{book.isbn}</div></div>
                <div><div className="text-muted-foreground">Year</div><div className="font-medium">{book.year}</div></div>
                <div><div className="text-muted-foreground">Pages</div><div className="font-medium">{book.pages}</div></div>
                <div><div className="text-muted-foreground">Status</div><div className={`font-medium ${book.available ? "text-success" : "text-destructive"}`}>{book.available ? "Available" : "Out of stock"}</div></div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <Card key={r.name}>
                  <CardContent className="p-5 flex gap-4">
                    <Avatar><AvatarFallback className="gradient-primary text-primary-foreground">{r.name[0]}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{r.name}</span>
                        <span className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {similar.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { books, reservations } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle2, Clock, Users, BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Smart School Library" },
      { name: "description", content: "Reserve unavailable books and track your queue position." },
    ],
  }),
  component: Reservations,
});

const queueable = books.filter(b => !b.available);

function Reservations() {
  const [success, setSuccess] = useState<string | null>(null);

  const reserve = (title: string) => {
    setSuccess(title);
    toast.success("Reservation placed", { description: `You'll be notified when "${title}" is available.` });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Reservations & Pre-orders</h1>
        <p className="text-muted-foreground mt-2">Reserve a book that is currently checked out — we'll hold the next available copy for you.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Active reservations", value: 7, icon: Clock, color: "from-primary to-primary-glow" },
          { label: "Ready for pickup", value: 2, icon: CheckCircle2, color: "from-success to-primary" },
          { label: "In queue", value: 14, icon: Users, color: "from-accent to-warning" },
        ].map((s) => (
          <Card key={s.label} className="hover-lift">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-primary-foreground`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold">Books open for pre-order</h2>
          <Input placeholder="Search…" className="max-w-xs" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {queueable.map(b => (
            <Card key={b.id} className="overflow-hidden hover-lift">
              <CardContent className="p-5 flex gap-4">
                <img src={b.cover} alt={b.title} className="h-28 w-20 object-cover rounded-lg shadow" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.author}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <Badge variant="secondary"><Users className="h-3 w-3 mr-1" />Queue: {(parseInt(b.id.split("-")[1])) % 5 + 1}</Badge>
                    <Badge variant="outline">Expected: May {12 + (parseInt(b.id.split("-")[1]) % 10)}</Badge>
                  </div>
                  <Button size="sm" className="mt-3 gradient-primary" onClick={() => reserve(b.title)}><BookmarkPlus className="h-3.5 w-3.5 mr-1" />Reserve</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Reservation history</h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Reserved on</TableHead>
                  <TableHead>Queue</TableHead>
                  <TableHead>Expected</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.book}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.queue === 0 ? "—" : `#${r.queue}`}</TableCell>
                    <TableCell>{r.expected}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Ready" ? "default" : r.status === "Active" ? "secondary" : r.status === "Cancelled" ? "destructive" : "outline"}>
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Dialog open={!!success} onOpenChange={() => setSuccess(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 mb-2">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <DialogTitle className="text-center">Reservation confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              "{success}" has been reserved. We'll send you a notification the moment it's available.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter><Button className="w-full" onClick={() => setSuccess(null)}>Got it</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

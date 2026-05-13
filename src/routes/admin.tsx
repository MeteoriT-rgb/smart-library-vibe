import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  books as seedBooks,
  announcements as seedAnnouncements,
  debtors,
  reservations,
  monthlyActivity,
  popularGenres,
  recentActivity,
  stats,
  type Book,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookOpen, Users, BookCheck, AlertTriangle, Plus, Trash2, Pencil,
  Megaphone, LayoutDashboard, Library, CalendarClock, ShieldCheck, Search,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Smart School Library" },
      { name: "description", content: "Manage books, students, reservations and analytics." },
    ],
  }),
  component: Admin,
});

const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#8b5cf6"];

function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else if (user.role !== "admin") navigate({ to: "/profile" });
  }, [user, navigate]);

  const [tab, setTab] = useState("overview");
  const [bookList, setBookList] = useState<Book[]>(seedBooks);
  const [annList, setAnnList] = useState(seedAnnouncements);
  const [bookSearch, setBookSearch] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(
    () => bookList.filter((b) =>
      [b.title, b.author, b.genre, b.isbn].join(" ").toLowerCase().includes(bookSearch.toLowerCase())
    ),
    [bookList, bookSearch],
  );

  const totalAvailable = bookList.reduce((s, b) => s + b.available, 0);
  const totalCopies = bookList.reduce((s, b) => s + b.copies, 0);
  const totalBorrowed = totalCopies - totalAvailable;

  const overviewStats = [
    { label: "Total Books", value: bookList.length, icon: BookOpen, hint: `${totalCopies} copies`, color: "from-primary to-primary-glow" },
    { label: "Students", value: stats.totalStudents, icon: Users, hint: "+24 this week", color: "from-accent to-warning" },
    { label: "Borrowed", value: totalBorrowed, icon: BookCheck, hint: "Active loans", color: "from-success to-primary" },
    { label: "Overdue", value: debtors.length, icon: AlertTriangle, hint: "Needs follow-up", color: "from-destructive to-warning" },
  ];

  if (!user || user.role !== "admin") return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-up">
        <div>
          <Badge className="mb-2 gradient-primary text-primary-foreground border-0">
            <ShieldCheck className="h-3 w-3 mr-1" /> Admin
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Control Center</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user.name.split(" ")[0]}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild><Link to="/catalog">View public catalog</Link></Button>
          <Button className="gradient-primary shadow-glow" onClick={() => { setCreating(true); setTab("books"); }}>
            <Plus className="h-4 w-4 mr-1" /> Add book
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="glass border h-auto p-1 flex flex-wrap">
          <TabsTrigger value="overview"><LayoutDashboard className="h-4 w-4 mr-1" /> Overview</TabsTrigger>
          <TabsTrigger value="books"><Library className="h-4 w-4 mr-1" /> Books</TabsTrigger>
          <TabsTrigger value="students"><Users className="h-4 w-4 mr-1" /> Students</TabsTrigger>
          <TabsTrigger value="reservations"><CalendarClock className="h-4 w-4 mr-1" /> Reservations</TabsTrigger>
          <TabsTrigger value="announcements"><Megaphone className="h-4 w-4 mr-1" /> Announcements</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((s, i) => (
              <Card key={s.label} className="glass-strong border-0 hover-lift animate-scale-in" style={{ animationDelay: `${i * 60}ms` }}>
                <CardContent className="p-5">
                  <div className={`mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-primary-foreground shadow-md`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-bold tracking-tight"><Counter to={s.value} /></div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{s.hint}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Monthly activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyActivity}>
                    <defs>
                      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Legend />
                    <Area type="monotone" dataKey="borrowed" stroke="hsl(var(--primary))" fill="url(#b)" />
                    <Area type="monotone" dataKey="returned" stroke="hsl(var(--accent))" fill="url(#r)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader><CardTitle>Popular genres</CardTitle></CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={popularGenres} dataKey="value" nameKey="genre" innerRadius={50} outerRadius={90} paddingAngle={3}>
                      {popularGenres.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader><CardTitle>Fines by student (USD)</CardTitle></CardHeader>
              <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={debtors.map(d => ({ name: d.name.split(" ")[0], fine: d.fine }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Bar dataKey="fine" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors">
                    <div>
                      <div className="text-sm"><span className="font-medium">{a.who}</span> {a.action} <span className="text-primary">{a.what}</span></div>
                      <div className="text-xs text-muted-foreground">{a.when}</div>
                    </div>
                    <Badge variant={a.action === "borrowed" ? "default" : a.action === "returned" ? "secondary" : "outline"}>{a.action}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* BOOKS */}
        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle>Book inventory</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{bookList.length} titles · {totalCopies} copies</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={bookSearch} onChange={(e) => setBookSearch(e.target.value)} placeholder="Search books…" className="pl-9 w-64" />
                </div>
                <Button onClick={() => setCreating(true)} className="gradient-primary"><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">Copies</TableHead>
                    <TableHead className="text-right">Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={b.cover} alt={b.title} className="h-10 w-8 object-cover rounded" />
                          <div>
                            <div className="font-medium">{b.title}</div>
                            <div className="text-xs text-muted-foreground">{b.author}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{b.genre}</Badge></TableCell>
                      <TableCell className="font-mono text-xs">{b.isbn}</TableCell>
                      <TableCell className="text-right">{b.copies}</TableCell>
                      <TableCell className="text-right">{b.available}</TableCell>
                      <TableCell>
                        {b.available === 0 ? <Badge variant="destructive">Out</Badge>
                          : b.available < 2 ? <Badge className="bg-warning text-warning-foreground">Low</Badge>
                          : <Badge className="bg-success text-primary-foreground">In stock</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setEditing(b)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                          setBookList((l) => l.filter((x) => x.id !== b.id));
                          toast.success(`Deleted "${b.title}"`);
                        }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-10">No books match your search.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <BookDialog
            open={creating || !!editing}
            initial={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSave={(b) => {
              if (editing) {
                setBookList((l) => l.map((x) => x.id === b.id ? b : x));
                toast.success("Book updated");
              } else {
                setBookList((l) => [{ ...b, id: `bk-${Date.now()}` }, ...l]);
                toast.success("Book added");
              }
              setEditing(null); setCreating(false);
            }}
          />
        </TabsContent>

        {/* STUDENTS */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Overdue borrowers</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-right">Days late</TableHead>
                    <TableHead className="text-right">Fine</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debtors.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8"><AvatarImage src={d.avatar} /><AvatarFallback>{d.name[0]}</AvatarFallback></Avatar>
                          <span className="font-medium">{d.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{d.grade}</TableCell>
                      <TableCell>{d.book}</TableCell>
                      <TableCell>{d.due}</TableCell>
                      <TableCell className="text-right"><Badge variant="destructive">{d.daysLate}d</Badge></TableCell>
                      <TableCell className="text-right font-medium">${d.fine.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => toast.success(`Reminder sent to ${d.name}`)}>Send reminder</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESERVATIONS */}
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Active reservations</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Reserved on</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Queue</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.book}</TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          r.status === "Ready" ? "default" :
                          r.status === "Active" ? "secondary" :
                          r.status === "Cancelled" ? "destructive" : "outline"
                        }>{r.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{r.queue}</TableCell>
                      <TableCell>{r.expected}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => toast.success("Marked as ready")}>Mark ready</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANNOUNCEMENTS */}
        <TabsContent value="announcements" className="space-y-4">
          <AnnouncementForm onAdd={(a) => {
            setAnnList((l) => [{ id: Date.now(), ...a }, ...l]);
            toast.success("Announcement published");
          }} />
          <div className="grid md:grid-cols-3 gap-4">
            {annList.map((a) => (
              <Card key={a.id} className="hover-lift overflow-hidden">
                <div className="h-1 gradient-primary" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{a.tag}</Badge>
                    <Button size="icon" variant="ghost" onClick={() => {
                      setAnnList((l) => l.filter((x) => x.id !== a.id));
                      toast.success("Deleted");
                    }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
                  <div className="text-xs text-muted-foreground mt-3">{a.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookDialog({ open, initial, onClose, onSave }: {
  open: boolean; initial: Book | null; onClose: () => void; onSave: (b: Book) => void;
}) {
  const empty: Book = {
    id: "", title: "", author: "", genre: "Fiction",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    rating: 4, copies: 1, available: 1, isbn: "", year: 2025, pages: 200, description: "",
  };
  const [b, setB] = useState<Book>(initial ?? empty);
  useEffect(() => { setB(initial ?? empty); /* eslint-disable-next-line */ }, [initial, open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{initial ? "Edit book" : "Add a new book"}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1.5"><Label>Title</Label><Input value={b.title} onChange={(e) => setB({ ...b, title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Author</Label><Input value={b.author} onChange={(e) => setB({ ...b, author: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Genre</Label><Input value={b.genre} onChange={(e) => setB({ ...b, genre: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>ISBN</Label><Input value={b.isbn} onChange={(e) => setB({ ...b, isbn: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Year</Label><Input type="number" value={b.year} onChange={(e) => setB({ ...b, year: +e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Copies</Label><Input type="number" value={b.copies} onChange={(e) => setB({ ...b, copies: +e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Available</Label><Input type="number" value={b.available} onChange={(e) => setB({ ...b, available: +e.target.value })} /></div>
          <div className="col-span-2 space-y-1.5"><Label>Cover URL</Label><Input value={b.cover} onChange={(e) => setB({ ...b, cover: e.target.value })} /></div>
          <div className="col-span-2 space-y-1.5"><Label>Description</Label><Textarea rows={3} value={b.description} onChange={(e) => setB({ ...b, description: e.target.value })} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="gradient-primary" onClick={() => {
            if (!b.title || !b.author) { toast.error("Title and author required"); return; }
            onSave(b);
          }}>{initial ? "Save changes" : "Add book"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AnnouncementForm({ onAdd }: { onAdd: (a: { title: string; body: string; tag: string; date: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", tag: "News" });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button className="gradient-primary"><Plus className="h-4 w-4 mr-1" /> New announcement</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader><DialogTitle>Publish announcement</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Tag</Label><Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Body</Label><Textarea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="gradient-primary" onClick={() => {
            if (!form.title || !form.body) { toast.error("Title and body required"); return; }
            onAdd({ ...form, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
            setForm({ title: "", body: "", tag: "News" });
            setOpen(false);
          }}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

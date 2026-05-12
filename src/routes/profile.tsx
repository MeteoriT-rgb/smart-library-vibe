import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { books } from "@/lib/mock-data";
import { Trophy, BookOpen, Heart, Settings, Star, Mail, MapPin } from "lucide-react";
import { BookCard } from "@/components/site/BookCard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — Smart School Library" },
      { name: "description", content: "Your reading history, achievements and library settings." },
    ],
  }),
  component: Profile,
});

const badges = [
  { name: "Bookworm", desc: "Read 50 books", icon: BookOpen, color: "from-primary to-primary-glow" },
  { name: "Speed Reader", desc: "5 books in a month", icon: Trophy, color: "from-accent to-warning" },
  { name: "Critic", desc: "Wrote 20 reviews", icon: Star, color: "from-primary-glow to-accent" },
  { name: "On Time", desc: "No overdue returns", icon: Heart, color: "from-success to-primary" },
];

function Profile() {
  const borrowed = books.slice(0, 3);
  const reserved = books.slice(3, 5);
  const favorites = books.slice(5, 9);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Card className="overflow-hidden">
        <div className="h-32 gradient-hero" />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
            <Avatar className="h-28 w-28 ring-4 ring-background shadow-elegant">
              <AvatarImage src="https://i.pravatar.cc/300?img=33" />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Emma Mitchell</h1>
              <p className="text-muted-foreground">Grade 11 · Member since 2023</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" />emma.m@school.edu</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />Building A · Locker 142</span>
              </div>
            </div>
            <Button>Edit profile</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Books read", value: 48 },
          { label: "Currently borrowed", value: 3 },
          { label: "Pages this year", value: "12,480" },
          { label: "Avg rating given", value: "4.6" },
        ].map(s => (
          <Card key={s.label} className="hover-lift">
            <CardContent className="p-5">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(b => (
            <Card key={b.name} className="hover-lift text-center">
              <CardContent className="p-5">
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${b.color} text-primary-foreground shadow-md`}>
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="mt-3 font-semibold">{b.name}</div>
                <div className="text-xs text-muted-foreground">{b.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Tabs defaultValue="borrowed">
        <TabsList>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="reserved">Reserved</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="fines">Fine history</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="borrowed" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {borrowed.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </TabsContent>
        <TabsContent value="reserved" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {reserved.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {favorites.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </TabsContent>
        <TabsContent value="fines" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              {[
                { d: "2026-03-12", a: "$2.50", r: "Returned 5 days late" },
                { d: "2025-11-04", a: "$1.00", r: "Returned 2 days late" },
              ].map((f, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div><div className="font-medium">{f.r}</div><div className="text-xs text-muted-foreground">{f.d}</div></div>
                  <Badge variant="destructive">{f.a}</Badge>
                </div>
              ))}
              <p className="text-sm text-muted-foreground pt-2">All fines paid · No outstanding balance.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Display name</Label><Input defaultValue="Emma Mitchell" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="emma.m@school.edu" /></div>
              </div>
              {[
                { t: "Email reminders", d: "Get notified before books are due" },
                { t: "Reservation alerts", d: "Notify me when reserved books are ready" },
                { t: "Newsletter", d: "Monthly highlights from the library" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium flex items-center gap-2"><Settings className="h-4 w-4" />{s.t}</div>
                    <div className="text-sm text-muted-foreground">{s.d}</div>
                  </div>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { librarians } from "@/lib/mock-data";
import { BookOpen, Clock, Shield, Wifi, Coffee, Mail } from "lucide-react";
import heroImg from "@/assets/library-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Smart School Library" },
      { name: "description", content: "Our mission, hours, rules and the team behind the library." },
    ],
  }),
  component: About,
});

const rules = [
  { icon: BookOpen, t: "Borrow up to 5 books at a time", d: "Standard loan period is 14 days." },
  { icon: Clock, t: "Return on time", d: "Late returns incur a small fine after 3 grace days." },
  { icon: Shield, t: "Respect the materials", d: "Damaged or lost books may need replacement." },
  { icon: Wifi, t: "Quiet zones", d: "Use the silent reading rooms for focused study." },
  { icon: Coffee, t: "No food in stacks", d: "Drinks with lids are okay in lounge areas." },
  { icon: Mail, t: "Stay informed", d: "Subscribe to the weekly newsletter." },
];

const timeline = [
  { y: "1968", t: "Library founded", d: "Opened with 800 carefully selected titles." },
  { y: "1992", t: "First expansion", d: "New wing added, capacity tripled." },
  { y: "2010", t: "Digital catalog", d: "Full digitization and online catalog launched." },
  { y: "2024", t: "Smart Library", d: "Modern reservations, analytics and student dashboards." },
];

const gallery = [
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
  "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
  "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
];

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-primary-foreground">
          <Badge className="bg-white/15 text-white border-white/20 backdrop-blur mb-4">About</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">A library built for the next generation of curious minds.</h1>
          <p className="mt-4 text-white/85 max-w-2xl">For over five decades, we've helped students explore ideas, discover passions and build the habits of lifelong readers.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge variant="secondary" className="mb-3">Working hours</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Open when you need us</h2>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            <li className="flex justify-between border-b py-2"><span>Monday – Friday</span><span className="text-foreground font-medium">8:00 AM – 9:00 PM</span></li>
            <li className="flex justify-between border-b py-2"><span>Saturday</span><span className="text-foreground font-medium">10:00 AM – 5:00 PM</span></li>
            <li className="flex justify-between border-b py-2"><span>Sunday</span><span className="text-foreground font-medium">Closed</span></li>
            <li className="flex justify-between py-2"><span>Holidays</span><span className="text-foreground font-medium">Reduced hours</span></li>
          </ul>
        </div>
        <Card className="overflow-hidden">
          <img src={gallery[0]} alt="Library interior" className="w-full h-80 object-cover" />
        </Card>
      </section>

      <section className="bg-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Library rules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rules.map(r => (
              <Card key={r.t} className="hover-lift">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground mb-4">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{r.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{r.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Meet the team</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {librarians.map(l => (
            <Card key={l.name} className="text-center hover-lift">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/10">
                  <AvatarImage src={l.avatar} />
                  <AvatarFallback>{l.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mt-4">{l.name}</h3>
                <p className="text-sm text-muted-foreground">{l.role}</p>
                <p className="text-xs text-primary mt-1">{l.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Our journey</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={t.y} className={`relative md:grid md:grid-cols-2 md:gap-8 ${i % 2 ? "" : "md:[&>*:first-child]:order-2"}`}>
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground text-xs font-bold shadow-glow">
                    {t.y.slice(2)}
                  </div>
                  <Card><CardContent className="p-5">
                    <div className="text-sm font-semibold text-primary">{t.y}</div>
                    <h3 className="font-semibold mt-1">{t.t}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
                  </CardContent></Card>
                </div>
                <div />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl group">
              <img src={src} alt="" loading="lazy" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

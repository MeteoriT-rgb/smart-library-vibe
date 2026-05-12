import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { monthlyActivity, popularGenres, recentActivity, stats } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { BookOpen, BookCheck, TrendingUp, Users, Bell } from "lucide-react";
import { Counter } from "@/components/site/Counter";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Smart School Library" },
      { name: "description", content: "Library analytics, charts and recent activity." },
    ],
  }),
  component: Dashboard,
});

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Library Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time insights and activity across the library.</p>
        </div>
        <Badge variant="secondary" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-success animate-pulse" />Live</Badge>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Books borrowed", value: stats.borrowed, delta: "+12%", icon: BookCheck, color: "from-primary to-primary-glow" },
          { label: "Active students", value: 942, delta: "+5%", icon: Users, color: "from-primary-glow to-accent" },
          { label: "New arrivals", value: 124, delta: "+38%", icon: BookOpen, color: "from-accent to-warning" },
          { label: "Engagement", value: 87, delta: "+9%", icon: TrendingUp, color: "from-success to-primary", suffix: "%" },
        ].map((s, i) => (
          <Card key={s.label} className="hover-lift glass-strong border-0 animate-scale-in" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-primary-foreground`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-success">{s.delta}</Badge>
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight"><Counter to={s.value} suffix={s.suffix ?? ""} /></div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly activity</h3>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-chart-1" />Borrowed</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-chart-2" />Returned</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={monthlyActivity}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="borrowed" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#g1)" />
                  <Area type="monotone" dataKey="returned" stroke="var(--color-chart-2)" strokeWidth={2.5} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Popular genres</h3>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={popularGenres} dataKey="value" nameKey="genre" innerRadius={50} outerRadius={90} paddingAngle={3}>
                    {popularGenres.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Borrowed vs Returned</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={monthlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Bar dataKey="borrowed" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="returned" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4" />Recent activity</h3>
            <ul className="space-y-3">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 mt-2 rounded-full gradient-primary" />
                  <div className="flex-1">
                    <p><strong>{a.who}</strong> {a.action} <em className="text-muted-foreground">"{a.what}"</em></p>
                    <p className="text-xs text-muted-foreground">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {[
                { tag: "Overdue", body: "8 books are overdue. Reminders sent.", color: "destructive" },
                { tag: "Reservation", body: "12 reservations are ready for pickup.", color: "default" },
                { tag: "New arrivals", body: "120 new books added to the catalog.", color: "secondary" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                  <Badge variant={n.color as never}>{n.tag}</Badge>
                  <p className="text-sm">{n.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-center">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

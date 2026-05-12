import { createFileRoute } from "@tanstack/react-router";
import { debtors } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, DollarSign, Clock, Bell, Search } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/borrowers")({
  head: () => ({
    meta: [
      { title: "Borrowers — Smart School Library" },
      { name: "description", content: "Track overdue books, fines and outstanding borrowers." },
    ],
  }),
  component: Borrowers,
});

const fineByGrade = [
  { grade: "Grade 9", fines: 24 },
  { grade: "Grade 10", fines: 38 },
  { grade: "Grade 11", fines: 52 },
  { grade: "Grade 12", fines: 19 },
];

function Borrowers() {
  const [q, setQ] = useState("");
  const filtered = debtors.filter(d => (d.name + d.book).toLowerCase().includes(q.toLowerCase()));
  const totalFines = debtors.reduce((s, d) => s + d.fine, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Borrowers & Overdue</h1>
        <p className="text-muted-foreground mt-2">Students who have not yet returned borrowed books.</p>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Overdue books", value: debtors.length, icon: AlertTriangle, color: "from-destructive to-warning" },
          { label: "Outstanding fines", value: `$${totalFines.toFixed(2)}`, icon: DollarSign, color: "from-warning to-accent" },
          { label: "Avg days late", value: Math.round(debtors.reduce((s, d) => s + d.daysLate, 0) / debtors.length), icon: Clock, color: "from-primary to-primary-glow" },
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

      <Card className="border-warning/40 bg-warning/5">
        <CardContent className="p-5 flex items-start gap-3">
          <Bell className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Reminder system active</div>
            <div className="text-sm text-muted-foreground">Automated email reminders are sent 3 days before due date and weekly afterwards.</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <h3 className="font-semibold">All borrowers</h3>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Days late</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(d => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9"><AvatarImage src={d.avatar} /><AvatarFallback>{d.name[0]}</AvatarFallback></Avatar>
                          <div>
                            <div className="font-medium">{d.name}</div>
                            <div className="text-xs text-muted-foreground">{d.grade}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{d.book}</TableCell>
                      <TableCell>{d.due}</TableCell>
                      <TableCell>
                        <Badge variant={d.daysLate > 14 ? "destructive" : "secondary"}>{d.daysLate}d</Badge>
                      </TableCell>
                      <TableCell className="font-medium">${d.fine.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline"><Bell className="h-3.5 w-3.5 mr-1" />Notify</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Fines by grade</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={fineByGrade}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="grade" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Bar dataKey="fines" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

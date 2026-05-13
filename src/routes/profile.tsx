import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { BookOpen, Calendar, GraduationCap, Mail, LogOut, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Smart School Library" },
      { name: "description", content: "Your reader profile, reading stats and account details." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/signup" });
  }, [user, navigate]);

  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const joined = new Date(user.joinedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const stats = [
    { label: "Books read", value: 24, icon: BookOpen },
    { label: "Currently borrowed", value: 2, icon: Clock },
    { label: "Achievements", value: 5, icon: Award },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Card className="overflow-hidden border-border/60 animate-fade-up">
        <div className="h-32 gradient-primary" />
        <CardContent className="p-6 sm:p-8 -mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-elegant">
              <AvatarFallback className="text-2xl gradient-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 sm:pb-2">
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{user.email}</span>
                {user.grade && <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />{user.grade}</span>}
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Joined {joined}</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => { signOut(); navigate({ to: "/" }); }}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg gradient-primary text-primary-foreground">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-2">
            {["Early Reader", "Genre Explorer", "Streak: 7 days", "Reviewed 5 books", "On time returns"].map((a) => (
              <Badge key={a} variant="secondary" className="px-3 py-1.5 text-sm">
                <Award className="h-3.5 w-3.5 mr-1.5" />{a}
              </Badge>
            ))}
          </div>

          <Separator className="my-6" />

          <h2 className="text-xl font-bold tracking-tight mb-2">Continue exploring</h2>
          <p className="text-sm text-muted-foreground mb-4">Browse the catalog and find your next great read.</p>
          <Button asChild className="gradient-primary"><Link to="/catalog">Browse catalog</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}

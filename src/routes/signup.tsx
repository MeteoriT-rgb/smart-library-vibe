import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Mail, Lock, User as UserIcon, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Smart School Library" },
      { name: "description", content: "Create your Smart School Library account to borrow and reserve books." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", grade: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signUp({ name: form.name, email: form.email, grade: form.grade });
      toast.success(`Welcome, ${form.name.split(" ")[0]}!`);
      navigate({ to: "/profile" });
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] grid place-items-center px-4 py-12 bg-mesh">
      <div className="absolute inset-0 -z-10 opacity-60 bg-mesh" />
      <Card className="w-full max-w-md glass-strong border-border/60 animate-fade-up">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow mb-3">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Join thousands of curious readers
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={UserIcon} id="name" label="Full name" placeholder="Ada Lovelace"
              value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field icon={Mail} id="email" label="Email" type="email" placeholder="ada@school.edu"
              value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field icon={GraduationCap} id="grade" label="Grade / Class (optional)" placeholder="Grade 10 — A"
              value={form.grade} onChange={(v) => setForm({ ...form, grade: v })} />
            <Field icon={Lock} id="password" label="Password" type="password" placeholder="••••••••"
              value={form.password} onChange={(v) => setForm({ ...form, password: v })} />

            <Button type="submit" className="w-full h-11 gradient-primary shadow-glow" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-primary hover:underline">Back to home</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ icon: Icon, id, label, value, onChange, type = "text", placeholder }: {
  icon: React.ComponentType<{ className?: string }>;
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} className="pl-9 h-11" />
      </div>
    </div>
  );
}

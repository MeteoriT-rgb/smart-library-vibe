import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Twitter, Instagram, Github, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Smart School Library" },
      { name: "description", content: "Get in touch with the library team — questions, suggestions or partnerships." },
    ],
  }),
  component: Contact,
});

const faqs = [
  { q: "How many books can I borrow?", a: "Students can borrow up to 5 books at a time, with a 14-day loan period." },
  { q: "Can I renew a borrowed book?", a: "Yes — you can renew up to twice if no other student has reserved the title." },
  { q: "What happens if I return a book late?", a: "After a 3-day grace period, a small fine accrues per day. You'll receive reminder emails." },
  { q: "How do reservations work?", a: "Reserve any unavailable book and you'll be notified the moment it's returned. You have 48 hours to pick it up." },
  { q: "Do you accept book donations?", a: "Absolutely! Please reach out via the contact form to coordinate." },
];

function Contact() {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", { description: "We'll get back to you within one business day." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground mt-3">We love hearing from students, parents and partners. Send us a note — we'll reply soon.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { icon: Mail, label: "Email", value: "library@school.edu" },
          { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
          { icon: MapPin, label: "Address", value: "120 Scholar Ave, Building A" },
        ].map(c => (
          <Card key={c.label} className="hover-lift text-center">
            <CardContent className="p-6">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground mb-3">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="text-sm text-muted-foreground">{c.label}</div>
              <div className="font-semibold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Send a message</h2>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name</Label><Input required placeholder="Jane Doe" /></div>
                <div className="space-y-2"><Label>Email</Label><Input required type="email" placeholder="jane@school.edu" /></div>
              </div>
              <div className="space-y-2"><Label>Subject</Label><Input required placeholder="How can we help?" /></div>
              <div className="space-y-2"><Label>Message</Label><Textarea required rows={5} placeholder="Tell us a bit more…" /></div>
              <Button type="submit" className="gradient-primary shadow-glow w-full"><Send className="h-4 w-4 mr-2" />Send message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-mesh">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow animate-float">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-semibold">120 Scholar Ave</p>
                  <p className="text-sm text-muted-foreground">Building A · Ground floor</p>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Follow us</h3>
              <div className="flex gap-2">
                {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-lg border bg-card hover:gradient-primary hover:text-primary-foreground hover:border-transparent transition-all">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

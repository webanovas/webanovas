import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/Footer";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const quizPackage = searchParams.get("package");
  const quizPrice = searchParams.get("price");
  const choicesRaw = searchParams.get("choices");
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  let choices: Record<string, string> | null = null;
  try {
    if (choicesRaw) choices = JSON.parse(choicesRaw);
  } catch {
    choices = null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name,
          email,
          message,
          package: quizPackage || undefined,
          price: quizPrice || undefined,
          choices: choices || undefined,
        },
      });

      if (error) throw error;

      setSent(true);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-2xl mx-auto pt-28 md:pt-40">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("contact.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            {t("contact.title1")}<br />
            <span className="text-gradient italic">{t("contact.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.form
          className="glass-card p-8 md:p-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          {quizPackage && (
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-1">{t("contact.selectedPackage")}</span>
              <span className="font-display font-semibold text-foreground">{quizPackage}</span>
              <span className="text-gradient font-display font-bold ml-2">{quizPrice}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em] font-body">{t("contact.name")}</Label>
              <Input id="name" placeholder={t("contact.namePh")} className="bg-secondary/50 border-border/50 font-body" disabled={sending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em] font-body">{t("contact.email")}</Label>
              <Input id="email" type="email" placeholder={t("contact.emailPh")} className="bg-secondary/50 border-border/50 font-body" disabled={sending} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em] font-body">{t("contact.message")}</Label>
            <Textarea id="message" placeholder={t("contact.messagePh")} rows={5} className="bg-secondary/50 border-border/50 font-body" disabled={sending} />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full font-body gap-2 group" disabled={sending || sent}>
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : sent ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Sent!
              </>
            ) : (
              <>
                {t("contact.send")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
      <div className="max-w-6xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}

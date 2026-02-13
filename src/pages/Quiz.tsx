import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "How many pages does your website need?",
    options: [
      { label: "Just a single landing page", score: 0 },
      { label: "2–5 pages (About, Services, Contact, etc.)", score: 1 },
      { label: "6+ pages or a full web application", score: 2 },
    ],
  },
  {
    question: "What level of design are you looking for?",
    options: [
      { label: "Clean and minimal — just get it done", score: 0 },
      { label: "Custom design with branded look & feel", score: 1 },
      { label: "Premium design with advanced animations & effects", score: 2 },
    ],
  },
  {
    question: "Do you need a content management system (CMS)?",
    options: [
      { label: "No — content will rarely change", score: 0 },
      { label: "Basic CMS for blog posts or updates", score: 1 },
      { label: "Full CMS with multiple content types", score: 2 },
    ],
  },
  {
    question: "Will users need to create accounts or log in?",
    options: [
      { label: "No user accounts needed", score: 0 },
      { label: "Simple login (email/password or social)", score: 1 },
      { label: "Full auth system with roles & permissions", score: 2 },
    ],
  },
  {
    question: "Do you need a database or backend logic?",
    options: [
      { label: "No — it's a static website", score: 0 },
      { label: "Basic backend (contact forms, simple data)", score: 1 },
      { label: "Complex backend with APIs, dashboards, or integrations", score: 2 },
    ],
  },
  {
    question: "Do you need e-commerce or payment processing?",
    options: [
      { label: "No payments needed", score: 0 },
      { label: "Simple checkout (1–5 products or services)", score: 1 },
      { label: "Full e-commerce store with inventory management", score: 2 },
    ],
  },
  {
    question: "What's your timeline?",
    options: [
      { label: "No rush — flexible timeline", score: 0 },
      { label: "Within 2–4 weeks", score: 1 },
      { label: "ASAP — I need it yesterday", score: 2 },
    ],
  },
];

const priceResults = [
  { minScore: 0, maxScore: 2, price: "$300", label: "Basic Landing", description: "A clean, effective landing page to establish your online presence." },
  { minScore: 3, maxScore: 5, price: "$700", label: "Starter Website", description: "A professional multi-page site with custom design and solid foundations." },
  { minScore: 6, maxScore: 8, price: "$1,500", label: "Professional", description: "A feature-rich website with CMS, animations, and optimized performance." },
  { minScore: 9, maxScore: 11, price: "$2,500", label: "Advanced", description: "A powerful web platform with backend logic, auth, and premium design." },
  { minScore: 12, maxScore: 14, price: "$4,000+", label: "Enterprise", description: "A full-scale web application — no compromises, built to scale." },
];

function getResult(score: number) {
  return priceResults.find((r) => score >= r.minScore && score <= r.maxScore) || priceResults[4];
}

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, questions[currentQ].options[selectedOption].score];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-2xl mx-auto pt-28 md:pt-40">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">Price Calculator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
            Find your<br />
            <span className="text-gradient italic">perfect fit.</span>
          </h1>
          <p className="text-muted-foreground font-body leading-relaxed">
            Answer 3 quick questions and we'll suggest the right package for your project.
          </p>
        </motion.div>

        {/* Progress bar */}
        {!showResult && (
          <div className="flex gap-2 mb-10">
            {questions.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-secondary/50">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: i < currentQ ? "100%" : i === currentQ ? "50%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <div className="glass-card p-8 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3 mb-8">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 font-body ${
                        selectedOption === i
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                          : "border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="block text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    className="gap-2 font-body rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="gap-2 font-body rounded-full"
                  >
                    {currentQ === questions.length - 1 ? "See Result" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
                  }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                </motion.div>

                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body block mb-3">
                  Estimated Investment
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-2">
                    {result.price}
                  </h2>
                  <span className="text-lg font-display font-semibold text-foreground block mb-3">
                    {result.label}
                  </span>
                  <p className="text-muted-foreground font-body max-w-sm mx-auto mb-8 leading-relaxed">
                  {result.description}
                  </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="rounded-full px-8 gap-2 group font-body">
                    <Link to="/contact">
                      <MessageCircle className="w-4 h-4" />
                      Let's Talk
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRestart}
                    className="rounded-full px-8 font-body"
                  >
                    Start Over
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground font-body mt-6">
                  This is an estimate — <Link to="/contact" className="text-primary hover:underline">contact us</Link> for a tailored quote.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="max-w-6xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}

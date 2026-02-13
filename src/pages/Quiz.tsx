import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Quiz() {
  const { t } = useLanguage();

  const questions = [
    {
      id: "pages",
      question: t("quiz.q1"),
      options: [
        { label: t("quiz.q1a"), score: 0 },
        { label: t("quiz.q1b"), score: 2 },
        { label: t("quiz.q1c"), score: 5 },
      ],
    },
    {
      id: "design",
      question: t("quiz.q2"),
      options: [
        { label: t("quiz.q2a"), score: 0 },
        { label: t("quiz.q2b"), score: 2 },
        { label: t("quiz.q2c"), score: 4 },
      ],
    },
    {
      id: "cms",
      question: t("quiz.q3"),
      options: [
        { label: t("quiz.q3a"), score: 0 },
        { label: t("quiz.q3b"), score: 1 },
        { label: t("quiz.q3c"), score: 3 },
      ],
    },
    {
      id: "auth",
      question: t("quiz.q4"),
      options: [
        { label: t("quiz.q4a"), score: 0 },
        { label: t("quiz.q4b"), score: 2 },
        { label: t("quiz.q4c"), score: 4 },
      ],
    },
    {
      id: "backend",
      question: t("quiz.q5"),
      options: [
        { label: t("quiz.q5a"), score: 0 },
        { label: t("quiz.q5b"), score: 2 },
        { label: t("quiz.q5c"), score: 5 },
      ],
    },
    {
      id: "ecommerce",
      question: t("quiz.q6"),
      options: [
        { label: t("quiz.q6a"), score: 0 },
        { label: t("quiz.q6b"), score: 2 },
        { label: t("quiz.q6c"), score: 5 },
      ],
    },
    {
      id: "timeline",
      question: t("quiz.q7"),
      options: [
        { label: t("quiz.q7a"), score: 0 },
        { label: t("quiz.q7b"), score: 1 },
        { label: t("quiz.q7c"), score: 2 },
      ],
    },
  ];

  // Max possible: 5+4+3+4+5+5+2 = 28
  const priceResults = [
    { minScore: 0, maxScore: 3, price: "$300", label: t("quiz.r1.label"), description: t("quiz.r1.desc") },
    { minScore: 4, maxScore: 8, price: "$700", label: t("quiz.r2.label"), description: t("quiz.r2.desc") },
    { minScore: 9, maxScore: 14, price: "$1,500", label: t("quiz.r3.label"), description: t("quiz.r3.desc") },
    { minScore: 15, maxScore: 20, price: "$2,500", label: t("quiz.r4.label"), description: t("quiz.r4.desc") },
    { minScore: 21, maxScore: 28, price: "$4,000+", label: t("quiz.r5.label"), description: t("quiz.r5.desc") },
  ];

  function getResult(score: number) {
    return priceResults.find((r) => score >= r.minScore && score <= r.maxScore) || priceResults[4];
  }

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [choiceLabels, setChoiceLabels] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, questions[currentQ].options[selectedOption].score];
    const newLabels = [...choiceLabels, questions[currentQ].options[selectedOption].label];
    setAnswers(newAnswers);
    setChoiceLabels(newLabels);
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
      setChoiceLabels(choiceLabels.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setChoiceLabels([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  // Build choices param for contact page (question id → chosen label)
  const buildChoicesParam = () => {
    const choicesObj: Record<string, string> = {};
    questions.forEach((q, i) => {
      if (choiceLabels[i] !== undefined) {
        choicesObj[q.id] = choiceLabels[i];
      }
    });
    return encodeURIComponent(JSON.stringify(choicesObj));
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
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("quiz.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
            {t("quiz.title1")}<br />
            <span className="text-gradient italic">{t("quiz.title2")}</span>
          </h1>
          <p className="text-muted-foreground font-body leading-relaxed">
            {t("quiz.subtitle")}
          </p>
        </motion.div>

        {/* Progress bar */}
        {!showResult && (
          <div className="flex gap-2 mb-10">
            {questions.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-secondary/50">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: i < currentQ ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
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
                    {t("quiz.question")} {currentQ + 1} {t("quiz.of")} {questions.length}
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
                    {t("quiz.back")}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="gap-2 font-body rounded-full"
                  >
                    {currentQ === questions.length - 1 ? t("quiz.seeResult") : t("quiz.next")}
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
                  {t("quiz.estimated")}
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
                    <Link to={`/contact?package=${encodeURIComponent(result.label)}&price=${encodeURIComponent(result.price)}&choices=${buildChoicesParam()}`}>
                      <MessageCircle className="w-4 h-4" />
                      {t("quiz.letsTalk")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRestart}
                    className="rounded-full px-8 font-body"
                  >
                    {t("quiz.startOver")}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground font-body mt-6">
                  {t("quiz.estimate")} <Link to="/contact" className="text-primary hover:underline">{t("quiz.contactForQuote")}</Link> {t("quiz.forTailored")}
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

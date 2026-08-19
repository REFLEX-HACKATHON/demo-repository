import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useToast } from "../components/Toast";
import { analyzeContent, type AnalysisResult } from "../services/thinkPauseApi";

type AnalysisResult = {
  confidence_level: "Low" | "medium" | "high";
  detected_signals: string[];
  explanation: string;
  reflective_questions: string[];
  contains_link: boolean;
};

/*const signals = [
  {
    icon: 'psychology_alt',
    title: 'Emotional trigger',
    desc: 'The message uses urgency and fear to encourage immediate sharing.',
    color: 'text-error',
  },
  {
    icon: 'public_off',
    title: 'Unreliable source',
    desc: 'No identifiable scientific organization or source is provided.',
    color: 'text-secondary-fixed',
  },
]*/

/*const questions = [
  { icon: 'person_search', text: 'Who originally published this claim?' },
  { icon: 'plagiarism', text: 'Can I find the original study or source?' },
  { icon: 'calendar_month', text: 'Is the information current?' },
]*/
function getConfidenceLabel(level: number) {
  if (level === 5) return "High";
  if (level === 3) return "Medium";
  return "Low";
}

export default function ThinkPauseResults() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [analyzing, setAnalyzing] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [analyzedContent, setAnalyzedContent] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sampleInputs = [];

  const handleNewAnalysis = (prefill = "") => {
    setResult(null);
    setShowInput(true);
    setInput(prefill);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const runAnalysis = async () => {
    if (!input.trim()) {
      showToast("Please paste some content to analyze", "error");
      return;
    }

    setAnalyzing(true);

    try {
      showToast("Analyzing content...", "info");

      const data = await analyzeContent(input);

      console.log("Backend result:", data);

      setResult(data);
      setAnalyzedContent(input);
      setShowInput(false);
      setInput("");

      showToast("Analysis complete!", "success");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Analysis error:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Unable to analyze the content.",
        "error",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  /*const handleAction = (action: string) => {
    const actions: Record<string, string> = {
      source: "Opening fact-check search in a new tab... (demo)",
      date: "Checking publication timestamps against archive.org... (demo)",
      question1: "Tip: Search author name + publication on Google Scholar",
      question2: "Tip: Cross-check with PubMed / JAMA / original study DOI",
      question3: "Tip: If no date, assume it may be outdated or fabricated",
    };
    showToast(actions[action] || "Done", "info");
  };*/

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden antialiased">
      {/* Background layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-surface-container-lowest" />
        <div className="absolute inset-0 bg-radial-glow mix-blend-screen" />
        <div className="absolute inset-0 bg-radial-glow-secondary mix-blend-screen" />
        <div className="floating-particles" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto flex flex-col gap-stack-lg">
        {/* Header */}
        <header className="text-center flex flex-col items-center gap-stack-sm">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary-fixed/25 mb-4">
            <span
              className="material-symbols-outlined text-secondary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest">
              Analysis Complete
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-secondary-fixed flex items-center justify-center gap-3">
            Confidence:{" "}
            {result ? getConfidenceLabel(result.confidence_level) : "Medium"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Some signals are worth investigating before sharing.
          </p>
        </header>

        {/* Signals */}
        <section className="flex flex-col gap-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-2">
            Signals worth noticing
          </h2>

          {!result || result.detected_signals.length === 0 ? (
            <div className="glass-card p-6 rounded-lg">
              <p className="font-body-md text-body-md text-on-surface-variant">
                No clear manipulation signal was detected.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.detected_signals.map((signal, i) => (
                <div
                  key={i}
                  className="glass-card active-glow p-6 rounded-lg flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-secondary-fixed">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      psychology
                    </span>

                    <h3 className="font-mono-ui text-mono-ui font-semibold uppercase">
                      {signal.replace(/_/g, " ")}
                    </h3>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant">
                    This signal was detected in the analyzed content.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* What Reflex noticed */}
        <section className="glass-card p-8 rounded-xl flex flex-col gap-4 border-l-4 border-l-secondary-fixed">
          <div className="flex items-center gap-2 text-secondary-fixed">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <h2 className="font-headline-md text-headline-md">
              What Reflex noticed
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            {result?.explanation ||
              "Analyze some content to see what Reflex noticed."}
          </p>
        </section>

        {/* Before you share */}
        <section className="flex flex-col gap-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-2">
            Before you share, ask yourself...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result?.reflective_questions?.map((question, i) => (
              <button
                key={i}
                className="glass-card p-5 rounded-lg flex flex-col items-center text-center gap-3 hover:bg-surface-container-high hover:border-secondary-fixed/25 border border-transparent transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-primary text-3xl">
                  help_outline
                </span>

                <p className="font-body-md text-body-md text-on-surface font-medium">
                  {question}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col gap-6 pt-8 border-t border-outline-variant/30 mt-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                if (!analyzedContent) {
                  showToast("No content available to search.", "error");
                  return;
                }

                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                  `"${analyzedContent}"`,
                )}`;

                window.open(searchUrl, "_blank", "noopener,noreferrer");
              }}
              className="glass-card px-4 py-2 rounded-full font-mono-ui text-mono-ui text-tertiary-fixed hover:bg-tertiary-fixed/10 transition-colors flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              Find the original source
            </button>
            <button
              onClick={() => {
                if (!analyzedContent) {
                  showToast("No content available to check.", "error");
                  return;
                }

                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                  `"${analyzedContent}" publication date`,
                )}`;

                window.open(searchUrl, "_blank", "noopener,noreferrer");
              }}
              className="glass-card px-4 py-2 rounded-full font-mono-ui text-mono-ui text-tertiary-fixed hover:bg-tertiary-fixed/10 transition-colors flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">event</span>
              Check publication date
            </button>
          </div>

          {showInput && (
            <div className="glass-card p-6 rounded-xl flex flex-col gap-4 border border-secondary-fixed/20 max-w-xl mx-auto w-full">
              <div className="flex items-center gap-2 text-secondary-fixed">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  edit
                </span>
                <h3 className="font-headline-md text-headline-md">
                  New Analysis
                </h3>
              </div>
              <textarea
                className="bg-surface-container-highest border border-outline-variant/30 rounded-lg p-4 font-mono-ui text-mono-ui text-on-surface min-h-[120px] input-glow resize-none"
                placeholder="Paste or type any content here — a message, post, claim, or AI response..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                <span className="font-label-caps text-label-caps text-outline-variant text-[10px] uppercase tracking-widest self-center mr-2">
                  Try:
                </span>
                {sampleInputs.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="text-[11px] font-mono-ui text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-full"
                  >
                    Sample {i + 1}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowInput(false);
                    setInput("");
                  }}
                  className="font-label-caps text-label-caps text-on-surface-variant px-4 py-2 hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="tactile-btn px-6 py-2 rounded-full font-label-caps text-label-caps uppercase disabled:opacity-60 flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">
                        progress_activity
                      </span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        psychology
                      </span>
                      Analyze
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <button
              onClick={() => handleNewAnalysis()}
              className="tactile-btn px-8 py-3 rounded-lg font-label-caps text-label-caps uppercase tracking-wider font-bold w-full sm:w-auto transition-transform active:scale-95"
            >
              Check another piece of content
            </button>
            <Link
              to="/practice"
              className="glass-card text-primary px-8 py-3 rounded-lg font-label-caps text-label-caps uppercase tracking-wider hover:bg-surface-container-high transition-colors w-full sm:w-auto text-center active:scale-95"
            >
              Back to Practice
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

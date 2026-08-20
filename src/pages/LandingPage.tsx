import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../components/Toast";
import Footer from "../components/Footer";
import ReflexLogo from "../components/ReflexLogo";

export default function LandingPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [analysisInput, setAnalysisInput] = useState("");
  const [demoAnswer, setDemoAnswer] = useState<"phish" | "safe" | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysisInput.trim()) {
      showToast("Paste or type something to analyze", "error");
      return;
    }
    showToast("Taking you to Think-Pause analysis...", "info");
    setTimeout(() => navigate("/think-pause"), 500);
  };

  const handleDemo = (choice: "phish" | "safe") => {
    const correct: "phish" = "phish";
    setDemoAnswer(choice);
    if (choice === correct) {
      showToast("Nailed it! 🎯 This is definitely phishing.", "success");
    } else {
      showToast("Not quite — this is a phishing scam.", "error");
    }
    setTimeout(() => setDemoAnswer(null), 3000);
  };

  return (
    <div className="particle-bg antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-secondary-fixed/8 blur-[120px] -top-40 -right-40" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px] bottom-0 -left-32" />
      </div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-primary/10 bg-surface/80 backdrop-blur-md shadow-lg shadow-black/30 flex justify-between items-center px-8 h-12 z-50">
        <Link
          to="/"
          className="hover:opacity-90 transition-opacity flex items-center"
          aria-label="Reflex home"
        >
          <ReflexLogo height={32} />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="font-label-caps text-label-caps text-primary hover:text-secondary-fixed transition-colors duration-300 scale-95 active:scale-90"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="btn-glow-amber text-on-secondary font-label-caps text-label-caps px-5 py-2 rounded-full transition-transform active:scale-95 text-sm"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative pt-32 pb-margin-desktop z-10">
        {/* ── Hero ── */}
        <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max w-full grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center relative z-10">
            <div className="flex flex-col gap-stack-md">
              <h1 className="font-display text-display text-on-surface">
                Pause. <span className="text-secondary-fixed">Question.</span>{" "}
                Verify.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                Build the reflex to think twice before you trust or share.
                Reflex helps you practice spotting manipulation and apply those
                skills to real messages, posts, images, and AI-generated
                content.
              </p>
              <div className="flex flex-col sm:flex-row gap-stack-sm mt-4">
                <Link
                  to="/practice"
                  className="btn-glow-amber text-on-secondary font-label-caps text-label-caps px-6 py-4 rounded-full transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Start Practicing
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/think-pause"
                  className="border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary/50 font-label-caps text-label-caps px-6 py-4 rounded-full transition-all active:scale-95 flex items-center justify-center"
                >
                  Try Think-Pause
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-primary/10 shadow-2xl shadow-black/50 bg-surface-container/80 backdrop-blur-xl">
                <img
                  alt="Media Literacy Visual"
                  className="w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQNVrOCaD6Me5s9sETN__irS0AH1_bweHM1ZpuBJyja61qQOE3PKwcUP_OnybPmROCnbJI3zl_RtDOdqtsn6s-ySeK35kUnmgTT7jhg1aGEdHVBpEQ1h1309XHAVA2EIgVMngx9MIWYLdNyAUEblmGMaefqE6be780LhM7oB79wNXiqnQh1emHYVnmB0j3Rt8cN9dNRP8skbjNDx49kQihlE6MYfvG8uqa6Bi2F2Es4fIqOkCt1zRS"
                />
                {/* Metallic sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-fixed/5 via-transparent to-primary/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Train your eye ── */}
        <section className="w-full py-24 px-margin-mobile md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-stack-lg">
            <div className="flex-1 flex flex-col gap-stack-sm order-2 md:order-1">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Train your eye. <br />
                <span className="text-secondary-fixed">
                  Sharpen your instinct.
                </span>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Engage in rapid-fire scenarios. Learn the subtle cues of
                manipulation, deepfakes, and phishing attempts in a safe,
                simulated environment.
              </p>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-secondary-fixed hover:text-secondary transition-colors"
              >
                Practice Mode{" "}
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </Link>
            </div>

            <div className="flex-1 order-1 md:order-2 w-full flex justify-center">
              <div className="w-full max-w-sm bg-surface-container/80 backdrop-blur-lg border border-primary/10 rounded-xl p-6 shadow-xl flex flex-col gap-stack-md relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-fixed/15 to-primary/15 rounded-xl blur opacity-40 pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4 relative">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      forum
                    </span>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-on-surface">
                      Unknown Sender
                    </div>
                    <div className="font-mono-ui text-[10px] text-on-surface-variant">
                      Just now
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-4 font-body-md text-body-md text-on-surface border border-outline-variant/30 relative">
                  "URGENT: Your account has been compromised. Click this link
                  immediately to verify your identity and secure your funds:
                  http://secure-verify-update.com/login"
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 relative">
                  <button
                    onClick={() => handleDemo("phish")}
                    className={`bg-surface-container-highest border rounded-lg py-3 font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
                      demoAnswer === "phish"
                        ? "border-secondary-fixed text-secondary shadow-[0_0_20px_rgba(200,160,96,0.3)]"
                        : "border-outline-variant hover:border-secondary-fixed hover:text-secondary-fixed text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      warning
                    </span>{" "}
                    Phishing
                  </button>
                  <button
                    onClick={() => handleDemo("safe")}
                    className={`bg-surface-container-highest border rounded-lg py-3 font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
                      demoAnswer === "safe"
                        ? "border-error text-error shadow-[0_0_20px_rgba(255,180,171,0.3)]"
                        : "border-outline-variant hover:border-primary hover:text-primary text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>{" "}
                    Safe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Analysis CTA ── */}
        <section className="w-full py-24 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary-fixed/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-[800px] mx-auto text-center flex flex-col gap-stack-md relative z-10">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Have something suspicious? <br />
              Bring it here.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Use our analysis tool to break down real-world content before you
              react.
            </p>
            <form onSubmit={handleAnalyze} className="mt-8 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary-fixed/40 to-primary/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
              <div className="relative bg-surface-container/90 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-2 flex items-center shadow-lg">
                <div className="pl-4 text-on-surface-variant">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  value={analysisInput}
                  onChange={(e) => setAnalysisInput(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-mono-ui text-mono-ui placeholder:text-outline-variant/70 px-4 py-3"
                  placeholder="Paste a message, post, or AI response..."
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-secondary-fixed text-on-secondary px-6 py-3 rounded-lg font-label-caps text-label-caps hover:bg-secondary transition-colors whitespace-nowrap"
                >
                  Analyze
                </button>
              </div>
            </form>
            <div className="mt-6">
              <Link
                to="/think-pause"
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-outline hover:text-on-surface transition-colors"
              >
                Explore Think-Pause{" "}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

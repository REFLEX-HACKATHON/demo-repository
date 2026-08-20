import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../components/Toast";
import ReflexLogo from "../components/ReflexLogo";
import { supabase } from "../lib/supabase";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pw: "",
    confirm: "",
  });

  const pwStrength = (() => {
    let s = 0;
    if (form.pw.length >= 6) s++;
    if (form.pw.length >= 10) s++;
    if (/[A-Z]/.test(form.pw)) s++;
    if (/[0-9]/.test(form.pw)) s++;
    return s;
  })();
  const strengthLabel = ["Too weak", "Weak", "Okay", "Good", "Strong"][
    pwStrength
  ];
  const strengthColor = [
    "bg-error",
    "bg-red-400",
    "bg-yellow-400",
    "bg-secondary",
    "bg-secondary-fixed",
  ][pwStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.pw !== form.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.pw,
      options: {
        data: {
          full_name: form.name,
        },
      },
    });

    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast("Account created! Welcome to Reflex 🎉", "success");

    setTimeout(() => {
      navigate("/progress");
    }, 700);
  };

  return (
    <div className="bg-background text-on-background circuit-bg min-h-screen flex flex-col font-body-md text-body-md antialiased overflow-x-hidden">
      {/* Floating sparkle dots */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute w-2 h-2 rounded-full bg-secondary-fixed blur-[1px] top-[20%] left-[15%] animate-[ping_4s_ease-in-out_infinite]" />
          <div className="absolute w-1 h-1 rounded-full bg-primary top-[60%] left-[80%] animate-[ping_6s_ease-in-out_infinite_1s]" />
          <div className="absolute w-3 h-3 rounded-full bg-secondary blur-[2px] top-[80%] left-[30%] animate-[ping_5s_ease-in-out_infinite_2s]" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-tertiary top-[30%] left-[70%] animate-[ping_7s_ease-in-out_infinite_0.5s]" />
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center relative z-10">
          {/* Left panel — desktop only */}
          <div className="hidden md:flex flex-col items-center justify-center space-y-stack-md">
            <div className="text-center space-y-stack-sm mb-stack-md">
              <Link
                to="/"
                className="inline-block hover:opacity-90 transition-opacity"
                aria-label="Reflex home"
              >
                <ReflexLogo height={40} />
              </Link>
              <p className="font-headline-md text-headline-md text-on-surface-variant font-light max-w-sm mx-auto">
                Master the Think-Pause.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-secondary-fixed/15 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="badge-metallic w-32 h-32 rounded-full flex flex-col items-center justify-center relative z-10 transform group-hover:rotate-12 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                  lock
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
                  Initiate
                </span>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <p className="font-mono-ui text-mono-ui text-secondary">
                  Unlock your first badge upon joining.
                </p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="glass-card rounded-2xl p-8 md:p-10 w-full max-w-md mx-auto">
            <div className="mb-stack-md md:hidden text-center">
              <Link
                to="/"
                className="inline-block hover:opacity-90 transition-opacity"
                aria-label="Reflex home"
              >
                <ReflexLogo height={30} />
              </Link>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Join the Reflex
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              Start training your eye and sharpening your instinct today.
            </p>

            <form className="space-y-stack-sm" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 font-mono-ui text-mono-ui text-on-surface placeholder-on-surface-variant/50 input-glow transition-all"
                  id="fullName"
                  placeholder="Jane Doe"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label
                  className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 font-mono-ui text-mono-ui text-on-surface placeholder-on-surface-variant/50 input-glow transition-all"
                  id="email"
                  placeholder="jane@example.com"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label
                  className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 pr-12 font-mono-ui text-mono-ui text-on-surface placeholder-on-surface-variant/50 input-glow transition-all"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPw ? "text" : "password"}
                    value={form.pw}
                    onChange={(e) => setForm({ ...form, pw: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPw ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {form.pw && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex gap-0.5">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 transition-all duration-300 ${i < pwStrength ? strengthColor : "bg-surface-variant"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono-ui text-on-surface-variant whitespace-nowrap">
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label
                  className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className={`w-full bg-surface-container-highest border rounded-lg px-4 py-3 font-mono-ui text-mono-ui text-on-surface placeholder-on-surface-variant/50 input-glow transition-all ${
                    form.confirm && form.pw !== form.confirm
                      ? "border-error/60"
                      : "border-outline-variant/30"
                  }`}
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                />
                {form.confirm && form.pw !== form.confirm && (
                  <p className="text-[11px] text-error mt-1 font-mono-ui">
                    Passwords don't match
                  </p>
                )}
              </div>

              <div className="flex items-start pt-2 pb-4">
                <div className="flex items-center h-5">
                  <input
                    className="w-4 h-4 rounded bg-surface-container-highest border-outline-variant text-secondary-fixed focus:ring-secondary-fixed focus:ring-offset-background"
                    id="terms"
                    required
                    type="checkbox"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    className="font-body-md text-mono-ui text-on-surface-variant"
                    htmlFor="terms"
                  >
                    I agree to the{" "}
                    <a
                      className="text-secondary-fixed hover:text-secondary transition-colors underline decoration-secondary-fixed/30 underline-offset-2"
                      href="#"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-secondary-fixed hover:text-secondary transition-colors underline decoration-secondary-fixed/30 underline-offset-2"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>

              <button
                className="w-full btn-tactile rounded-lg py-4 font-headline-md text-headline-md uppercase tracking-wide flex justify-center items-center gap-2 mt-4 tactile-btn disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">
                      progress_activity
                    </span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-stack-md text-center">
              <p className="font-body-md text-mono-ui text-on-surface-variant">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-bold text-secondary-fixed hover:text-secondary transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

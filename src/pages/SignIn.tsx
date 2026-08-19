import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../components/Toast";
import ReflexLogo from "../components/ReflexLogo";
import { supabase } from "../lib/supabase";

export default function SignIn() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast("Signed in successfully! Welcome back 👋", "success");
    navigate("/progress");
  };

  const handleSocial = (provider: string) => {
    showToast(`Continuing with ${provider}... (demo)`, "info");
    setTimeout(() => navigate("/progress"), 700);
  };

  const handleForgot = () => {
    showToast("Password reset link sent (demo)", "info");
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center overflow-hidden relative selection:bg-secondary selection:text-on-secondary">
      {/* Ambient orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-secondary-fixed/8 blur-[140px] -top-48 -right-48 pointer-events-none z-0" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-primary/5 blur-[160px] -bottom-72 -left-48 pointer-events-none z-0" />

      <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row items-center justify-center gap-stack-lg min-h-screen py-12">
        <div className="w-full max-w-[440px] flex flex-col">
          <div className="mb-stack-lg self-start">
            <Link
              to="/"
              className="hover:opacity-90 transition-opacity flex items-center"
              aria-label="Reflex home"
            >
              <ReflexLogo height={30} />
            </Link>
          </div>

          <div className="mb-stack-md">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-unit">
              Welcome back
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to continue strengthening your reflex.
            </p>
          </div>

          <form
            className="flex flex-col gap-stack-sm w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-unit">
              <label
                className="font-label-caps text-label-caps text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative glass-panel rounded-lg transition-all input-glow flex items-center px-4 py-3">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-outline-variant mr-3 text-[20px]"
                >
                  mail
                </span>
                <input
                  className="bg-transparent border-none w-full text-on-surface font-mono-ui text-mono-ui placeholder:text-outline-variant focus:ring-0 p-0"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-unit mt-2">
              <label
                className="font-label-caps text-label-caps text-on-surface-variant ml-1 flex justify-between w-full"
                htmlFor="password"
              >
                <span>Password</span>
                <a
                  className="text-secondary-fixed hover:text-secondary transition-colors normal-case tracking-normal cursor-pointer"
                  onClick={handleForgot}
                >
                  Forgot password?
                </a>
              </label>
              <div className="relative glass-panel rounded-lg transition-all input-glow flex items-center px-4 py-3">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-outline-variant mr-3 text-[20px]"
                >
                  lock
                </span>
                <input
                  className="bg-transparent border-none w-full text-on-surface font-mono-ui text-mono-ui placeholder:text-outline-variant focus:ring-0 p-0"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="text-outline-variant hover:text-on-surface transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[20px]"
                  >
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button
              className="w-full mt-stack-md tactile-btn rounded-lg py-4 flex items-center justify-center gap-2 font-headline-md text-[18px] disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[20px]"
                  >
                    arrow_forward
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center gap-4 my-stack-sm w-full">
              <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
              <span className="font-label-caps text-label-caps text-outline-variant">
                OR
              </span>
              <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="glass-panel hover:bg-surface-variant/50 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 font-body-md text-body-md text-on-surface"
                type="button"
                onClick={() => handleSocial("Google")}
              >
                <span className="font-bold">G</span>
                Google
              </button>
              <button
                className="glass-panel hover:bg-surface-variant/50 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 font-body-md text-body-md text-on-surface"
                type="button"
                onClick={() => handleSocial("Apple")}
              >
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[20px]"
                >
                  replace_video
                </span>
                Apple
              </button>
            </div>
          </form>

          <p className="font-body-md text-body-md text-on-surface-variant text-center mt-stack-md">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-secondary-fixed font-medium hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Side panel */}
        <div className="hidden lg:flex w-full max-w-[480px] h-full flex-col justify-center">
          <div className="glass-panel p-stack-lg rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/8 rounded-bl-full transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-stack-md">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-secondary-fixed/30">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-secondary-fixed"
                >
                  psychology
                </span>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-secondary mb-2">
                  LAST PRACTICED
                </h3>
                <p className="font-headline-md text-[20px] text-on-surface leading-tight">
                  Identifying Emotional Language
                </p>
              </div>
              <div className="h-[1px] w-full bg-outline-variant/30 my-2" />
              <blockquote className="font-body-lg text-body-lg text-on-surface-variant italic">
                "The space between reading and reacting is where critical
                thinking lives."
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary-fixed to-secondary w-3/4 rounded-full" />
                </div>
                <span className="font-mono-ui text-mono-ui text-secondary-fixed text-[12px]">
                  75%
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full py-6 px-margin-desktop z-10 hidden md:block">
        <div className="max-w-container-max mx-auto flex justify-between items-center border-t border-outline-variant/30 pt-6">
          <p className="font-body-md text-body-md text-on-surface-variant text-[14px]">
            © 2026 Reflex. Think before you share.
          </p>
          <div className="flex gap-stack-md">
            <a
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors"
              href="#"
            >
              SUPPORT
            </a>
            <a
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors"
              href="#"
            >
              PRIVACY
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReflexLogo from "./ReflexLogo";
import { supabase } from "../lib/supabase";

interface NavbarProps {
  showAuth?: boolean;
}

export default function Navbar({ showAuth = true }: NavbarProps) {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION:", session);
    console.log("ACCESS TOKEN:", session?.access_token);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER:", user);
    console.log("USER METADATA:", user?.user_metadata);

    if (user) {
      const fullName = user.user_metadata?.full_name;

      setUserName(fullName || user.email?.split("@")[0] || "User");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (isAuthPage && !showAuth) return null;

  const navItems = [
    { label: "Practice", path: "/practice" },
    { label: "Think-Pause", path: "/think-pause" },
    { label: "Skills", path: "/skills" },
    { label: "Progress", path: "/progress" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-primary/10 bg-surface/80 backdrop-blur-md shadow-lg shadow-black/30 flex justify-between items-center px-8 h-12 z-50">
      <Link
        to="/"
        className="hover:opacity-90 transition-opacity flex items-center"
        aria-label="Reflex home"
      >
        <ReflexLogo height={32} />
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `font-label-caps text-label-caps transition-all duration-300 scale-95 active:scale-90 ${
                isActive
                  ? "text-secondary-fixed font-bold border-b-2 border-secondary-fixed pb-1"
                  : "text-on-surface-variant font-medium hover:text-secondary"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 cursor-pointer hover:bg-surface-container transition-colors group">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary-fixed to-secondary-fixed-dim flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px] text-on-secondary">
              person
            </span>
          </div>
          <span className="font-mono-ui text-[12px] text-on-surface group-hover:text-secondary transition-colors">
            {userName || "User"}
          </span>
          <span className="material-symbols-outlined text-[16px] text-outline-variant group-hover:text-secondary transition-colors">
            expand_more
          </span>
        </div>
        <Link
          to="/"
          className="font-label-caps text-label-caps text-outline-variant hover:text-error transition-colors duration-300 px-3 py-1 rounded-full hover:bg-error/10 flex items-center gap-1"
          title="Sign out"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
        </Link>
      </div>
    </nav>
  );
}

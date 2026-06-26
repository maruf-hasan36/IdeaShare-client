"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Lessons", href: "/lessons" },
  { name: "Pricing", href: "/pricing", protected: true },
];

/* ── IdeaShare SVG Logo ── */
const IdeaShareLogo = () => (
  <div className="flex items-center gap-2 select-none">
    {/* Spark icon */}
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          opacity: 0.15,
        }}
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L3 12L10.2 9.2L12 2Z"
          fill="url(#sparkGrad)"
        />
      </svg>
    </div>

    {/* Wordmark */}
    <span
      className="font-bold text-lg tracking-tight"
      style={{
        background: "linear-gradient(90deg, #c4b5fd 0%, #67e8f9 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-0.02em",
      }}
    >
      IdeaShare
    </span>
  </div>
);

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const dashboardPath =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";
  const href =
    user?.role === "admin"
      ? "/dashboard/admin/profile"
      : "/dashboard/user/profile";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setUserDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const loadingToast = toast.loading("Signing out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully!", { id: loadingToast });
            setUserDropdownOpen(false);
            setIsOpen(false);
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Sign out failed. Try again.", { id: loadingToast });
    }
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  const visibleLinks = navLinks.filter((l) => !l.protected || user);

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        .nav-link-glow:hover {
          color: #a78bfa;
          text-shadow: 0 0 12px rgba(167,139,250,0.6);
        }
        .nav-link-active {
          color: #c4b5fd;
          text-shadow: 0 0 10px rgba(196,181,253,0.5);
        }
        .gradient-border-bottom::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #7c3aed 30%, #06b6d4 70%, transparent 100%);
          opacity: 0.6;
        }
        .avatar-ring {
          box-shadow: 0 0 0 2px rgba(167,139,250,0.4), 0 0 16px rgba(124,58,237,0.3);
          transition: box-shadow 0.2s ease;
        }
        .avatar-ring:hover {
          box-shadow: 0 0 0 2px rgba(103,232,249,0.5), 0 0 24px rgba(6,182,212,0.4);
        }
        .mobile-menu-glass {
          background: rgba(8, 8, 22, 0.96);
          border-top: 1px solid rgba(124,58,237,0.2);
          backdrop-filter: blur(20px);
        }
        .dropdown-glass {
          background: rgba(12, 10, 30, 0.95);
          border: 1px solid rgba(124,58,237,0.2);
          backdrop-filter: blur(24px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.08);
        }
        .dropdown-item:hover {
          background: rgba(124,58,237,0.12);
          color: #c4b5fd;
        }
        .btn-ghost {
          border: 1px solid rgba(124,58,237,0.35);
          color: #c4b5fd;
          transition: all 0.2s ease;
        }
        .btn-ghost:hover {
          border-color: rgba(6,182,212,0.5);
          color: #67e8f9;
          box-shadow: 0 0 12px rgba(6,182,212,0.15);
        }
        @keyframes fadeSlideDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .anim-fade { animation: fadeSlideDown 0.18s ease forwards; }
      `}</style>

      <nav
        className="gradient-border-bottom"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background:
            isScrolled || isOpen
              ? "rgba(6, 6, 18, 0.82)"
              : "rgba(6, 6, 18, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <IdeaShareLogo />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex" style={{ gap: 4 }}>
              {visibleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`nav-link-glow ${activeLink === link.name ? "nav-link-active" : ""}`}
                  style={{
                    padding: "6px 18px",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color:
                      activeLink === link.name
                        ? "#c4b5fd"
                        : "rgba(203,213,225,0.75)",
                    background:
                      activeLink === link.name
                        ? "rgba(124,58,237,0.1)"
                        : "transparent",
                    border:
                      activeLink === link.name
                        ? "1px solid rgba(124,58,237,0.3)"
                        : "1px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth / Avatar */}
            <div
              className="hidden md:flex"
              style={{ alignItems: "center", gap: 12 }}
            >
              {user ? (
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="avatar-ring"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="dropdown-glass anim-fade"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 10px)",
                        width: 200,
                        borderRadius: 16,
                        overflow: "hidden",
                        zIndex: 60,
                      }}
                    >
                      <div
                        style={{
                          padding: "12px 16px 10px",
                          borderBottom: "1px solid rgba(124,58,237,0.15)",
                          marginBottom: 4,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 11,
                            color: "rgba(148,163,184,0.7)",
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Signed in as
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#e2e8f0",
                            marginTop: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.name}
                        </p>
                      </div>

                      {[
                        {
                          icon: <UserIcon size={14} />,
                          label: "Profile",
                          href: href,
                        },
                        {
                          icon: <LayoutDashboard size={14} />,
                          label: "Dashboard",
                          href: dashboardPath,
                        },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setUserDropdownOpen(false)}
                          className="dropdown-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 16px",
                            fontSize: 13,
                            color: "rgba(203,213,225,0.85)",
                            textDecoration: "none",
                            transition: "all 0.15s",
                          }}
                        >
                          {item.icon} {item.label}
                        </Link>
                      ))}

                      <button
                        onClick={handleSignOut}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 16px",
                          fontSize: 13,
                          color: "#f87171",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          borderTop: "1px solid rgba(124,58,237,0.1)",
                          marginTop: 4,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(239,68,68,0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="btn-ghost"
                    style={{
                      padding: "7px 20px",
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    style={{
                      padding: "7px 20px",
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
                      color: "#fff",
                      textDecoration: "none",
                      boxShadow: "0 0 18px rgba(124,58,237,0.35)",
                      transition: "box-shadow 0.2s ease, opacity 0.2s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 28px rgba(6,182,212,0.5)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 18px rgba(124,58,237,0.35)")
                    }
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{
                padding: 8,
                borderRadius: 10,
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.25)",
                cursor: "pointer",
                color: "#c4b5fd",
              }}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              className="mobile-menu-glass anim-fade md:hidden"
              style={{ padding: "12px 0 20px" }}
            >
              {visibleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsOpen(false);
                  }}
                  style={{
                    display: "block",
                    padding: "10px 16px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color:
                      activeLink === link.name
                        ? "#c4b5fd"
                        : "rgba(203,213,225,0.7)",
                    background:
                      activeLink === link.name
                        ? "rgba(124,58,237,0.1)"
                        : "transparent",
                    textDecoration: "none",
                    margin: "0 8px 2px",
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <div
                style={{
                  margin: "10px 8px 0",
                  paddingTop: 10,
                  borderTop: "1px solid rgba(124,58,237,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {user ? (
                  <>
                    {[
                      {
                        icon: <UserIcon size={14} />,
                        label: "Profile",
                        href: href,
                      },
                      {
                        icon: <LayoutDashboard size={14} />,
                        label: "Dashboard",
                        href: dashboardPath,
                      },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                          fontSize: 13,
                          color: "rgba(203,213,225,0.8)",
                          textDecoration: "none",
                          background: "rgba(124,58,237,0.06)",
                        }}
                      >
                        {item.icon} {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 10,
                        fontSize: 13,
                        color: "#f87171",
                        background: "rgba(239,68,68,0.07)",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#c4b5fd",
                        border: "1px solid rgba(124,58,237,0.35)",
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                        textDecoration: "none",
                        boxShadow: "0 0 16px rgba(124,58,237,0.3)",
                      }}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

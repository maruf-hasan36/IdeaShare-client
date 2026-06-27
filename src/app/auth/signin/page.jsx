"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

/* ── IdeaShare Logo ── */
const IdeaShareLogo = ({ size = "md" }) => (
  <div className="flex items-center gap-2 select-none">
    <div
      style={{
        position: "relative",
        width: size === "lg" ? 40 : 28,
        height: size === "lg" ? 40 : 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          opacity: 0.2,
        }}
      />
      <svg
        width={size === "lg" ? 22 : 16}
        height={size === "lg" ? 22 : 16}
        viewBox="0 0 24 24"
        fill="none"
      >
        <defs>
          <linearGradient id="loginSparkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L3 12L10.2 9.2L12 2Z"
          fill="url(#loginSparkGrad)"
        />
      </svg>
    </div>
    <span
      style={{
        fontWeight: 800,
        fontSize: size === "lg" ? 22 : 15,
        letterSpacing: "-0.03em",
        background: "linear-gradient(90deg, #c4b5fd 0%, #67e8f9 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      IdeaShare
    </span>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const loadingToast = toast.loading("Connecting to Google...");
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallback: (error) => {
          toast.error(error.message || "Google authentication failed.", {
            id: loadingToast,
          });
        },
      });
    } catch {
      toast.error("An unexpected error occurred.", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const loadingToast = toast.loading("Signing you in...");
    try {
      setIsLoading(true);
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        dontRedirect: true,
      });
      if (error) {
        toast.error(error.message || "Invalid email or password.", {
          id: loadingToast,
        });
        return;
      }
      if (data) {
        toast.success("Welcome back! 🚀", { id: loadingToast });
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-24px) translateX(10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(18px) translateX(-14px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-14px) translateX(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }

        .login-input {
          width: 100%;
          padding: 11px 16px;
          border-radius: 12px;
          border: 1px solid rgba(124,58,237,0.2);
          background: rgba(8,8,28,0.6);
          color: #e2e8f0;
          font-size: 13px;
          outline: none;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .login-input::placeholder { color: rgba(100,116,139,0.6); }
        .login-input:focus {
          border-color: rgba(103,232,249,0.5);
          background: rgba(8,8,28,0.9);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.08), 0 0 20px rgba(124,58,237,0.1);
        }
        .login-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .input-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          margin-bottom: 6px;
          display: block;
        }

        .glow-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%);
          box-shadow: 0 0 24px rgba(124,58,237,0.4), 0 4px 16px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
          letter-spacing: 0.03em;
        }
        .glow-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite linear;
        }
        .glow-btn:hover { box-shadow: 0 0 36px rgba(6,182,212,0.5), 0 4px 24px rgba(0,0,0,0.4); transform: translateY(-1px); }
        .glow-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .google-btn {
          width: 100%;
          padding: 11px 16px;
          border-radius: 12px;
          border: 1px solid rgba(124,58,237,0.25);
          background: rgba(8,8,28,0.5);
          color: rgba(203,213,225,0.9);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .google-btn:hover {
          border-color: rgba(103,232,249,0.35);
          background: rgba(8,8,28,0.8);
          box-shadow: 0 0 16px rgba(6,182,212,0.1);
        }
        .google-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent);
        }

        .signin-left-panel { display: none; }
        @media (min-width: 1024px) {
          .signin-left-panel { display: flex !important; flex-direction: column; justify-content: center; }
          .signin-grid { grid-template-columns: 1fr 1fr !important; }
          .signin-mobile-logo { display: none !important; }
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(124,58,237,0.12);
        }
        .left-stat-card {
          padding: 16px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(124,58,237,0.12);
          backdrop-filter: blur(8px);
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "#060612",
          paddingTop: 64,
        }}
      >
        <div
          className="signin-grid"
          style={{ display: "grid", minHeight: "calc(100vh - 64px)" }}
        >
          {/* ── LEFT PANEL ── */}
          <div
            className="signin-left-panel"
            style={{
              background:
                "linear-gradient(135deg, #0a0618 0%, #060612 50%, #020d18 100%)",
              padding: "60px 56px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient blobs */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                width: 350,
                height: 350,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
                animation: "float1 9s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                right: "0%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
                animation: "float2 11s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "35%",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
                animation: "float3 7s ease-in-out infinite",
              }}
            />

            {/* Dot grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(rgba(124,58,237,0.12) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.4,
              }}
            />

            {/* Orbit rings decoration */}
            <div
              className="orbit-ring"
              style={{
                width: 280,
                height: 280,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(20deg)",
                animation: "spin-slow 30s linear infinite",
              }}
            />
            <div
              className="orbit-ring"
              style={{
                width: 380,
                height: 380,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(-15deg)",
                animation: "spin-reverse 40s linear infinite",
                borderColor: "rgba(6,182,212,0.08)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 400 }}>
              <IdeaShareLogo size="lg" />

              <div style={{ marginTop: 40, marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(103,232,249,0.7)",
                  }}
                >
                  Welcome back
                </span>
              </div>

              <h1
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "#f1f5f9",
                  marginBottom: 16,
                }}
              >
                Your ideas
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #a78bfa 0%, #22d3ee 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  await you.
                </span>
              </h1>

              <p
                style={{
                  fontSize: 14,
                  color: "rgba(148,163,184,0.65)",
                  lineHeight: 1.75,
                  marginBottom: 40,
                  maxWidth: 300,
                }}
              >
                Sign in to continue your journey and connect with thousands of
                idea-sharers worldwide.
              </p>

              {/* Stats cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { val: "12K+", label: "Active Members", icon: "👥" },
                  { val: "4.8★", label: "User Rating", icon: "⭐" },
                  { val: "500+", label: "Premium Lessons", icon: "📚" },
                  { val: "Free", label: "To Get Started", icon: "🚀" },
                ].map(({ val, label, icon }) => (
                  <div key={label} className="left-stat-card">
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        background: "linear-gradient(90deg, #c4b5fd, #67e8f9)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(100,116,139,0.7)",
                        marginTop: 2,
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "48px 24px",
              background: "rgba(6,6,18,0.8)",
              borderLeft: "1px solid rgba(124,58,237,0.1)",
            }}
          >
            <div style={{ width: "100%", maxWidth: 400 }}>
              {/* Mobile logo */}
              <div
                className="signin-mobile-logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 28,
                }}
              >
                <IdeaShareLogo size="md" />
              </div>

              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#f1f5f9",
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                  textAlign: "center",
                }}
              >
                Welcome back
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(100,116,139,0.7)",
                  textAlign: "center",
                  marginBottom: 28,
                }}
              >
                Sign in to continue your journey.
              </p>

              {/* Google */}
              <button
                className="google-btn"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.63 14.99 1 12 1 7.37 1 3.4 3.65 1.44 7.5l3.8 2.95C6.14 7.3 8.83 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.45c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.48z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.55a7.16 7.16 0 0 1 0-4.3l-3.8-2.95A11.94 11.94 0 0 0 0 12c0 1.76.38 3.44 1.44 4.95l3.8-2.95z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.01.68-2.31 1.08-3.92 1.08-3.17 0-5.86-2.26-6.81-5.41l-3.8 2.95C3.4 20.35 7.37 23 12 23z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  margin: "20px 0",
                }}
              >
                <div className="divider-line" />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(100,116,139,0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  or
                </span>
                <div className="divider-line" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleEmailSignIn}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    className="login-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mehedihasan@gmail.com"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="input-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="login-input"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ paddingRight: 44 }}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(100,116,139,0.6)",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="glow-btn"
                  disabled={isLoading}
                  style={{ marginTop: 4 }}
                >
                  {isLoading ? "Signing in..." : "Sign In →"}
                </button>
              </form>

              <p
                style={{
                  marginTop: 24,
                  fontSize: 12,
                  color: "rgba(100,116,139,0.6)",
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  style={{
                    background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Create one for free.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

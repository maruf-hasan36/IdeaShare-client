"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, X } from "lucide-react";
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
          <linearGradient id="sigSparkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L3 12L10.2 9.2L12 2Z"
          fill="url(#sigSparkGrad)"
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

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && isLongEnough;

  const handleGoogleSignUp = async () => {
    const loadingToast = toast.loading("Connecting to Google...");
    try {
      setIsLoading(true);
      await authClient.signUp.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      toast.error(err.message || "Google registration failed.", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (!isPasswordValid) {
      toast.error("Please meet all password requirements.");
      return;
    }

    const loadingToast = toast.loading("Creating your account...");
    try {
      setIsLoading(true);
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image || undefined,
        dontRedirect: true,
      });
      if (error) {
        toast.error(error.message || "Could not complete registration.", {
          id: loadingToast,
        });
        return;
      }
      if (data) {
        toast.success("Welcome to IdeaShare! 🚀", { id: loadingToast });
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
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
        @keyframes borderPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }

        .signup-left-panel {
          display: none;
        }
        @media (min-width: 1024px) {
          .signup-left-panel {
            display: flex !important;
          }
          .signup-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .signup-mobile-logo {
            display: none !important;
          }
        }

        .signup-input {
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
        .signup-input::placeholder { color: rgba(100,116,139,0.6); }
        .signup-input:focus {
          border-color: rgba(103,232,249,0.5);
          background: rgba(8,8,28,0.9);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.08), 0 0 20px rgba(124,58,237,0.1);
        }
        .signup-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

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
          position: absolute;
          inset: 0;
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
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent);
        }

        .req-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
        .req-met { color: #34d399; }
        .req-unmet { color: rgba(100,116,139,0.7); }

        .left-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(124,58,237,0.15);
          backdrop-filter: blur(8px);
        }
        .left-feature-icon {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3));
          border: 1px solid rgba(124,58,237,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 14px;
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          background: "#060612",
          paddingTop: 64,
        }}
      >
        <div
          className="signup-grid"
          style={{ display: "grid", minHeight: "calc(100vh - 64px)" }}
        >
          {/* ── LEFT PANEL ── */}
          <div
            className="signup-left-panel"
            style={{
              background:
                "linear-gradient(135deg, #0a0618 0%, #060612 50%, #020d18 100%)",
              padding: "60px 56px",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient blobs */}
            <div
              style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
                animation: "float1 8s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20%",
                right: "5%",
                width: 250,
                height: 250,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
                animation: "float2 10s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "40%",
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
                animation: "float3 7s ease-in-out infinite",
              }}
            />

            {/* Dot grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(rgba(124,58,237,0.15) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.4,
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 400 }}>
              <IdeaShareLogo size="lg" />

              <div style={{ marginTop: 36, marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(103,232,249,0.7)",
                  }}
                >
                  Join the community
                </span>
              </div>

              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  color: "#f1f5f9",
                  marginBottom: 16,
                }}
              >
                Ideas worth
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
                  sharing.
                </span>
              </h1>

              <p
                style={{
                  fontSize: 14,
                  color: "rgba(148,163,184,0.7)",
                  lineHeight: 1.7,
                  marginBottom: 36,
                  maxWidth: 320,
                }}
              >
                A community where real people share the lessons and ideas that
                shaped their lives.
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  { icon: "✦", text: "Real stories from real people" },
                  { icon: "✦", text: "Unlock premium wisdom content" },
                  { icon: "✦", text: "Share your own life lessons" },
                ].map((f, i) => (
                  <div key={i} className="left-feature">
                    <div className="left-feature-icon">{f.icon}</div>
                    <span
                      style={{
                        fontSize: 13,
                        color: "rgba(203,213,225,0.85)",
                        fontWeight: 500,
                      }}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
                {[
                  ["12K+", "Members"],
                  ["4.8★", "Rating"],
                  ["Free", "To start"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div
                      style={{
                        fontSize: 20,
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
                        fontWeight: 500,
                        marginTop: 2,
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
            <div style={{ width: "100%", maxWidth: 420 }}>
              {/* Mobile logo */}
              <div
                className="signup-mobile-logo"
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
                Create your account
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(100,116,139,0.8)",
                  textAlign: "center",
                  marginBottom: 28,
                }}
              >
                Start sharing and discovering ideas.
              </p>

              {/* Google */}
              <button
                className="google-btn"
                onClick={handleGoogleSignUp}
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
                onSubmit={handleEmailSignUp}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Name */}
                <div>
                  <label className="input-label">Full Name</label>
                  <input
                    className="signup-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mehedi Hasan"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    className="signup-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mehedihasan@gmail.com"
                    disabled={isLoading}
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="input-label">
                    Photo URL{" "}
                    <span
                      style={{
                        color: "rgba(100,116,139,0.5)",
                        fontWeight: 400,
                        textTransform: "none",
                        fontSize: 11,
                      }}
                    >
                      (optional)
                    </span>
                  </label>
                  <input
                    className="signup-input"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="input-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="signup-input"
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

                  {password.length > 0 && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: "rgba(8,8,28,0.8)",
                        border: "1px solid rgba(124,58,237,0.15)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "rgba(100,116,139,0.5)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        Requirements
                      </p>
                      {[
                        [isLongEnough, "At least 6 characters"],
                        [hasUppercase, "One uppercase letter (A–Z)"],
                        [hasLowercase, "One lowercase letter (a–z)"],
                      ].map(([met, text]) => (
                        <div key={text} className="req-item">
                          {met ? (
                            <Check
                              size={13}
                              style={{ color: "#34d399", flexShrink: 0 }}
                            />
                          ) : (
                            <X
                              size={13}
                              style={{
                                color: "rgba(100,116,139,0.4)",
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <span className={met ? "req-met" : "req-unmet"}>
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="glow-btn"
                  disabled={
                    isLoading || (password.length > 0 && !isPasswordValid)
                  }
                  style={{ marginTop: 4 }}
                >
                  {isLoading ? "Creating Account..." : "Create Account →"}
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
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  style={{
                    background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

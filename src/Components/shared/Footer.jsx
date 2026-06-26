"use client";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "X (Twitter)" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

/* ── Same IdeaShare Logo as Navbar ── */
const IdeaShareLogo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          opacity: 0.18,
        }}
      />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="footerSparkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L3 12L10.2 9.2L12 2Z"
          fill="url(#footerSparkGrad)"
        />
      </svg>
    </div>
    <span
      className="font-bold text-xl tracking-tight"
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

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-link:hover {
          color: #a78bfa;
          text-shadow: 0 0 8px rgba(167,139,250,0.4);
        }
        .social-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          color: rgba(148,163,184,0.8);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .social-btn:hover {
          background: rgba(124,58,237,0.18);
          border-color: rgba(103,232,249,0.4);
          color: #67e8f9;
          box-shadow: 0 0 14px rgba(6,182,212,0.2);
        }
        .footer-contact-icon {
          color: #7c3aed;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .footer-divider {
          border: none;
          border-top: 1px solid rgba(124,58,237,0.15);
          margin: 0;
        }
        .gradient-top-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #7c3aed 30%, #06b6d4 70%, transparent 100%);
          opacity: 0.5;
          margin-bottom: 0;
        }
        .footer-heading {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #a78bfa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }
      `}</style>

      <footer
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #06060f 0%, #04040c 100%)",
          color: "rgba(148,163,184,0.75)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "10%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: "15%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top gradient line */}
        <div className="gradient-top-line" />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "56px 24px 32px",
          }}
        >
          {/* Main Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 40,
              paddingBottom: 40,
            }}
          >
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Link
                href="/"
                style={{ textDecoration: "none", width: "fit-content" }}
              >
                <IdeaShareLogo />
              </Link>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.75,
                  color: "rgba(148,163,184,0.65)",
                  maxWidth: 240,
                }}
              >
                A community platform where real people share the ideas and
                lessons that shaped their lives. Every story has value.
              </p>
              {/* Socials */}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className="social-btn"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Platform */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="footer-heading">Platform</p>
              {[
                { label: "Browse Lessons", href: "/lessons" },
                { label: "Top Contributors", href: "/contributors" },
                { label: "Premium Access", href: "/pricing" },
                { label: "Share Your Story", href: "/share" },
                { label: "Community", href: "/community" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 13,
                    color: "rgba(148,163,184,0.7)",
                    textDecoration: "none",
                    width: "fit-content",
                    transition: "all 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="footer-heading">Company</p>
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Press Kit", href: "/press" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 13,
                    color: "rgba(148,163,184,0.7)",
                    textDecoration: "none",
                    width: "fit-content",
                    transition: "all 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p className="footer-heading">Contact</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <svg
                  className="footer-contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href="mailto:hello@ideashare.io"
                  className="footer-link"
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  hello@ideashare.io
                </a>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <svg
                  className="footer-contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:+8801700000000"
                  className="footer-link"
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  +880 1935921844
                </a>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <svg
                  className="footer-contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ color: "rgba(148,163,184,0.65)" }}>
                  Gulshan-2, Dhaka 1212, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <hr className="footer-divider" />
          <div
            style={{
              paddingTop: 24,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 12,
              color: "rgba(100,116,139,0.7)",
            }}
          >
            <span>
              © 2026{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                }}
              >
                IdeaShare
              </span>
              . All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="footer-link"
                  style={{
                    color: "rgba(100,116,139,0.7)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import logo from "/public/images/logo.png";

const ErrorPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        .ep-root {
          min-height: 100dvh;
          background: #1a1208;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
          padding: 40px 24px;
        }

        /* Ambient blobs */
        .ep-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ep-blob--1 {
          width: 520px; height: 420px;
          top: -120px; left: -100px;
          background: radial-gradient(circle, #d4af3722 0%, transparent 70%);
        }
        .ep-blob--2 {
          width: 400px; height: 380px;
          bottom: -80px; right: -60px;
          background: radial-gradient(circle, #c9a13b22 0%, transparent 70%);
        }
        .ep-blob--3 {
          width: 260px; height: 260px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #f5d77a1a 0%, transparent 70%);
        }
        .ep-mounted .ep-blob { opacity: 1; }

        /* Grid */
        .ep-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d4af3715 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        /* Rings */
        .ep-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid #d4af3715;
          pointer-events: none;
          animation: ep-spin 40s linear infinite;
        }
        .ep-ring--2 {
          width: 800px;
          height: 800px;
          border-color: #c9a13b10;
          animation-duration: 60s;
          animation-direction: reverse;
        }
        @keyframes ep-spin { to { transform: rotate(360deg); } }

        /* Card */
        .ep-card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          max-width: 560px;
          width: 100%;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .ep-mounted .ep-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* Logo */
        .ep-logo {
          height: 48px;
          opacity: 0.8;
          filter: brightness(0) saturate(100%) invert(74%) sepia(42%) saturate(400%);
        }

        /* Icon */
        .ep-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ep-icon-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #d4af3720 0%, transparent 70%);
          animation: ep-pulse 3s ease-in-out infinite;
        }

        @keyframes ep-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }

        /* Content */
        .ep-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ep-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #2a1b0a;
          border: 1px solid #d4af3730;
          color: #f5d77a;
          font-size: 11px;
          letter-spacing: 0.12em;
          padding: 5px 12px;
          border-radius: 100px;
        }

        .ep-badge-dot {
          width: 6px;
          height: 6px;
          background: #d4af37;
          border-radius: 50%;
          animation: ep-blink 2s infinite;
        }

        @keyframes ep-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .ep-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 5vw, 42px);
          font-weight: 800;
          color: #f8f3e7;
        }

        .ep-heading em {
          color: #d4af37;
        }

        .ep-sub {
          font-size: 15px;
          color: #cbb78a;
          max-width: 400px;
        }

        /* Devices */
        .ep-devices {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
        }

        .ep-device-label {
          font-size: 10px;
          color: #d4af37;
        }

        .ep-hint {
          font-size: 13px;
          color: #a68c52;
        }

        .ep-line {
          width: 160px;
          height: 1px;
          background: linear-gradient(to right, transparent, #d4af3740, transparent);
        }
      `}</style>

      <div className={`ep-root${mounted ? " ep-mounted" : ""}`}>
        <div className="ep-grid" />
        <div className="ep-blob ep-blob--1" />
        <div className="ep-blob ep-blob--2" />
        <div className="ep-blob ep-blob--3" />
        <div className="ep-ring" style={{ width: 600, height: 600 }} />
        <div className="ep-ring ep-ring--2" />

        <div className="ep-card">
          <img src={logo} alt="Logo" className="ep-logo" />

          <div className="ep-icon-wrap">
            <div className="ep-icon-glow" />
            <DevicesIllustration />
          </div>

          <div className="ep-content">
            <div className="ep-badge">
              <span className="ep-badge-dot" />
              Access Restricted
            </div>

            <h1 className="ep-heading">
              Available on <em>Desktop</em><br />& TV only
            </h1>

            <p className="ep-sub">
              This experience is optimised for larger screens. Please switch to a desktop computer or TV.
            </p>
          </div>

          <div className="ep-devices">
            <span className="ep-device-label">Desktop</span>
            <span className="ep-device-label">TV</span>
          </div>

          <div>
            <span className="ep-hint">Detected: Mobile / Tablet</span>
            <div className="ep-line" />
          </div>
        </div>
      </div>
    </>
  );
};

function DevicesIllustration() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
      <ellipse cx="110" cy="95" rx="90" ry="28" fill="#d4af37" opacity="0.25" />

      <rect x="34" y="10" width="152" height="96" rx="8" fill="#1f1408" stroke="#d4af37" />
      <rect x="42" y="18" width="136" height="80" rx="4" fill="#2a1b0a" />

      <circle cx="150" cy="50" r="10" fill="#d4af37" opacity="0.5" />

      <rect x="98" y="106" width="24" height="14" fill="#8c6a1a" />
      <rect x="84" y="120" width="52" height="6" fill="#c9a13b" />
    </svg>
  );
}

export default ErrorPage;

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./auth.css";

/* ─── Icons ─── */
const IconMail = () => (
  <svg className="auth-field-icon" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 5.5L8 9.5L14.5 5.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);
const IconLock = () => (
  <svg className="auth-field-icon" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 7V5C5 3.343 6.343 2 8 2C9.657 2 11 3.343 11 5V7" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
  </svg>
);
const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGoogle = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M14.5 8.16c0-.5-.04-.87-.12-1.25H8v2.28h3.69c-.08.58-.47 1.45-1.35 2.04l2.08 1.58C13.64 11.52 14.5 9.98 14.5 8.16z" fill="#4285F4"/>
    <path d="M8 15c1.85 0 3.4-.6 4.52-1.63l-2.08-1.58c-.56.37-1.3.62-2.44.62-1.86 0-3.44-1.23-4.01-2.93L1.82 11.1C2.93 13.28 5.28 15 8 15z" fill="#34A853"/>
    <path d="M3.99 9.48A4.59 4.59 0 0 1 3.73 8c0-.52.09-1.02.25-1.48L1.82 4.9A7.93 7.93 0 0 0 1 8c0 1.28.31 2.49.82 3.56l2.17-2.08z" fill="#FBBC05"/>
    <path d="M8 3.58c1.04 0 1.96.35 2.69 1.05l2-1.96A7.15 7.15 0 0 0 8 1C5.28 1 2.93 2.72 1.82 4.9L3.99 6.5C4.56 4.81 6.14 3.58 8 3.58z" fill="#EA4335"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M14 8.05C14 4.72 11.31 2 8 2C4.69 2 2 4.72 2 8.05C2 11.07 4.17 13.56 7.06 14V9.8H5.5V8.05H7.06V6.73C7.06 5.17 7.99 4.3 9.41 4.3C10.09 4.3 10.81 4.42 10.81 4.42V5.95H10.02C9.24 5.95 9 6.43 9 6.92V8.05H10.73L10.46 9.8H9V14C11.89 13.56 14 11.07 14 8.05Z" fill="#1877F2"/>
  </svg>
);

const Logo = ({ white }: { white?: boolean }) => (
  <div className="auth-logo">
    <Image
      src="/FullLogo_Transparent_NoBuffer.png"
      alt="Kasirly"
      width={32} height={32}
      className="auth-logo-img"
      style={white ? { filter: "brightness(0) invert(1)" } : undefined}
    />
    <span className="auth-logo-text">Kasir<span>ly</span></span>
  </div>
);

const SocialButtons = () => (
  <div className="auth-social">
    <button className="auth-btn-social"><IconGoogle />Google</button>
    <button className="auth-btn-social"><IconFacebook />Facebook</button>
  </div>
);

/* ══════════════════════════════════════════════
   FORM LAYOUT STRUCTURE
   ┌─────────────────────────────┐  ← padding-top (40px)
   │  Logo                       │  ← top anchor
   │  ─────────────────────────  │
   │  [auth-form-body flex:1]    │  ← centred in remaining space
   │    Title                    │
   │    Subtitle                 │
   │    Fields                   │
   │    Forgot / Checkbox        │
   │    Button                   │
   │    Divider                  │
   │  ─────────────────────────  │
   │  Social Buttons             │  ← bottom anchor
   └─────────────────────────────┘  ← padding-bottom (40px)

   INFO LAYOUT STRUCTURE
   ┌─────────────────────────────┐  ← padding-top (40px)
   │  Logo                       │  ← top anchor
   │  ─────────────────────────  │
   │  [auth-info-top  flex:1]    │  ← centred in remaining space
   │    Badge                    │
   │    Title                    │
   │    Desc                     │
   │    Stats / Features         │
   │  ─────────────────────────  │
   │  Switch button              │  ← bottom anchor
   └─────────────────────────────┘  ← padding-bottom (40px)
══════════════════════════════════════════════ */

/* ── LOGIN FORM ── */
const LoginForm = ({ onSubmit }: { onSubmit: () => void }) => (
  <div className="auth-panel-form">
    {/* TOP ANCHOR */}
    <Logo />

    {/* MIDDLE — centred */}
    <div className="auth-form-body">
      <h1 className="auth-form-title">Selamat datang<br />kembali 👋</h1>
      <p className="auth-form-subtitle">Masuk untuk mengelola toko Anda dengan mudah</p>

      <div className="auth-field">
        <label>Email</label>
        <div className="auth-field-inner">
          <IconMail />
          <input type="email" placeholder="nama@email.com" />
        </div>
      </div>

      <div className="auth-field">
        <label>Kata Sandi</label>
        <div className="auth-field-inner">
          <IconLock />
          <input type="password" placeholder="Masukkan kata sandi" />
        </div>
      </div>

      <div className="auth-forgot"><a href="#">Lupa kata sandi?</a></div>
      <button className="auth-btn-primary" onClick={onSubmit}>Masuk ke Akun</button>
      <div className="auth-divider"><span>atau lanjutkan dengan</span></div>
    </div>

    {/* BOTTOM ANCHOR */}
    <SocialButtons />
  </div>
);

/* ── LOGIN INFO ── */
const LoginInfo = ({ onSwitch }: { onSwitch: () => void }) => (
  <div className="auth-panel-info">
    {/* TOP ANCHOR */}
    <Logo white />

    {/* MIDDLE — centred */}
    <div className="auth-info-top">
      <div className="auth-info-badge"><span>✦</span> Sistem Kasir Cerdas</div>
      <h2 className="auth-info-title">Kelola Bisnis Lebih Efisien</h2>
      <p className="auth-info-desc">
        Platform all-in-one untuk kasir, manajemen stok, dan perhitungan laba otomatis secara real-time.
      </p>
      <div className="auth-stats">
        <div className="auth-stat">
          <span className="auth-stat-value">500+</span>
          <span className="auth-stat-label">Pengguna Aktif</span>
        </div>
        <div className="auth-stat">
          <span className="auth-stat-value">99.9%</span>
          <span className="auth-stat-label">Uptime</span>
        </div>
        <div className="auth-stat">
          <span className="auth-stat-value">4.9★</span>
          <span className="auth-stat-label">Rating</span>
        </div>
      </div>
      <ul className="auth-features">
        {["Kasir digital cepat & akurat", "Manajemen stok real-time", "Laporan laba otomatis"].map(f => (
          <li key={f}><span className="auth-feature-dot"><IconCheck /></span>{f}</li>
        ))}
      </ul>
    </div>

    {/* BOTTOM ANCHOR */}
    <div className="auth-switch">
      <p>Belum punya akun?</p>
      <button className="auth-btn-switch" onClick={onSwitch}>
        Daftar Sekarang <IconArrow />
      </button>
    </div>
  </div>
);

/* ── REGISTER INFO ── */
const RegisterInfo = ({ onSwitch }: { onSwitch: () => void }) => (
  <div className="auth-panel-info">
    {/* TOP ANCHOR */}
    <Logo white />

    {/* MIDDLE — centred */}
    <div className="auth-info-top">
      <div className="auth-info-badge"><span>✦</span> Gratis Selamanya</div>
      <h2 className="auth-info-title">Mulai Perjalanan Bisnis Anda</h2>
      <p className="auth-info-desc">
        Daftar gratis dan dapatkan akses penuh ke semua fitur kasir, stok, dan analitik laba.
      </p>
      <ul className="auth-features">
        {[
          "Transaksi kasir tanpa batas",
          "Notifikasi stok habis otomatis",
          "Dashboard laba & rugi harian",
          "Laporan keuangan ekspor PDF",
        ].map(f => (
          <li key={f}><span className="auth-feature-dot"><IconCheck /></span>{f}</li>
        ))}
      </ul>
    </div>

    {/* BOTTOM ANCHOR */}
    <div className="auth-switch">
      <p>Sudah punya akun?</p>
      <button className="auth-btn-switch" onClick={onSwitch}>
        <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><IconArrow /></span>
        Masuk Sekarang
      </button>
    </div>
  </div>
);

/* ── REGISTER FORM ── */
const RegisterForm = ({ onSubmit }: { onSubmit: () => void }) => (
  <div className="auth-panel-form">
    {/* TOP ANCHOR */}
    <Logo />

    {/* MIDDLE — centred */}
    <div className="auth-form-body">
      <h1 className="auth-form-title">Buat Akun Baru ✨</h1>
      <p className="auth-form-subtitle">Bergabunglah dan mulai kelola toko Anda hari ini</p>

      <div className="auth-field">
        <label>Email</label>
        <div className="auth-field-inner">
          <IconMail />
          <input type="email" placeholder="nama@email.com" />
        </div>
      </div>

      <div className="auth-field">
        <label>Kata Sandi</label>
        <div className="auth-field-inner">
          <IconLock />
          <input type="password" placeholder="Buat kata sandi" />
        </div>
      </div>

      <div className="auth-checkbox">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          Saya menyetujui{" "}
          <a href="#">Syarat &amp; Ketentuan</a>
          {" "}dan{" "}
          <a href="#">Kebijakan Privasi</a>
          {" "}yang berlaku
        </label>
      </div>

      <button className="auth-btn-primary" onClick={onSubmit}>Buat Akun</button>
      <div className="auth-divider"><span>atau daftar dengan</span></div>
    </div>

    {/* BOTTOM ANCHOR */}
    <SocialButtons />
  </div>
);

/* ── STATE MACHINE ── */
type PanelState = "visible" | "exit-l" | "exit-r" | "stand-l" | "stand-r";

interface Panels {
  leftLoginForm:  PanelState;
  rightLoginInfo: PanelState;
  leftRegInfo:    PanelState;
  rightRegForm:   PanelState;
}

const LOGIN_IDLE: Panels = {
  leftLoginForm:  "visible",
  rightLoginInfo: "visible",
  leftRegInfo:    "stand-l",
  rightRegForm:   "stand-r",
};

const REGISTER_IDLE: Panels = {
  leftLoginForm:  "stand-l",
  rightLoginInfo: "stand-r",
  leftRegInfo:    "visible",
  rightRegForm:   "visible",
};

export default function AuthPage() {
  const router = useRouter();
  const [panels, setPanels] = useState<Panels>(LOGIN_IDLE);
  const [busy,   setBusy]   = useState(false);

  const handleRedirect = () => {
    router.push("/client/home");
  };

  const switchTo = (target: "login" | "register") => {
    if (busy) return;
    setBusy(true);

    if (target === "register") {
      setPanels({ leftLoginForm: "exit-l", rightLoginInfo: "exit-r", leftRegInfo: "stand-l", rightRegForm: "stand-r" });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setPanels({ leftLoginForm: "exit-l", rightLoginInfo: "exit-r", leftRegInfo: "visible", rightRegForm: "visible" });
      }));
    } else {
      setPanels({ leftLoginForm: "stand-l", rightLoginInfo: "stand-r", leftRegInfo: "exit-l", rightRegForm: "exit-r" });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setPanels({ leftLoginForm: "visible", rightLoginInfo: "visible", leftRegInfo: "exit-l", rightRegForm: "exit-r" });
      }));
    }

    setTimeout(() => {
      setPanels(target === "register" ? REGISTER_IDLE : LOGIN_IDLE);
      setBusy(false);
    }, 620);
  };

  const cls = (s: PanelState) => `auth-panel state-${s}`;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className={`${cls(panels.leftLoginForm)} auth-panel-left`}><LoginForm onSubmit={handleRedirect} /></div>
        <div className={`${cls(panels.rightLoginInfo)} auth-panel-right`}><LoginInfo onSwitch={() => switchTo("register")} /></div>
        <div className={`${cls(panels.leftRegInfo)} auth-panel-left`}><RegisterInfo onSwitch={() => switchTo("login")} /></div>
        <div className={`${cls(panels.rightRegForm)} auth-panel-right`}><RegisterForm onSubmit={handleRedirect} /></div>
      </div>
    </div>
  );
}
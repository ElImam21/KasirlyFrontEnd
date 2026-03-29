"use client";

import { useState } from "react";
import "./profile.css";

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface ProfileForm {
  nama: string;
  email: string;
  telepon: string;
  namaToko: string;
  alamatToko: string;
}

interface PasswordForm {
  current: string;
  newPw: string;
  confirm: string;
}

interface Prefs {
  notifTransaksi: boolean;
  notifStok: boolean;
  notifLaporan: boolean;
  suara: boolean;
  bahasa: string;
}

/* ══════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════ */
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const getPwStrength = (
  pw: string,
): { level: number; label: string; cls: string } => {
  if (!pw) return { level: 0, label: "", cls: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Lemah", cls: "weak" };
  if (score <= 2) return { level: 2, label: "Sedang", cls: "medium" };
  return { level: 3, label: "Kuat", cls: "strong" };
};

/* ══════════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════════ */
const ACTIVITIES = [
  {
    icon: "login",
    color: "blue",
    desc: "Login berhasil",
    meta: "Chrome · Windows",
    time: "Baru saja",
  },
  {
    icon: "tx",
    color: "green",
    desc: "48 transaksi diselesaikan",
    meta: "Sesi KSR-20260321",
    time: "Hari ini",
  },
  {
    icon: "pw",
    color: "orange",
    desc: "Password diperbarui",
    meta: "Dari pengaturan",
    time: "3 hari lalu",
  },
  {
    icon: "login",
    color: "blue",
    desc: "Login berhasil",
    meta: "Chrome · Android",
    time: "5 hari lalu",
  },
  {
    icon: "export",
    color: "purple",
    desc: "Laporan diekspor (PDF)",
    meta: "Laporan Maret 2026",
    time: "1 minggu lalu",
  },
];

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const IconUser = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M2.5 13.5C2.5 11.015 5.015 9 8 9C10.985 9 13.5 11.015 13.5 13.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect
      x="1.5"
      y="3.5"
      width="13"
      height="9"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path d="M1.5 5.5L8 9.5L14.5 5.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect
      x="4"
      y="1.5"
      width="8"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="8" cy="12.5" r="0.8" fill="currentColor" />
  </svg>
);

const IconStore = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M1.5 6.5L2.5 2.5H13.5L14.5 6.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M1.5 6.5C1.5 7.328 2.172 8 3 8C3.828 8 4.5 7.328 4.5 6.5C4.5 7.328 5.172 8 6 8C6.828 8 7.5 7.328 7.5 6.5C7.5 7.328 8.172 8 9 8C9.828 8 10.5 7.328 10.5 6.5C10.5 7.328 11.172 8 12 8C12.828 8 13.5 7.328 13.5 6.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M2.5 8V13.5H13.5V8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <rect
      x="6"
      y="10"
      width="4"
      height="3.5"
      rx="0.5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.515 10.485 1.5 8 1.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect
      x="3"
      y="7"
      width="10"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M5 7V5C5 3.343 6.343 2 8 2C9.657 2 11 3.343 11 5V7"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="8" cy="10.5" r="1" fill="currentColor" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M2 2L14 14M6.5 6.6C6.19 6.92 6 7.44 6 8C6 9.105 6.895 10 8 10C8.56 10 9.08 9.81 9.4 9.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M4.5 4.6C2.8 5.7 1.5 7.7 1.5 8C1.5 8 4 13 8 13C9.4 13 10.6 12.5 11.6 11.8M7 3.1C7.3 3 7.65 3 8 3C12 3 14.5 8 14.5 8C14.5 8 13.8 9.3 12.8 10.4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M13.5 13.5H2.5C1.948 13.5 1.5 13.052 1.5 12.5V3.5C1.5 2.948 1.948 2.5 2.5 2.5H11L13.5 5V12.5C13.5 13.052 13.052 13.5 13.5 13.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <rect
      x="5"
      y="9"
      width="6"
      height="4.5"
      rx="0.5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <rect
      x="5.5"
      y="2.5"
      width="5"
      height="3.5"
      rx="0.3"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5C8 1.5 4.5 2.5 4.5 7V10.5L3 12H13L11.5 10.5V7C11.5 2.5 8 1.5 8 1.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 12C6.5 12.828 7.172 13.5 8 13.5C8.828 13.5 9.5 12.828 9.5 12"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M8 2C8 2 6 5 6 8C6 11 8 14 8 14M8 2C8 2 10 5 10 8C10 11 8 14 8 14M2 8H14"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

const IconActivity = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M1.5 8H4.5L6 4.5L8 11.5L10 6.5L11.5 8H14.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWarning = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L14.5 13.5H1.5L8 2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M8 6.5V9.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11.5" r="0.7" fill="currentColor" />
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path
      d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLogin = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M6 3H3C2.448 3 2 3.448 2 4V12C2 12.552 2.448 13 3 13H6"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M10 5L13 8L10 11M13 8H6"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTx = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect
      x="2"
      y="2"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M5 8H11M5 5.5H11M5 10.5H8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconExportSmall = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M3 11V13H13V11M8 2V10M5 7L8 10L11 7"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPwChange = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect
      x="3"
      y="7"
      width="10"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M5 7V5C5 3.343 6.343 2 8 2C9.657 2 11 3.343 11 5V7"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M6 4.5L8 3L10 4.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M10.5 11L13.5 8L10.5 5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 8H6.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M6.5 3H3C2.448 3 2 3.448 2 4V12C2 12.552 2.448 13 3 13H6.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4H14M5 4V2.5C5 2.224 5.224 2 5.5 2H10.5C10.776 2 11 2.224 11 2.5V4M6 7V11.5M10 7V11.5M3 4L3.5 13C3.5 13.276 3.724 13.5 4 13.5H12C12.276 13.5 12.5 13.276 12.5 13L13 4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconChevDown = () => (
  <svg viewBox="0 0 14 14" fill="none">
    <path
      d="M3 5L7 9L11 5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const IconStar = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L9.5 6H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 6H6.5L8 2Z"
      fill="currentColor"
    />
  </svg>
);

const IconShieldLock = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5L2.5 3.5V8C2.5 11.2 5 13.5 8 14.5C11 13.5 13.5 11.2 13.5 8V3.5L8 1.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <rect x="5.5" y="7.5" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M6.5 7.5V6C6.5 4.895 7.172 4 8 4C8.828 4 9.5 4.895 9.5 6V7.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="8" cy="9.5" r="0.7" fill="currentColor" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M10 5L13 8L10 11"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDelete = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M11 5L5 11M5 5L11 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ══════════════════════════════════════════════
   ACTIVITY ICON RESOLVER
══════════════════════════════════════════════ */
function ActivityIcon({ type, color }: { type: string; color: string }) {
  const icon =
    type === "login" ? (
      <IconLogin />
    ) : type === "tx" ? (
      <IconTx />
    ) : type === "pw" ? (
      <IconPwChange />
    ) : type === "export" ? (
      <IconExportSmall />
    ) : (
      <IconActivity />
    );
  return <div className={`profile-activity-icon ${color}`}>{icon}</div>;
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function ProfilePage() {
  /* ── Profile form ── */
  const [profile, setProfile] = useState<ProfileForm>({
    nama: "Admin Kasirly",
    email: "admin@kasirly.id",
    telepon: "081234567890",
    namaToko: "Toko Serba Ada",
    alamatToko: "Jl. Pahlawan No. 12, Jakarta Selatan",
  });
  const [profileDraft, setProfileDraft] = useState<ProfileForm>({ ...profile });
  const [profileToast, setProfileToast] = useState<"" | "success" | "error">(
    "",
  );

  /* ── Password form ── */
  const [pwForm, setPwForm] = useState<PasswordForm>({
    current: "",
    newPw: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState({
    current: false,
    newPw: false,
    confirm: false,
  });
  const [pwToast, setPwToast] = useState<"" | "success" | "error">("");

  /* ── Preferences ── */
  const [prefs, setPrefs] = useState<Prefs>({
    notifTransaksi: true,
    notifStok: true,
    notifLaporan: false,
    suara: true,
    bahasa: "id",
  });
  const [prefsToast, setPrefsToast] = useState<"" | "success" | "error">("");

  /* ── Danger modal ── */
  const [dangerModal, setDangerModal] = useState<"" | "logout-all" | "delete">(
    "",
  );

  /* ── Helpers ── */
  const showToast = (
    setter: React.Dispatch<React.SetStateAction<"" | "success" | "error">>,
    val: "" | "success" | "error",
    duration = 2500,
  ) => {
    setter(val);
    setTimeout(() => setter(""), duration);
  };

  const pwStrength = getPwStrength(pwForm.newPw);
  const pwMismatch =
    pwForm.confirm.length > 0 && pwForm.newPw !== pwForm.confirm;
  const pwCanSubmit =
    pwForm.current.length >= 1 && pwForm.newPw.length >= 8 && !pwMismatch;

  const handleProfileSave = () => {
    if (!profileDraft.nama.trim() || !profileDraft.email.trim()) {
      showToast(setProfileToast, "error");
      return;
    }
    setProfile({ ...profileDraft });
    showToast(setProfileToast, "success");
  };

  const handlePwSave = () => {
    if (!pwCanSubmit) return;
    setPwForm({ current: "", newPw: "", confirm: "" });
    showToast(setPwToast, "success");
  };

  const handlePrefsSave = () => {
    showToast(setPrefsToast, "success");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* ══ HERO ══ */}
        <div className="profile-hero">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{getInitials(profile.nama)}</div>
            <button className="profile-avatar-edit" title="Ubah foto">
              <IconEdit />
            </button>
          </div>

          <div className="profile-hero-info">
            <div className="profile-hero-name">{profile.nama}</div>
            <div className="profile-hero-email">{profile.email}</div>
            <div className="profile-hero-badges">
              <span className="profile-badge plan">
                <IconStar /> Pro Plan
              </span>
              <span className="profile-badge role">Kasir Utama</span>
              <span className="profile-badge active">● Aktif</span>
            </div>
          </div>

          <div className="profile-hero-divider" />

          <div className="profile-hero-stats">
            <div className="profile-hero-stat">
              <div className="profile-hero-stat-val">1.042</div>
              <div className="profile-hero-stat-lbl">Transaksi</div>
            </div>
            <div className="profile-hero-stat" style={{ marginTop: 8 }}>
              <div className="profile-hero-stat-val">Mar 2026</div>
              <div className="profile-hero-stat-lbl">Bergabung</div>
            </div>
          </div>
        </div>

        {/* ══ INFO PRIBADI ══ */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-title-icon blue">
                <IconUser />
              </div>
              Informasi Pribadi & Toko
            </div>
          </div>
          <div className="profile-card-body">
            <div className="profile-form-grid">
              <div className="profile-field">
                <label className="profile-field-label">Nama Lengkap</label>
                <div className="profile-field-inner">
                  <IconUser />
                  <input
                    className="profile-input"
                    value={profileDraft.nama}
                    onChange={(e) =>
                      setProfileDraft((p) => ({ ...p, nama: e.target.value }))
                    }
                    placeholder="Nama lengkap"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">Email</label>
                <div className="profile-field-inner">
                  <IconMail />
                  <input
                    className="profile-input"
                    type="email"
                    value={profileDraft.email}
                    onChange={(e) =>
                      setProfileDraft((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">Nomor Telepon</label>
                <div className="profile-field-inner">
                  <IconPhone />
                  <input
                    className="profile-input"
                    type="tel"
                    value={profileDraft.telepon}
                    onChange={(e) =>
                      setProfileDraft((p) => ({
                        ...p,
                        telepon: e.target.value,
                      }))
                    }
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">Nama Toko</label>
                <div className="profile-field-inner">
                  <IconStore />
                  <input
                    className="profile-input"
                    value={profileDraft.namaToko}
                    onChange={(e) =>
                      setProfileDraft((p) => ({
                        ...p,
                        namaToko: e.target.value,
                      }))
                    }
                    placeholder="Nama toko Anda"
                  />
                </div>
              </div>

              <div className="profile-field span2">
                <label className="profile-field-label">Alamat Toko</label>
                <div className="profile-field-inner">
                  <IconLocation />
                  <input
                    className="profile-input"
                    value={profileDraft.alamatToko}
                    onChange={(e) =>
                      setProfileDraft((p) => ({
                        ...p,
                        alamatToko: e.target.value,
                      }))
                    }
                    placeholder="Jl. ..."
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-actions">
              {profileToast && (
                <span className={`profile-toast ${profileToast}`}>
                  {profileToast === "success" ? (
                    <>
                      <IconCheck /> Berhasil disimpan!
                    </>
                  ) : (
                    <>⚠ Nama dan email wajib diisi</>
                  )}
                </span>
              )}
              <button
                className="profile-btn-secondary"
                onClick={() => setProfileDraft({ ...profile })}
              >
                Batal
              </button>
              <button
                className="profile-btn-primary"
                onClick={handleProfileSave}
              >
                <IconSave />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>

        {/* ══ KEAMANAN + PREFERENSI (2 kolom) ══ */}
        <div className="profile-two-col">

        {/* ══ KEAMANAN ══ */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-title-icon orange">
                <IconLock />
              </div>
              Keamanan Akun
            </div>
          </div>
          <div className="profile-card-body">
            <div className="profile-form-grid">
              <div className="profile-field span2">
                <label className="profile-field-label">Password Saat Ini</label>
                <div className="profile-field-inner profile-input-pw-wrap">
                  <IconLock />
                  <input
                    className="profile-input"
                    type={showPw.current ? "text" : "password"}
                    value={pwForm.current}
                    onChange={(e) =>
                      setPwForm((p) => ({ ...p, current: e.target.value }))
                    }
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    className="profile-pw-toggle"
                    type="button"
                    onClick={() =>
                      setShowPw((s) => ({ ...s, current: !s.current }))
                    }
                  >
                    {showPw.current ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <div className="profile-field">
                <label className="profile-field-label">Password Baru</label>
                <div className="profile-field-inner profile-input-pw-wrap">
                  <IconLock />
                  <input
                    className="profile-input"
                    type={showPw.newPw ? "text" : "password"}
                    value={pwForm.newPw}
                    onChange={(e) =>
                      setPwForm((p) => ({ ...p, newPw: e.target.value }))
                    }
                    placeholder="Min. 8 karakter"
                  />
                  <button
                    className="profile-pw-toggle"
                    type="button"
                    onClick={() =>
                      setShowPw((s) => ({ ...s, newPw: !s.newPw }))
                    }
                  >
                    {showPw.newPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {pwForm.newPw.length > 0 && (
                  <>
                    <div className="profile-pw-strength">
                      <div className="profile-pw-strength-bars">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`profile-pw-strength-bar ${i <= pwStrength.level ? `active ${pwStrength.cls}` : ""}`}
                          />
                        ))}
                      </div>
                      <span
                        className={`profile-pw-strength-label ${pwStrength.cls}`}
                      >
                        {pwStrength.label}
                      </span>
                    </div>
                    <span className="profile-field-hint">
                      Gunakan huruf besar, angka, dan simbol untuk password yang
                      kuat.
                    </span>
                  </>
                )}
              </div>

              <div className="profile-field">
                <label className="profile-field-label">
                  Konfirmasi Password Baru
                </label>
                <div className="profile-field-inner profile-input-pw-wrap">
                  <IconLock />
                  <input
                    className="profile-input"
                    type={showPw.confirm ? "text" : "password"}
                    value={pwForm.confirm}
                    onChange={(e) =>
                      setPwForm((p) => ({ ...p, confirm: e.target.value }))
                    }
                    placeholder="Ulangi password baru"
                  />
                  <button
                    className="profile-pw-toggle"
                    type="button"
                    onClick={() =>
                      setShowPw((s) => ({ ...s, confirm: !s.confirm }))
                    }
                  >
                    {showPw.confirm ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {pwMismatch && (
                  <span className="profile-field-hint error">
                    Password tidak cocok.
                  </span>
                )}
                {!pwMismatch && pwForm.confirm.length > 0 && (
                  <span className="profile-field-hint success">
                    ✓ Password cocok.
                  </span>
                )}
              </div>
            </div>

            <div className="profile-form-actions">
              {pwToast && (
                <span className="profile-toast success">
                  <IconCheck /> Password berhasil diperbarui!
                </span>
              )}
              <button
                className="profile-btn-secondary"
                onClick={() =>
                  setPwForm({ current: "", newPw: "", confirm: "" })
                }
              >
                Batal
              </button>
              <button
                className="profile-btn-primary"
                disabled={!pwCanSubmit}
                style={
                  !pwCanSubmit ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
                onClick={handlePwSave}
              >
                <IconLock />
                Perbarui Password
              </button>
            </div>
          </div>
        </div>

        {/* ══ PREFERENSI ══ */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-title-icon purple">
                <IconBell />
              </div>
              Notifikasi &amp; Preferensi
            </div>
          </div>
          <div className="profile-card-body">
            <div className="profile-toggle-row">
              <div className="profile-toggle-left">
                <div className="profile-toggle-label">Notifikasi Transaksi</div>
                <div className="profile-toggle-desc">
                  Terima notifikasi setiap transaksi selesai
                </div>
              </div>
              <label className="profile-switch">
                <input
                  type="checkbox"
                  checked={prefs.notifTransaksi}
                  onChange={() =>
                    setPrefs((p) => ({
                      ...p,
                      notifTransaksi: !p.notifTransaksi,
                    }))
                  }
                />
                <span className="profile-switch-track" />
              </label>
            </div>

            <div className="profile-toggle-row">
              <div className="profile-toggle-left">
                <div className="profile-toggle-label">
                  Peringatan Stok Habis
                </div>
                <div className="profile-toggle-desc">
                  Notifikasi saat stok produk kritis (≤5)
                </div>
              </div>
              <label className="profile-switch">
                <input
                  type="checkbox"
                  checked={prefs.notifStok}
                  onChange={() =>
                    setPrefs((p) => ({ ...p, notifStok: !p.notifStok }))
                  }
                />
                <span className="profile-switch-track" />
              </label>
            </div>

            <div className="profile-toggle-row">
              <div className="profile-toggle-left">
                <div className="profile-toggle-label">
                  Laporan Harian Otomatis
                </div>
                <div className="profile-toggle-desc">
                  Kirim ringkasan laporan setiap pukul 23:00
                </div>
              </div>
              <label className="profile-switch">
                <input
                  type="checkbox"
                  checked={prefs.notifLaporan}
                  onChange={() =>
                    setPrefs((p) => ({ ...p, notifLaporan: !p.notifLaporan }))
                  }
                />
                <span className="profile-switch-track" />
              </label>
            </div>

            <div className="profile-toggle-row">
              <div className="profile-toggle-left">
                <div className="profile-toggle-label">Suara Notifikasi</div>
                <div className="profile-toggle-desc">
                  Mainkan suara saat transaksi berhasil
                </div>
              </div>
              <label className="profile-switch">
                <input
                  type="checkbox"
                  checked={prefs.suara}
                  onChange={() => setPrefs((p) => ({ ...p, suara: !p.suara }))}
                />
                <span className="profile-switch-track" />
              </label>
            </div>

            <div className="profile-toggle-row">
              <div className="profile-toggle-left">
                <div className="profile-toggle-label">Bahasa</div>
                <div className="profile-toggle-desc">
                  Pilih bahasa tampilan aplikasi
                </div>
              </div>
              <div
                className="profile-field-inner profile-select-wrap"
                style={{ width: 160 }}
              >
                <IconGlobe />
                <select
                  className="profile-select"
                  value={prefs.bahasa}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, bahasa: e.target.value }))
                  }
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
                <span className="profile-select-arrow">
                  <IconChevDown />
                </span>
              </div>
            </div>

            <div className="profile-form-actions">
              {prefsToast && (
                <span className="profile-toast success">
                  <IconCheck /> Preferensi disimpan!
                </span>
              )}
              <button className="profile-btn-primary" onClick={handlePrefsSave}>
                <IconSave />
                Simpan Preferensi
              </button>
            </div>
          </div>
        </div>

        </div>{/* end profile-two-col */}

        {/* ══ SECURE AREA ENTRY ══ */}
        <div className="profile-secure-card">
          {/* bg decoration */}
          <div className="profile-secure-deco-1" />
          <div className="profile-secure-deco-2" />

          <div className="profile-secure-icon-wrap">
            <IconShieldLock />
          </div>

          <div className="profile-secure-info">
            <div className="profile-secure-title">Secure Area</div>
            <div className="profile-secure-desc">
              Area terproteksi untuk mengelola data utama toko — kategori,
              stok, menu, dan transaksi non-penjualan. Diperlukan PIN untuk
              masuk.
            </div>
            <div className="profile-secure-features">
              <span className="profile-secure-feat">Kategori</span>
              <span className="profile-secure-feat">Stok &amp; Barang</span>
              <span className="profile-secure-feat">Menu</span>
              <span className="profile-secure-feat">Transaksi Keuangan</span>
            </div>
          </div>

          <button className="profile-secure-btn">
            <span>Masuk ke Secure Area</span>
            <IconArrowRight />
          </button>
        </div>

        {/* ══ AKTIVITAS + DANGER ZONE (main grid) ══ */}
        <div className="profile-main-grid">

        {/* ══ AKTIVITAS ══ */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-title-icon green">
                <IconActivity />
              </div>
              Aktivitas Terakhir
            </div>
          </div>
          <div className="profile-card-body">
            <div className="profile-activity-list">
              {ACTIVITIES.map((a, i) => (
                <div className="profile-activity-item" key={i}>
                  <ActivityIcon type={a.icon} color={a.color} />
                  <div className="profile-activity-info">
                    <div className="profile-activity-desc">{a.desc}</div>
                    <div className="profile-activity-meta">{a.meta}</div>
                  </div>
                  <div className="profile-activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ DANGER ZONE ══ */}
        <div className="profile-danger-zone">
          <div className="profile-danger-header">
            <div className="profile-danger-title">
              <IconWarning />
              Zona Berbahaya
            </div>
          </div>

          <div className="profile-danger-item">
            <div>
              <div className="profile-danger-item-label">
                Logout dari Semua Perangkat
              </div>
              <div className="profile-danger-item-desc">
                Akhiri semua sesi aktif di perangkat lain
              </div>
            </div>
            <button
              className="profile-btn-danger"
              onClick={() => setDangerModal("logout-all")}
            >
              <IconLogout />
              Logout Semua
            </button>
          </div>

          <div className="profile-danger-item">
            <div>
              <div className="profile-danger-item-label">Hapus Akun</div>
              <div className="profile-danger-item-desc">
                Hapus akun dan seluruh data secara permanen. Tindakan ini tidak
                dapat dibatalkan.
              </div>
            </div>
            <button
              className="profile-btn-danger"
              onClick={() => setDangerModal("delete")}
            >
              <IconTrash />
              Hapus Akun
            </button>
          </div>
        </div>

        </div>{/* end profile-main-grid */}
      </div>{/* end profile-container */}

      {/* ══ CONFIRM MODAL ══ */}
      {dangerModal !== "" && (
        <div
          className="profile-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDangerModal("");
          }}
        >
          <div className="profile-modal">
            <div className="profile-modal-header">
              <div>
                <div className="profile-modal-icon">
                  {dangerModal === "logout-all" ? (
                    <IconLogout />
                  ) : (
                    <IconTrash />
                  )}
                </div>
                <div className="profile-modal-title">
                  {dangerModal === "logout-all"
                    ? "Logout Semua Perangkat?"
                    : "Hapus Akun?"}
                </div>
                <div className="profile-modal-desc">
                  {dangerModal === "logout-all"
                    ? "Semua sesi aktif di perangkat lain akan diakhiri. Anda tetap login di perangkat ini."
                    : "Seluruh data akun, transaksi, dan laporan akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."}
                </div>
              </div>
              <button
                className="profile-modal-close"
                onClick={() => setDangerModal("")}
              >
                ✕
              </button>
            </div>
            <div className="profile-modal-footer" style={{ marginTop: 24 }}>
              <button
                className="profile-modal-btn-cancel"
                onClick={() => setDangerModal("")}
              >
                Batal
              </button>
              <button
                className="profile-modal-btn-danger"
                onClick={() => setDangerModal("")}
              >
                {dangerModal === "logout-all" ? (
                  <>
                    <IconLogout /> Ya, Logout Semua
                  </>
                ) : (
                  <>
                    <IconTrash /> Ya, Hapus Akun
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
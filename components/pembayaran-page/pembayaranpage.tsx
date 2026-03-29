"use client";

import { useState } from "react";
import "./pembayaran.css";

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
type PlanId = "free" | "starter" | "pro";

interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number | null;
  features: Feature[];
}

interface Feature {
  text: string;
  status: "yes" | "no" | "soon";
}

/* ══════════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════════ */
const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Cocok untuk kamu yang ingin mengenal Kasirly sebelum berlangganan.",
    price: null,
    features: [
      { text: "Lihat dasbor & fitur aplikasi", status: "yes" },
      { text: "Akses halaman kasir (read-only)", status: "yes" },
      { text: "Melihat daftar produk", status: "yes" },
      { text: "Transaksi penjualan", status: "no" },
      { text: "Manajemen stok & barang", status: "no" },
      { text: "Laporan laba & pengeluaran", status: "no" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Untuk pemilik usaha yang butuh kasir dan kontrol stok sehari-hari.",
    price: 50000,
    features: [
      { text: "Semua fitur Free", status: "yes" },
      { text: "Transaksi penjualan tak terbatas", status: "yes" },
      { text: "Manajemen stok & barang", status: "yes" },
      { text: "Riwayat transaksi 30 hari", status: "yes" },
      { text: "Laporan laba & pengeluaran", status: "no" },
      { text: "Laporan otomatis & ekspor PDF", status: "soon" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Untuk bisnis yang ingin tumbuh dengan data laporan lengkap & akurat.",
    price: 100000,
    features: [
      { text: "Semua fitur Starter", status: "yes" },
      { text: "Laporan laba & pengeluaran otomatis", status: "yes" },
      { text: "Ekspor laporan ke PDF", status: "yes" },
      { text: "Riwayat transaksi tak terbatas", status: "yes" },
      { text: "Analitik tren penjualan", status: "yes" },
      { text: "Prioritas dukungan pelanggan", status: "yes" },
    ],
  },
];

const CURRENT_PLAN: PlanId = "pro"; // ganti sesuai data user aktif

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const IconCrown = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M2 11.5L3.5 5.5L6.5 8.5L8 3.5L9.5 8.5L12.5 5.5L14 11.5H2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M2 11.5H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M9 2L4 9H8L7 14L12 7H8L9 2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
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

const IconX = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M5 5L11 11M11 5L5 11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 5.5V8L9.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L9.5 6H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 6H6.5L8 2Z"
      fill="currentColor"
    />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L3 4V8.5C3 11.5 5.5 13.5 8 14C10.5 13.5 13 11.5 13 8.5V4L8 2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M2.5 8C2.5 5 5 2.5 8 2.5C10.2 2.5 12.1 3.8 13 5.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M13 2.5V5.5H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13.5 8C13.5 11 11 13.5 8 13.5C5.8 13.5 3.9 12.2 3 10.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M3 13.5V10.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHeadset = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path
      d="M3 9V8C3 5.239 5.239 3 8 3C10.761 3 13 5.239 13 8V9"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <rect x="2" y="9" width="2.5" height="4" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
    <rect x="11.5" y="9" width="2.5" height="4" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconArrow = () => (
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

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
const formatPrice = (price: number) =>
  "Rp " + price.toLocaleString("id-ID");

function PlanIcon({ id }: { id: PlanId }) {
  if (id === "free")
    return (
      <div className="pay-plan-icon grey">
        <IconEye />
      </div>
    );
  if (id === "starter")
    return (
      <div className="pay-plan-icon blue">
        <IconZap />
      </div>
    );
  return (
    <div className="pay-plan-icon dark">
      <IconCrown />
    </div>
  );
}

function FeatureIcon({ status }: { status: Feature["status"] }) {
  if (status === "yes")
    return (
      <span className="pay-feature-icon yes">
        <IconCheck />
      </span>
    );
  if (status === "soon")
    return (
      <span className="pay-feature-icon soon">
        <IconClock />
      </span>
    );
  return (
    <span className="pay-feature-icon no">
      <IconX />
    </span>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function PembayaranPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  const handleUpgrade = (planId: PlanId) => {
    if (planId === CURRENT_PLAN || planId === "free") return;
    setLoadingPlan(planId);
    // Sambungkan ke payment gateway di sini
    setTimeout(() => setLoadingPlan(null), 1800);
  };

  const ctaLabel = (plan: Plan): string => {
    if (plan.id === "free") return "Paket Saat Ini";
    if (plan.id === CURRENT_PLAN) return "Paket Aktif";
    if (plan.id === "starter" && CURRENT_PLAN === "pro") return "Downgrade";
    return loadingPlan === plan.id ? "Memproses…" : "Upgrade Sekarang";
  };

  const ctaClass = (plan: Plan): string => {
    if (plan.id === "free") return "pay-cta-btn free";
    if (plan.id === CURRENT_PLAN) return "pay-cta-btn active";
    if (plan.id === "pro") return "pay-cta-btn primary";
    return "pay-cta-btn dark";
  };

  return (
    <div className="pay-page">
      <div className="pay-container">

        {/* ══ HERO ══ */}
        <div className="pay-hero">
          <div className="pay-hero-eyebrow">
            <IconStar />
            Pilih Paket Kasirly
          </div>
          <h1 className="pay-hero-title">
            Paket yang <span>tepat</span> untuk<br />
            bisnis kamu
          </h1>
          <p className="pay-hero-desc">
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi,
            batalkan kapan pun kamu mau.
          </p>
        </div>

        {/* ══ PLAN CARDS ══ */}
        <div className="pay-plans">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pay-card${plan.id === "starter" ? " popular" : ""}`}
            >
              {/* Popular badge */}
              {plan.id === "starter" && (
                <div className="pay-popular-badge">
                  <IconZap />
                  Paling Populer
                </div>
              )}

              {/* ── Top ── */}
              <div className="pay-card-top">
                <PlanIcon id={plan.id} />

                <div className="pay-plan-name">{plan.name}</div>
                <div className="pay-plan-tagline">{plan.tagline}</div>

                <div className="pay-price-block">
                  {plan.price === null ? (
                    <div className="pay-price-free">Gratis</div>
                  ) : (
                    <>
                      <div className="pay-price-currency">Rp</div>
                      <div className="pay-price-amount">
                        {plan.price.toLocaleString("id-ID")}
                      </div>
                      <div className="pay-price-period">/bulan</div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Features ── */}
              <div className="pay-card-body">
                <div className="pay-features-label">Yang kamu dapatkan</div>
                <div className="pay-feature-list">
                  {plan.features.map((f, i) => (
                    <div className="pay-feature-item" key={i}>
                      <FeatureIcon status={f.status} />
                      <span
                        className={`pay-feature-text${f.status === "no" ? " disabled" : ""}`}
                      >
                        {f.text}
                      </span>
                      {f.status === "soon" && (
                        <span className="pay-feature-soon-tag">Segera</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── CTA ── */}
              <div className="pay-card-foot">
                <button
                  className={ctaClass(plan)}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={
                    plan.id === "free" ||
                    plan.id === CURRENT_PLAN ||
                    loadingPlan !== null
                  }
                >
                  {plan.id !== "free" && plan.id !== CURRENT_PLAN && (
                    <IconArrow />
                  )}
                  {plan.id === CURRENT_PLAN && <IconCheck />}
                  {ctaLabel(plan)}
                </button>

                {plan.id === CURRENT_PLAN && (
                  <div className="pay-current-tag">
                    <IconCheck />
                    Paket yang sedang aktif
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ══ INFO STRIP ══ */}
        <div className="pay-info-strip">
          <div className="pay-info-item">
            <div className="pay-info-icon blue">
              <IconShield />
            </div>
            <div>
              <div className="pay-info-title">Pembayaran Aman</div>
              <div className="pay-info-desc">
                Transaksi diproses dengan enkripsi SSL. Data kamu selalu
                terlindungi.
              </div>
            </div>
          </div>

          <div className="pay-info-item">
            <div className="pay-info-icon green">
              <IconRefresh />
            </div>
            <div>
              <div className="pay-info-title">Batalkan Kapan Saja</div>
              <div className="pay-info-desc">
                Tidak ada kontrak jangka panjang. Downgrade atau batalkan
                langganan kapan pun.
              </div>
            </div>
          </div>

          <div className="pay-info-item">
            <div className="pay-info-icon orange">
              <IconHeadset />
            </div>
            <div>
              <div className="pay-info-title">Dukungan Pelanggan</div>
              <div className="pay-info-desc">
                Tim kami siap membantu kamu via WhatsApp atau email setiap hari
                kerja.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
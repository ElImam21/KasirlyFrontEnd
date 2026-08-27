// components/scure-area/home-page/homescurepage.tsx
"use client";

import "./homescure.css";

/* ─── Icons ─── */
const IconBox = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 6L10 2.5L17 6L10 9.5L3 6Z" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 6V14L10 17.5L17 14V6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9.5V17.5" strokeWidth="1.6" />
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 3L18 17H2L10 3Z" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 9V12" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="14.5" r="0.8" fill="currentColor" />
  </svg>
);

const IconWallet = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="5" width="15" height="11" rx="2" strokeWidth="1.6" />
    <path d="M2.5 8.5H17.5" strokeWidth="1.6" />
    <circle cx="14" cy="12.2" r="1.3" strokeWidth="1.4" />
  </svg>
);

const IconGem = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M4 8L10 2.5L16 8L10 17.5L4 8Z" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4 8H16M7.5 8L10 2.5L12.5 8M10 8L10 17.5" strokeWidth="1.3" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 4V16M4 10H16" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconReceipt = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M5 2.5H15V17.5L12.5 16L10 17.5L7.5 16L5 17.5V2.5Z" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.5 7H12.5M7.5 10H12.5" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconStock = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2" y="12" width="4" height="6" rx="1" strokeWidth="1.5" />
    <rect x="8" y="8" width="4" height="10" rx="1" strokeWidth="1.5" />
    <rect x="14" y="4" width="4" height="14" rx="1" strokeWidth="1.5" />
  </svg>
);

const IconHistory = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 10a7 7 0 1 0 2-4.9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 4v3.5H6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6.5V10L12.5 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUp = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 8L6 4L10 8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Data ─── */
const activity = [
  { id: 1, type: "produk", label: "Produk ditambahkan", name: "Minyak Goreng 2L", time: "10 menit lalu", amount: "+42 stok" },
  { id: 2, type: "pengeluaran", label: "Pengeluaran dicatat", name: "Sewa Gudang", time: "1 jam lalu", amount: "Rp 1.500.000" },
  { id: 3, type: "produk", label: "Stok diperbarui", name: "Gula Pasir 1kg", time: "2 jam lalu", amount: "+15 stok" },
  { id: 4, type: "pengeluaran", label: "Pengeluaran dicatat", name: "Listrik & Air", time: "5 jam lalu", amount: "Rp 850.000" },
  { id: 5, type: "produk", label: "Produk dihapus", name: "Snack Kadaluarsa", time: "Kemarin", amount: "-8 stok" },
];

/* ─── Home Scure (Control Center) ─── */
export default function HomeScurePage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="sah-page">
      <div className="sah-container">

        {/* ── Header ── */}
        <div className="sah-header">
          <div>
            <h1 className="sah-greeting">Ruang Kendali</h1>
            <p className="sah-date">{dateStr}</p>
          </div>
          <div className="sah-badge">Akses Diberikan</div>
        </div>

        {/* ── Stats ── */}
        <div className="sah-stats-grid">
          <div className="sah-stat-card gold">
            <div className="sah-stat-icon gold"><IconBox /></div>
            <div className="sah-stat-label">Total Produk</div>
            <div className="sah-stat-value">184</div>
            <span className="sah-stat-change up"><IconUp />+6 minggu ini</span>
          </div>
          <div className="sah-stat-card danger">
            <div className="sah-stat-icon danger"><IconAlert /></div>
            <div className="sah-stat-label">Stok Kritis</div>
            <div className="sah-stat-value">7</div>
            <span className="sah-stat-change danger">Perlu restok</span>
          </div>
          <div className="sah-stat-card orange">
            <div className="sah-stat-icon orange"><IconWallet /></div>
            <div className="sah-stat-label">Pengeluaran Bulan Ini</div>
            <div className="sah-stat-value">Rp 6,2jt</div>
            <span className="sah-stat-change up"><IconUp />+3.1%</span>
          </div>
          <div className="sah-stat-card cream">
            <div className="sah-stat-icon cream"><IconGem /></div>
            <div className="sah-stat-label">Nilai Inventaris</div>
            <div className="sah-stat-value">Rp 42,8jt</div>
            <span className="sah-stat-change neutral">Estimasi harga jual</span>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="sah-main-grid">

          {/* Quick Actions */}
          <div className="sah-card">
            <div className="sah-card-header">
              <div>
                <div className="sah-card-title">Aksi Cepat</div>
                <div className="sah-card-subtitle">Kelola produk & pengeluaran</div>
              </div>
            </div>
            <div className="sah-card-body">
              <div className="sah-actions-grid">
                <button className="sah-action-btn">
                  <div className="sah-action-icon"><IconPlus /></div>
                  <span className="sah-action-label">Tambah Produk</span>
                </button>
                <button className="sah-action-btn">
                  <div className="sah-action-icon"><IconReceipt /></div>
                  <span className="sah-action-label">Catat Pengeluaran</span>
                </button>
                <button className="sah-action-btn">
                  <div className="sah-action-icon"><IconStock /></div>
                  <span className="sah-action-label">Kelola Stok</span>
                </button>
                <button className="sah-action-btn">
                  <div className="sah-action-icon"><IconHistory /></div>
                  <span className="sah-action-label">Riwayat Pengeluaran</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="sah-card sah-activity-card">
            <div className="sah-card-header">
              <div>
                <div className="sah-card-title">Aktivitas Terbaru</div>
                <div className="sah-card-subtitle">Produk & pengeluaran</div>
              </div>
              <button className="sah-card-action">Lihat semua</button>
            </div>
            <div className="sah-card-body">
              <div className="sah-activity-list">
                {activity.map((item) => (
                  <div className="sah-activity-item" key={item.id}>
                    <div className={`sah-activity-icon ${item.type}`}>
                      {item.type === "produk" ? <IconBox /> : <IconWallet />}
                    </div>
                    <div className="sah-activity-info">
                      <div className="sah-activity-label">{item.label}</div>
                      <div className="sah-activity-name">{item.name}</div>
                    </div>
                    <div className="sah-activity-right">
                      <div className={`sah-activity-amount ${item.type}`}>{item.amount}</div>
                      <div className="sah-activity-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
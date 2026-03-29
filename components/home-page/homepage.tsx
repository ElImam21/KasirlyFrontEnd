"use client";

import "./home.css";

/* ─── Icons ─── */
const IconCashier = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 5V4C6 2.895 6.895 2 8 2H12C13.105 2 14 2.895 14 4V5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="9" width="2.5" height="2" rx="0.5" fill="currentColor"/>
    <rect x="8.75" y="9" width="2.5" height="2" rx="0.5" fill="currentColor"/>
    <rect x="12.5" y="9" width="2.5" height="2" rx="0.5" fill="currentColor"/>
    <rect x="5" y="12" width="2.5" height="1.5" rx="0.5" fill="currentColor"/>
    <rect x="8.75" y="12" width="2.5" height="1.5" rx="0.5" fill="currentColor"/>
  </svg>
);

const IconStock = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="8" y="8" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="4" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconProfit = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 10L10 7L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTx = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10H13M7 7H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14.5" r="0.8" fill="currentColor"/>
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L9.5 6H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 6H6.5L8 2Z"
      fill="currentColor"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconUp = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconDown = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ─── Data ─── */
const transactions = [
  { id: 1, name: "Indomie Goreng Spesial", time: "09:14", amount: "Rp 85.000", items: "5 item", emoji: "🍜", color: "#fff3e0" },
  { id: 2, name: "Aqua 600ml × 12", time: "09:02", amount: "Rp 72.000", items: "12 item", emoji: "💧", color: "#e3f2fd" },
  { id: 3, name: "Snack Chitato Sapi", time: "08:51", amount: "Rp 38.000", items: "2 item", emoji: "🥨", color: "#fce4ec" },
  { id: 4, name: "Teh Botol Sosro", time: "08:33", amount: "Rp 54.000", items: "6 item", emoji: "🍵", color: "#e8f5e9" },
  { id: 5, name: "Beng-Beng Share It", time: "08:17", amount: "Rp 29.000", items: "2 item", emoji: "🍫", color: "#ede7f6" },
];

const stockAlerts = [
  { name: "Mie Goreng Instan", qty: 4, max: 100, status: "critical" },
  { name: "Gula Pasir 1kg", qty: 12, max: 100, status: "low" },
  { name: "Sabun Cuci Piring", qty: 8, max: 50, status: "critical" },
  { name: "Minyak Goreng 2L", qty: 23, max: 80, status: "low" },
  { name: "Kecap Manis 600ml", qty: 31, max: 60, status: "ok" },
];

const topProducts = [
  { rank: 1, emoji: "🍜", name: "Indomie Goreng Spesial", sold: "234 terjual", revenue: "Rp 1.17jt" },
  { rank: 2, emoji: "💧", name: "Aqua 600ml", sold: "198 terjual", revenue: "Rp 990rb" },
  { rank: 3, emoji: "🍫", name: "Beng-Beng Share It", sold: "172 terjual", revenue: "Rp 860rb" },
  { rank: 4, emoji: "🍵", name: "Teh Botol Sosro", sold: "154 terjual", revenue: "Rp 770rb" },
  { rank: 5, emoji: "🥨", name: "Chitato Sapi 68gr", sold: "140 terjual", revenue: "Rp 700rb" },
];

const rankClass = (r: number) =>
  r === 1 ? "gold" : r === 2 ? "silver" : r === 3 ? "bronze" : "";

/* ─── Mini Chart (SVG) ─── */
function RevenueChart() {
  // 7 days of data (Mon–Sun)
  const data = [4.2, 5.8, 4.9, 7.3, 6.1, 8.4, 9.2];
  const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const W = 500; const H = 160;
  const pad = { t: 10, r: 10, b: 10, l: 10 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data);
  const min = 0;
  const pts = data.map((v, i) => ({
    x: pad.l + (i / (data.length - 1)) * innerW,
    y: pad.t + (1 - (v - min) / (max - min)) * innerH,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x},${H - pad.b} L${pts[0].x},${H - pad.b} Z`;

  return (
    <div className="home-chart-area">
      <svg className="home-chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#37B6FF" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#37B6FF" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#chartGrad)"/>
        <path d={pathD} fill="none" stroke="#37B6FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#37B6FF" strokeWidth="2"/>
        ))}
      </svg>
      <div className="home-chart-labels">
        {labels.map(l => <span className="home-chart-label" key={l}>{l}</span>)}
      </div>
    </div>
  );
}

/* ─── Home Page Component ─── */
export default function HomePage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="home-page">
      <div className="home-container">

        {/* ── Header ── */}
        <div className="home-header">
          <div className="home-header-left">
            <h1 className="home-greeting">
              Halo, <span>Admin</span> 👋
            </h1>
            <p className="home-date">{dateStr}</p>
          </div>
          <div className="home-header-badge">
            <IconStar />
            Plan Aktif: Pro
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="home-stats-grid">
          <div className="home-stat-card blue">
            <div className="home-stat-icon blue"><IconCashier /></div>
            <div className="home-stat-label">Penjualan Hari Ini</div>
            <div className="home-stat-value">Rp 3,47jt</div>
            <span className="home-stat-change up"><IconUp />+12.4%</span>
          </div>
          <div className="home-stat-card green">
            <div className="home-stat-icon green"><IconProfit /></div>
            <div className="home-stat-label">Laba Bersih</div>
            <div className="home-stat-value">Rp 891rb</div>
            <span className="home-stat-change up"><IconUp />+8.2%</span>
          </div>
          <div className="home-stat-card orange">
            <div className="home-stat-icon orange"><IconTx /></div>
            <div className="home-stat-label">Total Transaksi</div>
            <div className="home-stat-value">48</div>
            <span className="home-stat-change up"><IconUp />+5 dari kemarin</span>
          </div>
          <div className="home-stat-card purple">
            <div className="home-stat-icon purple"><IconAlert /></div>
            <div className="home-stat-label">Stok Kritis</div>
            <div className="home-stat-value">3 item</div>
            <span className="home-stat-change down"><IconDown />Perlu restok!</span>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="home-main-grid">

          {/* Left: Revenue Chart + Recent Tx */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Revenue Chart */}
            <div className="home-card">
              <div className="home-card-header">
                <div>
                  <div className="home-card-title">Grafik Pendapatan</div>
                  <div className="home-card-subtitle">7 hari terakhir</div>
                </div>
                <button className="home-card-action">Lihat semua</button>
              </div>
              <div className="home-card-body">
                <RevenueChart />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="home-card">
              <div className="home-card-header">
                <div>
                  <div className="home-card-title">Transaksi Terkini</div>
                  <div className="home-card-subtitle">Hari ini</div>
                </div>
                <button className="home-card-action">Lihat semua</button>
              </div>
              <div className="home-card-body">
                <div className="home-tx-list">
                  {transactions.map(tx => (
                    <div className="home-tx-item" key={tx.id}>
                      <div className="home-tx-left">
                        <div className="home-tx-dot" style={{ background: tx.color }}>
                          {tx.emoji}
                        </div>
                        <div className="home-tx-info">
                          <div className="home-tx-name">{tx.name}</div>
                          <div className="home-tx-time">{tx.time} WIB</div>
                        </div>
                      </div>
                      <div className="home-tx-right">
                        <div className="home-tx-amount">{tx.amount}</div>
                        <div className="home-tx-items">{tx.items}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Quick Actions */}
            <div className="home-card">
              <div className="home-card-header">
                <div>
                  <div className="home-card-title">Aksi Cepat</div>
                </div>
              </div>
              <div className="home-card-body">
                <div className="home-actions-grid">
                  <button className="home-action-btn">
                    <div className="home-action-icon blue"><IconCashier /></div>
                    <span className="home-action-label">Buka Kasir</span>
                  </button>
                  <button className="home-action-btn">
                    <div className="home-action-icon orange"><IconPlus /></div>
                    <span className="home-action-label">Tambah Produk</span>
                  </button>
                  <button className="home-action-btn">
                    <div className="home-action-icon green"><IconReport /></div>
                    <span className="home-action-label">Lihat Laporan</span>
                  </button>
                  <button className="home-action-btn">
                    <div className="home-action-icon purple"><IconStock /></div>
                    <span className="home-action-label">Kelola Stok</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Alert */}
            <div className="home-card">
              <div className="home-card-header">
                <div>
                  <div className="home-card-title">⚠️ Peringatan Stok</div>
                  <div className="home-card-subtitle">Segera restok</div>
                </div>
                <button className="home-card-action">Kelola</button>
              </div>
              <div className="home-card-body">
                <div className="home-stock-list">
                  {stockAlerts.map(item => {
                    const pct = Math.round((item.qty / item.max) * 100);
                    return (
                      <div className="home-stock-item" key={item.name}>
                        <span className="home-stock-name">{item.name}</span>
                        <div className="home-stock-bar-wrap">
                          <div
                            className={`home-stock-bar ${item.status}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`home-stock-qty ${item.status}`}>{item.qty}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Grid ── */}
        <div className="home-bottom-grid">

          {/* Top Products */}
          <div className="home-card">
            <div className="home-card-header">
              <div>
                <div className="home-card-title">🏆 Produk Terlaris</div>
                <div className="home-card-subtitle">Bulan ini</div>
              </div>
              <button className="home-card-action">Lihat semua</button>
            </div>
            <div className="home-card-body">
              <div className="home-product-list">
                {topProducts.map(p => (
                  <div className="home-product-item" key={p.rank}>
                    <span className={`home-product-rank ${rankClass(p.rank)}`}>
                      {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : `#${p.rank}`}
                    </span>
                    <span className="home-product-emoji">{p.emoji}</span>
                    <div className="home-product-info">
                      <div className="home-product-name">{p.name}</div>
                      <div className="home-product-sold">{p.sold}</div>
                    </div>
                    <div className="home-product-revenue">{p.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profit Summary */}
          <div className="home-card">
            <div className="home-card-header">
              <div>
                <div className="home-card-title">Ringkasan Laba</div>
                <div className="home-card-subtitle">Bulan ini</div>
              </div>
            </div>
            <div className="home-card-body">
              <div className="home-profit-wrap">
                <div className="home-profit-main">
                  <div className="home-profit-label">Total Laba Bersih</div>
                  <div className="home-profit-value">Rp 18,4jt</div>
                  <div className="home-profit-change">↑ +23.5% dari bulan lalu</div>
                </div>
                <div className="home-profit-rows">
                  <div className="home-profit-row">
                    <div className="home-profit-row-label">
                      <div className="home-profit-row-dot" style={{ background: "#37B6FF" }} />
                      Total Pendapatan
                    </div>
                    <div className="home-profit-row-val">Rp 67,2jt</div>
                  </div>
                  <div className="home-profit-row">
                    <div className="home-profit-row-label">
                      <div className="home-profit-row-dot" style={{ background: "#ef4444" }} />
                      Total HPP
                    </div>
                    <div className="home-profit-row-val">Rp 48,8jt</div>
                  </div>
                  <div className="home-profit-row">
                    <div className="home-profit-row-label">
                      <div className="home-profit-row-dot" style={{ background: "#10b981" }} />
                      Margin Rata-rata
                    </div>
                    <div className="home-profit-row-val">27.4%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subscription Banner ── */}
        <div className="home-sub-banner">
          <div className="home-sub-left">
            <div className="home-sub-tag"><IconStar />Pro Plan</div>
            <div className="home-sub-title">Upgrade ke Business Plan<br />untuk fitur tak terbatas</div>
            <div className="home-sub-desc">
              Dapatkan multi-kasir, laporan ekspor Excel/PDF, manajemen karyawan,
              dan dukungan prioritas 24/7.
            </div>
          </div>
          <div className="home-sub-right">
            <div className="home-sub-price">
              <div className="home-sub-price-val">Rp 99rb</div>
              <div className="home-sub-price-period">per bulan</div>
            </div>
            <button className="home-sub-btn">
              Upgrade Sekarang <IconArrow />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
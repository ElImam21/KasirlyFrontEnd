"use client";

import { useState } from "react";
import "./laporan.css";

/* ══════════════════════════════════════════════
   TYPES & DATA
══════════════════════════════════════════════ */
type Period = "hari" | "minggu" | "bulan" | "tahun";

const fmt  = (n: number) => "Rp " + n.toLocaleString("id-ID");
const fmtK = (n: number) => n >= 1_000_000
  ? `Rp ${(n / 1_000_000).toFixed(1)}jt`
  : n >= 1_000 ? `Rp ${(n / 1_000).toFixed(0)}rb` : fmt(n);

/* ── Bar chart data per period ── */
const CHART_DATA: Record<Period, { label: string; pendapatan: number; hpp: number }[]> = {
  hari: [
    { label: "08:00", pendapatan: 320000,  hpp: 210000  },
    { label: "09:00", pendapatan: 580000,  hpp: 380000  },
    { label: "10:00", pendapatan: 740000,  hpp: 490000  },
    { label: "11:00", pendapatan: 920000,  hpp: 600000  },
    { label: "12:00", pendapatan: 1150000, hpp: 760000  },
    { label: "13:00", pendapatan: 870000,  hpp: 570000  },
    { label: "14:00", pendapatan: 640000,  hpp: 420000  },
    { label: "15:00", pendapatan: 750000,  hpp: 490000  },
  ],
  minggu: [
    { label: "Sen",  pendapatan: 2100000, hpp: 1380000 },
    { label: "Sel",  pendapatan: 1850000, hpp: 1200000 },
    { label: "Rab",  pendapatan: 2400000, hpp: 1580000 },
    { label: "Kam",  pendapatan: 3100000, hpp: 2050000 },
    { label: "Jum",  pendapatan: 3470000, hpp: 2280000 },
    { label: "Sab",  pendapatan: 4200000, hpp: 2760000 },
    { label: "Min",  pendapatan: 3800000, hpp: 2500000 },
  ],
  bulan: [
    { label: "M1",  pendapatan: 15200000, hpp: 10000000 },
    { label: "M2",  pendapatan: 18400000, hpp: 12100000 },
    { label: "M3",  pendapatan: 21700000, hpp: 14300000 },
    { label: "M4",  pendapatan: 19800000, hpp: 13000000 },
  ],
  tahun: [
    { label: "Jan", pendapatan: 62000000, hpp: 40800000 },
    { label: "Feb", pendapatan: 58000000, hpp: 38100000 },
    { label: "Mar", pendapatan: 71000000, hpp: 46700000 },
    { label: "Apr", pendapatan: 67000000, hpp: 44100000 },
    { label: "Mei", pendapatan: 75000000, hpp: 49400000 },
    { label: "Jun", pendapatan: 80000000, hpp: 52600000 },
  ],
};

/* ── Stats per period ── */
const STATS: Record<Period, { pendapatan: number; laba: number; transaksi: number; avgTx: number; pChange: number; lChange: number; tChange: number }> = {
  hari:   { pendapatan: 3470000,   laba: 891000,    transaksi: 48,  avgTx: 72292,   pChange: 12.4,  lChange: 8.2,  tChange: 11.6 },
  minggu: { pendapatan: 20920000,  laba: 5380000,   transaksi: 287, avgTx: 72891,   pChange: 7.3,   lChange: 5.1,  tChange: 9.2  },
  bulan:  { pendapatan: 75100000,  laba: 18400000,  transaksi: 1042,avgTx: 72072,   pChange: 23.5,  lChange: 18.7, tChange: 21.0 },
  tahun:  { pendapatan: 413000000, laba: 102000000, transaksi: 5820,avgTx: 70962,   pChange: 34.2,  lChange: 28.4, tChange: 31.5 },
};

/* ── Category breakdown ── */
const CATEGORIES = [
  { name: "Minuman",   color: "#37B6FF", pct: 34, total: 25580000 },
  { name: "Makanan",   color: "#10b981", pct: 28, total: 21028000 },
  { name: "Snack",     color: "#f59e0b", pct: 21, total: 15771000 },
  { name: "Sembako",   color: "#8b5cf6", pct: 12, total: 9012000  },
  { name: "Perawatan", color: "#ef4444", pct: 5,  total: 3755000  },
];

/* ── Top products ── */
const TOP_PRODUCTS = [
  { emoji: "🍜", name: "Indomie Goreng Spesial", cat: "Makanan",   qty: 234, revenue: 819000,  profit: 210000  },
  { emoji: "💧", name: "Aqua 600ml",             cat: "Minuman",   qty: 198, revenue: 792000,  profit: 189000  },
  { emoji: "🍫", name: "Beng-Beng Share It",     cat: "Snack",     qty: 172, revenue: 1290000, profit: 344000  },
  { emoji: "🍵", name: "Teh Botol Sosro 350ml",  cat: "Minuman",   qty: 154, revenue: 770000,  profit: 193000  },
  { emoji: "🥨", name: "Chitato Sapi 68gr",      cat: "Snack",     qty: 140, revenue: 1820000, profit: 490000  },
];

/* ── Payment methods ── */
const PAYMENT_METHODS = [
  { icon: "💵", name: "Tunai",       count: 612, amount: 44600000, pct: 59 },
  { icon: "📱", name: "QRIS",        count: 298, amount: 21700000, pct: 29 },
  { icon: "💳", name: "Kartu Debit", count: 132, amount: 8800000,  pct: 12 },
];

/* ── Transactions ── */
const TRANSACTIONS = [
  { id: "TRX-0321-001", customer: "Pelanggan Umum",  time: "09:14", method: "💵 Tunai",  items: 5,  total: 85000,  profit: 22000,  status: "selesai" },
  { id: "TRX-0321-002", customer: "Budi Santoso",    time: "09:02", method: "📱 QRIS",   items: 12, total: 140000, profit: 35000,  status: "selesai" },
  { id: "TRX-0321-003", customer: "Pelanggan Umum",  time: "08:51", method: "💵 Tunai",  items: 2,  total: 38000,  profit: 9500,   status: "selesai" },
  { id: "TRX-0321-004", customer: "Siti Rahayu",     time: "08:33", method: "💳 Debit",  items: 6,  total: 97000,  profit: 24000,  status: "selesai" },
  { id: "TRX-0321-005", customer: "Pelanggan Umum",  time: "08:17", method: "📱 QRIS",   items: 3,  total: 54000,  profit: 13500,  status: "refund"  },
  { id: "TRX-0321-006", customer: "Ahmad Fauzi",     time: "08:05", method: "💵 Tunai",  items: 8,  total: 156000, profit: 39000,  status: "selesai" },
  { id: "TRX-0321-007", customer: "Dewi Lestari",    time: "07:58", method: "📱 QRIS",   items: 4,  total: 72000,  profit: 18000,  status: "selesai" },
  { id: "TRX-0321-008", customer: "Pelanggan Umum",  time: "07:42", method: "💵 Tunai",  items: 1,  total: 16000,  profit: 4000,   status: "selesai" },
];

const TX_PER_PAGE = 5;

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const IconRevenue = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 15L7.5 9L11 12L15 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7H15V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconProfit = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6.5V10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 8L10 5.5L12.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTx = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10H13M7 7H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconAvg = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconExport = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 11V13H13V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M8 2V10M5 7L8 10L11 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPrint = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 6V3H11V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M5 10H11M5 12H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="11.5" cy="8.5" r="0.75" fill="currentColor"/>
  </svg>
);

const IconChevLeft = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconChevRight = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconUp = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ══════════════════════════════════════════════
   BAR CHART COMPONENT
══════════════════════════════════════════════ */
function BarChart({ data }: { data: { label: string; pendapatan: number; hpp: number }[] }) {
  const [tooltip, setTooltip] = useState<{
    x: number; y: number;
    pendapatan: number; hpp: number; label: string;
  } | null>(null);

  const max       = Math.max(...data.map(d => d.pendapatan));
  /* Round max up to a nice number for Y labels */
  const niceMax   = Math.ceil(max / 500000) * 500000 || 1000000;

  const W      = 540; const H = 190;
  const yLabelW = 58;  /* space reserved for Y labels */
  const pad    = { t: 10, r: 8, b: 10, l: yLabelW };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const n      = data.length;
  const groupW = innerW / n;
  const barW   = Math.min(groupW * 0.32, 26);
  const gap    = barW * 0.5;

  const Y_FRACS = [0, 0.25, 0.5, 0.75, 1];

  const fmtY = (v: number) =>
    v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}jt`
    : v >= 1_000   ? `${(v / 1_000).toFixed(0)}rb`
    : `${v}`;

  return (
    <div className="laporan-chart-wrap" style={{ height: 240 }}>
      <svg
        className="laporan-chart-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#37B6FF" stopOpacity="1"/>
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.5"/>
          </linearGradient>
        </defs>

        {/* ── Y-axis grid lines + labels ── */}
        {Y_FRACS.map(frac => {
          const y     = pad.t + innerH * (1 - frac);
          const value = niceMax * frac;
          return (
            <g key={frac}>
              {/* grid line */}
              <line
                x1={pad.l} y1={y}
                x2={W - pad.r} y2={y}
                stroke={frac === 0 ? "#cdd8e3" : "#e8f0f7"}
                strokeWidth={frac === 0 ? 1.2 : 1}
              />
              {/* Y label */}
              <text
                x={pad.l - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fontFamily="'Sora', sans-serif"
                fontWeight="600"
                fill="#7a8fa6"
              >
                {fmtY(value)}
              </text>
            </g>
          );
        })}

        {/* ── Bars ── */}
        {data.map((d, i) => {
          const cx    = pad.l + (i + 0.5) * groupW;
          const hP    = (d.pendapatan / niceMax) * innerH;
          const hH    = (d.hpp / niceMax) * innerH;
          const yBase = pad.t + innerH;
          const xHpp  = cx - gap / 2 - barW;
          const xPend = cx + gap / 2;

          const handleHover = (e: React.MouseEvent<SVGRectElement>) => {
            const svg  = e.currentTarget.closest("svg")!;
            const rect = svg.getBoundingClientRect();
            const scaleX = W / rect.width;
            const scaleY = H / rect.height;
            /* tooltip position in SVG coords */
            const tx = (e.clientX - rect.left) * scaleX;
            const ty = Math.min(yBase - hP - 4, (e.clientY - rect.top) * scaleY - 10);
            setTooltip({ x: tx, y: ty, pendapatan: d.pendapatan, hpp: d.hpp, label: d.label });
          };

          return (
            <g key={i}>
              {/* HPP bar */}
              <rect
                x={xHpp} y={yBase - hH}
                width={barW} height={hH}
                rx={3} fill="url(#barGrad2)"
                style={{ cursor: "pointer" }}
                onMouseEnter={handleHover}
                onMouseMove={handleHover}
              />
              {/* Pendapatan bar */}
              <rect
                x={xPend} y={yBase - hP}
                width={barW} height={hP}
                rx={3} fill="url(#barGrad1)"
                style={{ cursor: "pointer" }}
                onMouseEnter={handleHover}
                onMouseMove={handleHover}
              />
              {/* Invisible wider hit-area for the whole group */}
              <rect
                x={cx - groupW * 0.45} y={pad.t}
                width={groupW * 0.9} height={innerH}
                fill="transparent"
                onMouseEnter={handleHover}
                onMouseMove={handleHover}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          );
        })}

        {/* ── Tooltip ── */}
        {tooltip && (() => {
          const TW = 148; const TH = 64; const TR = 6;
          /* clamp so tooltip doesn't go off-chart */
          const tx = Math.min(Math.max(tooltip.x - TW / 2, pad.l), W - pad.r - TW);
          const ty = Math.max(tooltip.y - TH - 8, pad.t);
          const laba = tooltip.pendapatan - tooltip.hpp;

          return (
            <g style={{ pointerEvents: "none" }}>
              {/* shadow */}
              <rect x={tx+2} y={ty+2} width={TW} height={TH} rx={TR} fill="rgba(0,0,0,0.08)"/>
              {/* box */}
              <rect x={tx} y={ty} width={TW} height={TH} rx={TR} fill="white"
                stroke="rgba(55,182,255,0.25)" strokeWidth="1"/>
              {/* label */}
              <text x={tx+10} y={ty+16} fontSize="10" fontFamily="'Sora',sans-serif"
                fontWeight="700" fill="#7a8fa6">
                {tooltip.label}
              </text>
              {/* pendapatan row */}
              <rect x={tx+10} y={ty+24} width={8} height={8} rx="2" fill="#37B6FF"/>
              <text x={tx+22} y={ty+32} fontSize="10" fontFamily="'Plus Jakarta Sans',sans-serif"
                fontWeight="700" fill="#3a4a5c">
                {`Rp ${tooltip.pendapatan.toLocaleString("id-ID")}`}
              </text>
              {/* hpp row */}
              <rect x={tx+10} y={ty+38} width={8} height={8} rx="2" fill="#10b981"/>
              <text x={tx+22} y={ty+46} fontSize="10" fontFamily="'Plus Jakarta Sans',sans-serif"
                fontWeight="600" fill="#7a8fa6">
                {`HPP Rp ${tooltip.hpp.toLocaleString("id-ID")}`}
              </text>
              {/* laba row */}
              <text x={tx+10} y={ty+60} fontSize="9.5" fontFamily="'Plus Jakarta Sans',sans-serif"
                fontWeight="700" fill="#10b981">
                {`Laba Rp ${laba.toLocaleString("id-ID")}`}
              </text>
            </g>
          );
        })()}
      </svg>

      {/* X-axis labels */}
      <div className="laporan-chart-labels" style={{ paddingLeft: yLabelW }}>
        {data.map(d => (
          <span className="laporan-chart-label" key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function LaporanPage() {
  const [period, setPeriod]   = useState<Period>("minggu");
  const [txPage, setTxPage]   = useState(1);

  const stats    = STATS[period];
  const chartData = CHART_DATA[period];

  const totalTxPages = Math.ceil(TRANSACTIONS.length / TX_PER_PAGE);
  const txItems = TRANSACTIONS.slice((txPage - 1) * TX_PER_PAGE, txPage * TX_PER_PAGE);

  const PERIOD_LABELS: Record<Period, string> = {
    hari: "Hari Ini", minggu: "Minggu Ini", bulan: "Bulan Ini", tahun: "Tahun Ini",
  };

  return (
    <div className="laporan-page">
      <div className="laporan-container">

        {/* ── Header ── */}
        <div className="laporan-header">
          <div className="laporan-header-left">
            <h1 className="laporan-title">Laporan Keuangan 📊</h1>
            <p className="laporan-subtitle">Ringkasan performa penjualan dan laba toko Anda</p>
          </div>
          <div className="laporan-header-right">
            <div className="laporan-period-tabs">
              {(["hari","minggu","bulan","tahun"] as Period[]).map(p => (
                <button
                  key={p}
                  className={`laporan-period-tab ${period === p ? "active" : ""}`}
                  onClick={() => { setPeriod(p); setTxPage(1); }}
                >
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
            <button className="laporan-export-btn">
              <IconPrint />
              Cetak
            </button>
            <button className="laporan-export-btn primary">
              <IconExport />
              Export PDF
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="laporan-stats-grid">
          <div className="laporan-stat-card blue">
            <div className="laporan-stat-icon blue"><IconRevenue /></div>
            <div className="laporan-stat-label">Total Pendapatan</div>
            <div className="laporan-stat-value">{fmtK(stats.pendapatan)}</div>
            <span className="laporan-stat-change up"><IconUp />+{stats.pChange}%</span>
          </div>
          <div className="laporan-stat-card green">
            <div className="laporan-stat-icon green"><IconProfit /></div>
            <div className="laporan-stat-label">Total Laba Bersih</div>
            <div className="laporan-stat-value">{fmtK(stats.laba)}</div>
            <span className="laporan-stat-change up"><IconUp />+{stats.lChange}%</span>
          </div>
          <div className="laporan-stat-card orange">
            <div className="laporan-stat-icon orange"><IconTx /></div>
            <div className="laporan-stat-label">Jumlah Transaksi</div>
            <div className="laporan-stat-value">{stats.transaksi.toLocaleString("id-ID")}</div>
            <span className="laporan-stat-change up"><IconUp />+{stats.tChange}%</span>
          </div>
          <div className="laporan-stat-card purple">
            <div className="laporan-stat-icon purple"><IconAvg /></div>
            <div className="laporan-stat-label">Rata-rata Transaksi</div>
            <div className="laporan-stat-value">{fmtK(stats.avgTx)}</div>
            <span className="laporan-stat-change up"><IconUp />Stabil</span>
          </div>
        </div>

        {/* ── Main Grid: Chart + Category ── */}
        <div className="laporan-main-grid">

          {/* Bar Chart */}
          <div className="laporan-card">
            <div className="laporan-card-header">
              <div>
                <div className="laporan-card-title">Pendapatan vs HPP</div>
                <div className="laporan-card-subtitle">{PERIOD_LABELS[period]}</div>
              </div>
              <div className="laporan-legend">
                <div className="laporan-legend-item">
                  <div className="laporan-legend-dot" style={{ background: "#37B6FF" }} />
                  Pendapatan
                </div>
                <div className="laporan-legend-item">
                  <div className="laporan-legend-dot" style={{ background: "#10b981" }} />
                  HPP
                </div>
              </div>
            </div>
            <div className="laporan-card-body">
              <BarChart data={chartData} />
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="laporan-card">
            <div className="laporan-card-header">
              <div>
                <div className="laporan-card-title">Per Kategori</div>
                <div className="laporan-card-subtitle">Kontribusi pendapatan</div>
              </div>
            </div>
            <div className="laporan-card-body">
              <div className="laporan-category-list">
                {CATEGORIES.map(cat => (
                  <div className="laporan-category-item" key={cat.name}>
                    <div className="laporan-category-dot" style={{ background: cat.color }} />
                    <div className="laporan-category-info">
                      <div className="laporan-category-name">{cat.name}</div>
                      <div className="laporan-category-bar-wrap">
                        <div
                          className="laporan-category-bar"
                          style={{ width: `${cat.pct}%`, background: cat.color }}
                        />
                      </div>
                    </div>
                    <div className="laporan-category-right">
                      <div className="laporan-category-val">{fmtK(cat.total)}</div>
                      <div className="laporan-category-pct">{cat.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Grid: Top Products + Payment Methods ── */}
        <div className="laporan-bottom-grid">

          {/* Top Products */}
          <div className="laporan-card">
            <div className="laporan-card-header">
              <div>
                <div className="laporan-card-title">🏆 Produk Terlaris</div>
                <div className="laporan-card-subtitle">{PERIOD_LABELS[period]}</div>
              </div>
            </div>
            <div className="laporan-card-body">
              <table className="laporan-products-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th style={{ textAlign: "center" }}>Terjual</th>
                    <th style={{ textAlign: "right" }}>Pendapatan</th>
                    <th style={{ textAlign: "right" }}>Laba</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_PRODUCTS.map(p => (
                    <tr key={p.name}>
                      <td>
                        <div className="laporan-product-row-name">
                          <div className="laporan-product-emoji">{p.emoji}</div>
                          <div>
                            <div className="laporan-product-name-text">{p.name}</div>
                            <div className="laporan-product-cat">{p.cat}</div>
                          </div>
                        </div>
                      </td>
                      <td className="laporan-td-center">{p.qty}</td>
                      <td className="laporan-td-right">{fmtK(p.revenue)}</td>
                      <td className="laporan-td-right green">{fmtK(p.profit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="laporan-card">
            <div className="laporan-card-header">
              <div>
                <div className="laporan-card-title">Metode Pembayaran</div>
                <div className="laporan-card-subtitle">Distribusi {PERIOD_LABELS[period].toLowerCase()}</div>
              </div>
            </div>
            <div className="laporan-card-body">
              <div className="laporan-payment-list">
                {PAYMENT_METHODS.map(pm => (
                  <div className="laporan-payment-item" key={pm.name}>
                    <div className="laporan-payment-icon">{pm.icon}</div>
                    <div className="laporan-payment-info">
                      <div className="laporan-payment-name">{pm.name}</div>
                      <div className="laporan-payment-count">{pm.count} transaksi</div>
                      <div className="laporan-payment-bar-wrap">
                        <div className="laporan-payment-bar" style={{ width: `${pm.pct}%` }} />
                      </div>
                    </div>
                    <div className="laporan-payment-amount">{fmtK(pm.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Transaction Table ── */}
        <div className="laporan-card">
          <div className="laporan-card-header">
            <div>
              <div className="laporan-card-title">Riwayat Transaksi</div>
              <div className="laporan-card-subtitle">{TRANSACTIONS.length} transaksi · {PERIOD_LABELS[period].toLowerCase()}</div>
            </div>
            <button className="laporan-export-btn">
              <IconExport />
              Export Excel
            </button>
          </div>
          <div className="laporan-card-body" style={{ padding: "16px 0 0" }}>
            <div className="laporan-tx-table-wrap" style={{ padding: "0 22px" }}>
              <table className="laporan-tx-table">
                <thead>
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Pelanggan</th>
                    <th>Waktu</th>
                    <th>Metode</th>
                    <th>Item</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                    <th style={{ textAlign: "right" }}>Laba</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {txItems.map(tx => (
                    <tr key={tx.id}>
                      <td><span className="laporan-tx-id">{tx.id}</span></td>
                      <td>
                        <div className="laporan-tx-customer">{tx.customer}</div>
                      </td>
                      <td>
                        <div className="laporan-tx-time">{tx.time} WIB</div>
                      </td>
                      <td><span className="laporan-tx-method">{tx.method}</span></td>
                      <td className="laporan-td-center">{tx.items} item</td>
                      <td><div className="laporan-tx-total" style={{ textAlign: "right" }}>{fmt(tx.total)}</div></td>
                      <td><div className="laporan-tx-profit" style={{ textAlign: "right" }}>{fmt(tx.profit)}</div></td>
                      <td>
                        <span className={`laporan-tx-status ${tx.status}`}>
                          {tx.status === "selesai" ? "✓ Selesai" : "↩ Refund"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="laporan-table-footer">
            <span className="laporan-table-info">
              Menampilkan {(txPage - 1) * TX_PER_PAGE + 1}–{Math.min(txPage * TX_PER_PAGE, TRANSACTIONS.length)} dari {TRANSACTIONS.length} transaksi
            </span>
            <div className="laporan-pagination">
              <button
                className="laporan-page-btn"
                onClick={() => setTxPage(p => Math.max(1, p - 1))}
                disabled={txPage === 1}
              >
                <IconChevLeft />
              </button>
              {Array.from({ length: totalTxPages }, (_, i) => i + 1).map(pg => (
                <button
                  key={pg}
                  className={`laporan-page-btn ${pg === txPage ? "active" : ""}`}
                  onClick={() => setTxPage(pg)}
                >
                  {pg}
                </button>
              ))}
              <button
                className="laporan-page-btn"
                onClick={() => setTxPage(p => Math.min(totalTxPages, p + 1))}
                disabled={txPage === totalTxPages}
              >
                <IconChevRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
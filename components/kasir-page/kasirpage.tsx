"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ConfirmModal, SuccessModal } from "./kasirmodals";
import "./kasir.css";

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface Product {
  id: number;
  name: string;
  emoji: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem extends Product {
  qty: number;
}

export type PaymentMethod = "tunai" | "qris" | "debit";
type ModalState = "none" | "confirm" | "success";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const PRODUCTS: Product[] = [
  { id: 1,  name: "Indomie Goreng Spesial",   emoji: "🍜", price: 3500,   stock: 84,  category: "Makanan" },
  { id: 2,  name: "Indomie Kuah Ayam",        emoji: "🍜", price: 3500,   stock: 60,  category: "Makanan" },
  { id: 3,  name: "Aqua 600ml",               emoji: "💧", price: 4000,   stock: 120, category: "Minuman" },
  { id: 4,  name: "Aqua 1500ml",              emoji: "💧", price: 7000,   stock: 48,  category: "Minuman" },
  { id: 5,  name: "Teh Botol Sosro 350ml",    emoji: "🍵", price: 5000,   stock: 72,  category: "Minuman" },
  { id: 6,  name: "Coca Cola 330ml",          emoji: "🥤", price: 8000,   stock: 36,  category: "Minuman" },
  { id: 7,  name: "Beng-Beng Share It",       emoji: "🍫", price: 7500,   stock: 55,  category: "Snack" },
  { id: 8,  name: "Chitato Sapi 68gr",        emoji: "🥨", price: 13000,  stock: 40,  category: "Snack" },
  { id: 9,  name: "Roti Tawar Sari Roti",     emoji: "🍞", price: 18000,  stock: 20,  category: "Makanan" },
  { id: 10, name: "Susu Ultra Mimi 200ml",    emoji: "🥛", price: 5500,   stock: 90,  category: "Minuman" },
  { id: 11, name: "Sabun Lifebuoy 80gr",      emoji: "🧼", price: 6500,   stock: 33,  category: "Perawatan" },
  { id: 12, name: "Shampoo Pantene Sachet",   emoji: "🧴", price: 1500,   stock: 100, category: "Perawatan" },
  { id: 13, name: "Gula Pasir 1kg",           emoji: "🍬", price: 16000,  stock: 8,   category: "Sembako" },
  { id: 14, name: "Minyak Goreng Bimoli 1L",  emoji: "🫙", price: 23000,  stock: 15,  category: "Sembako" },
  { id: 15, name: "Telur Ayam 1kg",           emoji: "🥚", price: 28000,  stock: 25,  category: "Sembako" },
  { id: 16, name: "Kecap Manis ABC 135ml",    emoji: "🍶", price: 9500,   stock: 3,   category: "Sembako" },
  { id: 17, name: "Oreo Biskuit Original",    emoji: "🍪", price: 8500,   stock: 65,  category: "Snack" },
  { id: 18, name: "Pop Ice Coklat",           emoji: "🧊", price: 2000,   stock: 200, category: "Minuman" },
];

const CATEGORIES = ["Semua", "Makanan", "Minuman", "Snack", "Sembako", "Perawatan"];
const QUICK_CASH = [5000, 10000, 20000, 50000, 100000];
const ROWS = 2;

/* ══════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════ */
const fmt = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

const stockClass = (s: number) =>
  s === 0 ? "out-of-stock" : s <= 5 ? "critical" : s <= 20 ? "low" : "";

const stockLabel = (s: number) =>
  s === 0 ? "Habis" : s <= 5 ? `Sisa ${s}` : s <= 20 ? `Stok ${s}` : `Stok ${s}`;

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const IconSearch = () => (
  <svg className="kasir-search-icon" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconCart = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 1H3L4.5 9.5H12.5L14 4H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="12.5" r="1" fill="currentColor"/>
    <circle cx="11.5" cy="12.5" r="1" fill="currentColor"/>
  </svg>
);

const IconPay = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4" y="11" width="4" height="2" rx="0.5" fill="currentColor"/>
  </svg>
);

const IconTrash = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M2 3.5H12M5 3.5V2.5C5 2.224 5.224 2 5.5 2H8.5C8.776 2 9 2.224 9 2.5V3.5M5.5 6V10.5M8.5 6V10.5M3 3.5L3.5 11C3.5 11.276 3.724 11.5 4 11.5H10C10.276 11.5 10.5 11.276 10.5 11L11 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const IconChevLeft = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconChevRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTx = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 8H11M5 5.5H11M5 10.5H8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconRevenue = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M2 12L5.5 8L8.5 10L13 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 5H13V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

/* ══════════════════════════════════════════════
   CLOCK Component
══════════════════════════════════════════════ */
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div>
      <div className="kasir-clock">{timeStr}</div>
      <div className="kasir-date">{dateStr}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function KasirPage() {
  const [cart, setCart]               = useState<CartItem[]>([]);
  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("Semua");
  const [discount, setDiscount]       = useState<number>(0);
  const [payMethod, setPayMethod]     = useState<PaymentMethod>("tunai");
  const [cashInput, setCashInput]     = useState<string>("");
  const [customer, setCustomer]       = useState("");
  const [modal, setModal]             = useState<ModalState>("none");
  const [txCount, setTxCount]         = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cols, setCols]               = useState(6); // safe SSR default, corrected on client
  const gridRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId]     = useState(""); // empty on SSR, set on client

  /* ── Client-only init (sessionId + initial cols) ── */
  useEffect(() => {
    const d = new Date();
    setSessionId(
      `KSR-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${String(Math.floor(Math.random()*9000)+1000)}`
    );
    if (gridRef.current) {
      const w = gridRef.current.offsetWidth;
      setCols(Math.max(1, Math.floor((w + 12) / (148 + 12))));
    } else {
      const gridW = window.innerWidth - 380 - 48;
      setCols(Math.max(1, Math.floor((gridW + 12) / (148 + 12))));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Measure grid columns via ResizeObserver ── */
  useEffect(() => {
    if (!gridRef.current) return;
    const measure = () => {
      if (!gridRef.current) return;
      const w = gridRef.current.offsetWidth;
      const minCol = 148 + 12; // minmax(148px, 1fr) + gap
      const computed = Math.max(1, Math.floor((w + 12) / minCol));
      setCols(computed);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Pagination ── */
  const pageSize   = cols * ROWS;

  /* ── Derived ── */
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * (discount / 100));
  const total      = subtotal - discountAmt;
  const cashAmt    = parseInt(cashInput.replace(/\D/g, "") || "0");
  const change     = cashAmt - total;
  const canPay     = cart.length > 0 && (payMethod !== "tunai" || cashAmt >= total);

  /* ── Filtered products ── */
  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  /* Reset to page 1 when filter/search changes */
  useEffect(() => {
    const reset = () => setCurrentPage(1);
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const safePage    = Math.min(currentPage, Math.max(1, Math.ceil(filtered.length / pageSize)));
  const pageItems   = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const totalPagesCalc = Math.max(1, Math.ceil(filtered.length / pageSize));

  /* ── Cart helpers ── */
  const addToCart = useCallback((product: Product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }, []);

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setCashInput("");
    setCustomer("");
    setPayMethod("tunai");
  };

  const cartQty = (id: number) => cart.find(i => i.id === id)?.qty ?? 0;

  /* ── Cash input formatter ── */
  const handleCashInput = (val: string) => {
    const num = val.replace(/\D/g, "");
    setCashInput(num ? parseInt(num).toLocaleString("id-ID") : "");
  };

  /* ── Confirm transaction ── */
  const handleConfirm = () => {
    setTxCount(c => c + 1);
    setTodayRevenue(r => r + total);
    setModal("success");
  };

  /* ── New transaction ── */
  const handleNewTx = () => {
    clearCart();
    setModal("none");
  };

  return (
    <div className="kasir-page">

      {/* ── Top Bar ── */}
      <div className="kasir-topbar">
        <div className="kasir-topbar-left">
          <div className="kasir-session-info">
            <span className="kasir-session-label">Sesi Kasir</span>
            <span className="kasir-session-id">{sessionId}</span>
          </div>
          <div className="kasir-topbar-divider" />
          <LiveClock />
        </div>

        <div className="kasir-topbar-right">
          <div className="kasir-topbar-stat">
            <div className="kasir-topbar-stat-icon blue"><IconTx /></div>
            <div className="kasir-topbar-stat-info">
              <div className="kasir-topbar-stat-val">{txCount}</div>
              <div className="kasir-topbar-stat-lbl">Transaksi</div>
            </div>
          </div>
          <div className="kasir-topbar-stat">
            <div className="kasir-topbar-stat-icon green"><IconRevenue /></div>
            <div className="kasir-topbar-stat-info">
              <div className="kasir-topbar-stat-val">{fmt(todayRevenue)}</div>
              <div className="kasir-topbar-stat-lbl">Pendapatan</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="kasir-main">

        {/* ═══ LEFT: Products ═══ */}
        <div className="kasir-products-panel">

          {/* Search */}
          <div className="kasir-search-bar">
            <div className="kasir-search-wrap">
              <IconSearch />
              <input
                className="kasir-search-input"
                placeholder="Cari produk..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="kasir-categories">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`kasir-cat-pill ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="kasir-products-grid" ref={gridRef}>
            {pageItems.length === 0 ? (
              <div className="kasir-empty">
                <div className="kasir-empty-icon">🔍</div>
                <div className="kasir-empty-text">Produk tidak ditemukan</div>
              </div>
            ) : (
              pageItems.map(p => {
                const inCart = cartQty(p.id);
                const sClass = stockClass(p.stock);
                return (
                  <div
                    key={p.id}
                    className={`kasir-product-card ${p.stock === 0 ? "out-of-stock" : ""} ${inCart > 0 ? "in-cart" : ""}`}
                    onClick={() => addToCart(p)}
                  >
                    {inCart > 0 && (
                      <div className="kasir-product-badge">{inCart}</div>
                    )}
                    {/* Top 50% — image/icon area */}
                    <div className="kasir-product-img-area">
                      <span className="kasir-product-emoji">{p.emoji}</span>
                    </div>
                    {/* Bottom 50% — info area */}
                    <div className="kasir-product-info-area">
                      <div className="kasir-product-name">{p.name}</div>
                      <div className="kasir-product-price">{fmt(p.price)}</div>
                      <div className={`kasir-product-stock ${sClass}`}>{stockLabel(p.stock)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPagesCalc > 1 && (
            <div className="kasir-pagination">
              <span className="kasir-pagination-info">
                Halaman {safePage} dari {totalPagesCalc} · {filtered.length} produk
              </span>
              <div className="kasir-pagination-controls">
                <button
                  className="kasir-page-arrow"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  <IconChevLeft />
                </button>
                {Array.from({ length: totalPagesCalc }, (_, i) => i + 1).map(pg => (
                  <button
                    key={pg}
                    className={`kasir-page-btn ${pg === safePage ? "active" : ""}`}
                    onClick={() => setCurrentPage(pg)}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  className="kasir-page-arrow"
                  onClick={() => setCurrentPage(p => Math.min(totalPagesCalc, p + 1))}
                  disabled={safePage === totalPagesCalc}
                >
                  <IconChevRight />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT: Cart ═══ */}
        <div className="kasir-cart-panel">

          {/* Header */}
          <div className="kasir-cart-header">
            <div className="kasir-cart-title">
              <IconCart />
              Keranjang
              {cart.length > 0 && (
                <span className="kasir-cart-count">{cart.reduce((s,i)=>s+i.qty,0)}</span>
              )}
            </div>
            <div className="kasir-cart-subtitle">
              {cart.length === 0 ? "Pilih produk untuk memulai" : `${cart.length} jenis produk`}
            </div>
          </div>

          {/* Customer */}
          <div className="kasir-customer-field">
            <div className="kasir-customer-label">Nama Pelanggan (opsional)</div>
            <input
              className="kasir-customer-input"
              placeholder="Pelanggan umum"
              value={customer}
              onChange={e => setCustomer(e.target.value)}
            />
          </div>

          {/* Items */}
          <div className="kasir-cart-items">
            {cart.length === 0 ? (
              <div className="kasir-cart-empty">
                <div className="kasir-cart-empty-icon">🛒</div>
                <div className="kasir-cart-empty-text">Keranjang kosong</div>
                <div className="kasir-cart-empty-sub">Tap produk untuk menambahkan</div>
              </div>
            ) : (
              cart.map(item => (
                <div className="kasir-cart-item" key={item.id}>
                  <div className="kasir-cart-item-emoji">{item.emoji}</div>
                  <div className="kasir-cart-item-info">
                    <div className="kasir-cart-item-name">{item.name}</div>
                    <div className="kasir-cart-item-price">{fmt(item.price)} / pcs</div>
                  </div>
                  <div className="kasir-cart-item-right">
                    <div className="kasir-cart-item-subtotal">{fmt(item.price * item.qty)}</div>
                    <div className="kasir-qty">
                      <button
                        className={`kasir-qty-btn ${item.qty === 1 ? "remove" : ""}`}
                        onClick={e => { e.stopPropagation(); updateQty(item.id, -1); }}
                        title={item.qty === 1 ? "Hapus" : "Kurang"}
                      >
                        {item.qty === 1 ? <IconTrash /> : "−"}
                      </button>
                      <div className="kasir-qty-val">{item.qty}</div>
                      <button
                        className="kasir-qty-btn"
                        onClick={e => { e.stopPropagation(); updateQty(item.id, 1); }}
                        disabled={item.qty >= item.stock}
                        title="Tambah"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="kasir-cart-footer">
            <div className="kasir-summary">
              <div className="kasir-summary-row">
                <span className="kasir-summary-label">Subtotal</span>
                <span className="kasir-summary-val">{fmt(subtotal)}</span>
              </div>

              {/* Discount */}
              <div className="kasir-summary-row">
                <span className="kasir-summary-label">Diskon</span>
                <div className="kasir-discount-row">
                  <input
                    className="kasir-discount-input"
                    type="number"
                    min={0}
                    max={100}
                    value={discount || ""}
                    placeholder="0"
                    onChange={e => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                  />
                  <span className="kasir-discount-unit">%</span>
                  {discountAmt > 0 && (
                    <span className="kasir-summary-val red">−{fmt(discountAmt)}</span>
                  )}
                </div>
              </div>

              <div className="kasir-summary-divider" />

              <div className="kasir-total-row">
                <span className="kasir-total-label">Total</span>
                <span className="kasir-total-val">{fmt(total)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="kasir-payment-methods">
              <div className="kasir-payment-label">Metode Pembayaran</div>
              <div className="kasir-payment-options">
                {([ ["tunai","💵","Tunai"], ["qris","📱","QRIS"], ["debit","💳","Debit"] ] as [PaymentMethod, string, string][]).map(([key, icon, label]) => (
                  <button
                    key={key}
                    className={`kasir-payment-opt ${payMethod === key ? "active" : ""}`}
                    onClick={() => setPayMethod(key)}
                  >
                    <span className="kasir-payment-opt-icon">{icon}</span>
                    <span className="kasir-payment-opt-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cash input — only for tunai */}
            {payMethod === "tunai" && (
              <div className="kasir-cash-input-wrap">
                <div className="kasir-cash-label">Uang Diterima</div>
                <div className="kasir-cash-input-inner">
                  <span className="kasir-cash-prefix">Rp</span>
                  <input
                    className="kasir-cash-input"
                    placeholder="0"
                    value={cashInput}
                    onChange={e => handleCashInput(e.target.value)}
                  />
                </div>
                <div className="kasir-quick-cash">
                  {QUICK_CASH.map(v => (
                    <button
                      key={v}
                      className="kasir-quick-btn"
                      onClick={() => setCashInput(v.toLocaleString("id-ID"))}
                    >
                      {fmt(v)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="kasir-actions">
              <button
                className="kasir-btn-pay"
                disabled={!canPay}
                onClick={() => setModal("confirm")}
              >
                <IconPay />
                Proses Pembayaran
              </button>
              <button
                className="kasir-btn-clear"
                disabled={cart.length === 0}
                onClick={clearCart}
              >
                Batal &amp; Kosongkan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Confirm Modal ── */}
      {modal === "confirm" && (
        <ConfirmModal
          customer={customer}
          cartTotal={cart.reduce((s,i) => s+i.qty, 0)}
          subtotal={subtotal}
          discount={discount}
          discountAmt={discountAmt}
          total={total}
          payMethod={payMethod}
          cashAmt={cashAmt}
          change={change}
          onClose={() => setModal("none")}
          onConfirm={handleConfirm}
        />
      )}

      {/* ── Success Modal ── */}
      {modal === "success" && (
        <SuccessModal
          customer={customer}
          total={total}
          payMethod={payMethod}
          change={change}
          onNewTx={handleNewTx}
        />
      )}

    </div>
  );
}
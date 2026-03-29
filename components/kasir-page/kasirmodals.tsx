import { PaymentMethod } from "./kasirpage";

/* ─── Shared util ─── */
const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

/* ─── Icons ─── */
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ══════════════════════════════════════════════
   PROPS
══════════════════════════════════════════════ */
interface ConfirmModalProps {
  customer:     string;
  cartTotal:    number;   // total qty
  subtotal:     number;
  discount:     number;
  discountAmt:  number;
  total:        number;
  payMethod:    PaymentMethod;
  cashAmt:      number;
  change:       number;
  onClose:      () => void;
  onConfirm:    () => void;
}

interface SuccessModalProps {
  customer:   string;
  total:      number;
  payMethod:  PaymentMethod;
  change:     number;
  onNewTx:    () => void;
}

/* ══════════════════════════════════════════════
   CONFIRM MODAL
══════════════════════════════════════════════ */
export function ConfirmModal({
  customer, cartTotal, subtotal, discount, discountAmt,
  total, payMethod, cashAmt, change, onClose, onConfirm,
}: ConfirmModalProps) {
  return (
    <div
      className="kasir-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="kasir-modal">
        {/* Header */}
        <div className="kasir-modal-header">
          <div>
            <div className="kasir-modal-title">Konfirmasi Pembayaran</div>
            <div className="kasir-modal-subtitle">
              {customer ? `Pelanggan: ${customer}` : "Pelanggan umum"} · {cartTotal} item
            </div>
          </div>
          <button className="kasir-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="kasir-modal-body">
          <div className="kasir-modal-summary">
            <div className="kasir-modal-row">
              <span className="kasir-modal-row-label">Subtotal</span>
              <span className="kasir-modal-row-val">{fmt(subtotal)}</span>
            </div>
            {discountAmt > 0 && (
              <div className="kasir-modal-row">
                <span className="kasir-modal-row-label">Diskon ({discount}%)</span>
                <span className="kasir-modal-row-val" style={{ color: "#ef4444" }}>
                  −{fmt(discountAmt)}
                </span>
              </div>
            )}
            <div className="kasir-modal-divider" />
            <div className="kasir-modal-total-row">
              <span className="kasir-modal-total-label">Total</span>
              <span className="kasir-modal-total-val">{fmt(total)}</span>
            </div>
          </div>

          <div className="kasir-modal-row">
            <span className="kasir-modal-row-label">Metode</span>
            <span className="kasir-modal-row-val">
              {payMethod === "tunai" ? "💵 Tunai" : payMethod === "qris" ? "📱 QRIS" : "💳 Kartu Debit"}
            </span>
          </div>

          {payMethod === "tunai" && (
            <>
              <div className="kasir-modal-row">
                <span className="kasir-modal-row-label">Uang Diterima</span>
                <span className="kasir-modal-row-val">{fmt(cashAmt)}</span>
              </div>
              <div className={`kasir-change-box ${change < 0 ? "insufficient" : ""}`}>
                <span className="kasir-change-label">
                  {change >= 0 ? "💵 Kembalian" : "⚠️ Uang Kurang"}
                </span>
                <span className="kasir-change-val">
                  {change >= 0 ? fmt(change) : `−${fmt(Math.abs(change))}`}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="kasir-modal-footer">
          <button className="kasir-modal-btn-cancel" onClick={onClose}>Kembali</button>
          <button
            className="kasir-modal-btn-confirm"
            disabled={payMethod === "tunai" && change < 0}
            onClick={onConfirm}
          >
            <IconCheck />
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SUCCESS MODAL
══════════════════════════════════════════════ */
export function SuccessModal({ customer, total, payMethod, change, onNewTx }: SuccessModalProps) {
  const timeStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="kasir-modal-overlay">
      <div className="kasir-modal">
        <div className="kasir-success-modal">
          <div className="kasir-success-icon"><IconCheck /></div>
          <div className="kasir-success-title">Transaksi Berhasil! 🎉</div>
          <div className="kasir-success-sub">
            {customer || "Pelanggan Umum"} · {timeStr} WIB
          </div>
          <div className="kasir-success-amount">{fmt(total)}</div>
          {payMethod === "tunai" && change >= 0 && (
            <div className="kasir-success-change">Kembalian: {fmt(change)}</div>
          )}
          <button className="kasir-success-btn" onClick={onNewTx}>
            + Transaksi Baru
          </button>
        </div>
      </div>
    </div>
  );
}
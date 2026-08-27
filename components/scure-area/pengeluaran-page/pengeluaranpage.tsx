// components/scure-area/pengeluaran-page/pengeluaranpage.tsx
"use client";

import { useState, useMemo } from "react";
import "./pengeluaranpage.css";

/* ─── Types ─── */
type Expense = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string; // ISO date string, e.g. "2026-08-27"
};

/* ─── Icons ─── */
const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" strokeWidth="1.5" strokeLinejoin="round" /></svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M4 6H16M8 6V4.5C8 4 8.4 3.5 9 3.5H11C11.6 3.5 12 4 12 4.5V6M14.5 6L14 16C14 16.5 13.6 17 13 17H7C6.4 17 6 16.5 6 16L5.5 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconClose = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" strokeWidth="1.6" strokeLinecap="round" /></svg>
);
const IconWallet = () => (
  <svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="5" width="15" height="11" rx="2" strokeWidth="1.6" /><path d="M2.5 8.5H17.5" strokeWidth="1.6" /><circle cx="14" cy="12.2" r="1.3" strokeWidth="1.4" /></svg>
);
const IconReceipt = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M5 2.5H15V17.5L12.5 16L10 17.5L7.5 16L5 17.5V2.5Z" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7.5 7H12.5M7.5 10H12.5" strokeWidth="1.4" strokeLinecap="round" /></svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4.5" width="14" height="12.5" rx="2" strokeWidth="1.6" /><path d="M3 8H17M7 2.5V5.5M13 2.5V5.5" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const categories = ["Semua", "Sewa", "Listrik & Air", "Gaji", "Restok Barang", "Lainnya"];
const dateRanges = ["Semua", "Hari Ini", "Minggu Ini", "Bulan Ini"];

const todayISO = () => new Date().toISOString().slice(0, 10);
const emptyForm = { name: "", category: "Sewa", amount: 0, date: todayISO() };

function isInRange(dateStr: string, range: string) {
  if (range === "Semua") return true;
  const d = new Date(dateStr);
  const now = new Date();
  if (range === "Hari Ini") {
    return d.toDateString() === now.toDateString();
  }
  if (range === "Minggu Ini") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return d >= startOfWeek;
  }
  if (range === "Bulan Ini") {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function PengeluaranPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, name: "Sewa Gudang", category: "Sewa", amount: 1500000, date: "2026-08-26" },
    { id: 2, name: "Listrik & Air", category: "Listrik & Air", amount: 850000, date: "2026-08-22" },
    { id: 3, name: "Gaji Karyawan - Agustus", category: "Gaji", amount: 4200000, date: "2026-08-25" },
    { id: 4, name: "Restok Minyak Goreng", category: "Restok Barang", amount: 2100000, date: "2026-08-20" },
    { id: 5, name: "Perbaikan Kasir", category: "Lainnya", amount: 350000, date: "2026-08-10" },
  ]);

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeRange, setActiveRange] = useState("Bulan Ini");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  const filtered = useMemo(() => {
    return expenses
      .filter((e) => activeCategory === "Semua" || e.category === activeCategory)
      .filter((e) => isInRange(e.date, activeRange))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [expenses, activeCategory, activeRange]);

  const total = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setModalMode("add");
  };

  const openEditModal = (e: Expense) => {
    setForm({ name: e.name, category: e.category, amount: e.amount, date: e.date });
    setEditingId(e.id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (modalMode === "edit" && editingId !== null) {
      setExpenses((prev) => prev.map((x) => (x.id === editingId ? { ...x, ...form } : x)));
    } else {
      setExpenses((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setExpenses((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="sae-page">
      <div className="sae-container">

        {/* ── Header ── */}
        <div className="sae-header">
          <div>
            <h1 className="sae-title">Pengeluaran</h1>
            <p className="sae-subtitle">{filtered.length} transaksi tercatat</p>
          </div>
          <button className="sae-add-btn" onClick={openAddModal}>
            <IconPlus />
            <span>Tambah Pengeluaran</span>
          </button>
        </div>

        {/* ── Summary ── */}
        <div className="sae-summary-card">
          <div className="sae-summary-icon"><IconWallet /></div>
          <div className="sae-summary-info">
            <div className="sae-summary-label">Total Pengeluaran &middot; {activeRange}</div>
            <div className="sae-summary-value">Rp {total.toLocaleString("id-ID")}</div>
          </div>
          <div className="sae-summary-count">
            <IconReceipt />
            <span>{filtered.length} catatan</span>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="sae-toolbar">
          <div className="sae-range-group">
            <IconCalendar />
            {dateRanges.map((r) => (
              <button
                key={r}
                className={`sae-range-chip${activeRange === r ? " active" : ""}`}
                onClick={() => setActiveRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="sae-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sae-filter-chip${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="sae-table-card">
          <div className="sae-table-head">
            <span className="sae-col-desc">Deskripsi</span>
            <span className="sae-col-category">Kategori</span>
            <span className="sae-col-date">Tanggal</span>
            <span className="sae-col-amount">Jumlah</span>
            <span className="sae-col-action">Aksi</span>
          </div>

          {filtered.length === 0 ? (
            <div className="sae-empty">
              <IconWallet />
              <p>Belum ada pengeluaran pada periode ini.</p>
            </div>
          ) : (
            filtered.map((e) => (
              <div className="sae-row" key={e.id}>
                <span className="sae-col-desc">
                  <span className="sae-name">{e.name}</span>
                </span>
                <span className="sae-col-category">
                  <span className="sae-badge">{e.category}</span>
                </span>
                <span className="sae-col-date">{formatDate(e.date)}</span>
                <span className="sae-col-amount">Rp {e.amount.toLocaleString("id-ID")}</span>
                <span className="sae-col-action">
                  <button className="sae-icon-btn edit" onClick={() => openEditModal(e)} aria-label="Edit pengeluaran">
                    <IconEdit />
                  </button>
                  <button className="sae-icon-btn delete" onClick={() => setDeleteTarget(e)} aria-label="Hapus pengeluaran">
                    <IconTrash />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      {modalMode && (
        <div className="sae-overlay" onClick={closeModal}>
          <div className="sae-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sae-modal-header">
              <h2>{modalMode === "edit" ? "Edit Pengeluaran" : "Tambah Pengeluaran"}</h2>
              <button className="sae-modal-close" onClick={closeModal}><IconClose /></button>
            </div>
            <form className="sae-form" onSubmit={handleSubmit}>
              <label className="sae-field">
                <span>Deskripsi</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="cth. Sewa Gudang"
                  required
                />
              </label>

              <label className="sae-field">
                <span>Kategori</span>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.filter((c) => c !== "Semua").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <div className="sae-field-row">
                <label className="sae-field">
                  <span>Jumlah (Rp)</span>
                  <input
                    type="number"
                    min={0}
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  />
                </label>
                <label className="sae-field">
                  <span>Tanggal</span>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </label>
              </div>

              <div className="sae-modal-actions">
                <button type="button" className="sae-btn-secondary" onClick={closeModal}>Batal</button>
                <button type="submit" className="sae-btn-primary">
                  {modalMode === "edit" ? "Simpan Perubahan" : "Tambah Pengeluaran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div className="sae-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="sae-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sae-confirm-icon"><IconTrash /></div>
            <h3>Hapus catatan ini?</h3>
            <p>
              <strong>{deleteTarget.name}</strong> senilai Rp {deleteTarget.amount.toLocaleString("id-ID")} akan dihapus secara permanen.
            </p>
            <div className="sae-modal-actions">
              <button className="sae-btn-secondary" onClick={() => setDeleteTarget(null)}>Batal</button>
              <button className="sae-btn-danger" onClick={confirmDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
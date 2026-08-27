// components/scure-area/kategori-page/kategoripage.tsx
"use client";

import { useState, useMemo } from "react";
import "./kategoripage.css";

/* ─── Types ─── */
type CategoryType = "produk" | "pengeluaran";

type Category = {
  id: number;
  name: string;
  type: CategoryType;
  usageCount: number;
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
const IconTag = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M3 3H9.5L17 10.5L10.5 17L3 9.5V3Z" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="7" cy="7" r="1.2" fill="currentColor" /></svg>
);
const IconBox = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M3 6L10 2.5L17 6L10 9.5L3 6Z" strokeWidth="1.6" strokeLinejoin="round" /><path d="M3 6V14L10 17.5L17 14V6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 9.5V17.5" strokeWidth="1.6" /></svg>
);
const IconWallet = () => (
  <svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="5" width="15" height="11" rx="2" strokeWidth="1.6" /><path d="M2.5 8.5H17.5" strokeWidth="1.6" /><circle cx="14" cy="12.2" r="1.3" strokeWidth="1.4" /></svg>
);

const emptyForm = { name: "" };

export default function KategoriPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Makanan", type: "produk", usageCount: 42 },
    { id: 2, name: "Minuman", type: "produk", usageCount: 31 },
    { id: 3, name: "Snack", type: "produk", usageCount: 18 },
    { id: 4, name: "Kebersihan", type: "produk", usageCount: 9 },
    { id: 5, name: "Sewa", type: "pengeluaran", usageCount: 4 },
    { id: 6, name: "Listrik & Air", type: "pengeluaran", usageCount: 6 },
    { id: 7, name: "Gaji", type: "pengeluaran", usageCount: 3 },
    { id: 8, name: "Restok Barang", type: "pengeluaran", usageCount: 12 },
    { id: 9, name: "Lainnya", type: "pengeluaran", usageCount: 5 },
  ]);

  const [activeTab, setActiveTab] = useState<CategoryType>("produk");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const filtered = useMemo(
    () => categories.filter((c) => c.type === activeTab),
    [categories, activeTab]
  );

  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrorMsg("");
    setModalMode("add");
  };

  const openEditModal = (c: Category) => {
    setForm({ name: c.name });
    setEditingId(c.id);
    setErrorMsg("");
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = form.name.trim();
    if (!trimmed) return;

    const isDuplicate = categories.some(
      (c) => c.type === activeTab && c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== editingId
    );
    if (isDuplicate) {
      setErrorMsg("Nama kategori ini sudah ada.");
      return;
    }

    if (modalMode === "edit" && editingId !== null) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, name: trimmed } : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: trimmed, type: activeTab, usageCount: 0 },
      ]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="sak-page">
      <div className="sak-container">

        {/* ── Header ── */}
        <div className="sak-header">
          <div>
            <h1 className="sak-title">Kategori</h1>
            <p className="sak-subtitle">Kelola kategori produk & pengeluaran</p>
          </div>
          <button className="sak-add-btn" onClick={openAddModal}>
            <IconPlus />
            <span>Tambah Kategori</span>
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="sak-tabs">
          <button
            className={`sak-tab${activeTab === "produk" ? " active" : ""}`}
            onClick={() => setActiveTab("produk")}
          >
            <IconBox />
            <span>Kategori Produk</span>
            <span className="sak-tab-count">{categories.filter((c) => c.type === "produk").length}</span>
          </button>
          <button
            className={`sak-tab${activeTab === "pengeluaran" ? " active" : ""}`}
            onClick={() => setActiveTab("pengeluaran")}
          >
            <IconWallet />
            <span>Kategori Pengeluaran</span>
            <span className="sak-tab-count">{categories.filter((c) => c.type === "pengeluaran").length}</span>
          </button>
        </div>

        {/* ── Category Grid ── */}
        {filtered.length === 0 ? (
          <div className="sak-empty">
            <IconTag />
            <p>Belum ada kategori {activeTab === "produk" ? "produk" : "pengeluaran"}.</p>
          </div>
        ) : (
          <div className="sak-grid">
            {filtered.map((c) => (
              <div className="sak-card" key={c.id}>
                <div className="sak-card-icon">
                  {c.type === "produk" ? <IconBox /> : <IconWallet />}
                </div>
                <div className="sak-card-info">
                  <div className="sak-card-name">{c.name}</div>
                  <div className="sak-card-usage">
                    {c.usageCount} {c.type === "produk" ? "produk" : "catatan"}
                  </div>
                </div>
                <div className="sak-card-actions">
                  <button className="sak-icon-btn edit" onClick={() => openEditModal(c)} aria-label="Edit kategori">
                    <IconEdit />
                  </button>
                  <button className="sak-icon-btn delete" onClick={() => setDeleteTarget(c)} aria-label="Hapus kategori">
                    <IconTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      {modalMode && (
        <div className="sak-overlay" onClick={closeModal}>
          <div className="sak-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sak-modal-header">
              <h2>
                {modalMode === "edit" ? "Edit Kategori" : "Tambah Kategori"}{" "}
                <span className="sak-modal-type">
                  {activeTab === "produk" ? "Produk" : "Pengeluaran"}
                </span>
              </h2>
              <button className="sak-modal-close" onClick={closeModal}><IconClose /></button>
            </div>
            <form className="sak-form" onSubmit={handleSubmit}>
              <label className="sak-field">
                <span>Nama Kategori</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ name: e.target.value })}
                  placeholder={activeTab === "produk" ? "cth. Makanan" : "cth. Sewa"}
                  required
                  autoFocus
                />
              </label>
              {errorMsg && <div className="sak-error">{errorMsg}</div>}

              <div className="sak-modal-actions">
                <button type="button" className="sak-btn-secondary" onClick={closeModal}>Batal</button>
                <button type="submit" className="sak-btn-primary">
                  {modalMode === "edit" ? "Simpan Perubahan" : "Tambah Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div className="sak-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="sak-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sak-confirm-icon"><IconTrash /></div>
            <h3>Hapus kategori ini?</h3>
            <p>
              <strong>{deleteTarget.name}</strong>
              {deleteTarget.usageCount > 0 ? (
                <> masih dipakai oleh {deleteTarget.usageCount} {deleteTarget.type === "produk" ? "produk" : "catatan pengeluaran"}. Menghapusnya tidak akan menghapus data yang sudah memakainya, tapi kategori ini tidak akan muncul lagi sebagai pilihan.</>
              ) : (
                <> akan dihapus secara permanen.</>
              )}
            </p>
            <div className="sak-modal-actions">
              <button className="sak-btn-secondary" onClick={() => setDeleteTarget(null)}>Batal</button>
              <button className="sak-btn-danger" onClick={confirmDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
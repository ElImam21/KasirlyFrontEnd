// components/scure-area/product-page/productpage.tsx
"use client";

import { useState, useMemo } from "react";
import "./productpage.css";

/* ─── Types ─── */
type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  emoji: string;
};

/* ─── Icons ─── */
const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" strokeWidth="1.6" /><path d="M13.5 13.5L17.5 17.5" strokeWidth="1.6" strokeLinecap="round" /></svg>
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
const IconBox = () => (
  <svg viewBox="0 0 20 20" fill="none"><path d="M3 6L10 2.5L17 6L10 9.5L3 6Z" strokeWidth="1.6" strokeLinejoin="round" /><path d="M3 6V14L10 17.5L17 14V6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 9.5V17.5" strokeWidth="1.6" /></svg>
);

const categories = ["Semua", "Makanan", "Minuman", "Snack", "Kebersihan"];

const emptyForm = { name: "", category: "Makanan", stock: 0, minStock: 10, price: 0, emoji: "📦" };

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Indomie Goreng Spesial", category: "Makanan", stock: 84, minStock: 20, price: 3500, emoji: "🍜" },
    { id: 2, name: "Aqua 600ml", category: "Minuman", stock: 120, minStock: 30, price: 4000, emoji: "💧" },
    { id: 3, name: "Chitato Sapi 68gr", category: "Snack", stock: 8, minStock: 15, price: 11000, emoji: "🥨" },
    { id: 4, name: "Teh Botol Sosro", category: "Minuman", stock: 45, minStock: 20, price: 6000, emoji: "🍵" },
    { id: 5, name: "Sabun Cuci Piring", category: "Kebersihan", stock: 6, minStock: 10, price: 9500, emoji: "🧴" },
    { id: 6, name: "Beng-Beng Share It", category: "Snack", stock: 32, minStock: 15, price: 5000, emoji: "🍫" },
  ]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Semua" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategory]);

  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setModalMode("add");
  };

  const openEditModal = (p: Product) => {
    setForm({ name: p.name, category: p.category, stock: p.stock, minStock: p.minStock, price: p.price, emoji: p.emoji });
    setEditingId(p.id);
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
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
      );
    } else {
      const newProduct: Product = { id: Date.now(), ...form };
      setProducts((prev) => [newProduct, ...prev]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="sap-page">
      <div className="sap-container">

        {/* ── Header ── */}
        <div className="sap-header">
          <div>
            <h1 className="sap-title">Manajemen Produk</h1>
            <p className="sap-subtitle">{products.length} produk terdaftar</p>
          </div>
          <button className="sap-add-btn" onClick={openAddModal}>
            <IconPlus />
            <span>Tambah Produk</span>
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div className="sap-toolbar">
          <div className="sap-search">
            <IconSearch />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sap-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sap-filter-chip${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="sap-table-card">
          <div className="sap-table-head">
            <span className="sap-col-product">Produk</span>
            <span className="sap-col-category">Kategori</span>
            <span className="sap-col-stock">Stok</span>
            <span className="sap-col-price">Harga</span>
            <span className="sap-col-action">Aksi</span>
          </div>

          {filtered.length === 0 ? (
            <div className="sap-empty">
              <IconBox />
              <p>Tidak ada produk yang cocok.</p>
            </div>
          ) : (
            filtered.map((p) => {
              const isLow = p.stock <= p.minStock;
              return (
                <div className="sap-row" key={p.id}>
                  <span className="sap-col-product">
                    <span className="sap-emoji">{p.emoji}</span>
                    <span className="sap-name">{p.name}</span>
                  </span>
                  <span className="sap-col-category">
                    <span className="sap-badge">{p.category}</span>
                  </span>
                  <span className="sap-col-stock">
                    <span className={`sap-stock ${isLow ? "low" : ""}`}>
                      {p.stock} {isLow && "⚠"}
                    </span>
                  </span>
                  <span className="sap-col-price">
                    Rp {p.price.toLocaleString("id-ID")}
                  </span>
                  <span className="sap-col-action">
                    <button className="sap-icon-btn edit" onClick={() => openEditModal(p)} aria-label="Edit produk">
                      <IconEdit />
                    </button>
                    <button className="sap-icon-btn delete" onClick={() => setDeleteTarget(p)} aria-label="Hapus produk">
                      <IconTrash />
                    </button>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      {modalMode && (
        <div className="sap-overlay" onClick={closeModal}>
          <div className="sap-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sap-modal-header">
              <h2>{modalMode === "edit" ? "Edit Produk" : "Tambah Produk"}</h2>
              <button className="sap-modal-close" onClick={closeModal}><IconClose /></button>
            </div>
            <form className="sap-form" onSubmit={handleSubmit}>
              <label className="sap-field">
                <span>Nama Produk</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="cth. Indomie Goreng Spesial"
                  required
                />
              </label>

              <label className="sap-field">
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

              <div className="sap-field-row">
                <label className="sap-field">
                  <span>Stok</span>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  />
                </label>
                <label className="sap-field">
                  <span>Stok Minimum</span>
                  <input
                    type="number"
                    min={0}
                    value={form.minStock}
                    onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })}
                  />
                </label>
              </div>

              <label className="sap-field">
                <span>Harga (Rp)</span>
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </label>

              <div className="sap-modal-actions">
                <button type="button" className="sap-btn-secondary" onClick={closeModal}>Batal</button>
                <button type="submit" className="sap-btn-primary">
                  {modalMode === "edit" ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div className="sap-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="sap-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sap-confirm-icon"><IconTrash /></div>
            <h3>Hapus produk ini?</h3>
            <p>
              <strong>{deleteTarget.name}</strong> akan dihapus secara permanen dan tidak bisa dikembalikan.
            </p>
            <div className="sap-modal-actions">
              <button className="sap-btn-secondary" onClick={() => setDeleteTarget(null)}>Batal</button>
              <button className="sap-btn-danger" onClick={confirmDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
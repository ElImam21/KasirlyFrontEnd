// components/scure-area/sidebar/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.css";

const IconDashboard = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 10L10 3L17 10" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 8.5V16.5C5 17.05 5.45 17.5 6 17.5H8.5V13C8.5 12.45 8.95 12 9.5 12H10.5C11.05 12 11.5 12.45 11.5 13V17.5H14C14.55 17.5 15 17.05 15 16.5V8.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconProduct = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 6L10 2.5L17 6L10 9.5L3 6Z" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 6V14L10 17.5L17 14V6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9.5V17.5" strokeWidth="1.6" />
  </svg>
);

const IconExpense = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="5" width="15" height="11" rx="2" strokeWidth="1.6" />
    <path d="M2.5 8.5H17.5" strokeWidth="1.6" />
    <circle cx="14" cy="12.2" r="1.3" strokeWidth="1.4" />
  </svg>
);

const IconExit = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M7.5 17H4.5C3.95 17 3.5 16.55 3.5 16V4C3.5 3.45 3.95 3 4.5 3H7.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 13.5L16.5 10L12.5 6.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 10H7.5" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconTag = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M3 3H9.5L17 10.5L10.5 17L3 9.5V3Z" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1.2" fill="currentColor" />
  </svg>
);

const menuItems = [
  { href: "/scure-area/home", label: "Dashboard", icon: <IconDashboard /> },
  { href: "/scure-area/product", label: "Produk", icon: <IconProduct /> },
  { href: "/scure-area/kategori", label: "Kategori", icon: <IconTag /> },
  { href: "/scure-area/pengeluaran", label: "Pengeluaran", icon: <IconExpense /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sa-sidebar">
      <div className="sa-sidebar-inner">
        <div className="sa-brand">
          <div className="sa-brand-mark">K</div>
          <div className="sa-brand-text">
            <span className="sa-brand-name">KASIRLY</span>
            <span className="sa-brand-tag">Ruang Kendali</span>
          </div>
        </div>

        <div className="sa-divider" />

        <nav className="sa-nav">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sa-nav-item${isActive ? " active" : ""}`}
              >
                <span className="sa-nav-icon">{item.icon}</span>
                <span className="sa-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sa-sidebar-footer">
          <div className="sa-secure-badge">
            <span className="sa-secure-dot" />
            <span>Mode Aman Aktif</span>
          </div>
          <Link href="/client/home" className="sa-exit-link">
            <IconExit />
            <span>Kembali ke Toko</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
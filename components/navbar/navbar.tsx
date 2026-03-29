"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./navbar.css";

/* ─── Icons ─── */
const IconHome = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M2 6.5L8 2L14 6.5V14H10V10H6V14H2V6.5Z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

const IconCashier = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 4V3C5 2.448 5.448 2 6 2H10C10.552 2 11 2.448 11 3V4" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="4" y="7" width="2" height="2" rx="0.5" fill="currentColor"/>
    <rect x="7" y="7" width="2" height="2" rx="0.5" fill="currentColor"/>
    <rect x="10" y="7" width="2" height="2" rx="0.5" fill="currentColor"/>
    <rect x="4" y="10" width="2" height="1.5" rx="0.5" fill="currentColor"/>
    <rect x="7" y="10" width="2" height="1.5" rx="0.5" fill="currentColor"/>
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 5.5H11M5 8H11M5 10.5H8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2.5 13.5C2.5 11.015 5.015 9 8 9C10.985 9 13.5 11.015 13.5 13.5"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconChevron = ({ className }: { className?: string }) => (
  <svg className={`navbar-link-chevron ${className ?? ""}`} viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconProfile = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 14C2 11.239 4.686 9 8 9C11.314 9 14 11.239 14 14"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconPayment = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 6.5H14.5" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="3.5" y="9" width="3" height="1.5" rx="0.5" fill="currentColor"/>
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M10.5 11L13.5 8L10.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 8H6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M6.5 3H3C2.448 3 2 3.448 2 4V12C2 12.552 2.448 13 3 13H6.5"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

/* ─── Navbar Component ─── */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    setMobileOpen(false);
    router.push("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const close = () => {
      setMobileOpen(false);
      setDropdownOpen(false);
    };
    close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const navLinks = [
    { href: "/client/home", label: "Home", icon: <IconHome /> },
    { href: "/client/kasir", label: "Kasir", icon: <IconCashier /> },
    { href: "/client/laporan", label: "Laporan", icon: <IconReport /> },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/client/home" className="navbar-logo">
            <Image
              src="/FullLogo_Transparent_NoBuffer.png"
              alt="Kasirly"
              width={30}
              height={30}
              className="navbar-logo-img"
            />
            <span className="navbar-logo-text">Kasir<span>ly</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {navLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`navbar-link ${isActive(href) ? "active" : ""}`}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}

            {/* Akun Dropdown */}
            <li ref={dropdownRef}>
              <button
                className={`navbar-link ${isActive("/client/account") || isActive("/client/profile") || isActive("/client/pembayaran") ? "active" : ""}`}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
              >
                <IconUser />
                Akun
                <IconChevron className={dropdownOpen ? "open" : ""} />
              </button>

              <div className={`navbar-dropdown ${dropdownOpen ? "show" : ""}`}>
                <Link
                  href="/client/profile"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <IconProfile />
                  Profile
                </Link>
                <div className="navbar-dropdown-divider" />
                <Link
                  href="/client/pembayaran"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <IconPayment />
                  Pembayaran
                </Link>
              </div>
            </li>
          </ul>

          {/* Right: Avatar + Logout */}
          <div className="navbar-right">
            <div className="navbar-avatar">A</div>
            <button className="navbar-btn-logout" onClick={handleLogout}>
              <IconLogout />
              Logout
            </button>

            {/* Mobile Hamburger */}
            <button
              className={`navbar-hamburger ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? "show" : ""}`}>
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`navbar-mobile-link ${isActive(href) ? "active" : ""}`}
          >
            {icon}
            {label}
          </Link>
        ))}

        <div className="navbar-mobile-divider" />

        <Link
          href="/client/profile"
          className={`navbar-mobile-link ${isActive("/client/profile") ? "active" : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          <IconProfile />
          Profile
        </Link>
        <Link
          href="/client/pembayaran"
          className={`navbar-mobile-link ${isActive("/client/pembayaran") ? "active" : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          <IconPayment />
          Pembayaran
        </Link>

        <div className="navbar-mobile-divider" />

        <button className="navbar-mobile-link navbar-mobile-logout" onClick={handleLogout}>
          <IconLogout />
          Logout
        </button>
      </div>
    </>
  );
}
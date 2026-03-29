// app/page.tsx
// Hanya memanggil UI AuthPage untuk ditampilkan

import AuthPage from "@/components/landing-page/login";

export default function Home() {
  return <AuthPage />;
}
import { AppNav } from "@/components/AppNav";

// Layout semua halaman setelah login: sidebar di kiri (desktop/tablet),
// navigasi bawah (mobile), dan isi halaman tepat di samping sidebar.
// Folder "(app)" hanya pengelompok, tidak muncul di URL.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      {/* Padding kiri = lebar sidebar + sedikit jarak, jadi isi menempel dekat sidebar */}
      <main className="px-4 pb-24 pt-6 md:pb-8 md:pl-[6.5rem] md:pr-6 lg:pl-[17rem]">
        <div className="max-w-6xl">{children}</div>
      </main>
    </>
  );
}

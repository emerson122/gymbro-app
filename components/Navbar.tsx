"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Hoy", icon: "🔥" },
  { href: "/workout", label: "Rutina", icon: "🏋️" },
  { href: "/snacks", label: "Antojo", icon: "🥒" },
  { href: "/calendar", label: "Calendario", icon: "📅" },
  { href: "/settings", label: "Ajustes", icon: "⚙️" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <header className="px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
        <span className="font-display text-3xl tracking-wide text-paper">
          GYM<span className="text-flame">BRO</span>
        </span>
      </header>
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-line bg-surface/95 backdrop-blur">
        <div className="max-w-3xl mx-auto grid grid-cols-5">
          {TABS.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${
                  active ? "text-flame" : "text-muted hover:text-paper"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

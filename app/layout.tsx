import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "GymBro — tu racha no se toca",
  description: "Seguimiento de entrenamiento, racha y nutrición con recordatorios por Telegram.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-ink text-paper min-h-screen`}>
        <div className="max-w-3xl mx-auto pb-24">
          <Navbar />
          <main className="px-4 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

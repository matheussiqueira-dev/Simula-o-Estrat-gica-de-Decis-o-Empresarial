import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Decision Simulator",
  description:
    "Painel interativo para testar variáveis de negócio e visualizar impacto financeiro em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sans.variable} ${display.variable} bg-slate-950 text-slate-100 antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

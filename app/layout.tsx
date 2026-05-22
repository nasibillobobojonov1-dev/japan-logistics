import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japan Logistics Help Center",
  description: "Полное руководство по Telegram-боту Japan Logistics: регистрация, заказы из Японии, оплата и отслеживание доставки.",
  openGraph: {
    title: "Japan Logistics Help Center",
    description: "База знаний для клиентов Japan Logistics",
    siteName: "Japan Logistics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

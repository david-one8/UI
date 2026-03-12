import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patient Directory",
  description: "A comprehensive patient directory with search, filter, and sort capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

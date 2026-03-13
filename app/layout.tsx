import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

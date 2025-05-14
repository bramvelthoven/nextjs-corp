import type { Metadata } from "next";
import localFont from "next/font/local";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nextjs-Corp",
  description: "Small description about the app...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
        <header className="bg-primary text-primary-foreground p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Bram's App</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/about" className="hover:underline">About</a>
              <a href="/settings" className="hover:underline">Settings</a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-6">{children}</main>

        <Separator />

        <footer className="bg-secondary text-secondary-foreground p-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Bram's App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import "@/app/styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Solaro.io",
  description: "Solaro.io AI Therapy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh overflow-auto" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${manrope.className} h-full bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="max-w-5xl h-auto flex-col mx-auto p-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
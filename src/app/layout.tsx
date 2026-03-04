import type { Metadata, Viewport } from "next";
import { getCartDataServer } from "@/lib/cart";
import type { CartData } from "@/types/cart";
import { LayoutClient } from "@/components/LayoutClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Sustainable shopping checkout experience",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialCart: CartData | null = null;
  try {
    initialCart = await getCartDataServer();
  } catch {
    initialCart = null;
  }
  return (
    <html lang="en" className="w-full">
      <body className="flex min-h-screen min-h-[100dvh] w-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-[200%] rounded-lg bg-ecoyaan-green px-4 py-2 text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Skip to main content
        </a>
        <LayoutClient initialCart={initialCart}>
          <Navbar />
          <main className="flex-1 w-full py-6 px-4 sm:py-10 sm:px-6 lg:px-8" id="main-content" aria-label="Main content">
            <div className="fluid-container min-w-0 px-0">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
          <Footer />
        </LayoutClient>
      </body>
    </html>
  );
}

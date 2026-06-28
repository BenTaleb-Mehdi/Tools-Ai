import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Etsy AI Hub",
    default: "Etsy AI Hub - Scale Your Shop with Artificial Intelligence",
  },
  description: "Learn how to use AI tools like ChatGPT, Photoroom, Midjourney, eRank, and Kittl to skyrocket your Etsy sales, SEO, and listing copy.",
  keywords: ["Etsy AI Tools", "Etsy SEO", "Etsy Shop Automation", "Etsy Product Designs", "Print on Demand AI"],
  openGraph: {
    title: "Etsy AI Hub",
    description: "Scale your Etsy shop with modern generative AI tools.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-height-screen bg-background text-foreground">
        {/* Navigation Bar */}
        <Header />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card text-card-foreground">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 font-bold text-lg mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Etsy<span className="text-primary">AI</span>Hub</span>
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Empowering independent Etsy sellers to compete with global brands through modern generative AI.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider">Categories</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#explore" className="hover:text-primary transition">Product Photography</Link></li>
                  <li><Link href="/#explore" className="hover:text-primary transition">Etsy SEO & Keywords</Link></li>
                  <li><Link href="/#explore" className="hover:text-primary transition">Listing Copy Generators</Link></li>
                  <li><Link href="/#explore" className="hover:text-primary transition">Design & POD Assets</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary transition">Etsy Disclaimer</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Etsy AI Hub. All rights reserved. Not affiliated with Etsy, Inc.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

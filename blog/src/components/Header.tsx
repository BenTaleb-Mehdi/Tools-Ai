"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Home, 
  BookOpen, 
  Layers 
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Etsy<span className="text-primary">AI</span>Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition">
              Home
            </Link>
            <Link href="/#explore" className="text-foreground/80 hover:text-foreground transition">
              AI Tools Directory
            </Link>
            <Link href="/#articles" className="text-foreground/80 hover:text-foreground transition">
              Articles
            </Link>
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/#explore"
              className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-sm transition hover:bg-primary/95 shadow-sm"
            >
              Find AI Tools
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden p-2 text-foreground/80 hover:text-foreground transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Modern Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Blur Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-backdrop" 
            onClick={closeMenu} 
          />

          {/* Side Drawer panel */}
          <div className="fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-card border-l border-border p-6 shadow-2xl flex flex-col justify-between animate-slide-in-drawer z-50">
            <div className="space-y-8">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Etsy<span className="text-primary">AI</span>Hub</span>
                </div>
                <button 
                  onClick={closeMenu}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Stack of navigation links */}
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-base font-semibold text-foreground/80 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-muted/60 transition"
                >
                  <Home className="h-5 w-5 text-primary" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/#explore"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-base font-semibold text-foreground/80 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-muted/60 transition"
                >
                  <Layers className="h-5 w-5 text-primary" />
                  <span>AI Tools Directory</span>
                </Link>
                <Link
                  href="/#articles"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-base font-semibold text-foreground/80 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-muted/60 transition"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Articles</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="pt-6 border-t border-border/80 space-y-4">
              <Link
                href="/#explore"
                onClick={closeMenu}
                className="bg-primary text-primary-foreground font-bold px-4 py-3 rounded-lg text-sm transition hover:bg-primary/95 shadow-sm text-center flex items-center justify-center gap-2"
              >
                <span>Find AI Tools</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-[10px] text-center text-muted-foreground">
                &copy; {new Date().getFullYear()} Etsy AI Hub.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

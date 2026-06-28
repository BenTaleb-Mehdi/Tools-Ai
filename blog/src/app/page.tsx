"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Tag, 
  Layers, 
  Clock, 
  Calendar, 
  Search, 
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";

// Directory Tools definition
interface Tool {
  name: string;
  category: string;
  description: string;
  pricing: string;
  rating: string;
  website: string;
  features: string[];
}

const TOOLS_DIRECTORY: Tool[] = [
  {
    name: "Photoroom",
    category: "Product Photography",
    description: "Remove backgrounds instantly and place items into photorealistic lifestyle staging.",
    pricing: "Freemium",
    rating: "4.9/5",
    website: "https://www.photoroom.com",
    features: ["Batch background removal", "AI studio shadows", "Etsy-ready templates"]
  },
  {
    name: "ChatGPT",
    category: "Listing Copy & SEO",
    description: "Generate persuasive, SEO-optimized product descriptions, tags, and listing titles.",
    pricing: "Free / Paid",
    rating: "4.8/5",
    website: "https://chatgpt.com",
    features: ["SEO description prompts", "Tag ideas maker", "Customer reply assistant"]
  },
  {
    name: "Midjourney",
    category: "AI Mockups & Art",
    description: "Create photorealistic listing mockups (mugs, t-shirts, frames) and digital art designs.",
    pricing: "Paid",
    rating: "4.9/5",
    website: "https://www.midjourney.com",
    features: ["Custom aspect ratios", "Hyper-realistic mockups", "AI texture generator"]
  },
  {
    name: "Kittl",
    category: "Graphic Design",
    description: "Vector graphics design editor loaded with template libraries, retro text styles, and illustrations.",
    pricing: "Freemium",
    rating: "4.7/5",
    website: "https://www.kittl.com",
    features: ["AI vector converter", "Text styling engine", "Commercial license font catalog"]
  },
  {
    name: "eRank",
    category: "Etsy SEO",
    description: "Etsy-specific analytics tool providing keyword volumes, competition tags, and page audits.",
    pricing: "Freemium",
    rating: "4.8/5",
    website: "https://erank.com",
    features: ["Keyword explorer", "Tag frequency checker", "Competitor shop spy"]
  },
  {
    name: "Alura",
    category: "Etsy SEO & Analytics",
    description: "Browser extension and platform for sales tracking, product research, and automated follow-ups.",
    pricing: "Freemium",
    rating: "4.9/5",
    website: "https://www.alura.io",
    features: ["Chrome Extension product spy", "Tag extractor tool", "Email marketing integration"]
  }
];

export default function Homepage() {
  const posts = useMemo(() => getAllPosts(), []);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Categories list derived dynamically
  const categories = useMemo(() => {
    const cats = posts.map(post => post.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [posts]);

  // Filtered posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-primary/5 via-transparent to-transparent border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The #1 Directory & Blog for Etsy Sellers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-foreground max-w-3xl mx-auto">
            Supercharge Your Etsy Shop With <span className="text-primary bg-clip-text">Generative AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop spending hours writing copy, taking photos, and guessing keywords. Discover the best AI tools to automate your shop operations and skyrocket your sales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="#explore"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-bold px-8 py-3 rounded-lg text-base shadow-lg transition hover:bg-primary/95 flex items-center justify-center gap-2"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#articles"
              className="w-full sm:w-auto bg-secondary text-secondary-foreground font-semibold px-8 py-3 rounded-lg text-base border border-border hover:bg-secondary/90 flex items-center justify-center gap-2"
            >
              <span>Read AI Guides</span>
              <BookOpen className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Subtle decorative background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* 2. AI Tools Directory Grid */}
      <section id="explore" className="py-16 md:py-24 container mx-auto px-4 max-w-5xl">
        <div className="text-center md:text-left mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Featured AI Tools for Etsy</h2>
          <p className="text-muted-foreground">The industry-leading AI tools used by high-volume Etsy stores.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_DIRECTORY.map((tool, idx) => (
            <div 
              key={idx} 
              className="group rounded-xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm transition hover:shadow-md hover:border-primary/30"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary text-secondary-foreground">
                    {tool.category}
                  </span>
                  <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                    ★ {tool.rating}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                {/* Features small check list */}
                <ul className="space-y-1.5 pt-2 border-t border-border/60">
                  {tool.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-foreground/80 flex items-center gap-1.5">
                      <span className="text-primary font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Pricing: <span className="text-foreground font-semibold">{tool.pricing}</span>
                </span>
                <a 
                  href={tool.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Visit website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Blog Section */}
      <section id="articles" className="py-16 md:py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Actionable SEO & AI Guides</h2>
              <p className="text-muted-foreground">Step-by-step strategies to integrate artificial intelligence in your shop.</p>
            </div>
            
            {/* Search Input bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </div>

          {/* Filtering Category Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-border pb-4">
            <span className="text-sm font-semibold text-muted-foreground mr-2 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Filter by:
            </span>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-foreground/80 hover:bg-muted border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles list grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="flex flex-col justify-between bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div>
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline"
                    >
                      <span>Read Guide</span>
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card">
              <p className="text-muted-foreground text-sm">No articles found matching your filters.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} 
                className="mt-4 text-xs font-semibold text-primary hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

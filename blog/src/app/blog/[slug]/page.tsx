import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Markdown } from "@/components/Markdown";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * Pre-renders all blog post slugs at build time.
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generates dynamic SEO metadata for each post.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.coverImage || "/og-image.svg",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage || "/og-image.svg"],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground/80 font-medium">Articles</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground/60 truncate">{post.title}</span>
        </div>

        {/* Action Link Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group mb-6"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Header info */}
        <header className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {post.category}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Main Content Render area */}
        <div className="mt-8">
          <Markdown content={post.content} />
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 rounded-xl border border-border bg-card/40 text-card-foreground text-center">
          <h3 className="text-lg font-bold mb-2">Want to automate your Etsy store?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Get our checklist of the top 10 AI workflows used by Etsy power-sellers to maximize monthly sales.
          </p>
          <button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition hover:bg-primary/95 shadow-sm">
            Download Free AI Guide
          </button>
        </div>
      </div>
    </article>
  );
}

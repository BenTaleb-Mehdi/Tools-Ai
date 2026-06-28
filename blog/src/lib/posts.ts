import postsData from "@/data/posts.json";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  content: string;
}

const posts: Post[] = postsData as Post[];

/**
 * Retrieves all blog posts sorted by publishing date (newest first).
 */
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Retrieves a single post matching a given slug.
 * Returns undefined if no match is found.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Retrieves all blog posts within a specific category.
 */
export function getPostsByCategory(category: string): Post[] {
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Retrieves all unique categories present in the blog posts.
 */
export function getAllCategories(): string[] {
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories));
}

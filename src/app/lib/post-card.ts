interface PostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    image?: string;
    date: string;
    slug: string;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  small_image?: { url: string }[]; 
  medium_image?: { url: string }[];
  published_at: string;
}

interface ApiResponse {
  data: Post[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

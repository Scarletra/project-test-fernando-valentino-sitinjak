import { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import PostCard from '../components/PostCard';

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  image?: {
    small_image?: { url: string };
    medium_image?: { url: string };
  };
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

const ListPost = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [showPerPage, setShowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sortParam = sortBy === 'newest' ? '-published_at' : 'published_at';
      
      const params = new URLSearchParams({
        'page[number]': currentPage.toString(),
        'page[size]': showPerPage.toString(),
        'sort': sortParam
      });
      
      params.append('append[]', 'small_image');
      params.append('append[]', 'medium_image');
      
      const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      setPosts(data.data);
      setTotalItems(data.meta.total);
      setTotalPages(data.meta.last_page);
      
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, showPerPage, currentPage]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleShowPerPageChange = (newShowPerPage: number) => {
    setShowPerPage(newShowPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (end - start < maxVisible - 1) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisible - 1);
        } else {
          start = Math.max(1, end - maxVisible + 1);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * showPerPage + 1;
  const endItem = Math.min(currentPage * showPerPage, totalItems);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractExcerpt = (content: string, maxLength: number = 100) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="px-4 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {totalItems > 0 ? startItem : 0}-{endItem} of {totalItems}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Show per page */}
              <div className="relative flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Show per page:
                </label>
                <div className="relative">
                  <select
                    value={showPerPage}
                    onChange={(e) => handleShowPerPageChange(Number(e.target.value))}
                    className="appearance-none cursor-pointer border border-gray-300 rounded-full px-3 py-2 pr-6 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none cursor-pointer border border-gray-300 rounded-full px-3 py-2 pr-6 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 px-4 mb-6">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading posts...</div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">Error: {error}</div>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">No posts found</div>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    post={{
                      id: post.id,
                      title: post.title,
                      excerpt: extractExcerpt(post.content),
                      author: 'Admin',
                      thumbnail: post.image?.medium_image?.url || post.image?.small_image?.url || 'banner-img.png',
                      date: post.published_at ? formatDate(post.published_at) : '',
                      slug: post.slug,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="p-4 flex justify-center items-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Pagination controls */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-sm text-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="First page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-sm text-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-0.5">
                  {generatePaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`cursor-pointer py-2 text-sm text-gray-500 w-[30px] ${
                        currentPage === page
                          ? 'bg-[#ff6600] text-white border rounded-lg'
                          : 'hover:font-medium hover:text-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-sm text-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-sm text-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Last page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPost;
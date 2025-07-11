import { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import PostCard from '../components/PostCard';

const ListPost = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [showPerPage, setShowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 156;
  const totalPages = Math.ceil(totalItems / showPerPage);

  useEffect(() => {
    console.log('State updated:', { sortBy, showPerPage, currentPage });
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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {startItem}-{endItem} of {totalItems}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Show per page */}
              <div className="relative flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Show per page
                </label>
                <div className="relative">
                  <select
                    value={showPerPage}
                    onChange={(e) => handleShowPerPageChange(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-300 rounded-full px-3 py-2 pr-6 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-full px-3 py-2 pr-6 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        <div className="p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: showPerPage }, (_, index) => (
              <div key={index}>
                <PostCard
                  post={{
                    title: `Post Title ${index + 1}`,
                    excerpt: `This is a brief excerpt for post ${index + 1}.`,
                    author: `Author ${index + 1}`,
                    date: `Date ${index + 1}`,
                    slug: `post-${index + 1}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white p-4 flex justify-center items-center">
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
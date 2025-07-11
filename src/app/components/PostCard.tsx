'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    author: string;
    date: string;
    slug: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatDate = (dateString: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  return (
    <Link href={`/ideas/${post.slug}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow shadow-sm duration-200 overflow-hidden h-70 w-50">
        <div className="relative h-35">
          <div className="relative w-full h-full bg-gray-200 overflow-hidden">
            {!imageError ? (
              <>
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                )}
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 h-35 flex flex-col">
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(post.date)}
          </div>

          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3 leading-tight">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
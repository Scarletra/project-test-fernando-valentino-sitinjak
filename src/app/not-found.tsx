import { Home, Search } from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-2">404</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
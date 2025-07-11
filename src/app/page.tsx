'use client';

import { usePathname } from "next/navigation";
import ListPost from "./sections/IdeasSection";
import Banner from "./components/Banner";

export default function Home() {
  const pathname = usePathname();
  const isIdeasRoute = pathname === '/ideas' || pathname.startsWith('/ideas/');

  return (
    <div className="min-h-screen">
      <Banner
        backgroundImage="/banner-img.png"
        title="Ideas"
        subtitle="Where all our great things begin"
      />

      <div>
        {isIdeasRoute ? (
          <ListPost />
        ) : (
          <ListPost />
        )}
      </div>

      <div>
        Footer (Tentative~~~~~)
      </div>
    </div>
  );
}
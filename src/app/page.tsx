'use client';

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import ListPost from "./sections/IdeasSection";

export default function Home() {

  const pathname = usePathname();

  const isIdeasRoute = pathname === '/ideas' || pathname.startsWith('/ideas/');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <div>
        Banner (TBA)
      </div>

      {isIdeasRoute ? (
        <div className="pt-16">
          <ListPost />
        </div>
      ) : (
        <div>
          <ListPost />
        </div>
      )}
      <div>
        Footer (Tentative~~~~~)
      </div>
    </div>
  );
}

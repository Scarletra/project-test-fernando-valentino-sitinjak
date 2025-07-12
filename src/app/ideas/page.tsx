'use client';

import Banner from "../components/Banner";
import ListPost from "../sections/IdeasSection";

const IdeasPage = () => {
  return (
    <div>
      <Banner
            backgroundImage="/banner-img.png"
            title="Ideas"
            subtitle="Where all our great things begin"
          />
      <ListPost />
    </div>
  );
};

export default IdeasPage;

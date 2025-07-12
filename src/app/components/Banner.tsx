'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface BannerProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  height?: string;
  overlayOpacity?: number;
}

const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  title,
  subtitle,
  height = "h-96",
  overlayOpacity = 0.4
}) => {
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section className={`relative ${height} overflow-hidden w-full`}>
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="relative w-full h-[120%] -mt-[10%]">
          <Image
            src={backgroundImage}
            alt="Banner Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div 
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div 
        className="relative z-20 flex items-center justify-center h-full px-4 pb-16"
        style={{ y: textY }}
      >
        <div className="text-center text-white max-w-4xl">
          <motion.h1 
            className="text-xl md:text-2xl lg:text-4xl font-normal leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {title}
          </motion.h1>
          
          <motion.h2 
            className="text-base md:text-lg font-light opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.h2>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <svg
          className="relative block w-full h-16 md:h-32 lg:h-48"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L1200,60 L1200,120 Z"
            className="fill-white"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Banner;
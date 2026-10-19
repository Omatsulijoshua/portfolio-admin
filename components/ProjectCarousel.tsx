"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-gray-500">
        <ImageIcon size={36} />
        <span className="text-xs mt-2 font-semibold">No Gallery Screenshots Loaded</span>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };


  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] bg-bg-dark border border-white/5 rounded-2xl overflow-hidden group shadow-2xl">
      {/* Slider Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover select-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/65 via-transparent to-transparent pointer-events-none" />

      {/* Direction Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-dark/80 border border-white/10 hover:border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-dark/80 border border-white/10 hover:border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Image Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? "bg-neon-cyan w-4" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to screenshot ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;

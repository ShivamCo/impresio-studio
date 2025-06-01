"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";

export default function PhotoGallery({ portfolioImages }) {
  const [selectedImage, setSelectedImage] = useState(null);

  
  console.log("portfolioImages:", portfolioImages);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) =>
      prev === 0 ? portfolioImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) =>
      prev === portfolioImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {portfolioImages?.map((image, index) => (
          <div
            key={image.id || index}
            className="relative aspect-[4/3] cursor-pointer rounded-md overflow-hidden"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src || image || "/placeholder.jpg"}
              alt={image.alt || `Image ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={
                portfolioImages[selectedImage].src ||
                portfolioImages[selectedImage] ||
                "/placeholder.jpg"
              }
              alt={
                portfolioImages[selectedImage].alt ||
                `Image ${selectedImage + 1}`
              }
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

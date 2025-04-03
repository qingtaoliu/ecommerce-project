"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="w-full md:w-2/5 p-6">
      {/* 主图 */}
      <div className="relative h-80 md:h-96 border border-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <Image 
          src={images[currentImage]} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain"
          priority
        />
      </div>

      {/* 缩略图 */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative w-20 h-20 flex-shrink-0 border rounded-md cursor-pointer overflow-hidden
              ${currentImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => setCurrentImage(index)}
          >
            <Image 
              src={image} 
              alt={`${name} - 图片 ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

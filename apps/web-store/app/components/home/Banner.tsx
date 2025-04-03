"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { bannerItems } from "../../data/products";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      {bannerItems.map((item, index) => (
        <Link
          key={item.id}
          href={item.link}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.imageUrl}
            alt={item.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-2xl font-bold text-white">{item.alt}</h3>
            <p className="mt-2 text-white">点击查看详情</p>
          </div>
        </Link>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`转到幻灯片 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

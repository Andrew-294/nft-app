"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function ImageWithLoader({ src, alt }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-64 mb-4 bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-500 text-sm">
        🚫 Изображение не найдено
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-xl border border-purple-900 shadow-md"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
}

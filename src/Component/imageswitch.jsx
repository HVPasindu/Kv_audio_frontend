import { useState, useEffect } from "react";

export default function ProductImageCarousel({ images = [], alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) return null;

  return (
    <img
      src={images[currentIndex] || "/empty.jpg"}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/empty.jpg";
      }}
    />
  );
}

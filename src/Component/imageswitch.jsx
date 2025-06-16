import { useState, useEffect } from "react";

export default function ProductImageCarousel({ images = [], alt }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(timer);
  }, [images]);

  if (!images.length) {
    return (
      <img
        src="/empty.jpg"
        alt="default"
        className="w-full h-48 object-cover"
      />
    );
  }

  return (
    <img
      src={images[index]}
      alt={`${alt}-${index}`}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/empty.jpg";
      }}
    />
  );
}

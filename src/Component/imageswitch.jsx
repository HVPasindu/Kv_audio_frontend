import { useEffect, useState } from "react";

export default function ProductImageCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // switch every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full h-48 overflow-hidden rounded-t-xl">
      <img
        src={images[index]}
        alt={alt}
        className="w-full h-full object-cover transition duration-500"
        onError={(e) => {
          e.target.src = "/empty.jpg";
        }}
      />
    </div>
  );
}

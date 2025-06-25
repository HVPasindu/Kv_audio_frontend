import React from 'react';
//import './styles.css'; // If needed to import custom styles for Tailwind

export default function Gallery() {
  return (
    <div className="bg-primary min-h-screen">
      
      {/* Gallery Section */}
      <section className="container mx-auto p-8">
        <h1 className="text-5xl font-semibold text-center text-accent mb-8">Gallery</h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Image 1 */}
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p1.jpeg" alt="Gallery Image 1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          {/* Image 2 */}
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p2.jpeg" alt="Gallery Image 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          {/* Image 3 */}
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p3.jpeg" alt="Gallery Image 3" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          {/* Image 4 */}
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p4.jpeg" alt="Gallery Image 4" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p5.jpeg" alt="Gallery Image 4" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p6.jpeg" alt="Gallery Image 4" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="../../public/p7.jpeg" alt="Gallery Image 4" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
          {/* Add more images as needed */}
        </div>
      </section>
    </div>
  );
}

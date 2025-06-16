import ProductImageCarousel from "./imageswitch";

export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
      {/* Product Image */}
      {/* {item.image?.map((imgUrl, index) => (
      <img
        key={index}
        src={imgUrl || "/empty.jpg"}
        alt={`${item.name} - ${index}`}
        className="w-full h-32 object-cover rounded"
        onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/empty.jpg";
      }}
    />
    ))} */}
      {/* <ProductImageCarousel images={item.image} alt={item.name} /> 
      {console.log(item.name, item.image)} */}
      <img
      src={item.image?.[0] || "/empty.jpg"}
      alt={item.name}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/empty.jpg";
      }}
     className="w-full h-48 object-cover"
    />




      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>

          <div className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">Price:</span> Rs. {item.price}
          </div>

          <div className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">Category:</span> {item.category}
          </div>

          <div className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">Dimensions:</span> {item.dimentions}
          </div>

          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                item.availability
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.availability ? "Available" : "Not Available"}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-2">Product ID: {item.key}</p>
        </div>

        {/* Button */}
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition">
          View Details
        </button>
      </div>
    </div>
  );
}

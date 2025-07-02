import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import meadiaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function UpdateItemPage() {
  const location = useLocation();
  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimension, setProductDimension] = useState(location.state.dimentions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImages, setProductImages] = useState([]);
  const [productAvailability, setProductAvailability] = useState(location.state.availability); // Add state for availability
  const navigate = useNavigate();

  async function handleAddItem() {
    let updatingImages = location.state.image;
    if (productImages.length > 0) {
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        const promise = meadiaUpload(productImages[i]);
        promises.push(promise);
      }
      updatingImages = await Promise.all(promises);
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/${productKey}`,
          {
            name: productName,
            price: productPrice,
            category: productCategory,
            dimentions: productDimension,
            description: productDescription,
            image: updatingImages,
            availability: productAvailability,  // Include availability in the update request
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    } else {
      toast.error("You are not authorized to update items");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Update Item</h1>
      <div className="w-[400px] border p-4 flex flex-col gap-3 items-center rounded-lg shadow">
        <input
          disabled
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          type="text"
          placeholder="Product Dimension"
          value={productDimension}
          onChange={(e) => setProductDimension(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
          className="w-full p-2 border rounded"
        />

        {/* Availability Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={productAvailability}
            onChange={() => setProductAvailability(!productAvailability)} // Toggle availability
            className="form-checkbox"
          />
          <span>Available</span>
        </label>

        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Update Item
        </button>
        <button
          onClick={() => navigate("/admin/items")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

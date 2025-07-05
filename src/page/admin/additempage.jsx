import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import meadiaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productAvailability, setProductAvailability] = useState(true);  // Add availability state
  const navigate = useNavigate();

  async function handleAddItem() {
    const promises = [];

    for (let i = 0; i < productImages.length; i++) {
      const promise = meadiaUpload(productImages[i]);
      promises.push(promise);
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const imageUrls = await Promise.all(promises);
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/`,
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dimentions: productDimension,
            description: productDescription,
            image: imageUrls,
            availability: productAvailability,  // Send availability to backend
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
      toast.error("You are not authorized to add items");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>
      <div className="w-[400px] border p-4 flex flex-col gap-3 items-center rounded-lg shadow">
        <input
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
            onChange={() => setProductAvailability(!productAvailability)}
            className="form-checkbox"
          />
          <span>Available</span>
        </label>

        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Item
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
//dfjhs
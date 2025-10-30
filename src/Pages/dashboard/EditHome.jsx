import React, { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const EditHome = ({ home, onClose }) => {
  const [title, setTitle] = useState(home.title);
  const [address, setAddress] = useState(home.address);
  const [price, setPrice] = useState(home.price);
  const [bedrooms, setBedrooms] = useState(home.bedrooms);
  const [bathrooms, setBathrooms] = useState(home.bathrooms);
  const db = getFirestore(getApp());

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const homeRef = doc(db, "homes", home.id);
      await updateDoc(homeRef, { title, address, price, bedrooms, bathrooms });
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating home:", error);
    }
  };
  const formatPriceInput = (value) => {
    if (!value) return "";
    // Convert to string first
    const strValue = value.toString().replace(/,/g, ""); // remove existing commas
    const numericValue = Number(strValue);
    if (isNaN(numericValue)) return "";
    return numericValue.toLocaleString("en-LK"); // add commas
  };
  return (
    <div className="modal fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-2xl font-bold mb-4">Edit Home</h3>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div> */}
      <div className="mb-4">
  <label className="block font-medium mb-1">Price</label>
  <input
    type="text"
    value={formatPriceInput(price)}
    onChange={(e) => {
      const rawValue = e.target.value.replace(/,/g, ""); // remove commas
      if (!isNaN(rawValue)) {
        setPrice(rawValue); // store raw numeric value
      }
    }}
    className="w-full p-2 border border-gray-300 rounded"
    placeholder="Enter price"
    required
  />
</div>

          <div className="mb-4">
            <label className="block">Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHome;

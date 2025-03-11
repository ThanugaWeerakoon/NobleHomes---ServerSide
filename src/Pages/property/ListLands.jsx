import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ListLands = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [perches, setPerches] = useState("");
  const [description, setDescription] = useState("");
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("land");
  const [mapUrl, setMapUrl] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [landUnit, setLandUnit] = useState("perches"); // Default to "perches"

  const db = getFirestore(getApp());
  const storage = getStorage(getApp());

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles(files);
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPropertyFeatures([...propertyFeatures, value]);
    } else {
      setPropertyFeatures(
        propertyFeatures.filter((feature) => feature !== value),
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title &&
      !address &&
      !price &&
      !description &&
      imageFiles.length === 0
    ) {
      setError(
        "Please fill in at least one of the required fields or upload images.",
      );
      return;
    }

    if (!perches || isNaN(perches) || perches <= 0) {
      setError(`Please enter a valid land size in ${landUnit}.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const imageUrlsTemp = [];
      for (const file of imageFiles) {
        const storageRef = ref(
          storage,
          `homes/images/${Date.now()}_${file.name}`,
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (err) => {
              reject(err);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              imageUrlsTemp.push(downloadURL);
              resolve();
            },
          );
        });
      }

      const videoUrlsTemp = [];
      for (const file of videoFiles) {
        const storageRef = ref(
          storage,
          `homes/videos/${Date.now()}_${file.name}`,
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (err) => {
              reject(err);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              videoUrlsTemp.push(downloadURL);
              resolve();
            },
          );
        });
      }

      await addDoc(collection(db, "homes"), {
        title,
        address,
        price: price ? Number(price) : undefined,
        perches: perches ? Number(perches) : undefined,
        landUnit,
        description,
        propertyFeatures,
        town,
        city,
        propertyType,
        mapUrl,
        imageUrls: imageUrlsTemp,
        videoUrls: videoUrlsTemp,
        createdAt: new Date(),
      });

      setSuccessMessage("Land listed successfully!");
      setTitle("");
      setAddress("");
      setPrice("");
      setPerches("");
      setDescription("");
      setPropertyFeatures([]);
      setTown("");
      setCity("");
      setPropertyType("house");
      setMapUrl("");
      setImageFiles([]);
      setImageUrls([]);
      setVideoFiles([]);
      setVideoUrls([]);
    } catch (err) {
      setError("Failed to list the land. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        List a New Land
      </h2>

      {error && (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Input */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Input */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Land Size with Unit Selector */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Land Size
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={perches}
              onChange={(e) => setPerches(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter size in ${landUnit}`}
            />
            <select
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value)}
              className="px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="perches">Perches</option>
              <option value="acres">Acres</option>
            </select>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Select the appropriate unit for the land size.
          </p>
        </div>

        {/* Other Fields */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Features Checkbox */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Property Features
          </label>
          <div className="flex flex-wrap py-4 px-4">
            <label className="w-1/2">
              <input
                type="checkbox"
                value="Beach Front/Sea View"
                checked={propertyFeatures.includes("Beach Front/Sea View")}
                onChange={handleFeatureChange}
              />
              Beach Front/Sea View
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="Mainline Water"
                checked={propertyFeatures.includes("Mainline Water")}
                onChange={handleFeatureChange}
              />
              Mainline Water
            </label>
          </div>
        </div>

        {/* Town, City, and Other Inputs */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Town
          </label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Type */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Map URL */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Map URL
          </label>
          <input
            type="text"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        {/* Image Preview */}
        <div className="form-group">
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Image preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Upload Videos (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Listing...
            </div>
          ) : (
            "List Land"
          )}
        </button>
      </form>
    </div>
  );
};

export default ListLands;

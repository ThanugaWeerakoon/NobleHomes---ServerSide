import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../firebase";

const ListHomes = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [parkingSpace, setParkingSpace] = useState("");
  const [perches, setPerches] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [noOfFloors, setNoOfFloors] = useState("");
  const [furnishedStatus, setFurnishedStatus] = useState("unfurnished");
  const [ageOfBuilding, setAgeOfBuilding] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  const [description, setDescription] = useState("");
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("house");
  const [mapUrl, setMapUrl] = useState("");

  const [imageFiles, setImageFiles] = useState([]); // For storing multiple images
  const [imageUrls, setImageUrls] = useState([]); // For storing image URLs after upload
  const [videoFiles, setVideoFiles] = useState([]); // For storing multiple videos
  const [videoUrls, setVideoUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const db = getFirestore(getApp()); // Initialize Firestore
  const storage = getStorage(getApp()); // Initialize Firebase Storage

  // Handle image upload to Firebase Storage
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Handle video upload to Firebase Storage
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !address ||
      !price ||
      !bedrooms ||
      !bathrooms ||
      !rooms ||
      !perches ||
      !floorArea ||
      !noOfFloors ||
      !description ||
      !town ||
      !city ||
      !propertyType ||
      imageFiles.length === 0
    ) {
      setError(
        "Please fill in all fields and upload at least one image. Video is optional.",
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Step 1: Upload the images to Firebase Storage
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

      // Step 2: Upload the videos to Firebase Storage (if any)
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

      // Step 3: Add the home data to Firestore
      await addDoc(collection(db, "homes"), {
        title,
        address,
        price,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        rooms: Number(rooms),
        parkingAvailable,
        parkingSpace: Number(parkingSpace),
        perches: Number(perches),
        floorArea: Number(floorArea),
        noOfFloors: Number(noOfFloors),
        furnishedStatus,
        ageOfBuilding,
        roadWidth: Number(roadWidth),
        description,
        propertyFeatures,
        town,
        city,
        propertyType,
        mapUrl,
        imageUrls: imageUrlsTemp, // Store the image URLs from Firebase Storage
        videoUrls: videoUrlsTemp, // Store the video URLs from Firebase Storage
        createdAt: new Date(),
      });

      setSuccessMessage("House listed successfully!");
      setTitle("");
      setAddress("");
      setPrice("");
      setBedrooms("");
      setBathrooms("");
      setRooms("");
      setParkingAvailable(false);
      setParkingSpace("");
      setPerches("");
      setFloorArea("");
      setNoOfFloors("");
      setFurnishedStatus("unfurnished");
      setAgeOfBuilding("");
      setRoadWidth("");
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
      setError("Failed to list the home. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        List a New Home
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
        {/* Title */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bedrooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bathrooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Bathrooms
          </label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Number of Rooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Rooms
          </label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parking Availability */}
        <div className="form-group flex items-center">
          <input
            type="checkbox"
            checked={parkingAvailable}
            onChange={() => setParkingAvailable(!parkingAvailable)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Parking Available
          </label>
        </div>

        {/* Parking Spaces */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Parking Spaces
          </label>
          <input
            type="number"
            value={parkingSpace}
            onChange={(e) => setParkingSpace(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Perches */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Perches
          </label>
          <input
            type="number"
            value={perches}
            onChange={(e) => setPerches(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Floor Area */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Floor Area
          </label>
          <input
            type="number"
            value={floorArea}
            onChange={(e) => setFloorArea(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Number of Floors */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Floors
          </label>
          <input
            type="number"
            value={noOfFloors}
            onChange={(e) => setNoOfFloors(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Furnished Status */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Furnished Status
          </label>
          <select
            value={furnishedStatus}
            onChange={(e) => setFurnishedStatus(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="unFurnished">Un-Furnished</option>
            <option value="furnished">Furnished</option>
            <option value="semiFurnished">Semi-Furnished</option>
          </select>
        </div>

        {/* Age Of Building */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Age of Building
          </label>
          <input
            value={ageOfBuilding}
            onChange={(e) => {
              const value = e.target.value.replace(" years", "");
              setAgeOfBuilding(value);
            }}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Age Of Building */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Approach road width
          </label>
          <input
            type="number"
            value={roadWidth}
            onChange={(e) => {
              const value = e.target.value.replace(" ft", "");
              setRoadWidth(value);
            }}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Features */}
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
            <label className="w-1/2">
              <input
                type="checkbox"
                value="Lawn Garden"
                checked={propertyFeatures.includes("Lawn Garden")}
                onChange={handleFeatureChange}
              />
              Lawn Garden
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="Garage"
                checked={propertyFeatures.includes("Garage")}
                onChange={handleFeatureChange}
              />
              Garage
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="colonial-architecture"
                checked={propertyFeatures.includes("colonial-architecture")}
                onChange={handleFeatureChange}
              />
              Colonial-architecture
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="maid's Toilet"
                checked={propertyFeatures.includes("maid's Toilet")}
                onChange={handleFeatureChange}
              />
              Maid's Toilet
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="maid's Room"
                checked={propertyFeatures.includes("maid's Room")}
                onChange={handleFeatureChange}
              />
              Maid's Room
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="home-security-system"
                checked={propertyFeatures.includes("home-security-system")}
                onChange={handleFeatureChange}
              />
              Home Security System
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="brand-new"
                checked={propertyFeatures.includes("brand-new")}
                onChange={handleFeatureChange}
              />
              Brand New
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="overheated-water-storage"
                checked={propertyFeatures.includes("overheated-water-storage")}
                onChange={handleFeatureChange}
              />
              Overheated Water Storage
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="luxury-spects"
                checked={propertyFeatures.includes("luxury-spects")}
                onChange={handleFeatureChange}
              />
              Luxury Spects
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="overheated-water-storage"
                checked={propertyFeatures.includes("overheated-water-storage")}
                onChange={handleFeatureChange}
              />
              Overheated Water Storage
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="gated-community"
                checked={propertyFeatures.includes("gated-community")}
                onChange={handleFeatureChange}
              />
              Gated Community
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="attached-toilets"
                checked={propertyFeatures.includes("attached-toilets")}
                onChange={handleFeatureChange}
              />
              Attached Toilets
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="roof-top-garden"
                checked={propertyFeatures.includes("roof-top-garden")}
                onChange={handleFeatureChange}
              />
              Roof Top Garden
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="hot-water"
                checked={propertyFeatures.includes("hot-water")}
                onChange={handleFeatureChange}
              />
              Hot Water
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="ac-rooms"
                checked={propertyFeatures.includes("ac-rooms")}
                onChange={handleFeatureChange}
              />
              AC Rooms
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="3-phase-electricity"
                checked={propertyFeatures.includes("3-phase-electricity")}
                onChange={handleFeatureChange}
              />
              3 Phase Electricity
            </label>
            <label className="w-1/2">
              <input
                type="checkbox"
                value="24-hour-security"
                checked={propertyFeatures.includes("24-hour-security")}
                onChange={handleFeatureChange}
              />
              24 Hour Security
            </label>
          </div>
        </div>

        {/* Town */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Town
          </label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
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
            required
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
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Images (Select 5 or more)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Previews */}
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
            Videos (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 space-y-1">
            {videoFiles.map((file, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 p-2 bg-gray-100 rounded"
              >
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            "List Home"
          )}
        </button>
      </form>
    </div>
  );
};

export default ListHomes;

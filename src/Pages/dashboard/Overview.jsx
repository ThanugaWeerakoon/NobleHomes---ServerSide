import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import EditHome from "./EditHome"; // Import EditHome component

const Overview = () => {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [homeToDelete, setHomeToDelete] = useState(null);

  const db = getFirestore(getApp());

  useEffect(() => {
    const fetchHomes = async () => {
      const homesCollection = collection(db, "homes");
      const homesSnapshot = await getDocs(homesCollection);
      const homesList = homesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHomes(homesList);
    };

    fetchHomes();
  }, [db]);
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "Price not available";

    return `LKR ${Number(price).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleDelete = async () => {
    if (homeToDelete) {
      await deleteDoc(doc(db, "homes", homeToDelete.id));
      setHomes(homes.filter((home) => home.id !== homeToDelete.id));
      setIsDeleteModalOpen(false); // Close the delete confirmation modal
      setHomeToDelete(null); // Reset home to delete
    }
  };

  const handleEdit = (home) => {
    setSelectedHome(home);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedHome(null);
  };

  const openDeleteModal = (home) => {
    setHomeToDelete(home);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setHomeToDelete(null);
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
        Noble Homes
      </h2>
      <p className="text-center text-xl mb-6 text-gray-600">
        Your trusted platform for premium real estate
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.length > 0 ? (
          homes.map((home) => (
            <div
              key={home.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {home.title}
              </h3>
              <p className="text-gray-600 mb-2">{home.address}</p>
              <p className="text-gray-800 mb-2">
                Price: {formatPrice(home.price)}
              </p>
              <p className="text-gray-600 mb-2">Bedrooms: {home.bedrooms}</p>
              <p className="text-gray-600 mb-4">Bathrooms: {home.bathrooms}</p>
              <p className="text-gray-500 text-sm mb-4">{home.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(home)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(home)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">
            No homes listed yet.
          </p>
        )}
      </div>

      {/* EditHome modal */}
      {isEditing && selectedHome && (
        <EditHome home={selectedHome} onClose={closeEditModal} />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this home?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;

import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import process from "process";
import Modal from "../../components/global/Modal";

const UserProfilePage = () => {
  const { userData, setUserData, loading } = useUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    url_to_image: userData?.url_to_image || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[1]);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;

      let imageUrl = formData.url_to_image;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

        const response = await axios.post(cloudinaryUrl, formData);
        imageUrl = response.data.secure_url;
      }

      const response = await axios.put(
        "http://localhost:8000/api/profile",
        {
          email: formData.email,
          connected_brokers: userData.connected_brokers,
          preferences: userData.preferences,
          url_to_image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);
      setEditing(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = () => {
    setShowModal(false);
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen font-semibold">
        Please
        <span className="mx-1">
          <Link to="/login" className="text-indigo-500 underline">
            log in
          </Link>
        </span>
        to view your profile.
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-1/4 h-full bg-gray-100 border-r border-gray-300 flex flex-col">
          <h2 className="text-xl font-bold text-gray-700 p-6 border-b">
            Settings
          </h2>
          <ul className="flex-grow space-y-4 p-6">
            <li className="cursor-pointer py-3 px-4 bg-gray-200 rounded-md font-medium">
              Profile
            </li>
            <li className="cursor-pointer py-3 px-4 hover:bg-gray-200 rounded-md font-medium text-gray-500">
              Account ( under maintenance )
            </li>
            <li className="cursor-pointer py-3 px-4 hover:bg-gray-200 rounded-md font-medium text-gray-500">
              Privacy ( under maintenance )
            </li>
          </ul>
          <div className="p-6 border-t">
            <p className="text-sm text-gray-500">Multi-Broker App © 2024</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full p-10">
          <div className="bg-white shadow-lg rounded-lg h-full p-8 border">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              User Profile
            </h1>
            {editing ? (
              <div>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-2 p-3 border rounded-lg w-full"
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 p-3 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="url_to_image"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="url_to_image"
                    name="url_to_image"
                    onChange={handleImageChange}
                    className="mt-2 p-3 border rounded-lg w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600">Username</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userData.username}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userData.email}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600">
                    Profile Image
                  </p>
                  {userData.url_to_image && (
                    <img
                      src={userData.url_to_image}
                      alt="Profile"
                      className="w-32 h-32 rounded-full"
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <Modal
            title="Confirm Logout"
            content="Are you sure you want to log out?"
            onClose={() => setShowModal(false)}
            onConfirm={handleLogout}
            confirmText="Logout"
            cancelText="Cancel"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;

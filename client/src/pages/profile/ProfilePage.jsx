import { useEffect, useState } from "react";
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout"; // Assuming the layout is stored here
import LogoutButton from "../../components/auth/LogoutButton";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No token found, please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          `Failed to fetch profile. ${error.message || "An error occurred."}`
        );
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <AuthLayout title="Loading Profile">
        <div className="text-center py-10">Loading...</div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout title="Error">
        <div className="text-center py-10 text-red-500">{error}</div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="User Profile">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">User Profile</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-700">Username:</label>
            <span className="text-lg">{userProfile.username}</span>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-700">Email:</label>
            <span className="text-lg">{userProfile.email}</span>
          </div>

          {/* You can add more fields here, like account settings or other info */}
          <LogoutButton
            className={"border border-gray-300 px-4 py-2 rounded-md"}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserProfile;

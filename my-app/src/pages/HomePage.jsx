import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Use your backend API URL
        const res = await axios.get("http://localhost:5000/api/profile/view", {
          withCredentials: true, 
          headers: { "Content-Type": "application/json" },
        });
    
  console.log(user)
        setUser(res.data.data || res.data); // flexible depending on your API response
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCopyLink = () => {
    const profileURL = `${window.location.origin}/profile/${user?._id}`;
    navigator.clipboard.writeText(profileURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-700 text-xl font-medium">Loading profile...</p>
      </div>
    );
  }

  // ⚠️ Error or No User
  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-600 text-lg">
          {error || "No user data found. Please log in."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-10">
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto my-10 rounded-xl shadow-lg bg-white relative overflow-hidden">
        {/* --- Cover Image --- */}
        <div className="relative">
          <img
            src={
              user?.backgroundImage ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            }
            alt="Cover"
            className="w-full h-48 sm:h-64 object-cover"
          />

          {/* --- Profile Image --- */}
          <img
            src={
              user?.image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white -bottom-12 left-6 shadow-md"
          />
        </div>

        {/* --- Profile Details --- */}
        <div className="pt-16 px-6 sm:px-10 pb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-blue-600 text-sm sm:text-base font-medium">
            {user?.email}
          </p>

          {user?.city && user?.country && (
            <div className="mt-2 text-gray-600 text-sm sm:text-base">
              {user?.city}, {user?.country}
            </div>
          )}

          {/* --- Bio / About --- */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800">About</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {user?.bio ||
                "This user hasn’t added a bio yet. Write something about yourself here."}
            </p>
          </div>

        

          {/* --- Contact Info --- */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Phone: {user?.phone || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Email: {user?.email || "Not provided"}
            </p>
          </div>

          {/* --- Buttons --- */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/update-profile"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-medium shadow-md text-center"
            >
              Edit Profile
            </a>
            <button
              onClick={handleCopyLink}
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 py-2 px-6 rounded-full font-medium shadow-md text-center"
            >
              {copied ? "Link Copied!" : "Copy Profile Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

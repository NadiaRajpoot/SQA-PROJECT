import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // 👈 custom axios instance with credentials

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    bio: "",
    skills: "",
    image: "",
    backgroundImage: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/view", {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load user data.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    return newErrors;
  };

  // ✅ Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put("http://localhost:5000/api/profile/update", formData, {
        withCredentials: true,
      });
      setMessage(res.data.msg || "✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete profile
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.delete("http://localhost:5000/api/profile/delete", {
        withCredentials: true,
      });
      setMessage(res.data.msg || "❌ Profile deleted successfully!");
      // Optionally redirect after delete
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error deleting profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        {/* --- Left Section --- */}
        <div className="flex flex-col items-center justify-center md:w-1/3 text-center relative">
          <div className="absolute -top-10 w-full h-40 rounded-2xl overflow-hidden">
            <img
              src={formData.backgroundImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="relative mt-20">
            <img
              src={formData.image}
              alt="User profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-[#2a61eb] shadow-md"
            />
            <div className="absolute bottom-2 right-3 bg-[#2a61eb] text-white text-xs px-2 py-1 rounded-full shadow-md">
              Edit
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-3">
            {formData.firstName || "Your Name"} {formData.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{formData.email}</p>
          <p className="text-gray-500 text-sm mt-1">{formData.city || "Your City"}</p>
        </div>

        {/* --- Right Section (Form) --- */}
        <div className="md:w-2/3 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Update Profile
          </h2>

          {message && (
            <div
              className={`mb-5 p-3 text-center rounded-xl font-medium ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : message.includes("❌")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
            </div>

            <div>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio..."
                rows="3"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none resize-none"
              />
            </div>

          

            <div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                name="backgroundImage"
                value={formData.backgroundImage}
                onChange={handleChange}
                placeholder="Background Image URL"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2a61eb] outline-none"
              />
            </div>

            {/* --- Buttons --- */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-[#2a61eb] hover:bg-[#234dcc] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                Delete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

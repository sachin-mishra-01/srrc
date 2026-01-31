import { useState, useEffect } from "react";
import { useData } from "../context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProfile() {
  const { pfdata, setPfData } = useData();
  const { username } = useParams(); // dynamic route
  const navigate = useNavigate();

  // Local state for user info form
  const [id, setid] = useState("");
  const [fullname, setFullname] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [bio, setBio] = useState("");
  const [needs, setNeeds] = useState(""); // <-- NEW: Needs
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize form fields when pfdata is available
  useEffect(() => {
    if (pfdata && typeof pfdata === "object") {
      setid(pfdata._id || "");
      setFullname(pfdata.fullname || "");
      setUserNameInput(pfdata.username || "");
      setBio(pfdata.bio || "");
      setNeeds(pfdata.needs || ""); // <-- initialize Needs
    }
  }, [pfdata]);

  // --- PROFILE PHOTO CHANGE ---
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);
    formData.append("un", username);

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/profile`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setPfData(data.user);
      else alert(data.message || "Upload failed");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePasswordSubmit = async () => {
    if (!password) return alert("Enter a new password");
    if (password !== confirmPassword) return alert("Passwords do not match!");

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/chpwd`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ un: username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password changed successfully");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Password change failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearPhoto = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/chprofile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ un: username }),
      });
      const data = await res.json();
      if (res.ok) setPfData(data.user);
      else alert(data.message || "Clearing photo failed");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- USER INFO SUBMIT ---
  const handleUserInfoSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/update`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          un: username,
          fullname,
          username: userNameInput,
          bio,
          needs, // <-- include Needs
          id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPfData(data.user);
        navigate(`/${userNameInput}/profile`);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- LOADING STATE ---
  if (!pfdata) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-[80%] max-w-3xl flex flex-col gap-8">
        {/* --- PROFILE PHOTO SECTION --- */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Change Profile Photo</h2>
          <img
            src={
              pfdata?.profilePhoto ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="flex gap-2">
            <label className="bg-green-600 text-white px-3 py-1 text-sm rounded-md cursor-pointer">
              Upload
              <input
                type="file"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            <button
              onClick={handleClearPhoto}
              className="bg-red-600 text-white px-3 py-1 text-sm rounded-md"
            >
              Clear
            </button>
          </div>
          {loading && <p className="text-sm text-gray-500">Uploading...</p>}
        </section>

        {/* --- USER INFO FORM SECTION --- */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-4">Edit User Info</h2>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={userNameInput}
              onChange={(e) => {
               if (e.target.value.length <= 50) setUserNameInput(e.target.value);
              }}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => {
                if (e.target.value.length <= 50) setFullname(e.target.value);
              }}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Bio</label>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => {
                if (e.target.value.length <= 50) setBio(e.target.value);
              }}
              className="w-full border px-3 py-2 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">{bio.length}/500 characters</p>
          </div>

          {/* Needs */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Needs</label>
            <textarea
              placeholder="Your skill needs"
              value={needs}
              onChange={(e) => {
                if (e.target.value.length <= 500) setNeeds(e.target.value);
              }}
              className="w-full border px-3 py-2 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">{needs.length}/500 characters</p>
          </div>

          <button
            onClick={handleUserInfoSubmit}
            className="bg-blue-600 text-white px-3 py-2 rounded-md mt-2"
            disabled={loading}
          >
            Save User Info
          </button>
        </section>

        {/* --- CHANGE PASSWORD SECTION --- */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <button
            onClick={handleChangePasswordSubmit}
            className="bg-green-600 text-white px-3 py-2 rounded-md mt-2"
            disabled={loading}
          >
            Change Password
          </button>
        </section>
      </div>
    </div>
  );
}

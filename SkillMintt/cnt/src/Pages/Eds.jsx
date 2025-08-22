import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Edsk() {
  const { skill, setSkill } = useOutletContext(); // Get skill and setter from SkillD
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Loading state for API calls

  if (!skill) return <p className="text-white">Loading skill...</p>;

  // Thumbnail state
  const [showThumbnailInput, setShowThumbnailInput] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Content state
  const [showContentInput, setShowContentInput] = useState(false);
  const [contentFile, setContentFile] = useState(null);

  // Text fields state
  const [title, setTitle] = useState(skill.name);
  const [description, setDescription] = useState(skill.description);
  const [price, setPrice] = useState(skill.price);
  const [tags, setTags] = useState(skill.tags.join(","));

  // Handlers
  // Update Thumbnail
const handleThumbnailChange = async () => {
  if (!thumbnailFile) return alert("Select an image file");

  const formData = new FormData();
  formData.append("thumbnail", thumbnailFile);
  formData.append("skillId", skill._id);

  try {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/upload/thbn", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Thumbnail updated successfully");
      // Update all skill fields, not just thumbnail
      setSkill((prev) => ({ ...prev, ...data.skdata }));
      setThumbnailFile(null);
    } else {
      alert(data.message || "Thumbnail update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating thumbnail");
  } finally {
    setLoading(false);
    setShowThumbnailInput(false);
  }
};

// Update Skill Content (media)
const handleContentChange = async () => {
  if (!contentFile) return alert("Select a file");

  const formData = new FormData();
  formData.append("skillFile", contentFile);
  formData.append("skillId", skill._id);

  try {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/upload/skf", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Skill content updated successfully");
      setSkill((prev) => ({ ...prev, ...data.skill }));
      setContentFile(null);
    } else {
      alert(data.message || "Content update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating content");
  } finally {
    setLoading(false);
    setShowContentInput(false);
  }
};




  const handleTextFieldsSave = async () => {
    try {
      if(price < 0){
        alert("price must be positive");
        return;
      }
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/upload/upsk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          skillId: skill._id,
          title,
          description,
          price,
          tags: tags.split(/[\s,]+/).filter(t => t)    // remove empty strings
           }),
        
      });
      const data = await res.json();
      if (res.ok) {
        alert("Skill text updated successfully");
        setSkill((prev) => ({
          ...prev,
          name: title,
          description,
          price,
          tags: tags.split(",").map((t) => t.trim()),
        }));
      } else {
        alert(data.message || "Text update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating text");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/upload/dlt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          skillId: skill._id,
         
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Skill deleted successfully");
        navigate(-2);
      } else {
        alert(data.message || "Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-zinc-900 min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Edit Skill</h2>

      {loading && <p className="mb-4 text-yellow-400">Processing...</p>}

      {/* Thumbnail Section */}
      <div className="mb-6 w-full max-w-md flex flex-col items-center">
        <h3 className="font-semibold mb-2">Thumbnail</h3>
        {showThumbnailInput ? (
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={handleThumbnailChange}
              className="px-4 py-2 bg-blue-600 rounded text-white"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowThumbnailInput(true)}
            className="px-4 py-2 bg-green-600 rounded text-white"
          >
            Change Thumbnail
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="mb-6 w-full max-w-md flex flex-col items-center">
        <h3 className="font-semibold mb-2">Skill Content</h3>
        {showContentInput ? (
          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => setContentFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={handleContentChange}
              className="px-4 py-2 bg-blue-600 rounded text-white"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowContentInput(true)}
            className="px-4 py-2 bg-green-600 rounded text-white"
          >
            Change Skill Content
          </button>
        )}
      </div>

      {/* Text Fields Section */}
      <div className="mb-6 w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          placeholder="Price"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          placeholder="Tags (comma separated)"
        />
        <button
          type="button"
          onClick={handleTextFieldsSave}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Save Changes
        </button>
      </div>

      {/* Delete Skill Button */}
      <button
        onClick={handleDeleteSkill}
        className="px-4 py-2 bg-red-600 rounded text-white mt-6"
      >
        Delete Skill
      </button>
    </div>
  );
}

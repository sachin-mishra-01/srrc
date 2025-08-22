import React, { useState } from "react";
import { useData } from "../context/AppContext.jsx";
import { Link, useParams } from "react-router-dom";
function SkillPage() {
  const { username } = useParams();
  const { un, pfdata, setPfData } = useData();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false); // NEW

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file || !name || !description || !price || !tags) {
      alert("All fields are required!");
      return;
    }
     
    if(price < 0){
      alert("price must be positive");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tags", tags);
    formData.append("un", un);

    try {
      setUploading(true); // start uploading
      const res = await fetch("http://localhost:5000/api/upload/skill", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Skill uploaded successfully!");
        setPfData(data.user);

        // reset form
        setFile(null);
        setName("");
        setDescription("");
        setPrice("");
        setTags("");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false); // stop uploading
    }
  };

  return (
    <div className="bg-zinc-900 text-white">
      {/* Previous Section 1 */}
      <section className="p-8 bg-zinc-800">
        <h1 className="text-3xl font-bold">Section 1</h1>
        {/* Your existing content */}
      </section>

      {/* Previous Section 2 */}
      <section className="p-8 bg-zinc-700">
        <h2 className="text-2xl font-semibold">Section 2</h2>
        {/* Your existing content */}
      </section>

      {/* New Middle Upload Section */}
      <section className="p-8 bg-zinc-800">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Your Skill</h2>
        <form
          className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-lg shadow-lg"
          onSubmit={handleUpload}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Skill File</label>
            <input
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-600 p-2 rounded bg-zinc-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-600 p-2 rounded bg-zinc-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-600 p-2 rounded bg-zinc-800"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-600 p-2 rounded bg-zinc-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-600 p-2 rounded bg-zinc-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded w-full transition ${
              uploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Skill"}
          </button>
        </form>
      </section>

      {/* Skills Display Section */}
      {/* Skills Display Section */}
        
        <section className="rounded-lg shadow p-6 w-full">
  <h2 className="text-lg font-semibold mb-4 text-white">Skills</h2>

  {!pfdata?.skills || pfdata.skills.length === 0 ? (
    <h1 className="text-gray-400">You have not added any skill to this platform</h1>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pfdata.skills.map((skill, index) => (
        <Link
          key={index}
          to={`/${username}/${skill._id}`}  // 👈 dynamic username + skillId
          className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-zinc-800"
        >
          {/* Skill Media or Fallback Thumbnail */}
          <div className="mb-3">
            {skill?.media && skill.media.length > 0 ? (
              <img
                src={skill.media[0].url}
                alt={skill.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-indigo-600 rounded-lg text-white font-bold text-lg">
                {skill.name}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-1 text-white">{skill.name}</h3>

          {/* Description & Price */}
          <div className="text-sm text-white mb-2 flex justify-between">
            <p className="line-clamp-2 max-w-[70%]">{skill.description}</p>
            <h4 className="font-semibold">₹{skill.price}</h4>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 line-clamp-1">
            {skill?.tags && skill.tags.length > 0 ? (
              skill.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs font-medium text-black"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">No Tags</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )}
</section>


    </div>
  );
}

export default SkillPage;

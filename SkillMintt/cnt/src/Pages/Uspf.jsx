import { useState,useEffect } from "react";
import { useData } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
export default function Profile() {
  const { uusername ,username } = useParams();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/find/schpf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       body :JSON.stringify({uusername})
    });
        const data = await res.json();
        
        if (res.ok) {
        setUser(data.pfdata);
      } else {
        alert(data.message || "Upload failed");
      }
      } catch (err) {
        console.error("Error fetching feed:", err);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center p-6">
      <div className="w-[80%] max-w-5xl flex flex-col items-center">
        {/* Top Section */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8 items-center justify-center md:items-center mb-6 w-full ">
          {/* Left: Profile Photo */}
          <div className="flex flex-col items-center w-1/3">
            <img
              src={user?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
 
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
           
          </div>

          {/* Right: User Info */}
          <div className="flex flex-col justify-center gap-1 flex-grow w-2/3 text-sm">
            <h1 className="text-lg font-bold">{user?.username || "Loading"}</h1>
            <p className="text-gray-600">{user?.fullname || "Loading"}</p>
            <p className="text-gray-700">{user?.email || "Loading"}</p>
            <p className="text-xs text-gray-500">
              {user?.bio || "Loading"}
            </p>
          </div>

           
        </section>
        {/* Needs Section */}
          <section className=" rounded-lg shadow p-6 w-full mb-6 ">
          <h2 className="text-lg font-semibold mb-2">Needs</h2>
          <p className="text-black-700">
            {user?.needs || "This user has not added any skill needs yet."}
          </p>
        </section>


        {/* Skills Section */}
   {/* Skills Section */}
       <section className="rounded-lg shadow p-6 w-full">
  <h2 className="text-lg font-semibold mb-4 ">Skills</h2>

  {!user?.skills || user.skills.length === 0 ? (
    <h1 className="text-gray-400">You have not added any skill to this platform</h1>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {user.skills.map((skill, index) => (
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
    </div>
  );
}

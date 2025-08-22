import { useEffect, useState } from "react";
import { FaSearch, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/AppContext";
import { useParams } from "react-router-dom";
export default function Feed() {
  const { username } = useParams();
  const { pfdata } = useData();
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchMode, setSearchMode] = useState("user"); // "user" or "skill"
  const [minRating, setMinRating] = useState("");

  const navigate = useNavigate();

  // Fetch default feed (all skills)
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/find/feed");
        const data = await res.json();
        
        setSkills(data.skills || []);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  // Search function
   const handleSearch = async () => {
  if (!searchText) return;

  try {
    const body = {
      search: searchText,
      mode: searchMode,
      minRating: minRating || 0 // default to 1 if empty
    };

    const res = await fetch("http://localhost:5000/api/find/sch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    
    if (searchMode === "user") {
      setUsers(data.users || []);
      setSkills([]);
    } else if (searchMode === "skill") {
      setSkills(data.skills || []);
      setUsers([]);
    }
  } catch (err) {
    console.error("Search error:", err);
  }
};


  return (
    <>
      {/* Header with search */}
      <header className="bg-zinc-300 p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center border rounded-md px-3 py-2 bg-gray-50 gap-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow bg-transparent outline-none text-gray-700"
          />
          <select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="user">Search User by Name</option>
            <option value="skill">Search Skill by Tag</option>
          </select>
          {searchMode === "skill" && (
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Min Rating</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5</option>
            </select>
          )}
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-3 py-1 rounded font-bold"
          >
            Search
          </button>
        </div>
      </header>

      {/* Feed content */}
      <main className="flex-grow p-6 overflow-auto max-w-4xl mx-auto">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <>
            {/* User results */}
            {users.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      onClick={username !== user?.username ?() => navigate(`/${username}/prf/${user.username}`):() => navigate(`/${username}/profile`)}
                      className="flex items-center border p-3 rounded shadow hover:shadow-lg cursor-pointer gap-3"
                    >
                      <img
                        src={user.profilePhoto || "/default-profile.png"}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{user.fullname}</p>
                        <p className="text-gray-500">{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill results */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill) => {
                    const owner = skill.user || {};
                    const thumbnail = skill.thumbnail || skill.media?.url || "";
                    const ratingScore = Math.round(skill.ratingScore || 0);

                    return (
                      <div
                        key={skill._id}
                        onClick={() => navigate(`/${username}/${skill._id}`)}
                        className="border rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
                      >
                        {/* Owner Info */}
                        <div className="flex items-center gap-3 p-3">
                          <img
                            src={owner.profilePhoto || "/default-profile.png"}
                            alt={owner.username || "user"}
                            className="w-10 h-10 rounded-full border object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {owner.username || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500">{owner.fullname || ""}</p>
                          </div>
                        </div>

                        {/* Thumbnail */}
                        {thumbnail && (
                          <img
                            src={thumbnail}
                            alt={skill.name}
                            className="w-full h-48 object-cover"
                          />
                        )}

                        {/* Details */}
                        <div className="p-3">
                          <h2 className="text-lg font-semibold">{skill.name}</h2>
                          <p className="text-gray-600 mt-1">{skill.description}</p>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) =>
                              star <= ratingScore ? (
                                <FaStar key={star} className="text-yellow-500" size={16} />
                              ) : (
                                <FaRegStar key={star} className="text-gray-300" size={16} />
                              )
                            )}
                            <span className="text-gray-600 text-sm ml-1">
                              ({skill.ratings || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No results */}
            {users.length === 0 && skills.length === 0 && (
              <p className="text-gray-600">No results found</p>
            )}
          </>
        )}
      </main>
    </>
  );
}

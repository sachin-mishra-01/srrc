import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaTools, FaComments,FaBook } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import { useEffect , useState } from "react";
import { useData } from "../context/AppContext";
 function Home() {
  const {pfdata} = useData();
  const navigate = useNavigate();
  const { username } = useParams(); // get username from URL
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (pfdata?.exns) {
      const count = pfdata.exns.filter(c => c.status === "pending").length;
      setPendingCount(count);
    }
  }, [pfdata]);

  return (
    <div className="flex  bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-20 bg-zinc-300 shadow-md flex flex-col items-center py-6 space-y-10 sticky top-0">
        
        <button
          title="Home"
          className="text-3xl text-orange-600 hover:text-orange-800"
          onClick={() => navigate(`/${username}`)}
        >
          <AiFillHome />
        </button>


        <button
          title="Profile"
          className="text-3xl text-blue-600 hover:text-blue-800"
          onClick={() => navigate(`/${username}/profile`)} // navigate correctly
        >
          <FaUserCircle />
        </button>
        <button
          title="My Skills"
          className="text-3xl text-green-600 hover:text-green-800"
          onClick={() => navigate(`/${username}/skill`)}
        >
          <FaTools />
        </button>
       <button
  title="course Notification"
  className="relative text-3xl text-purple-600 hover:text-purple-800"
  onClick={() => navigate(`/${username}/crsntf`)}
>
  <FaComments />
  {pendingCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
      {pendingCount}
    </span>
  )}
</button>

         <button
          title="My Courses"
          className="text-3xl text-red-600 hover:text-red-800"
          onClick={() => navigate(`/${username}/courses`)}
        >
          <FaBook />
        </button>
        <div className="w-px h-[340px]"> </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;

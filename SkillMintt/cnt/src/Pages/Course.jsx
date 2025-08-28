import { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams(); // will be undefined if at /courses

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/find/crs`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setCourses(data);
        else alert(data.message || "Failed to fetch courses");
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading courses...</div>;

  // If at /courses/:courseId, render only the Outlet (detail page)
  if (courseId) {
    return <Outlet />;
  }

  // Else, render only the course list
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">📚 My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg cursor-pointer transition"
            onClick={() => navigate(`${course._id}`)}
          >
            {/* Owner info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={course.owner?.profilePhoto || "/default-avatar.png"}
                alt={course.owner?.fullname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{course.owner?.fullname}</span>
                <span className="text-sm text-gray-500">@{course.owner?.username}</span>
              </div>
            </div>

            {/* Thumbnail */}
            {course.skill?.thumbnail ? (
              <img
                src={course.skill.thumbnail}
                alt={course.skill.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-3 text-gray-500">
                No Image
              </div>
            )}

            <h2 className="text-lg font-semibold text-gray-900">{course.skill?.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{course.skill?.description}</p>

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;

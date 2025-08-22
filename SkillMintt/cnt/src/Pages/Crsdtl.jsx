


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/find/crsdtl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ courseId }),
        });
        const data = await res.json();
        if (res.ok) setCourse(data);
        else alert(data.message || "Failed to fetch course detail");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [courseId]);

  const submitRating = async (rating) => {
    try {
      const res = await fetch("http://localhost:5000/api/upload/rt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ skillId: course.skill._id, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        setCourse((prev) => ({
          ...prev,
          skill: {
            ...prev.skill,
            ratingScore: data.ratingScore,
            ratings: data.ratings,
          },
        }));
      } else alert(data.message || "Failed to submit rating");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading course...</p>;
  if (!course) return <p className="p-6 text-gray-600">Course not found.</p>;

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white max-w-4xl mx-auto flex flex-col gap-4">
      {/* Owner */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={course.owner?.profilePhoto}
          alt={course.owner?.fullname}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{course.owner?.fullname}</h2>
          <p className="text-sm text-gray-500">@{course.owner?.username}</p>
        </div>
      </div>

      {/* Thumbnail */}
      {course.skill?.thumbnail && (
        <img
          src={course.skill.thumbnail}
          alt={course.skill.name}
          className="w-full h-60 object-cover rounded-lg"
        />
      )}

      {/* Title & Description */}
      <h3 className="text-xl font-semibold">{course.skill?.name}</h3>
      <p className="text-gray-700 mt-2">{course.skill?.description}</p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-2">
        {course.skill.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Media */}
      <div className="mt-4">
        {course.skill?.media ? (
          course.skill.media.type === "pdf" ? (
            <a
              href={course.skill.media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View PDF
            </a>
          ) : (
            <img
              src={course.skill.media.url}
              alt="Skill Media"
              className="w-full  object-cover rounded"
            />
          )
        ) : (
          <p className="text-gray-400">No media available.</p>
        )}
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <span>
          ⭐ {course.skill.ratingScore?.toFixed(1) ?? 0} ({course.skill.ratings ?? 0})
        </span>
        <div className="flex gap-1 ml-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {
                setUserRating(star);
                submitRating(star);
              }}
              className={`text-2xl ${
                (hoverRating || userRating) >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail; 
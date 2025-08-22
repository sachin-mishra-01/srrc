import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";

function Notifications() {
  const [ntfs, setNtfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  useEffect(() => {
    const fetchNtfs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/find/exns`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        

        if (res.ok) {
          // ✅ Sort: Pending first, then others; latest first
          const sorted = (data.ntfs || []).sort((a, b) => {
            // Pending always first
            if (a.status === "Pending" && b.status !== "Pending") return -1;
            if (b.status === "Pending" && a.status !== "Pending") return 1;

            // Otherwise sort by createdAt (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setNtfs(sorted);
        } else {
          alert(data.message || "Failed to load Notifications");
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNtfs();
  }, [username]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid gap-4">
      {ntfs.length === 0 && <p>No notifications yet</p>}

      {/* Show list only if not inside detail */}
      {!location.pathname.includes("/crsntf/") &&
        ntfs.map((ntf) => {
          const isRequester = ntf.user?.username === username;
          const isPending = ntf.status === "Pending";

          return (
        <div
  key={ntf._id}
  className={`relative flex flex-col p-4 border rounded-lg shadow cursor-pointer transition 
    ${isPending ? "border-blue-400 bg-blue-50" : "hover:bg-gray-100"}
  `}
  onClick={() => navigate(ntf._id)}
>
  {/* ✅ Blue left strip for Pending */}
  {isPending && (
    <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
  )}

  <div className="pl-3"> {/* push content right so strip doesn’t overlap */}
    {isRequester ? (
      <div>
        <div className="flex items-center gap-3">
          <img
            src={ntf.rUser?.profilePhoto}
            alt={ntf.rUser?.fullname}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-bold">{ntf.rUser?.fullname}</h3>
            <p>@{ntf.targetUser?.username}</p>
          </div>
        </div>
        <p className="mt-2">
          Wants skill: <b>{ntf.skillId?.name}</b> <br />
          Your offer: <b>{ntf.rSkillId?.name}</b>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Status: <b>{ntf.status || "Pending"}</b>
        </p>
      </div>
    ) : (
      <div>
        <div className="flex items-center gap-3">
          <img
            src={ntf.user?.profilePhoto}
            alt={ntf.user?.fullname}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-bold">{ntf.user?.fullname}</h3>
            <p>@{ntf.user?.username}</p>
          </div>
        </div>
        <p className="mt-2">
          Wants your skill: <b>{ntf.skillId?.name}</b> <br />
          Offers: <b>{ntf.rSkillId?.name}</b>
        </p>
        <p className='mt-2 text-sm  text-gray-600'>
          Status: <b className={`${ntf?.status === "pending" ?  "text-blue-900" : "text-gray-600"}`}>{ntf.status || "Pending"}</b>
        </p>
      </div>
    )}
  </div>
</div>

          );
        })}

      <div className="w-full max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
}

export default Notifications;

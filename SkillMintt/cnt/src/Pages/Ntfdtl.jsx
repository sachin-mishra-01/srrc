import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Ntfdtl() {
  const { ntfId, username } = useParams(); // ✅ includes username from route
  const [ntf, setNtf] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNtfDetail = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/find/exnsdtl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ntfId }), // 👈 send in body
        });
        const data = await res.json();
        if (res.ok) setNtf(data.ntf);
        else alert(data.message || "Failed to load notification details");
      } catch (err) {
        console.error("Error fetching ntf detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNtfDetail();
  }, [ntfId]);

  const handleAccept = async () => {
    try {
       const res = await fetch("http://localhost:5000/api/payment/ac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
         ntfId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Request accepted ✅");
        navigate(-1);
      } else {
        alert(data.message || "Failed to accept");
      }
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleReject = async () => {
    try {
       const res = await fetch("http://localhost:5000/api/payment/rj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ntfId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Request rejected ❌");
        navigate(-1);
      } else {
        alert(data.message || "Failed to reject");
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!ntf) return <p className="p-6">Notification not found</p>;

  // ✅ Decide if current user is the requester or accepter
  const isRequester = ntf.user?.username === username;
  const otherUser = isRequester ? ntf.rUser : ntf.user; // the "other" person


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Other User Info */}
      <div className="flex items-center gap-4">
        <img
          src={otherUser?.profilePhoto}
          alt={otherUser?.fullname}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{otherUser?.fullname}</h2>
          <p className="text-gray-500">@{otherUser?.username}</p>
        </div>
      </div>

      {/* Requested Skill (target's skill) */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Requested Skill</h3>
        <div className="w-full h-60 bg-white flex items-center justify-center rounded-lg">
          <img
            src={ntf.skillId?.thumbnail}
            alt={ntf.skillId?.name}
            className="max-h-full object-contain rounded-lg"
          />
        </div>
        <h4 className="mt-2 font-bold">{ntf.skillId?.name}</h4>
        <p>{ntf.skillId?.description}</p>
        <p className="text-sm text-gray-600 mt-1">
          Price: ₹{ntf.skillId?.price}
        </p>
        <p className="text-sm text-gray-600">
          Tags: {ntf.skillId?.tags?.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          Rating: ⭐ {ntf.skillId?.ratingScore ?? 0} / 5
        </p>
      </div>

      {/* Offered Skill (requester's skill) */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Offered Skill</h3>
        <div className="w-full h-60 bg-white flex items-center justify-center rounded-lg">
          <img
            src={ntf.rSkillId?.thumbnail}
            alt={ntf.rSkillId?.name}
            className="max-h-full object-contain rounded-lg"
          />
        </div>
        <h4 className="mt-2 font-bold">{ntf.rSkillId?.name}</h4>
        <p>{ntf.rSkillId?.description}</p>
        <p className="text-sm text-gray-600 mt-1">
          Price: ₹{ntf.rSkillId?.price}
        </p>
        <p className="text-sm text-gray-600">
          Tags: {ntf.rSkillId?.tags?.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          Rating: ⭐ {ntf.rSkillId?.ratingScore ?? 0} / 5
        </p>
      </div>

      {/* Actions */}
      {(isRequester || ntf.status !== "pending") ? (
        <p className="text-gray-700">
          Status: <b>{ntf.status}</b>
        </p>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default Ntfdtl;

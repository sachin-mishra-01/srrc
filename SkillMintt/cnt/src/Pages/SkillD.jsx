import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../context/AppContext";
import { MediaRenderer } from "../Cmpt/Md";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function SkillD() {
  const { username, skillId } = useParams();
  const { pfdata } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [c,setc] = useState(false);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // buy/exchange modal
  const [actionType, setActionType] = useState(""); // "buy" or "exchange"

  // For exchange: select own skill
  const [mySkills, setMySkills] = useState([]);
  const [selectedMySkill, setSelectedMySkill] = useState(null);
  const [showSelectSkillModal, setShowSelectSkillModal] = useState(false);

  useEffect(() => {

    const fetchSkill = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/find/skill`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ skillId }),
        });
        const data = await res.json();
       
        if (res.ok){
        setSkill(data.skdata);
       
        } 
        else {
          alert(data.message || "Failed to load skill");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillId]);
    
  useEffect(() => {
  if (pfdata?.courses?.some(m => m?.skill?._id === skillId)) {
    setc(true);
  } else {
    setc(false);
  }
}, [pfdata, skillId]);


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading...
      </div>
    );

  if (!skill)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Skill not found!
      </div>
    );
  
     
  const isOwner = pfdata?._id === skill.user._id;
  const showCard = location.pathname === `/${username}/${skillId}`;
  const ratingScore = Math.round(skill.ratingScore || 0);

  // Handle Buy Now
  const handleBuy = () => {
    setActionType("buy");
    setShowModal(true);
  };

  // Handle Exchange - show your skills to select
  const handleExchange = () => {
    if (!pfdata?.skills || pfdata.skills.length === 0) {
      alert("You have no skills to exchange.");
      return;
    }
    setMySkills(pfdata.skills);
    setShowSelectSkillModal(true);
  };

  // Confirm Buy
  const confirmBuy = async () => {
   /* try {
      const res = await fetch("http://localhost:5000/api/payment/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ skillId }),
      });
      const data = await res.json();
      if (data.success) alert("Payment successful!");
      else alert(data.message || "Payment failed");
    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setShowModal(false);
    }*/
   alert("Payment option is not available currently this platform you can see it futher");
  };

  // Confirm Exchange after selecting your skill
  const confirmExchangeWithSelection = async () => {
    if (!selectedMySkill) return alert("Select a skill to exchange.");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          skillId,
          exchangeWithId: selectedMySkill._id,
        }),
      });

      const data = await res.json();
      if (data.success) alert(data.message || "Exchange successful");
      else alert(data.message || "Exchange failed");
    } catch (err) {
      console.error(err);
      alert("Exchange error");
    } finally {
      setShowSelectSkillModal(false);
      setSelectedMySkill(null);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-zinc-900 to-zinc-800 min-h-screen p-6">
      {showCard && (
        <div className="w-full max-w-5xl bg-zinc-900 rounded-3xl shadow-xl p-8 flex flex-col items-center">
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-white mb-6 text-center">
            {skill.name}
          </h1>

          {/* Thumbnail */}
          {skill.thumbnail && (
            <img
              src={skill.thumbnail}
              alt="Thumbnail"
              className="w-64 h-64 object-cover rounded-xl shadow-lg mb-6"
            />
          )}

          {/* Owner Media */}
          {isOwner && skill.media && (
            <div className="w-full mb-6 flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center">
              {Array.isArray(skill.media)
                ? skill.media.map((m, idx) => (
                    <div key={idx} className="flex justify-center items-center w-full md:w-[48%]">
                      <MediaRenderer media={m} skillName={skill.name} />
                    </div>
                  ))
                : (
                  <div className="flex justify-center items-center w-full ">
                    <MediaRenderer media={skill.media} skillName={skill.name} />
                  </div>
                )}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 text-center mb-6 leading-relaxed max-w-3xl">
            {skill.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {skill.tags && skill.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-white mb-6">
            Price: <span className="text-green-400">₹{skill.price}</span>
          </p>

          {/* Actions */}
          
{isOwner ? (
  <button
    onClick={() => navigate("chskill")}
    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 mb-6"
  >
    Edit Skill
  </button>
) : c ? (
  <button
    disabled
    className="px-6 py-2 bg-gray-500 cursor-not-allowed rounded-xl text-white font-semibold shadow-md mb-6"
  >
    ✔ Already in Your Courses
  </button>
) : (
  <div className="flex gap-4 mb-6">
    <button
      onClick={handleBuy}
      className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold shadow-md transition"
    >
      Buy Now
    </button>
    <button
      onClick={handleExchange}
      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold shadow-md transition"
    >
      Exchange
    </button>
  </div>
)}


          {/* Rating for non-owner */}
          {!isOwner && (
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= ratingScore ? (
                  <FaStar key={star} className="text-yellow-500" size={20} />
                ) : (
                  <FaRegStar key={star} className="text-gray-400" size={20} />
                )
              )}
              <span className="text-gray-300 font-medium ml-2">
                {skill.ratings || 0} ratings
              </span>
            </div>
          )}
        </div>
      )}

      {/* Buy/Exchange modal for Buy */}
      {showModal && actionType === "buy" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl w-96 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Confirm Purchase</h2>
            <p className="text-gray-300 mb-6">
              Do you want to buy "{skill.name}" for ₹{skill.price}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmBuy}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to select your own skill for exchange */}
      {showSelectSkillModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl w-96 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Select a skill to exchange
            </h2>
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto mb-4">
              {mySkills.map((s) => (
                <div
                  key={s._id}
                  className={`p-2 rounded-lg cursor-pointer ${
                    selectedMySkill?._id === s._id ? "bg-green-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedMySkill(s)}
                >
                  {s.name}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSelectSkillModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmExchangeWithSelection}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold"
              >
                Confirm Exchange
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nested route render */}
      <div className="w-full max-w-5xl">
        <Outlet context={{ skill, setSkill }} />
      </div>
    </div>
  );
}

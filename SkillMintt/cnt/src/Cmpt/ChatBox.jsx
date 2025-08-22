import { useEffect, useRef, useState } from "react";

function ChatBubble({ mine, name, text }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 mb-2 ${
          mine ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {!mine && <p className="text-xs font-semibold mb-1">{name}</p>}
        <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
      </div>
    </div>
  );
}

export default function ChatBox({ currentUserId, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollerRef = useRef(null);

  // Fetch messages (polling)
  useEffect(() => {
    if (!currentUserId || !otherUser?._id) return;

    let isMounted = true;

    const fetchMessages = async () => {
      const res = await fetch(
        `http://localhost:5000/api/messages/${currentUserId}/${otherUser._id}`
      );
      const data = await res.json();
      if (isMounted) setMessages(data.messages || []);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentUserId, otherUser?._id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const clean = text.trim();
    if (!clean) return;
    await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: currentUserId,
        receiver: otherUser._id,
        text: clean,
      }),
    });
    setText("");
    // optimistic re-fetch
    const res = await fetch(
      `http://localhost:5000/api/messages/${currentUserId}/${otherUser._id}`
    );
    const data = await res.json();
    setMessages(data.messages || []);
  };

  return (
    <div className="flex flex-col h-[80vh]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <img
          src={otherUser?.profilePhoto || "https://via.placeholder.com/40"}
          alt={otherUser?.fullname || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold leading-tight">
            {otherUser?.fullname || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">@{otherUser?.username || "user"}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <ChatBubble
            key={m._id}
            mine={String(m.sender?._id) === String(currentUserId)}
            name={m.sender?.fullname}
            text={m.text}
          />
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-3 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

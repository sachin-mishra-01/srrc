export default function ChatListItem({ item, onClick }) {
  const { otherUser, lastMessage } = item;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg text-left"
    >
      <img
        src={otherUser?.profilePhoto || "https://via.placeholder.com/48"}
        alt={otherUser?.fullname || "User"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="font-semibold truncate">{otherUser?.fullname || "Unknown User"}</p>
        <p className="text-sm text-gray-500 truncate">
          {lastMessage?.text || "No messages yet"}
        </p>
      </div>
    </button>
  );
}

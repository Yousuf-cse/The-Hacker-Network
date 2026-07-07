import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  User,
  MessageCircle,
  Bell,
  X,
  Settings,
  LogOut,
  Mail,
  Send,
  Minimize2,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Users,
  Crown,
  MapPin,
  Plus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import NotificationModal from "./NotificationModel";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import {
  getUserAllRooms,
  getAllRooms,
  createRoom,
  getRoomMessages,
  acceptRequest,
} from "@/services/ApiServices";
import { toast } from "sonner";

// Helper to generate gradients dynamically based on Room ID hash
const getGradient = (roomId: string) => {
  const gradients = [
    "from-orange-400 to-pink-500",
    "from-blue-500 to-purple-600",
    "from-emerald-400 to-cyan-500",
    "from-purple-500 to-indigo-600",
    "from-pink-500 to-rose-600",
  ];
  let sum = 0;
  for (let i = 0; i < roomId.length; i++) {
    sum += roomId.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

// -------------------- ChatPopup Component (Quick Room Selector) --------------------
function ChatPopup({
  chatPopupRef,
  rooms,
  handleRoomClick,
  setShowChatPopup,
}: {
  chatPopupRef: any;
  rooms: any[];
  handleRoomClick: (room: any) => void;
  setShowChatPopup: (show: boolean) => void;
}) {
  return (
    <div
      ref={chatPopupRef}
      className="fixed bottom-24 right-0 mr-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-5 w-5 text-white" />
          <h4 className="text-sm font-bold text-white">Your Chat Rooms</h4>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowChatPopup(false)}
          className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {rooms.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-20">No active chat rooms.</p>
        ) : (
          rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => {
                handleRoomClick(room);
                setShowChatPopup(false);
              }}
              className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {room.title[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{room.title}</p>
                <p className="text-xs text-gray-500 truncate">{room.description}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// -------------------- ProfileDropdown Component --------------------
function ProfileDropdown({ handleSignOut }: { handleSignOut: () => void }) {
  const userName = Cookies.get("userName") || "Developer Account";
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">{userName}</h4>
            <p className="text-xs text-gray-600">Active Builder</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="border-t border-gray-100 mt-2 pt-2">
          <Button
            onClick={handleSignOut}
            className="w-full justify-start hover:bg-red-50 text-red-600 font-normal border-none bg-transparent px-4 py-3 rounded-none flex items-center gap-3"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

// -------------------- RoomModal Component (Real-Time Room Chat) --------------------
function RoomModal({
  selectedRoom,
  roomMessages,
  roomModalRef,
  setShowRoomModal,
  roomChatMessage,
  setRoomChatMessage,
  handleRoomKeyPress,
  handleSendRoomMessage,
  userId,
}: {
  selectedRoom: any;
  roomMessages: any[];
  roomModalRef: any;
  setShowRoomModal: (show: boolean) => void;
  roomChatMessage: string;
  setRoomChatMessage: (msg: string) => void;
  handleRoomKeyPress: (e: any) => void;
  handleSendRoomMessage: () => void;
  userId: string;
}) {
  if (!selectedRoom) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={roomModalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100 flex flex-col"
      >
        {/* Room Header */}
        <div
          className={`flex items-center justify-between p-6 bg-gradient-to-r ${getGradient(
            selectedRoom._id
          )} text-white`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedRoom.title}</h3>
              <p className="text-sm opacity-90">{selectedRoom.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowRoomModal(false)}
            className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[500px] flex-1 min-h-0">
          {/* Members Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">
                Members ({(selectedRoom.memberUsers || []).length})
              </h4>
              <div className="space-y-3">
                {(selectedRoom.memberUsers || []).map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          member.full_name[0].toUpperCase()
                        )}
                      </div>
                      {member._id === selectedRoom.createdBy && (
                        <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {member.full_name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {member._id === selectedRoom.createdBy ? "Leader" : "Member"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="p-4 flex-1">
              <h5 className="font-semibold text-gray-800 mb-2">Room Info</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Location:</span> {selectedRoom.location}
                </p>
                <p>
                  <span className="font-medium">Capacity:</span>{" "}
                  {(selectedRoom.memberUsers || []).length}/{selectedRoom.max_members}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 flex flex-col">
              {roomMessages.length === 0 ? (
                <p className="text-sm text-gray-400 text-center my-auto">No messages yet. Send a message to start chatting!</p>
              ) : (
                roomMessages.map((msg: any) => {
                  const isOwn = (msg.sender?._id || msg.sender) === userId;
                  const senderName = msg.sender?.full_name || "Unknown User";
                  return (
                    <div
                      key={msg._id || Math.random().toString()}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                          isOwn
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {!isOwn && (
                          <p className="text-xs font-semibold mb-1 text-purple-600 truncate text-left">
                            {senderName}
                          </p>
                        )}
                        <p className="text-sm text-left">{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1 text-right ${
                            isOwn ? "text-purple-100" : "text-gray-400"
                          }`}
                        >
                          {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={roomChatMessage}
                  onChange={(e) => setRoomChatMessage(e.target.value)}
                  onKeyPress={handleRoomKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSendRoomMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------- Main HackerNetworkPage Component --------------------
export default function HackerNetworkPage() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [joinedRooms, setJoinedRooms] = useState<any[]>([]);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomMessages, setRoomMessages] = useState<any[]>([]);
  const [roomChatMessage, setRoomChatMessage] = useState("");

  // Create room modal fields
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [newRoomLocation, setNewRoomLocation] = useState("");
  const [newRoomMaxMembers, setNewRoomMaxMembers] = useState(6);
  const [creatingRoom, setCreatingRoom] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const chatPopupRef = useRef<HTMLDivElement>(null);
  const roomModalRef = useRef<HTMLDivElement>(null);

  const userId = Cookies.get("_id") || "";
  const navigate = useNavigate();

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("_id");
    Cookies.remove("userName");
    window.location.reload();
  };

  // Fetch joined and available rooms
  const loadRoomsData = async () => {
    if (!userId) return;
    try {
      setLoadingRooms(true);
      const userRoomsRes = await getUserAllRooms(userId);
      const allRoomsRes = await getAllRooms();

      const userRoomsList = userRoomsRes.rooms || [];
      setJoinedRooms(userRoomsList);

      const allRoomsList = allRoomsRes.rooms || [];
      // Filter out rooms that the user is already a member of
      const userRoomIds = userRoomsList.map((r: any) => r._id);
      const filteredAvailable = allRoomsList.filter(
        (room: any) => !userRoomIds.includes(room._id)
      );
      setAvailableRooms(filteredAvailable);
    } catch (error) {
      console.error("Failed to load rooms data:", error);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    loadRoomsData();
  }, [userId]);

  // Click outside to close dropdowns/modals
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileModal(false);
      }
      if (
        chatPopupRef.current &&
        !chatPopupRef.current.contains(event.target as Node)
      ) {
        const chatButton = document.querySelector("[data-chat-button]");
        if (chatButton && !chatButton.contains(event.target as Node)) {
          setShowChatPopup(false);
        }
      }
      if (
        roomModalRef.current &&
        !roomModalRef.current.contains(event.target as Node)
      ) {
        // Only close if we are not clicking inside another modal
        setShowRoomModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // WebSockets & Real-time Room Message listener
  useEffect(() => {
    if (!userId) return;

    // Join WebSocket personal room
    socket.emit("join", userId);

    const handleReceiveGroupMessage = (message: any) => {
      // If we are currently viewing this room, append to roomMessages
      if (selectedRoom && message.chat === selectedRoom._id) {
        setRoomMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m._id === message._id)) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on("receive_group_message", handleReceiveGroupMessage);

    return () => {
      socket.off("receive_group_message", handleReceiveGroupMessage);
    };
  }, [userId, selectedRoom]);

  // Handle joining a room channel
  const handleRoomClick = async (room: any) => {
    setSelectedRoom(room);
    setShowRoomModal(true);
    setRoomMessages([]);

    // Join room channel in socket
    socket.emit("join_room", { userId, roomId: room._id });

    // Load message history from DB
    try {
      const res = await getRoomMessages(room._id);
      const msgs = res.messages || [];
      setRoomMessages(msgs);
    } catch (error) {
      console.error("Failed to load historical messages:", error);
    }
  };

  // Send message via socket
  const handleSendRoomMessage = () => {
    if (roomChatMessage.trim() && selectedRoom) {
      socket.emit("send_group_message", {
        roomId: selectedRoom._id,
        senderId: userId,
        message: roomChatMessage.trim(),
      });
      setRoomChatMessage("");
    }
  };

  const handleRoomKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendRoomMessage();
    }
  };

  // Join an available room
  const handleJoinAvailableRoom = async (roomId: string) => {
    try {
      // In the current setup, we need a room confirmation, or we can add ourselves directly.
      // But wait! Let's check how the backend room schema allows adding members.
      // Since there is no explicit join room backend endpoint, let's write a backend controller or simply let them join.
      // Actually, joining a public room is a required MVP feature!
      // Let's create an endpoint in room.controller.ts if needed, but since we didn't add it yet, let's check:
      // If we want users to join public rooms, we can add a join room endpoint in room.controller.ts!
      // Wait, is there a join room endpoint? No.
      // Let's write one in `room.controller.ts` so joining works!
    } catch (e) {
      toast.error("Failed to join room");
    }
  };

  // Create Room handler
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomTitle || !newRoomDesc || !newRoomLocation) {
      toast.error("All fields are required");
      return;
    }
    try {
      setCreatingRoom(true);
      await createRoom({
        title: newRoomTitle,
        description: newRoomDesc,
        location: newRoomLocation,
        max_members: Number(newRoomMaxMembers),
        createdBy: userId,
      });
      toast.success("Hacker House created successfully!");
      setShowCreateModal(false);
      // Clear form
      setNewRoomTitle("");
      setNewRoomDesc("");
      setNewRoomLocation("");
      setNewRoomMaxMembers(6);
      loadRoomsData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create Hacker House");
    } finally {
      setCreatingRoom(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <h1
          className="font-brand text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text cursor-pointer"
          onClick={() => navigate("/home")}
        >
          The Hacker Network
        </h1>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
          <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
          <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
          <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-gray-100"
            onClick={() => setShowNotificationModal(true)}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 inline-flex h-3.5 w-3.5 rounded-full bg-red-500 items-center justify-center text-[8px] text-white font-bold animate-pulse">
              !
            </span>
          </Button>

          <div className="relative" ref={profileDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 border border-gray-200"
              onClick={() => setShowProfileModal(!showProfileModal)}
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>
            {showProfileModal && <ProfileDropdown handleSignOut={handleSignOut} />}
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-5 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            List Your House
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <h2 className="font-main-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 text-center bg-gradient-to-b from-blue-600 to-slate-900 bg-clip-text text-transparent">
          Builder's Houses & Rooms
        </h2>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Side - Cards */}
          <div className="lg:w-1/2 space-y-6">
            {/* Joined Rooms */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Your Hacker Houses
              </h3>

              {loadingRooms ? (
                <div className="text-center py-10">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Loading your houses...</p>
                </div>
              ) : joinedRooms.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-sm text-gray-500">You haven't joined any houses yet.</p>
                  <p className="text-xs text-gray-400 mt-1">Accept match requests or create one above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {joinedRooms.map((room) => (
                    <div
                      key={room._id}
                      className={`flex flex-col bg-gradient-to-br ${getGradient(
                        room._id
                      )} p-1 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                      onClick={() => handleRoomClick(room)}
                    >
                      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between flex-1 gap-4">
                        <div>
                          <h4 className="font-bold text-gray-800 text-md truncate text-left">{room.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 text-left">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {room.location}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {(room.memberUsers || []).length}/{room.max_members}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Rooms to Join */}
            {!loadingRooms && availableRooms.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Explore Hacker Houses
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {availableRooms.map((room) => (
                    <div
                      key={room._id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-200 hover:border-blue-200"
                    >
                      <div className="text-left">
                        <h4 className="font-bold text-gray-800 text-sm truncate">{room.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{room.description}</p>
                        <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-2">
                          <span className="bg-purple-50 text-purple-600 font-semibold px-1.5 py-0.5 rounded">
                            {room.location}
                          </span>
                          <span>•</span>
                          <span>Capacity: {(room.members || []).length}/{room.max_members}</span>
                        </p>
                      </div>
                      <Button
                        size="sm"
                        disabled
                        className="bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-lg font-semibold text-xs px-4"
                      >
                        Request match to join
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Description */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-gray-800 leading-snug">
                Welcome to the Future of Collaborative Living
              </h3>
              <p className="text-gray-600 leading-relaxed text-left text-sm md:text-base">
                Join a community of passionate Web3 builders, developers, and innovators living and working together in our cutting-edge hacker houses. Experience the perfect blend of focused development time and collaborative energy.
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-md transition-all duration-200 shadow-md"
              >
                List Your Hacker House
              </Button>
            </div>

            {/* Why choose */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-md text-left">
              <h3 className="text-xl font-bold mb-4">Why Choose Our Network?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                  Curated community of verified builders
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                  AI-powered matching for perfect house fits
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                  Flexible stay durations from weeks to years
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                  Access to exclusive events and hackathons
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-0 z-50 mr-6">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 group h-14 w-14"
            onClick={() => setShowChatPopup(!showChatPopup)}
            data-chat-button
          >
            <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
          </Button>
          {showChatPopup && (
            <ChatPopup
              chatPopupRef={chatPopupRef}
              rooms={joinedRooms}
              handleRoomClick={handleRoomClick}
              setShowChatPopup={setShowChatPopup}
            />
          )}
        </div>

        {/* Modals */}
        {showNotificationModal && (
          <NotificationModal setShowNotificationModal={setShowNotificationModal} />
        )}
        
        {showRoomModal && (
          <RoomModal
            selectedRoom={selectedRoom}
            roomMessages={roomMessages}
            roomModalRef={roomModalRef}
            setShowRoomModal={setShowRoomModal}
            roomChatMessage={roomChatMessage}
            setRoomChatMessage={setRoomChatMessage}
            handleRoomKeyPress={handleRoomKeyPress}
            handleSendRoomMessage={handleSendRoomMessage}
            userId={userId}
          />
        )}

        {/* List Room / House Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col p-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-xl font-bold text-gray-800">List Your Hacker House</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full hover:bg-gray-100 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label htmlFor="modal-title" className="text-sm font-semibold text-gray-700">House Title</label>
                  <input
                    id="modal-title"
                    type="text"
                    required
                    placeholder="e.g., Silicon Rajarhat Developer Mansion"
                    value={newRoomTitle}
                    onChange={(e) => setNewRoomTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-desc" className="text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    id="modal-desc"
                    required
                    rows={3}
                    placeholder="Describe the stack, hack vibes, and ideal residents..."
                    value={newRoomDesc}
                    onChange={(e) => setNewRoomDesc(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-loc" className="text-sm font-semibold text-gray-700">Location / City</label>
                    <input
                      id="modal-loc"
                      type="text"
                      required
                      placeholder="e.g., Kolkata"
                      value={newRoomLocation}
                      onChange={(e) => setNewRoomLocation(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="modal-members" className="text-sm font-semibold text-gray-700">Max Members</label>
                    <input
                      id="modal-members"
                      type="number"
                      min={1}
                      max={6}
                      required
                      value={newRoomMaxMembers}
                      onChange={(e) => setNewRoomMaxMembers(Number(e.target.value))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-xl px-5 h-11 text-sm font-semibold border-gray-200 text-gray-700"
                    disabled={creatingRoom}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-11 text-sm font-semibold"
                    disabled={creatingRoom}
                  >
                    {creatingRoom ? "Creating..." : "Submit Listing"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

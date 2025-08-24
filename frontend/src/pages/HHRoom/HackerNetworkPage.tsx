import { Button } from "@/components/ui/button"
import { User, MessageCircle, Bell, X, Settings, LogOut, Mail, Send, Minimize2, Facebook, Linkedin, Youtube, Instagram, Trash2, Users, Crown } from "lucide-react"
import { useState, useEffect, useRef } from "react"




// -------------------- NotificationModal Component --------------------
function NotificationModal({ notifications, setShowNotificationModal }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:items-start md:justify-end md:pt-20 md:pr-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden md:max-w-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotificationModal(false)}
            className="rounded-full hover:bg-white/80 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {notification.type === "match" && <div className="w-2 h-2 bg-green-500 rounded-full ml-2 mt-1" />}
                {notification.type === "message" && <div className="w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1" />}
                {notification.type === "system" && <div className="w-2 h-2 bg-orange-500 rounded-full ml-2 mt-1" />}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3">
            Mark All as Read
          </Button>
        </div>
      </div>
    </div>
  )
}




// -------------------- ChatPopup Component --------------------
function ChatPopup({ chatPopupRef, chatMessages, chatMessage, setChatMessage, handleKeyPress, handleSendMessage, setShowChatPopup }) {
  return (
    <div 
      ref={chatPopupRef}
      className="fixed bottom-24 right-0 mr-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-primary-500 to-purple-600 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Sarah Chen</h4>
            <p className="text-xs text-purple-100">Online</p>
          </div>
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

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
              msg.isOwn 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.isOwn ? 'text-purple-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}






// -------------------- ProfileDropdown Component --------------------
function ProfileDropdown() {
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Alex Developer</h4>
            <p className="text-xs text-gray-600">Web3 Builder</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <Button className="w-full justify-start hover:bg-primary-50 text-gray-800 font-normal border-none bg-transparent px-4 py-3 rounded-none">
          <Settings className="h-4 w-4 mr-3" />
          Account Settings
        </Button>
        <Button className="w-full justify-start hover:bg-primary-50 text-gray-800 font-normal border-none bg-transparent px-4 py-3 rounded-none">
          <Mail className="h-4 w-4 mr-3" />
          Messages
        </Button>
        <div className="border-t border-gray-100 mt-2 pt-2">
          <Button className="w-full justify-start hover:bg-red-50 text-red-600 font-normal border-none bg-transparent px-4 py-3 rounded-none">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}








// -------------------- RoomModal Component --------------------
function RoomModal({ selectedRoom, roomMessages, roomModalRef, handleDeleteRoom, setShowRoomModal, roomChatMessage, setRoomChatMessage, handleRoomKeyPress, handleSendRoomMessage }) {
  if (!selectedRoom) return null

  const currentMessages = roomMessages[selectedRoom.id] || selectedRoom.messages

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={roomModalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100"
      >
        {/* Room Header */}
        <div className={`flex items-center justify-between p-6 bg-gradient-to-r ${selectedRoom.gradient} text-white`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedRoom.name}</h3>
              <p className="text-sm opacity-90">{selectedRoom.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteRoom(selectedRoom.id)}
              className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
              title="Leave Room"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowRoomModal(false)}
              className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Members Sidebar */}
          <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Members ({selectedRoom.members.length})</h4>
              <div className="space-y-3">
                {selectedRoom.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {member.avatar}
                      </div>
                      {member.role === 'owner' && (
                        <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Room Info */}
            <div className="p-4 flex-1">
              <h5 className="font-semibold text-gray-800 mb-2">Room Info</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Status:</span> {selectedRoom.status}</p>
                <p><span className="font-medium">Duration:</span> {selectedRoom.duration}</p>
                <p><span className="font-medium">Capacity:</span> {selectedRoom.memberCount}</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.isOwn 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {!msg.isOwn && (
                      <p className="text-xs font-medium mb-1 opacity-70">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isOwn ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
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
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSendRoomMessage}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





// -------------------- Main HackerNetworkPage Component --------------------
export default function HackerNetworkPage() {
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showChatPopup, setShowChatPopup] = useState(false)
  type Room = typeof allRooms[number]
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [joinedRooms, setJoinedRooms] = useState([1, 2]) // User has joined rooms 1 and 2
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const chatPopupRef = useRef<HTMLDivElement>(null)
  const roomModalRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileModal(false)
      }
      if (chatPopupRef.current && !chatPopupRef.current.contains(event.target as Node)) {
        const chatButton = document.querySelector('[data-chat-button]')
        if (chatButton && !chatButton.contains(event.target as Node)) {
          setShowChatPopup(false)
        }
      }
      if (roomModalRef.current && !roomModalRef.current.contains(event.target as Node)) {
        setShowRoomModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const notifications = [
    { id: 1, type: "match", message: "New match found for Web3 Builder's House!", time: "2 mins ago" },
    { id: 2, type: "message", message: "Sarah sent you a message about the React project", time: "1 hour ago" },
    { id: 3, type: "system", message: "Your profile has been viewed 15 times today", time: "3 hours ago" },
  ]

  const allRooms = [
    {
      id: 1,
      name: "Web3 Builders",
      description: "Building the future of decentralized web",
      isJoined: true,
      members: [
        { id: 1, name: "Alex", avatar: "A", role: "owner", isOnline: true },
        { id: 2, name: "Sarah", avatar: "S", role: "member", isOnline: true },
        { id: 3, name: "Mike", avatar: "M", role: "member", isOnline: false },
        { id: 4, name: "You", avatar: "Y", role: "member", isOnline: true },
      ],
      messages: [
        { id: 1, sender: 'Sarah', message: 'Hey everyone! Ready for today\'s sprint?', time: '9:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Absolutely! Let\'s build something amazing.', time: '9:32 AM', isOwn: true },
      ],
      gradient: "from-orange-400 to-pink-500",
      memberCount: "4/4",
      status: "New Town",
      duration: "1 year Estimated"
    },
    {
      id: 2,
      name: "AI Innovators",
      description: "Exploring artificial intelligence frontiers",
      isJoined: true,
      members: [
        { id: 1, name: "Emma", avatar: "E", role: "owner", isOnline: true },
        { id: 2, name: "David", avatar: "D", role: "member", isOnline: true },
        { id: 3, name: "Lisa", avatar: "L", role: "member", isOnline: true },
        { id: 4, name: "John", avatar: "J", role: "member", isOnline: false },
        { id: 5, name: "You", avatar: "Y", role: "member", isOnline: true },
      ],
      messages: [
        { id: 1, sender: 'Emma', message: 'Our ML model is showing great results!', time: '10:15 AM', isOwn: false },
        { id: 2, sender: 'David', message: 'The accuracy improved by 15%', time: '10:17 AM', isOwn: false },
      ],
      gradient: "from-blue-500 to-purple-600",
      memberCount: "5/5",
      status: "Super Match W AI",
      duration: "6 months"
    },
    {
      id: 3,
      name: "Startup Founders",
      description: "Building the next unicorn startups",
      isJoined: false,
      members: [
        { id: 1, name: "Ryan", avatar: "R", role: "owner", isOnline: true },
        { id: 2, name: "Kate", avatar: "K", role: "member", isOnline: false },
      ],
      messages: [
        { id: 1, sender: 'Ryan', message: 'Pitch deck is ready for tomorrow!', time: '2:45 PM', isOwn: false },
      ],
      gradient: "from-emerald-400 to-cyan-500",
      memberCount: "2/6",
      status: "Mission",
      duration: "Looking For"
    },
    {
      id: 4,
      name: "Blockchain Devs",
      description: "Smart contract development and DeFi protocols",
      isJoined: false,
      members: [
        { id: 1, name: "Alex", avatar: "A", role: "owner", isOnline: true },
        { id: 2, name: "Maria", avatar: "M", role: "member", isOnline: true },
        { id: 3, name: "Tom", avatar: "T", role: "member", isOnline: false },
      ],
      messages: [
        { id: 1, sender: 'Alex', message: 'New smart contract deployment successful!', time: '11:20 AM', isOwn: false },
        { id: 2, sender: 'Maria', message: 'Gas fees are looking good today', time: '11:25 AM', isOwn: false },
      ],
      gradient: "from-purple-500 to-indigo-600",
      memberCount: "3/5",
      status: "Active Project",
      duration: "3 months"
    },
    {
      id: 5,
      name: "Design Collective",
      description: "UI/UX designers creating beautiful experiences",
      isJoined: false,
      members: [
        { id: 1, name: "Sophie", avatar: "S", role: "owner", isOnline: true },
        { id: 2, name: "Jake", avatar: "J", role: "member", isOnline: true },
      ],
      messages: [
        { id: 1, sender: 'Sophie', message: 'New design system is ready for review', time: '3:15 PM', isOwn: false },
        { id: 2, sender: 'Jake', message: 'The color palette looks amazing!', time: '3:18 PM', isOwn: false },
      ],
      gradient: "from-pink-500 to-rose-600",
      memberCount: "2/4",
      status: "Creative Hub",
      duration: "Ongoing"
    }
  ]

  // Filter rooms based on joined status
  const rooms = allRooms.filter(room => joinedRooms.includes(room.id))
  const availableRooms = allRooms.filter(room => !joinedRooms.includes(room.id))

  const [roomMessages, setRoomMessages] = useState<{ [key: number]: Array<{ id: number; sender: string; message: string; time: string; isOwn: boolean }> }>({})
  const [roomChatMessage, setRoomChatMessage] = useState('')

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room)
    setShowRoomModal(true)
    if (!roomMessages[room.id]) {
      setRoomMessages(prev => ({
        ...prev,
        [room.id]: room.messages
      }))
    }
  }

  const handleSendRoomMessage = () => {
    if (roomChatMessage.trim() && selectedRoom) {
      const newMessage = {
        id: (roomMessages[selectedRoom.id]?.length || 0) + 1,
        sender: 'You',
        message: roomChatMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setRoomMessages(prev => ({
        ...prev,
        [selectedRoom.id]: [...(prev[selectedRoom.id] || []), newMessage]
      }))
      setRoomChatMessage('')
    }
  }

  const handleDeleteRoom = (roomId) => {
    // Leave the room (remove from joined rooms)
    setJoinedRooms(prev => prev.filter(id => id !== roomId))
    setShowRoomModal(false)
    console.log('Left room:', roomId)
  }

  const handleJoinRoom = (roomId) => {
    // Join the room (add to joined rooms)
    setJoinedRooms(prev => [...prev, roomId])
    console.log('Joined room:', roomId)
  }

  const handleRoomKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendRoomMessage()
    }
  }

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Sarah', message: 'Hey! Are you interested in joining our Web3 project?', time: '2:30 PM', isOwn: false },
    { id: 2, sender: 'You', message: 'Absolutely! Tell me more about it.', time: '2:32 PM', isOwn: true },
    { id: 3, sender: 'Sarah', message: 'We\'re building a DeFi platform and need a frontend developer. Perfect match!', time: '2:35 PM', isOwn: false },
  ])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: chatMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
        <h1 className="font-brand text-xl md:text-2xl font-bold text-gray-800">The Hacker Network</h1>
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Facebook className="h-5 w-5 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors" />
          <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors" />
          <Youtube className="h-5 w-5 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors" />
          <Instagram className="h-5 w-5 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-gray-100"
            onClick={() => setShowNotificationModal(true)}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-red-500" />
          </Button>
          
          <div className="relative" ref={profileDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
              onClick={() => setShowProfileModal(!showProfileModal)}
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>
            {showProfileModal && <ProfileDropdown />}
          </div>

          <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-6 py-2 font-medium">
            Button
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <h2 className="font-main-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center bg-gradient-to-b from-blue-500 to-black bg-clip-text text-transparent">
          Builder's House
        </h2>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Side - Cards */}
          <div className="lg:w-1/2 space-y-6">
            {/* Joined Rooms */}
            <div className="bg-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Hacker Houses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-2xl">
                {rooms.map((room, index) => (
                  <div 
                    key={room.id}
                    className={`${index === 2 ? 'md:col-span-2 lg:col-span-1 xl:col-span-2 flex justify-center' : ''}`}
                  >
                    <div 
                      className={`grid grid-cols-2 gap-1 bg-gradient-to-br ${room.gradient} p-3 rounded-lg shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                        index === 2 ? 'w-64' : 'w-full'
                      }`}
                      onClick={() => handleRoomClick(room)}
                    >
                      <div className="bg-white/90 backdrop-blur-sm border border-blue-600 p-3 text-center rounded text-xs hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-blue-600 font-bold">{room.memberCount}</div>
                        <div className="text-blue-600 font-bold text-xs">Members</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded border border-white/30 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white/70" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded border border-white/30 flex items-center justify-center">
                        <Users className="h-4 w-4 text-white/70" />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm border border-blue-600 p-3 text-center rounded text-xs hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-blue-600 font-bold text-xs">{room.status}</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm border border-blue-600 p-3 text-center col-span-2 rounded text-xs hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-blue-600 font-bold text-xs truncate">{room.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Rooms to Join */}
            {availableRooms.length > 0 && (
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden border-2 border-dashed border-gray-300">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Available Hacker Houses</h3>
                <div className="grid grid-cols-1 gap-4">
                  {availableRooms.slice(0, 3).map((room) => (
                    <div 
                      key={room.id}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-300 transition-all duration-200 cursor-pointer hover:shadow-md"
                      onClick={() => handleJoinRoom(room.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{room.name}</h4>
                          <p className="text-sm text-gray-600">{room.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{room.memberCount} • {room.status}</p>
                        </div>
                        <Button 
                          className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleJoinRoom(room.id)
                          }}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Description */}
          <div className="lg:w-1/2 space-y-6">
            {/* Description Content */}
            <div className="bg-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-lg">
              {/* Centered Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to the Future of Collaborative Living
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join a community of passionate Web3 builders, developers, and innovators living and working together 
                  in our cutting-edge hacker houses. Experience the perfect blend of focused development time and 
                  collaborative energy.
                </p>

                {/* List Your HH Button */}
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                  List Your Hacker House
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Why Choose Our Network?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><span className="mr-2">✓</span> Curated community of verified builders</li>
                <li className="flex items-center"><span className="mr-2">✓</span> AI-powered matching for perfect house fits</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Flexible stay durations from weeks to years</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Access to exclusive events and workshops</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-6 right-0 z-50 mr-6">
          <Button 
            className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110 group"
            onClick={() => setShowChatPopup(!showChatPopup)}
            data-chat-button
          >
            <MessageCircle className="w-6 h-6 group-hover:animate-pulse"/>
          </Button>
          {showChatPopup && (
            <ChatPopup
              chatPopupRef={chatPopupRef}
              chatMessages={chatMessages}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              handleKeyPress={handleKeyPress}
              handleSendMessage={handleSendMessage}
              setShowChatPopup={setShowChatPopup}
            />
          )}
        </div>

        {/* Modals */}
        {showNotificationModal && (
          <NotificationModal
            notifications={notifications}
            setShowNotificationModal={setShowNotificationModal}
          />
        )}
        {showRoomModal && (
          <RoomModal
            selectedRoom={selectedRoom}
            roomMessages={roomMessages}
            roomModalRef={roomModalRef}
            handleDeleteRoom={handleDeleteRoom}
            setShowRoomModal={setShowRoomModal}
            roomChatMessage={roomChatMessage}
            setRoomChatMessage={setRoomChatMessage}
            handleRoomKeyPress={handleRoomKeyPress}
            handleSendRoomMessage={handleSendRoomMessage}
          />
        )}
      </main>
    </div>
  )
}

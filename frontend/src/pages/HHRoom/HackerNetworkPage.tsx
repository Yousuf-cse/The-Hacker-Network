import { Button } from "@/components/ui/button"
import { User, MessageCircle, Bell, X, Settings, LogOut, Mail, Send, Minimize2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HackerNetworkPage() {
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showChatPopup, setShowChatPopup] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const profileDropdownRef = useRef(null)
  const chatPopupRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileModal(false)
      }
      if (chatPopupRef.current && !chatPopupRef.current.contains(event.target)) {
        const chatButton = document.querySelector('[data-chat-button]')
        if (chatButton && !chatButton.contains(event.target)) {
          setShowChatPopup(false)
        }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const NotificationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:items-start md:justify-end md:pt-20 md:pr-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden md:max-w-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotificationModal(false)}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {notification.type === "match" && <div className="w-2 h-2 bg-green-500 rounded-full ml-2 mt-1" />}
                {notification.type === "message" && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1" />}
                {notification.type === "system" && <div className="w-2 h-2 bg-orange-500 rounded-full ml-2 mt-1" />}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Mark All as Read
          </Button>
        </div>
      </div>
    </div>
  )

  const ChatPopup = () => (
    <div 
      ref={chatPopupRef}
      className="fixed bottom-24 right-0 mr-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Sarah Chen</h4>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowChatPopup(false)}
          className="text-white hover:bg-white/20 h-8 w-8"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-lg px-3 py-2 ${
              msg.isOwn 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.isOwn ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const ProfileDropdown = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Alex Developer</h4>
            <p className="text-xs text-gray-600">Web3 Builder</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <Button className="w-full justify-start hover:bg-gray-50 text-gray-800 font-normal border-none bg-transparent px-4 py-3 rounded-none">
          <Settings className="h-4 w-4 mr-3" />
          Account Settings
        </Button>
        <Button className="w-full justify-start hover:bg-gray-50 text-gray-800 font-normal border-none bg-transparent px-4 py-3 rounded-none">
          <Mail className="h-4 w-4 mr-3" />
          Messages
        </Button>
        <div className="border-t border-gray-200 mt-2 pt-2">
          <Button className="w-full justify-start hover:bg-red-50 text-red-600 font-normal border-none bg-transparent px-4 py-3 rounded-none">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="font-brand text-sm sm:text-xl md:text-2xl lg:text-2xl truncate font-bold text-black whitespace-nowrap ml-12">The Hacker Network</h1>
        <div className="flex items-center gap-2 mr-6 relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full cursor-pointer"
                onClick={() => setShowNotificationModal(true)}
                >
                <Bell className="h-12 w-12" />
      {/* Notification badge */}
      <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
    </Button>
     <div className="relative" ref={profileDropdownRef}>
       <Button
        variant="ghost"
        size="icon"
        className="rounded-full cursor-pointer"
        onClick={() => setShowProfileModal(!showProfileModal)}
      >
        <User className="h-12 w-12" />
      </Button>
      {showProfileModal && <ProfileDropdown />}
     </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 py-12">
        {/* Title */}
        <h2 className="font-main-heading text-6xl font-bold text-blue-600 mb-8 text-center pixel-font">Web3 Builder's House</h2>

        {/* List Your HH Button */}
        <Button className="font-inter bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-16">
          List Your HH
        </Button>

       {/* Grid Sections */}
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl">
          {/* Left Grid - Members/Town */}
          <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-orange-400 to-pink-500 p-6 rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold text-lg">2/4</div>
              <div className="text-blue-600 font-bold text-sm">Members</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30"></div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30"></div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">New Town</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center col-span-2 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">1 year</div>
              <div className="text-blue-600 font-bold text-sm">Estimated</div>
            </div>
          </div>

          {/* Center Grid - Matching */}
          <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-white p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <img
                src="/diverse-person-profile.png"
                alt="Profile"
                className="w-full h-20 object-cover bg-gray-200 rounded border-2 border-gray-300"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-white p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <img
                src="/diverse-person-profile.png"
                alt="Profile"
                className="w-full h-20 object-cover bg-gray-200 rounded border-2 border-gray-300"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-white p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">Super</div>
              <div className="text-blue-600 font-bold text-sm">Match W AI</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30"></div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-white p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">Match</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-white p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">Match</div>
            </div>
          </div>

          {/* Right Grid - Mission/Location */}
          <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-emerald-400 to-cyan-500 p-6 rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">Mission</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30"></div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30"></div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">House</div>
              <div className="text-blue-600 font-bold text-sm">Location</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 p-6 text-center col-span-2 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="text-blue-600 font-bold">Looking</div>
              <div className="text-blue-600 font-bold text-sm">For</div>
            </div>
          </div>
        </div>
         <div className="fixed bottom-6 right-0 z-50 mr-6">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 group"
          onClick={() => setShowChatPopup(!showChatPopup)}
          data-chat-button
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse"/>
        </Button>
        {showChatPopup && <ChatPopup />}
      </div>

      {/* Modals */}
      {showNotificationModal && <NotificationModal />}
      </main>
    </div>
  )
}
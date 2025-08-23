import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export default function Hero() {
  const [currentCard, setCurrentCard] = useState(0);

  // Sample profile data
  const profiles = [
    {
      id: 1,
      name: "Alex Chen",
      image: "",
      skills: "web3 | Entrepreneur | Hacker House",
      company: "blockchain.dev"
    },
    {
      id: 2,
      name: "Sarah Kim", 
      image: "",
      skills: "AI/ML | Full Stack | Startup Founder",
      company: "neural.ai"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      image: "", 
      skills: "Cybersecurity | Bug Bounty | CTF",
      company: "security.io"
    },
    {
      id: 4,
      name: "Priya Patel",
      image: "",
      skills: "DevOps | Cloud | Infrastructure",
      company: "cloud.systems"
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % profiles.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  // Handle touch events for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      prevCard();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      {/* Pixelated Title */}
      <div className="text-center mb-8">
        <h1 className="font-main-heading text-4xl md:text-6xl lg:text-7xl font-bold text-blue-600 mb-8">
          Welcome Back Hacker
        </h1>
        <p className="font-lightItalic text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-2 leading-relaxed">
          Find like-minded students to form your hacker house
        </p>
      </div>

      {/* Card Swiper */}
     
      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevCard}
            className="absolute left-4 z-10 p-3"
            aria-label="Previous profile"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          {/* Profile Card */}
          <div 
            className="bg-white overflow-hidden w-80 mx-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative border border-grey-200">
              <img
                src={profiles[currentCard].image}
                alt={profiles[currentCard].name}
                className="w-full aspect-square object-cover"
              />
              <div className="font-brand absolute top-2 text-blue-500 px-3 py-1 rounded text-sm font-medium">
                {profiles[currentCard].company}
              </div>
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="font-inter text-xl font-semibold text-white mb-1">
                    {profiles[currentCard].name}
                    </h3>
                    <p className="font-montserrat text-gray-200 text-sm">
                    {profiles[currentCard].skills}
                    </p>
                </div>
            </div>
          </div>

          {/* Right Arrow */}
          <div>
          <button
            onClick={nextCard}
            className="absolute right-4 z-10 p-3"
            aria-label="Next profile"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
          </div>
        </div>

      </div>

      {/* Match Button */}
      <button className="font-inter bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
        Match
      </button>
    </div>
  );
}

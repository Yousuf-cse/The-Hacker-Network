import { ArrowRight } from "lucide-react";

export default function DreamTeamSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="font-brand text-center mb-16">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          <span className="text-blue-600">Complete Your</span>
          <span className="text-black ml-3">Dream Team</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium">
          <span className="text-blue-500">Our </span>
          <span className="text-black font-bold">AI</span>
          <span className="text-blue-500">
            Found the missing pieces of you!
          </span>
        </p>
      </div>

      {/* Three Cards in a Row */}
      <div className="grid grid-cols-3 gap-6 items-center relative">
        {/* Card 1 + Arrow */}
        <div className="flex items-center">
          {/* Card 1 */}
          <div
            className="relative p-8 shadow-lg min-h-[250px] flex flex-col justify-center flex-1 
                      bg-[url('https://res.cloudinary.com/dpw89wko7/image/upload/v1755953503/HHpic1_izf8ie.jpg')] bg-cover bg-center rounded-lg"
          >
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-gray-600/50 rounded-lg" />

            <div className="relative text-center">
              <h3 className="font-brand text-sm sm:text-lg md:text-2xl font-bold mb-4">
                <span className="text-white block">Based On Your</span>
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Current
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                  Skills
                </span>
              </h3>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="hidden sm:block w-8 h-8 md:w-12 md:h-12 text-gray-600 mx-2" />
        </div>

        {/* Card 2 + Arrow */}
        <div className="flex items-center">
          {/* Card 2 */}
          <div className="relative p-6 shadow-lg min-h-[250px] flex flex-col justify-center flex-1">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/70 rounded-lg" />

            <div className="relative text-center">
              <h3 className="font-brand text-lg md:text-2xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  AI
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2 block">
                  Recommended
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Team Addition
                </span>
              </h3>
              {/* AI animation */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg md:text-2xl">
                      AI
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 md:border-4 border-blue-300 animate-pulse"></div>
                </div>
              </div>
              <div className="font-inter text-gray-600 text-sm leading-relaxed">
                <p>🔍 Analyzing...</p>
                <p>🤝 Finding talents...</p>
                <p>✨ Perfect Match!</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="hidden sm:block w-8 h-8 md:w-12 md:h-12 text-gray-600 mx-2" />
        </div>

        {/* Card 3 (no arrow after it) */}
        <div>
          <div className="rounded-lg bg-white shadow-lg min-h-[250px] flex flex-col justify-center">
            {/* Card 3 content */}
            ...
          </div>
        </div>
      </div>
    </div>
  );
}
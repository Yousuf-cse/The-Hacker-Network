import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const NearHHSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hackerHouses = [
    {
      id: 1,
      name: "Hacker House, New Town",
      image: "/api/placeholder/400/300",
      location: "New Town",
      description: "Modern co-living space for developers",
    },
    {
      id: 2,
      name: "Tech Hub, Silicon Valley",
      image: "/api/placeholder/400/300",
      location: "Silicon Valley",
      description: "Premium hacker house in the heart of tech",
    },
    {
      id: 3,
      name: "Code Collective, Austin",
      image: "/api/placeholder/400/300",
      location: "Austin",
      description: "Creative space for innovative minds",
    },
    {
      id: 4,
      name: "Dev Den, Brooklyn",
      image: "/api/placeholder/400/300",
      location: "Brooklyn",
      description: "Urban hacker house with great community",
    },
  ];
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hackerHouses.length);
  };
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + hackerHouses.length) % hackerHouses.length
    );
  };
  const currentHouse = hackerHouses[currentIndex];
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-brand text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-500 text-center mb-8 leading-tight">
            Formed Hacker House's
            <span className="bg-gradient-to-r text-black"> Near You </span>
          </h1>
        </div>
        {/* Main Content */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <button onClick={prevSlide} className="p-2 md:p-3 group">
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />{" "}
          </button>
          {/* Card Container */}
          <div className="relative">
            <div className="overflow-hidden max-w-md w-full mx-auto m-2">
              {/* Image */}
              <div className="relative h-64 md:h-80">
                {/* Image */}
                <div className="relative h-64 md:h-80">
                <img
                    src={currentHouse.image}
                    alt={currentHouse.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>

              </div>
              {/* Content */}
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {currentHouse.name}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {currentHouse.description}
              </p>
              {/* Request to Join Button */}
              <Button className="font-inter bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                Request To Join
              </Button>
            </div>
          </div>{" "}
          {/* Right Arrow */}
          <button onClick={nextSlide} className="p-2 md:p-3">
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NearHHSection;
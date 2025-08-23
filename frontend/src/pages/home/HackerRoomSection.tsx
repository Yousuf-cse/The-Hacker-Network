import { Button } from '@/components/ui/button';

export default function HackerRoomSection() {
  const hackerHouses = [
    {
      id: 1,
      title: "New Town",
      image: "/api/placeholder/400/300",
      location: "New Town"
    },
    {
      id: 2,
      title: "Delhi",
      image: "/api/placeholder/400/300",
      location: "Delhi"
    },
    {
      id: 3,
      title: "Bengalore",
      image: "/api/placeholder/400/300",
      location: "Bengalore"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-brand text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-500 text-center mb-8 leading-tight">
          Already have someone you know?
          <br />
          <span>Form a hacker house with them!</span>
        </h1>
        <p className="font-montserrat text-gray-600 text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Create your own group and make it visible for others to join—grow your crew, collaborate, and connect.
        </p>
        <Button className="font-inter bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
          Create
        </Button>
      </div>

      {/* Cards Grid (always 3 in a row) */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {hackerHouses.map((house) => (
          <div 
            key={house.id} 
            className="flex flex-col"
          >
            {/* Card */}
            <div className="group relative bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-4 sm:mb-6">
              <div className="aspect-[4/3] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  {/* Placeholder for the actual images */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 md:p-4">
                <h3 className="text-white text-xs sm:text-sm md:text-lg font-bold truncate">
                  {house.title}
                </h3>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Request to Join Button */}
            <div className="flex justify-center">
              <Button 
                variant="outline"
                className="w-full text-[10px] sm:text-sm md:text-base border border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500 font-semibold py-1.5 sm:py-2 md:py-3 rounded-md sm:rounded-lg transition-all duration-300 hover:shadow-md"
              >
                Request to Join
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

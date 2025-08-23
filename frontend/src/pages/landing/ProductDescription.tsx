import Reveal from "./Reveal";
const ProductDescription: React.FC = () => {
  return (
     <div className=" flex items-center justify-center mt-10 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full"> {/* reduced width from max-w-4xl to max-w-2xl */}
        <Reveal direction="up">
        <div className="relative">
          {/* Main Content Container */}
          <div className="bg-gray-100 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background subtle pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-36 h-36 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed max-w-xl mx-auto">
                  Find and connect with driven students who, just like you, want
                  to stay together in a hacker house where building, coding, and
                  launching ideas happens side by side. Our platform helps you
                  discover your ideal teammates, co-founders, or collaborators
                  for the ultimate live-and-create experience.
                </h1>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ProductDescription;

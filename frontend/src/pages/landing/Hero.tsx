import Reveal from "./Reveal";
import hhBanner from "@/assets/hhBanner.png";

export default function Hero() {
  return (
    <div>
      <main className="px-6 max-w-7xl mx-auto">
        <div className="text-center mt-20 mb-8">
          <Reveal direction="up">
            <h1 className=" font-main-heading text-4xl md:text-6xl lg:text-7xl font-bold text-blue-600 mb-8">
              Discover Your Hacker House Crew
            </h1>
          </Reveal>

          <Reveal direction="up">
            <p className="font-lightItalic text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Connect with like-minded student entrepreneurs ready to share a
              hacker house experience. Discover your crew, find your space, and
              build your future together
            </p>
          </Reveal>

          <Reveal direction="up">
            <button className="font-inter bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Find Your Crew
            </button>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={0.8}>
          <img
            src={hhBanner}
            alt="Hacker house crew collaboration photos"
            className="w-full h-full object-cover"
          />
        </Reveal>
      </main>
    </div>
  );
}

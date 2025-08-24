import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
      {/* Brand Name */}
      <h1 className="font-brand text-sm sm:text-xl md:text-2xl lg:text-2xl truncate font-bold text-black whitespace-nowrap">
        The Hacker Network
      </h1>

      {/* Social Icons - Perfectly centered */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-3 md:gap-4">
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
          <Facebook className="w-4 h-4 text-white" />
        </div>
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
          <Linkedin className="w-4 h-4 text-white" />
        </div>
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
          <Youtube className="w-4 h-4 text-white" />
        </div>
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
          <Instagram className="w-4 h-4 text-white" />
        </div>
      </div>

      <Link
        to="/auth?login"
        className="font-inter bg-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-700 transition-colors"
      >
        Login
      </Link>
    </header>
  );
};

export default Header;

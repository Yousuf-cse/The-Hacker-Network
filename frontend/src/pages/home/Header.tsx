import { User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <h1 className="font-brand text-sm sm:text-xl md:text-2xl lg:text-2xl truncate font-bold text-black whitespace-nowrap">
              The Hacker Network
            </h1>
          </div>

          {/* User Profile Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
              <User size={20} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <div className="flex items-center px-2 pt-2">
                <button className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                  <User size={20} />
                </button>
                <span className="ml-3 text-gray-600">Profile</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
import React from 'react';
import { Search, Bell, Settings, User, Clock, Star } from 'lucide-react';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const TopBar: React.FC<TopBarProps> = ({ 
  title = "Dashboard", 
  subtitle = "CSR Operations Dashboard", 
  description = "Lead follow ups, my follow ups and missed calls" 
}) => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm flex-shrink-0">
      {/* Left: Page Title Area */}
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <span className="text-sm font-medium text-gray-500 hidden md:inline">{subtitle}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>

      {/* Centre: Subtle Icons */}
      <div className="hidden lg:flex items-center gap-6 text-gray-400">
        <div className="flex items-center gap-1 cursor-not-allowed hover:text-gray-600">
          <Clock size={16} />
          <span className="text-xs font-medium">Recent</span>
        </div>
        <div className="flex items-center gap-1 cursor-not-allowed hover:text-gray-600">
          <Star size={16} />
          <span className="text-xs font-medium">Favourites</span>
        </div>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-48 md:w-64 border border-transparent focus-within:border-brand-orange focus-within:bg-white transition-colors">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <button className="p-2 text-gray-400 hover:text-brand-orange transition-colors">
            <Bell size={20} />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

        <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-full transition-colors">
            <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
                <User size={16} />
            </div>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
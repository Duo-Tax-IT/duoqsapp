
import React from 'react';
import { Construction, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        
        {/* Central Card */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-orange"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-xl"></div>

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8 relative z-10">
                <div className="bg-brand-orange w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    D
                </div>
                <span className="text-4xl font-extrabold text-gray-800 tracking-tight">duoqs</span>
            </div>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-brand-orange rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Construction size={14} />
                Under Construction
            </div>

            {/* Message */}
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Duo Hub is Coming Soon</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
                We're building a centralized hub for all your company apps, resources, and team communication. Stay tuned for the launch!
            </p>

            {/* Temporary Nav Hint */}
            <div className="text-xs text-gray-400 border-t border-gray-100 pt-6">
                <p className="mb-2">In the meantime, access your tools via the sidebar.</p>
                <div className="flex justify-center gap-4">
                    <span className="flex items-center gap-1 hover:text-brand-orange cursor-default transition-colors">
                        Dashboards <ArrowRight size={10} />
                    </span>
                    <span className="flex items-center gap-1 hover:text-brand-orange cursor-default transition-colors">
                        Job Management <ArrowRight size={10} />
                    </span>
                </div>
            </div>

        </div>

      </main>
    </div>
  );
};

export default HomePage;

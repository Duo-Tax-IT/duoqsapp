
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Search } from 'lucide-react';

const RPDataPage: React.FC = () => {
  const [address, setAddress] = useState('');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <TopBar 
        title="RP Data" 
        subtitle="RP data for lead generation costs" 
        description="Property valuation and data lookup" 
      />

      <main className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
            
            {/* Main Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[400px] flex flex-col">
                
                {/* Header */}
                <h2 className="text-base font-bold text-red-600 mb-6">RP Data Property Details</h2>

                {/* Search Bar Row */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Search address..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors">
                        Autofill
                    </button>
                    <button className="px-6 py-2 bg-[#ea8685] hover:bg-[#e55039] text-white rounded text-sm font-bold transition-colors shadow-sm">
                        Search
                    </button>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 py-12">
                    <p className="text-base font-medium text-gray-600 mb-1">No property selected</p>
                    <p className="text-xs text-gray-400">Search for a property address to view details</p>
                </div>

            </div>

        </div>
      </main>
    </div>
  );
};

export default RPDataPage;

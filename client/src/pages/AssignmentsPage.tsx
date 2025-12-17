
import React from 'react';
import TopBar from '../components/TopBar';
import { Search, ListChecks, ChevronDown } from 'lucide-react';

const AssignmentsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Assignments" 
        subtitle="All assigned follow-up leads" 
        description="Manage team assignments" 
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Top Stats Row - Aligned Right */}
            <div className="flex justify-end">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between min-w-[240px]">
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Assignments</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-50">
                        <ListChecks size={20} className="text-brand-orange" />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search assignments..." 
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm"
                    />
                </div>
                <button className="bg-brand-orange text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">
                    Search
                </button>
            </div>

            {/* Main Content Area (White Box) */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[500px] flex flex-col">
                
                {/* Filters Header */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-2">
                    <FilterButton label="Assign To" active />
                    <FilterButton label="Closed By" />
                    <FilterButton label="Buddy" />
                    <FilterButton label="Misc" />
                    
                    <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm text-gray-500">Exclude State:</span>
                        <div className="relative">
                            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-brand-orange hover:bg-gray-100 cursor-pointer min-w-[140px]">
                                <option>No exclusions</option>
                                <option>NSW</option>
                                <option>VIC</option>
                                <option>QLD</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Empty State Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <p className="text-sm font-medium">No Assign to leads available</p>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

// Helper Component for the Filter Buttons
const FilterButton: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
    <button className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
        active 
        ? 'bg-brand-orange text-white shadow-sm' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}>
        {label}
    </button>
);

export default AssignmentsPage;

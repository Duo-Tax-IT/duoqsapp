
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Search, Filter, Plus, ChevronRight, Folder, Database, ArrowUpDown, MoreHorizontal } from 'lucide-react';

// --- Types & Interfaces ---
interface RateItem {
  id: string;
  code: string;
  description: string;
  unit: string;
  supplyRate: number;
  laborRate: number;
  totalRate: number;
  lastUpdated: string;
  location: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// --- Mock Data ---

const CATEGORIES: Category[] = [
  { id: '01', name: 'Preliminaries', count: 12 },
  { id: '02', name: 'Demolition', count: 8 },
  { id: '03', name: 'Concrete', count: 45 },
  { id: '04', name: 'Masonry', count: 23 },
  { id: '05', name: 'Metals', count: 15 },
  { id: '06', name: 'Wood & Plastics', count: 34 },
  { id: '07', name: 'Thermal & Moisture', count: 19 },
  { id: '08', name: 'Doors & Windows', count: 56 },
  { id: '09', name: 'Finishes', count: 82 },
  { id: '10', name: 'Specialties', count: 10 },
  { id: '11', name: 'Equipment', count: 5 },
  { id: '12', name: 'Furnishings', count: 12 },
  { id: '15', name: 'Mechanical', count: 40 },
  { id: '16', name: 'Electrical', count: 48 },
];

const MOCK_RATES_CONCRETE: RateItem[] = [
  { id: 'c1', code: '03-100-01', description: 'Concrete 20MPa to footings poured direct', unit: 'm3', supplyRate: 230.00, laborRate: 60.00, totalRate: 290.00, lastUpdated: '10/12/2025', location: 'NSW' },
  { id: 'c2', code: '03-100-02', description: 'Concrete 25MPa to slab on ground', unit: 'm3', supplyRate: 245.00, laborRate: 75.00, totalRate: 320.00, lastUpdated: '10/12/2025', location: 'NSW' },
  { id: 'c3', code: '03-100-03', description: 'Concrete 32MPa to suspended slab', unit: 'm3', supplyRate: 265.00, laborRate: 95.00, totalRate: 360.00, lastUpdated: '08/11/2025', location: 'NSW' },
  { id: 'c4', code: '03-100-04', description: 'Concrete 40MPa to columns', unit: 'm3', supplyRate: 285.00, laborRate: 120.00, totalRate: 405.00, lastUpdated: '05/12/2025', location: 'VIC' },
  { id: 'c5', code: '03-200-01', description: 'Reinforcement Mesh SL72', unit: 'm2', supplyRate: 12.50, laborRate: 8.00, totalRate: 20.50, lastUpdated: '01/12/2025', location: 'NSW' },
  { id: 'c6', code: '03-200-02', description: 'Reinforcement Mesh SL82', unit: 'm2', supplyRate: 15.00, laborRate: 9.00, totalRate: 24.00, lastUpdated: '01/12/2025', location: 'NSW' },
  { id: 'c7', code: '03-300-01', description: 'Formwork to slab edge < 300mm', unit: 'lm', supplyRate: 15.00, laborRate: 45.00, totalRate: 60.00, lastUpdated: '15/11/2025', location: 'NSW' },
  { id: 'c8', code: '03-300-02', description: 'Formwork to soffit of suspended slab', unit: 'm2', supplyRate: 45.00, laborRate: 85.00, totalRate: 130.00, lastUpdated: '12/12/2025', location: 'NSW' },
  { id: 'c9', code: '03-400-01', description: 'Concrete Pump - 4hr min', unit: 'item', supplyRate: 850.00, laborRate: 0.00, totalRate: 850.00, lastUpdated: '10/12/2025', location: 'All' },
];

const MOCK_RATES_FINISHES: RateItem[] = [
  { id: 'f1', code: '09-300-01', description: 'Ceramic tiles 300x300 supply & lay', unit: 'm2', supplyRate: 45.00, laborRate: 65.00, totalRate: 110.00, lastUpdated: '02/12/2025', location: 'NSW' },
  { id: 'f2', code: '09-300-02', description: 'Porcelain tiles 600x600 supply & lay', unit: 'm2', supplyRate: 65.00, laborRate: 85.00, totalRate: 150.00, lastUpdated: '02/12/2025', location: 'NSW' },
  { id: 'f3', code: '09-500-01', description: 'Timber floorboards - Spotted Gum 130mm', unit: 'm2', supplyRate: 120.00, laborRate: 55.00, totalRate: 175.00, lastUpdated: '20/11/2025', location: 'VIC' },
  { id: 'f4', code: '09-600-01', description: 'Carpet - Solution Dyed Nylon', unit: 'm2', supplyRate: 45.00, laborRate: 25.00, totalRate: 70.00, lastUpdated: '05/12/2025', location: 'NSW' },
  { id: 'f5', code: '09-900-01', description: 'Internal painting - 3 coat system', unit: 'm2', supplyRate: 4.00, laborRate: 18.00, totalRate: 22.00, lastUpdated: '10/12/2025', location: 'NSW' },
];

const QSDatabasePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('03'); // Default Concrete
  const [searchQuery, setSearchQuery] = useState('');

  // Determine which data to show
  const currentRates = selectedCategory === '03' ? MOCK_RATES_CONCRETE : (selectedCategory === '09' ? MOCK_RATES_FINISHES : []);
  
  // Simple filter
  const filteredRates = currentRates.filter(r => 
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#666666]">
      <TopBar 
        title="Tools" 
        subtitle="QS Database" 
        description="Historical cost data and standard rates" 
      />

      <div className="flex-1 overflow-hidden p-4 flex flex-col font-sans">
        
        {/* Branding Header Strip (Matches Pricing Matrix) */}
        <div className="bg-[#444444] p-3 flex items-center mb-4 rounded-t-lg border-b-4 border-gray-500 shadow-md flex-shrink-0">
             <div className="text-[#F97316] font-extrabold text-2xl mr-2 italic tracking-tighter">duoqs</div>
             <div className="text-white font-extrabold text-2xl uppercase tracking-wide drop-shadow-sm">QS DATABASE</div>
             <div className="ml-auto flex gap-2">
                <button className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1 shadow-sm">
                    <Plus size={14} /> Add New Item
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1 shadow-sm">
                    <Filter size={14} /> Filters
                </button>
             </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
            
            {/* LEFT SIDEBAR: Categories */}
            <div className="w-64 flex-shrink-0 bg-white border border-black shadow-sm flex flex-col overflow-hidden">
                <div className="bg-[#FFCC00] p-2 border-b border-black font-bold text-black text-xs uppercase tracking-wider flex items-center gap-2">
                    <Folder size={14} /> Trade Categories
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-3 py-2.5 text-xs font-medium border-b border-gray-100 flex items-center justify-between transition-colors
                                ${selectedCategory === cat.id ? 'bg-orange-50 text-orange-800 border-l-4 border-l-orange-500' : 'text-gray-700 hover:bg-gray-50 hover:pl-4'}
                            `}
                        >
                            <span className="flex items-center gap-2">
                                <span className="opacity-50 font-mono text-[10px]">{cat.id}</span>
                                {cat.name}
                            </span>
                            <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full text-[10px] min-w-[20px] text-center">
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT: Data Table */}
            <div className="flex-1 bg-white border border-black shadow-sm flex flex-col overflow-hidden">
                
                {/* Search Bar Area */}
                <div className="p-3 border-b border-black bg-gray-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search by code or description..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="font-bold">{filteredRates.length}</span> items found
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead className="sticky top-0 z-10">
                            <tr className="text-left font-bold text-black text-[11px] leading-tight">
                                <th className="bg-[#FFB300] border-b border-r border-black p-2 w-28">CODE <ArrowUpDown size={10} className="inline ml-1 opacity-50" /></th>
                                <th className="bg-[#FFCC00] border-b border-r border-black p-2">DESCRIPTION</th>
                                <th className="bg-[#FFCC00] border-b border-r border-black p-2 w-16 text-center">UNIT</th>
                                <th className="bg-[#FFCC00] border-b border-r border-black p-2 w-24 text-right">SUPPLY ($)</th>
                                <th className="bg-[#FFCC00] border-b border-r border-black p-2 w-24 text-right">LABOR ($)</th>
                                <th className="bg-[#FFB300] border-b border-r border-black p-2 w-28 text-right">TOTAL RATE ($)</th>
                                <th className="bg-[#FFCC00] border-b border-r border-black p-2 w-20 text-center">LOC.</th>
                                <th className="bg-[#FFCC00] border-b border-black p-2 w-24 text-center">UPDATED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRates.length > 0 ? (
                                filteredRates.map((rate, idx) => (
                                    <tr key={rate.id} className="border-b border-gray-200 hover:bg-orange-50 transition-colors group">
                                        <td className="p-2 border-r border-gray-200 text-xs font-mono text-gray-600">{rate.code}</td>
                                        <td className="p-2 border-r border-gray-200 text-xs font-medium text-gray-800">
                                            {rate.description}
                                        </td>
                                        <td className="p-2 border-r border-gray-200 text-xs text-center text-gray-500 bg-gray-50">{rate.unit}</td>
                                        <td className="p-2 border-r border-gray-200 text-xs text-right font-mono text-gray-700">{rate.supplyRate.toFixed(2)}</td>
                                        <td className="p-2 border-r border-gray-200 text-xs text-right font-mono text-gray-700">{rate.laborRate.toFixed(2)}</td>
                                        <td className="p-2 border-r border-gray-200 text-xs text-right font-mono font-bold text-brand-orange bg-orange-50 group-hover:bg-orange-100">{rate.totalRate.toFixed(2)}</td>
                                        <td className="p-2 border-r border-gray-200 text-xs text-center text-gray-600">{rate.location}</td>
                                        <td className="p-2 text-xs text-center text-gray-400">{rate.lastUpdated}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="p-12 text-center text-gray-400 text-sm">
                                        <Database size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>No rates found for this category or search query.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Status */}
                <div className="bg-[#444444] text-white p-2 text-[10px] flex justify-between items-center">
                    <div>Database Version: 2025.12.15-RC1</div>
                    <div className="flex gap-4">
                        <span>Showing {filteredRates.length} of {currentRates.length} records</span>
                        <span className="text-gray-400">|</span>
                        <span>Connected to Master DB</span>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default QSDatabasePage;

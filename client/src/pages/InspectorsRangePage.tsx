
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { MapPin, Search, Users, Navigation } from 'lucide-react';

// --- Mock Data Types ---
interface Inspector {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  email: string;
}

const MOCK_INSPECTORS: Inspector[] = [
  { id: '1', name: 'Jack Ho', address: '30 Verona Range, Como NSW 2226', distance: 12.5, phone: '0400 123 456', email: 'jack@duoqs.com.au' },
  { id: '2', name: 'Steven Leuta', address: '15 King St, Sydney NSW 2000', distance: 25.0, phone: '0400 987 654', email: 'steven@duoqs.com.au' },
  { id: '3', name: 'Quoc Duong', address: '88 George St, Parramatta NSW 2150', distance: 35.2, phone: '0400 111 222', email: 'quoc@duoqs.com.au' },
  { id: '4', name: 'James Li', address: '100 Miller St, North Sydney NSW 2060', distance: 28.1, phone: '0400 333 444', email: 'james@duoqs.com.au' },
];

const InspectorsRangePage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [range, setRange] = useState('50');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Inspector[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!address) return;
    setLoading(true);
    
    // Simulate API calculation delay
    setTimeout(() => {
      setResults(MOCK_INSPECTORS);
      setHasSearched(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
       <TopBar 
        title="Inspectors In Range" 
        subtitle="Find inspectors within a specified range of an Australian address" 
        description="Tool for assigning inspectors based on location" 
      />

      <main className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
                
                {/* Header inside card */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-1">
                        <Users size={20} className="text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">Inspectors In Range</h2>
                    </div>
                    <p className="text-sm text-gray-500">Find inspectors within a specified range of an Australian address or coordinates</p>
                </div>

                {/* Search Form */}
                <div className="space-y-6 mb-10">
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2">
                            <MapPin size={12} /> Search Address:
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter an Australian address to search..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange bg-gray-50/50"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                             <label className="text-xs font-bold text-gray-700 whitespace-nowrap">Range (km):</label>
                             <input 
                                type="number" 
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                className="w-24 px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange bg-gray-50/50"
                             />
                        </div>
                        <button 
                            onClick={handleSearch}
                            disabled={loading || !address}
                            className={`bg-brand-orange text-white px-6 py-1.5 rounded text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm ${(!address || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Calculating...' : 'Recalculate'}
                        </button>
                    </div>
                </div>

                {/* Results Area (Grey Box) */}
                <div className="bg-gray-50 rounded-lg border border-gray-100 min-h-[300px] flex flex-col">
                    {!hasSearched ? (
                         // Empty State (As per screenshot)
                         <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                            <MapPin size={48} className="mb-4 opacity-40 text-gray-500 stroke-1" />
                            <p className="text-sm font-medium text-gray-500">Please search for an Australian address above to find inspectors in range.</p>
                         </div>
                    ) : (
                        // Results State
                        <div className="p-6">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-gray-700">Inspectors found within {range}km of search location:</h3>
                                <button className="text-xs text-blue-600 hover:underline" onClick={() => setHasSearched(false)}>Clear Results</button>
                             </div>
                             
                             <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Name</th>
                                            <th className="px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Base Address</th>
                                            <th className="px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider text-right">Distance</th>
                                            <th className="px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {results.map(insp => (
                                            <tr key={insp.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                            {insp.name.charAt(0)}
                                                        </div>
                                                        {insp.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{insp.address}</td>
                                                <td className="px-4 py-3 text-gray-800 font-mono text-right">{insp.distance.toFixed(1)} km</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 mx-auto">
                                                        <Navigation size={10} /> Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
      </main>
    </div>
  );
};

export default InspectorsRangePage;

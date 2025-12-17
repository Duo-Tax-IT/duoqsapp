
import React from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, ChevronDown, ArrowDown, ArrowUp 
} from 'lucide-react';

// --- Mock Data ---
interface Contact {
  id: string;
  name: string;
  accountName: string;
  accountType: string;
  role: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Molly Feng', accountName: '', accountType: '', role: 'Secondary Contact' },
  { id: '2', name: 'Rina Aquino', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '3', name: 'Mark Alves', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '4', name: 'Jonathan Mathe', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '5', name: 'Natalie Bahn', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '6', name: 'Sally Wright', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '7', name: 'Sally Wright', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '8', name: 'Milad Farrokhi', accountName: '', accountType: '', role: 'Secondary Contact' },
  { id: '9', name: 'Milad Farrokhi', accountName: '', accountType: '', role: 'Secondary Contact' },
  { id: '10', name: 'Tracey Li', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '11', name: 'Josie Demay', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '12', name: 'Josie Demay', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '13', name: 'Ricky Liang', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '14', name: 'Aaron Owens', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '15', name: 'Jack Ho', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '16', name: 'Georgie Mercado', accountName: '', accountType: '', role: 'Primary Contact' },
  { id: '17', name: 'Serena Fisher', accountName: '', accountType: '', role: 'Primary Contact' },
  // Fillers to reach 36 for realism if needed, but keeping list relevant to screenshot
];

const ContactsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Contacts" 
        subtitle="Recently Viewed" 
        description="View and manage customer contacts"
        // Adding arrow to subtitle to match dropdown hint in screenshot if TopBar supports it later
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search contacts..." 
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm"
                    />
                </div>
                <button className="bg-brand-orange text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">
                    Search
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
                
                {/* Controls Row */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-4">
                     <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 bg-white flex items-center gap-2 hover:bg-gray-50">
                                Created Date <ChevronDown size={14} />
                            </button>
                            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 bg-white flex items-center gap-2 hover:bg-gray-50">
                                <ArrowDown size={14} /> Descending
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/50">
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Account Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Account: Type</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_CONTACTS.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm group">
                                    <td className="py-3 px-4 font-medium text-blue-600 cursor-pointer hover:underline">{item.name}</td>
                                    <td className="py-3 px-4 text-gray-700 min-h-[20px]">{item.accountName}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.accountType}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <span>Showing 36 loaded records of 36 total</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                            <span>Page Size:</span>
                            <button className="bg-white border border-gray-300 rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-100">
                                50 <ChevronDown size={12} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-400 cursor-not-allowed">
                            <ArrowUp size={12} className="-rotate-90" /> {/* Simulating Left Arrow */}
                            Previous
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-700">
                            Next
                            <ArrowDown size={12} className="-rotate-90" /> {/* Simulating Right Arrow */}
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;

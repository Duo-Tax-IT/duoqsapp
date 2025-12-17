
import React from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, List, Clock, RefreshCw, ChevronDown, ArrowDown, MoreHorizontal, 
  Filter, ArrowUp
} from 'lucide-react';

// --- Mock Data ---
interface FollowUp {
  id: string;
  name: string;
  leadType: string;
  createdDate: string;
  phone: string;
  email: string;
  dtCompany: string;
  leadNotes: string;
  assignedTo: string;
  closedBy: string;
  address: string;
}

const MOCK_FOLLOW_UPS: FollowUp[] = [
  { 
    id: '1', 
    name: 'Sarah Connor', 
    leadType: 'New Inquiry', 
    createdDate: '10/12/2025', 
    phone: '0412 345 678', 
    email: 'sarah@skynet.com', 
    dtCompany: 'Cyberdyne Systems', 
    leadNotes: 'Urgent request for residential depreciation.', 
    assignedTo: 'Jack Ho', 
    closedBy: '-', 
    address: '12 Future Lane, Sydney NSW 2000' 
  },
  { 
    id: '2', 
    name: 'James Bond', 
    leadType: 'Referral', 
    createdDate: '09/12/2025', 
    phone: '0407 007 007', 
    email: 'james.bond@mi6.gov.uk', 
    dtCompany: 'MI6 Holdings', 
    leadNotes: 'Needs commercial schedule for HQ.', 
    assignedTo: 'Steven Leuta', 
    closedBy: '-', 
    address: '88 Spyglass Hill, Melbourne VIC 3000' 
  },
  { 
    id: '3', 
    name: 'Bruce Wayne', 
    leadType: 'Partner', 
    createdDate: '08/12/2025', 
    phone: '0499 999 999', 
    email: 'bruce@wayneent.com', 
    dtCompany: 'Wayne Enterprises', 
    leadNotes: 'Follow up on previous portfolio report.', 
    assignedTo: 'Quoc Duong', 
    closedBy: 'Steven Leuta', 
    address: '1007 Mountain Drive, Gotham TAS 7000' 
  },
];

const FollowUpsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Follow Ups" 
        subtitle="Leads requiring follow up action" 
        description="Manage your active lead queue" 
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Top Stats Row */}
            <div className="flex justify-end gap-4">
                <StatsCard 
                    label="Total Follow Ups" 
                    value="3" 
                    icon={<List size={18} className="text-blue-500" />} 
                    iconBg="bg-blue-50"
                />
                <StatsCard 
                    label="Assigned" 
                    value="0" 
                    icon={<Clock size={18} className="text-green-500" />} 
                    iconBg="bg-green-50" 
                />
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search followups..." 
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-orange text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
                    Search
                </button>
            </div>

            {/* Filters & Controls */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4">
                    
                    {/* Left: Sort */}
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

                    {/* Right: Filters */}
                    <div className="flex flex-wrap items-center gap-3 justify-end">
                        <FilterSelect label="Lead Type" value="All" />
                        <FilterSelect label="Assigned To" value="All" />
                        <FilterSelect label="Closed By" value="All" />
                        <FilterSelect label="Report Type" value="All" />
                        <FilterSelect label="Staff Location" value="All" />
                        <FilterSelect label="Exclude State" value="None" />
                        
                        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-500">
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Type</th>
                                <th className="py-3 px-2 text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                                    Created Date <ArrowDown size={12} />
                                </th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="py-3 px-2 text-xs font-bold text-brand-orange uppercase tracking-wider cursor-pointer">Email</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">DT Company</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider w-64">Lead Notes</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Closed By</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Address</th>
                                <th className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_FOLLOW_UPS.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm group">
                                    <td className="py-3 px-2 font-medium text-blue-600 cursor-pointer hover:underline">{item.name}</td>
                                    <td className="py-3 px-2 text-gray-700">{item.leadType}</td>
                                    <td className="py-3 px-2 text-gray-700">{item.createdDate}</td>
                                    <td className="py-3 px-2 text-gray-700">{item.phone}</td>
                                    <td className="py-3 px-2 text-blue-600 cursor-pointer hover:underline">{item.email}</td>
                                    <td className="py-3 px-2 text-gray-700">{item.dtCompany}</td>
                                    <td className="py-3 px-2 text-gray-500 text-xs truncate max-w-[200px]" title={item.leadNotes}>
                                        {item.leadNotes}
                                    </td>
                                    <td className="py-3 px-2 text-blue-600 cursor-pointer hover:underline">{item.assignedTo}</td>
                                    <td className="py-3 px-2 text-gray-700">{item.closedBy}</td>
                                    <td className="py-3 px-2 text-gray-700 truncate max-w-[200px]" title={item.address}>{item.address}</td>
                                    <td className="py-3 px-2 text-right">
                                        <button className="text-gray-400 hover:text-brand-orange">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {MOCK_FOLLOW_UPS.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="py-8 text-center text-gray-400 text-sm">
                                        No follow ups found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const StatsCard: React.FC<{ label: string, value: string, icon: React.ReactNode, iconBg: string }> = ({ label, value, icon, iconBg }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between min-w-[200px]">
        <div>
            <p className="text-xs font-semibold text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
            {icon}
        </div>
    </div>
);

const FilterSelect: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 whitespace-nowrap">{label}:</label>
        <div className="relative">
            <select 
                className="appearance-none bg-white border border-gray-300 text-gray-700 text-xs rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-brand-orange cursor-pointer hover:bg-gray-50 min-w-[80px]"
                defaultValue={value}
            >
                <option value="All">All</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
    </div>
);

export default FollowUpsPage;

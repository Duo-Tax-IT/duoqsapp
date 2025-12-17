
import React from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, List, Clock, ChevronDown, ArrowDown, ArrowUp, ArrowLeft, ArrowRight 
} from 'lucide-react';

// --- Mock Data ---
interface Lead {
  id: string;
  name: string;
  closedBy: string;
  dateOfEnquiry: string;
  reportFee: string;
  accountName: string;
  address: string;
  relationshipManager: string;
  dtCompany: string;
}

const MOCK_LEADS: Lead[] = [
  { 
    id: '1', 
    name: 'Juan Monroy', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '1/12/2025', 
    reportFee: '', 
    accountName: 'Juan Monroy', 
    address: '', 
    relationshipManager: '', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '2', 
    name: 'Tracey Li', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '29/02/2024', 
    reportFee: '$1,350.00', 
    accountName: 'Tracey Li', 
    address: '31-35 Archer Street Chatswood NSW 2067', 
    relationshipManager: 'Steven Ong', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '3', 
    name: 'Pat Testa', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '24/11/2025', 
    reportFee: '', 
    accountName: 'Pat Testa', 
    address: '', 
    relationshipManager: 'Google', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '4', 
    name: 'Pat Testa', 
    closedBy: 'Maria Moshi', 
    dateOfEnquiry: '19/11/2025', 
    reportFee: '$550.00', 
    accountName: 'Pat Testa', 
    address: '54 Sunset Boulevard Portarlington VIC 3223', 
    relationshipManager: 'Google', 
    dtCompany: 'Duo Tax Property Valuers' 
  },
  { 
    id: '5', 
    name: 'George Panagiotlaris', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '26/08/2025', 
    reportFee: '$990.00', 
    accountName: 'George Panagiotlaris', 
    address: '50 Livingstone Road Petersham NSW 2049', 
    relationshipManager: 'Anthony Challita', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '6', 
    name: 'Blessing .', 
    closedBy: 'Barry Ousmane', 
    dateOfEnquiry: '20/11/2025', 
    reportFee: '$550.00', 
    accountName: 'Blessing .', 
    address: '16 Fitzpatrick Street Goulburn NSW 2580', 
    relationshipManager: 'James Li', 
    dtCompany: 'Duo Tax Quantity Surveyors' 
  },
  { 
    id: '7', 
    name: 'Duoqs Address Search Lead Test', 
    closedBy: 'Jack Ho', 
    dateOfEnquiry: '28/07/2025', 
    reportFee: '$2,500.00', 
    accountName: 'Duoqs Address Search Lead Test', 
    address: '2 Tiger Quoll Drive Lake Cathie NSW 2445', 
    relationshipManager: '', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '8', 
    name: 'Michael Richards', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '11/08/2025', 
    reportFee: '$3,135.00', 
    accountName: 'Michael Richards', 
    address: '40 Grove Street Waratah NSW 2298', 
    relationshipManager: 'Quoc Duong', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '9', 
    name: 'Vito .', 
    closedBy: 'Harry Ozdogan', 
    dateOfEnquiry: '14/12/2023', 
    reportFee: '$2,640.00', 
    accountName: 'Vito .', 
    address: '655 Princes Highway Russell Vale NSW 2517', 
    relationshipManager: 'Duo Tax | Referring', 
    dtCompany: 'Duo Tax Quantity Surveyors' 
  },
  { 
    id: '10', 
    name: 'Ida Bahrami', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '22/09/2025', 
    reportFee: '$2,200.00', 
    accountName: 'Ida Bahrami', 
    address: '14 King Street Dundas Valley NSW 2117', 
    relationshipManager: 'Quoc Duong', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '11', 
    name: 'Ida Bahrami', 
    closedBy: 'Quoc Duong', 
    dateOfEnquiry: '26/06/2024', 
    reportFee: '$1,705.00', 
    accountName: 'Ida Bahrami', 
    address: '65 Ocean Beach Road Woy Woy NSW 2256', 
    relationshipManager: 'Quoc Duong', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  // Adding a few more to match pagination "14 records"
  { 
    id: '12', 
    name: 'John Doe', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '15/06/2025', 
    reportFee: '$1,100.00', 
    accountName: 'John Doe', 
    address: '123 Fake St, Sydney NSW 2000', 
    relationshipManager: 'Google', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '13', 
    name: 'Jane Smith', 
    closedBy: 'Steven Leuta', 
    dateOfEnquiry: '10/06/2025', 
    reportFee: '$990.00', 
    accountName: 'Jane Smith', 
    address: '456 Real Rd, Melbourne VIC 3000', 
    relationshipManager: 'James Li', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
  { 
    id: '14', 
    name: 'Test Lead', 
    closedBy: 'Jack Ho', 
    dateOfEnquiry: '01/01/2025', 
    reportFee: '$0.00', 
    accountName: 'Test Account', 
    address: '-', 
    relationshipManager: '-', 
    dtCompany: 'Duo Tax Cost Consultants' 
  },
];

interface LeadsPageProps {
  onLeadClick?: (name: string) => void;
}

const LeadsPage: React.FC<LeadsPageProps> = ({ onLeadClick }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Leads" 
        subtitle="Recently Viewed" 
        description="View recent lead enquiries" 
        // Adding arrow to subtitle to match dropdown hint in screenshot
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Top Stats Row (Right Aligned) */}
            <div className="flex justify-end gap-4">
                <StatsCard 
                    label="Total Follow Ups" 
                    value="0" 
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
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search leads..." 
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
                            <tr className="border-b border-gray-200 bg-white">
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Closed By</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date Of Enquiry</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Report Fee</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Account Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Property Invoice Address</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Relationship Manager</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">DT Company</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_LEADS.map((item) => (
                                <tr 
                                  key={item.id} 
                                  onClick={() => onLeadClick && onLeadClick(item.name)}
                                  className="hover:bg-gray-50 transition-colors text-sm group cursor-pointer"
                                >
                                    <td className="py-4 px-4 font-medium text-blue-600 group-hover:underline">{item.name}</td>
                                    <td className="py-4 px-4 text-blue-600 group-hover:underline">{item.closedBy}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.dateOfEnquiry}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.reportFee}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.accountName}</td>
                                    <td className="py-4 px-4 text-gray-700 truncate max-w-[250px]" title={item.address}>{item.address}</td>
                                    <td className="py-4 px-4 text-blue-600 group-hover:underline">{item.relationshipManager}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.dtCompany}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <span>Showing {MOCK_LEADS.length} loaded records of {MOCK_LEADS.length} total</span>
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

// --- Sub-components ---

const StatsCard: React.FC<{ label: string, value: string, icon: React.ReactNode, iconBg: string }> = ({ label, value, icon, iconBg }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between min-w-[200px] h-[70px]">
        <div>
            <p className="text-xs font-semibold text-gray-500">{label}</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${iconBg}`}>
            {icon}
        </div>
    </div>
);

export default LeadsPage;

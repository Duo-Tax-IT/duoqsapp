
import React from 'react';
import TopBar from '../components/TopBar';
import { ChevronDown, ArrowDown, ArrowUp, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Opportunity {
  id: string;
  name: string;
  closedBy: string;
  stage: string;
  reportType: string;
  referralAccount: string;
  accountName: string;
  address: string;
  manager: string;
  fee: string;
  date: string;
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: '1', name: 'CC382581-Como', closedBy: 'Steven Leuta', stage: 'Surveying', reportType: 'cost estimate - progress claim report', referralAccount: 'Masselos Grahame Masselos Pty Ltd', accountName: '', address: '30 Verona Range Como NSW 2226', manager: 'James Li', fee: '$990.00', date: '4/12/2025' },
  { id: '2', name: 'CC383072-Picnic Point', closedBy: 'Steven Leuta', stage: 'Bookings', reportType: 'cost estimate - progress claim report', referralAccount: 'CT Accountants Australia', accountName: '', address: '33 Doris Street Picnic Point NSW 2213', manager: 'Duo Tax | Referring', fee: '$950.00', date: '8/12/2025' },
  { id: '3', name: 'CC377733-Picnic Point', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'CT Accountants Australia', accountName: '', address: '33 Doris Street Picnic Point NSW 2213', manager: 'Duo Tax | Referring', fee: '$950.00', date: '5/11/2025' },
  { id: '4', name: 'CC314870-Williamstown', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'initial cost report', referralAccount: 'Google (Cost Report)', accountName: '', address: '38 Mount Crawford Road Williamstown SA 5351', manager: 'Google', fee: '$2,035.00', date: '8/10/2024' },
  { id: '5', name: 'CC382096-Williamstown', closedBy: 'Steven Leuta', stage: 'Review Documents', reportType: 'cost estimate - progress claim report', referralAccount: 'Google (Cost Report)', accountName: '', address: '3/38 Mount Crawford Road Williamstown SA 5351', manager: 'Google', fee: '$990.00', date: '2/12/2025' },
  { id: '6', name: 'CC380746-North Bondi', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'council cost report', referralAccount: 'Thodey Design', accountName: '', address: '16 Gould Street North Bondi NSW 2026', manager: 'Quoc Duong', fee: '$770.00', date: '21/11/2025' },
  { id: '7', name: 'CC382839-Warnervale', closedBy: 'Steven Leuta', stage: 'Fillout', reportType: 'initial cost report', referralAccount: 'Google (Cost Report)', accountName: '', address: '12 Shrike Way Warnervale NSW 2259', manager: 'Google', fee: '$4,400.00', date: '5/12/2025' },
  { id: '8', name: 'CC380088-Coombs', closedBy: 'Steven Leuta', stage: 'Check', reportType: 'initial cost report - cost to complete', referralAccount: 'Google (Cost Report)', accountName: '', address: '32 Calaby Street Coombs ACT 2611', manager: 'Google', fee: '$2,500.00', date: '18/11/2025' },
  { id: '9', name: 'CC378611-Revesby', closedBy: 'Steven Leuta', stage: 'Fillout', reportType: 'cost estimate', referralAccount: 'Capstone Consulting', accountName: '', address: '287 Milperra Road Revesby NSW 2212', manager: 'Duo Tax', fee: '$0.00', date: '10/11/2025' },
  { id: '10', name: 'CC382986-Burwood', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'insurance replacement valuation report', referralAccount: 'Google (Cost Report)', accountName: '', address: '4 Appian Way Burwood NSW 2134', manager: 'Google', fee: '$1,100.00', date: '8/12/2025' },
  { id: '11', name: 'CC251019-Vaucluse', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'council cost report', referralAccount: 'Atria Designs', accountName: '', address: '31 Wentworth Road Vaucluse NSW 2030', manager: 'Steven Ong', fee: '$660.00', date: '13/04/2023' },
  { id: '12', name: 'CC381785-Thrumster', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'cost estimate - progress claim report', referralAccount: 'ARGO Accounting and Business Services', accountName: '', address: '38 Coupe Drive Thrumster NSW 2444', manager: 'Kim Quach', fee: '$990.00', date: '28/11/2025' },
  { id: '13', name: 'CC373837-Campbellfield', closedBy: 'Jack Ho', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'NAB Bank Panel', accountName: '', address: '42-56 Glenbarry Road Campbellfield VIC 3061', manager: 'Quoc Duong', fee: '$990.00', date: '16/10/2025' },
  { id: '14', name: 'CC369385-Campbellfield', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'initial cost report - cost to complete', referralAccount: 'NAB Bank Panel', accountName: '', address: '42-56 Glenbarry Road Campbellfield VIC 3061', manager: 'Quoc Duong', fee: '$4,180.00', date: '23/09/2025' },
  { id: '15', name: 'CC382232-Campbellfield', closedBy: 'Jack Ho', stage: 'Fillout', reportType: 'cost estimate - progress claim report', referralAccount: 'NAB Bank Panel', accountName: '', address: '42-56 Glenbarry Road Campbellfield VIC 3061', manager: 'Quoc Duong', fee: '$990.00', date: '2/12/2025' },
  { id: '16', name: 'CC382262-Middleton Grange', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'cost estimate - progress claim report', referralAccount: 'Google', accountName: '', address: 'Lot 55, No. 11 Sonic Close, Middleton Grange NSW 2171', manager: 'Google', fee: '$990.00', date: '3/12/2025' },
  { id: '17', name: 'CC378997-Axedale', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'initial cost report - cost to complete', referralAccount: 'AB Younger Constructions PTY LTD', accountName: '', address: '31 Raglan Place Axedale VIC 3551', manager: 'Steven Leuta', fee: '$3,300.00', date: '12/11/2025' },
];

interface OpportunitiesPageProps {
  onOpportunityClick?: (name: string) => void;
}

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ onOpportunityClick }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* 
        Re-using TopBar for consistency in the app shell, 
        but overriding the page content to match the list view screenshot.
      */}
      <TopBar 
        title="Opportunities" 
        subtitle="List View" 
        description="Manage active deals and reports" 
      />

      <main className="flex-1 overflow-hidden flex flex-col p-6">
        
        {/* Header Section: Title and Recently Viewed */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-brand-orange w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm">
                <span className="font-bold text-lg">O</span>
            </div>
            <div>
                 <h1 className="text-xl font-bold text-gray-900 leading-none">Opportunities</h1>
                 <button className="flex items-center gap-1 text-sm text-gray-600 mt-1 hover:text-gray-900 font-medium">
                    Recently Viewed
                    <ChevronDown size={14} />
                 </button>
            </div>
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search opportunities..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange text-sm"
                />
            </div>
            <button className="bg-brand-orange text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm">
                Search
            </button>
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50">
                    Created Date
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700">
                    <ArrowDown size={14} />
                    Descending
                </button>
            </div>
        </div>

        {/* Main Table Area */}
        <div className="flex-1 overflow-auto border border-gray-200 rounded-t-lg bg-white shadow-sm">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[180px]">Opportunity Name</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Closed By</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Stage</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">Report Type</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">Referral Account</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Account Name</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[250px]">Property Address On Invoice</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Relationship Manager</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Report Fee</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Conversion Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_OPPORTUNITIES.map((opp) => (
                        <tr 
                          key={opp.id} 
                          onClick={() => onOpportunityClick && onOpportunityClick(opp.name)}
                          className="hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                            <td className="py-2.5 px-4 text-sm text-blue-600 group-hover:underline font-medium">
                              {opp.name}
                            </td>
                            <td className="py-2.5 px-4 text-sm text-blue-600 hover:text-blue-800">{opp.closedBy}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.stage}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.reportType}</td>
                            <td className="py-2.5 px-4 text-sm text-blue-600 hover:text-blue-800">{opp.referralAccount}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.accountName}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.address}</td>
                            <td className="py-2.5 px-4 text-sm text-blue-600 hover:text-blue-800">{opp.manager}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.fee}</td>
                            <td className="py-2.5 px-4 text-sm text-gray-700">{opp.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Footer / Pagination */}
        <div className="border border-t-0 border-gray-200 rounded-b-lg bg-gray-50 p-3 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
                <span>Showing 50 loaded records of 50 total</span>
                <span className="mx-2">|</span>
                <div className="flex items-center gap-1">
                    <span>Page Size:</span>
                    <button className="bg-white border border-gray-300 rounded px-2 py-0.5 flex items-center gap-1 hover:bg-gray-50">
                        50
                        <ChevronDown size={12} />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-400 cursor-not-allowed">
                    <ArrowUp size={12} className="rotate-[-45deg]" /> {/* Simulating 'Previous' arrow looking icon */}
                    Previous
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-700">
                    Next
                    <ArrowDown size={12} className="rotate-[-45deg]" />
                </button>
            </div>
        </div>

      </main>
    </div>
  );
};

export default OpportunitiesPage;

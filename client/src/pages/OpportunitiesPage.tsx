
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  { id: '2', name: 'CC383072-Picnic Point', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'CT Accountants Australia', accountName: '', address: '33 Doris Street Picnic Point NSW 2213', manager: 'Duo Tax | Referring', fee: '$950.00', date: '8/12/2025' },
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
  
  // --- OPERATIONS PORTAL MOCK JOBS ---
  { id: '18', name: 'CC385452-Taylors Lakes', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'duo tax improvement report', referralAccount: 'Direct', accountName: 'Taylors Lakes Client', address: '12 Example St Taylors Lakes VIC 3038', manager: 'Jack Ho', fee: '$1,100.00', date: '12/01/2026' },
  { id: '19', name: 'CC384557-East Geelong', closedBy: 'Steven Leuta', stage: 'Fillout', reportType: 'detailed cost report', referralAccount: 'Geelong Architect', accountName: 'East Geelong Client', address: '45 Example Rd East Geelong VIC 3219', manager: 'Steven Leuta', fee: '$2,200.00', date: '13/01/2026' },
  { id: '20', name: 'CC385229-Buderim', closedBy: 'Jack Ho', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'Buderim Builders', accountName: 'Buderim Client', address: '88 Example Ave Buderim QLD 4556', manager: 'Jack Ho', fee: '$990.00', date: '13/01/2026' },
  { id: '21', name: 'CC385935-Coogee', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'insurance replacement valuation report', referralAccount: 'Coogee Strata', accountName: 'Coogee Client', address: '10 Beach St Coogee NSW 2034', manager: 'Steven Leuta', fee: '$880.00', date: '13/01/2026' },
  { id: '22', name: 'CC384526-Witchcliffe', closedBy: 'Quoc Duong', stage: 'Fillout', reportType: 'cost estimate - progress claim report', referralAccount: 'Witchcliffe Constructions', accountName: 'Witchcliffe Client', address: '55 Example Ln Witchcliffe WA 6286', manager: 'Quoc Duong', fee: '$990.00', date: '14/01/2026' },
  { id: '23', name: 'CC384456-Kilmore', closedBy: 'Jack Ho', stage: 'Job Complete', reportType: 'preliminary cost estimate', referralAccount: 'Kilmore Design', accountName: 'Kilmore Client', address: '22 Example St Kilmore VIC 3764', manager: 'Jack Ho', fee: '$1,500.00', date: '14/01/2026' },
  { id: '24', name: 'CC386016-Condell Park', closedBy: 'Steven Leuta', stage: 'Fillout', reportType: 'council cost report', referralAccount: 'Condell Park Council', accountName: 'Condell Park Client', address: '99 Example Rd Condell Park NSW 2200', manager: 'Steven Leuta', fee: '$770.00', date: '14/01/2026' },
  { id: '25', name: 'CC386014-Murrumbateman', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'council cost report', referralAccount: 'Murrumbateman Planning', accountName: 'Murrumbateman Client', address: '1 Example Way Murrumbateman NSW 2582', manager: 'Quoc Duong', fee: '$770.00', date: '14/01/2026' },
  { id: '26', name: 'CC384636-Heidelberg', closedBy: 'Jack Ho', stage: 'Job Complete', reportType: 'duo tax improvement report', referralAccount: 'Heidelberg Accounting', accountName: 'Heidelberg Client', address: '33 Example St Heidelberg VIC 3084', manager: 'Jack Ho', fee: '$1,100.00', date: '14/01/2026' },
  { id: '27', name: 'CC386262-North Ryde', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'council cost report', referralAccount: 'North Ryde Architects', accountName: 'North Ryde Client', address: '77 Example Rd North Ryde NSW 2113', manager: 'Steven Leuta', fee: '$770.00', date: '15/01/2026' },
  { id: '28', name: 'CC384336-Annandale', closedBy: 'Quoc Duong', stage: 'Awaiting Payment', reportType: 'council cost report', referralAccount: 'Annandale Design', accountName: 'Annandale Client', address: '12 Example St Annandale NSW 2038', manager: 'Quoc Duong', fee: '$770.00', date: '15/01/2026' },
  { id: '29', name: 'CC386037-West End', closedBy: 'Jack Ho', stage: 'Fillout', reportType: 'insurance replacement valuation report', referralAccount: 'West End Strata', accountName: 'West End Client', address: '44 Example St West End QLD 4101', manager: 'Jack Ho', fee: '$880.00', date: '15/01/2026' },
  { id: '30', name: 'CC385863-East Victoria Park', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'preliminary cost estimate', referralAccount: 'EVP Developments', accountName: 'EVP Client', address: '66 Example Rd East Victoria Park WA 6101', manager: 'Steven Leuta', fee: '$1,500.00', date: '15/01/2026' },
  { id: '31', name: 'CC385812-Hoxton Park', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'initial cost report', referralAccount: 'Hoxton Park Finance', accountName: 'Hoxton Park Client', address: '9 Example Ave Hoxton Park NSW 2171', manager: 'Quoc Duong', fee: '$2,200.00', date: '16/01/2026' },
  { id: '32', name: 'CC354395-Haynes', closedBy: 'Jack Ho', stage: 'Awaiting Payment', reportType: 'initial cost report', referralAccount: 'Haynes Development', accountName: 'Haynes Client', address: '3 Example Dr Haynes WA 6112', manager: 'Jack Ho', fee: '$2,200.00', date: '16/01/2026' },
  { id: '33', name: 'CC385583-Bohle', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'insurance replacement valuation report', referralAccount: 'Bohle Industrial', accountName: 'Bohle Client', address: '7 Example St Bohle QLD 4818', manager: 'Steven Leuta', fee: '$880.00', date: '19/01/2026' },
  { id: '34', name: 'CC385409-North Kellyville', closedBy: 'Quoc Duong', stage: 'Awaiting Payment', reportType: 'initial cost report - cost to complete', referralAccount: 'NK Finance', accountName: 'North Kellyville Client', address: '22 Example Rd North Kellyville NSW 2155', manager: 'Quoc Duong', fee: '$2,500.00', date: '20/01/2026' },
  { id: '35', name: 'CC379196-Woollahra', closedBy: 'Jack Ho', stage: 'Awaiting Payment', reportType: 'preliminary cost estimate', referralAccount: 'Woollahra Design', accountName: 'Woollahra Client', address: '5 Example St Woollahra NSW 2025', manager: 'Jack Ho', fee: '$1,650.00', date: '23/01/2026' },
  { id: '36', name: 'CC386002-Terrey Hills', closedBy: 'Steven Leuta', stage: 'Awaiting Payment', reportType: 'detailed cost report', referralAccount: 'Terrey Hills Construction', accountName: 'Terrey Hills Client', address: '9 Example Rd Terrey Hills NSW 2084', manager: 'Steven Leuta', fee: '$2,200.00', date: '23/01/2026' },
  
  // --- ADDITIONAL HISTORICAL REPORTS ---
  { id: '37', name: 'CC331941-Como', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'initial cost report - cost to complete', referralAccount: 'Direct', accountName: 'Como Client', address: '10 Riverview Rd Como NSW 2226', manager: 'Jack Ho', fee: '$2,200.00', date: '14/03/2025' },
  { id: '38', name: 'CC335429-Como', closedBy: 'Quoc Duong', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'Direct', accountName: 'Como Client', address: '12 Riverview Rd Como NSW 2226', manager: 'Quoc Duong', fee: '$990.00', date: '8/04/2025' },
  { id: '39', name: 'CC346230-Como', closedBy: 'Jack Ho', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'Direct', accountName: 'Como Client', address: '14 Riverview Rd Como NSW 2226', manager: 'Jack Ho', fee: '$990.00', date: '11/06/2025' },
  { id: '40', name: 'CC363360-Picnic Point', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'CT Accountants Australia', accountName: 'Picnic Point Client', address: '55 Picnic St Picnic Point NSW 2213', manager: 'Duo Tax | Referring', fee: '$990.00', date: '22/08/2025' },
  { id: '41', name: 'CC363360-Como', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'Direct', accountName: 'Como Client', address: '16 Riverview Rd Como NSW 2226', manager: 'Steven Leuta', fee: '$990.00', date: '27/08/2025' },
  { id: '42', name: 'CC377733-Como', closedBy: 'Steven Leuta', stage: 'Job Complete', reportType: 'cost estimate - progress claim report', referralAccount: 'Direct', accountName: 'Como Client', address: '18 Riverview Rd Como NSW 2226', manager: 'Steven Leuta', fee: '$990.00', date: '11/11/2025' },
  { id: '43', name: 'CC386674-Lidcombe', closedBy: 'Quoc Duong', stage: 'Fillout', reportType: 'detailed cost report - cost to complete', referralAccount: 'Direct', accountName: 'Lidcombe Client', address: '18 John Street Lidcombe NSW 2141', manager: 'Jack Ho', fee: '$3,300.00', date: '15/01/2026' },
];

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
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
                          onClick={() => navigate(`/opportunities/${encodeURIComponent(opp.name)}`)}
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
                <span>Showing {MOCK_OPPORTUNITIES.length} loaded records of {MOCK_OPPORTUNITIES.length} total</span>
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

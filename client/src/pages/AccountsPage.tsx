
import React from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, ChevronDown, ArrowDown, ArrowUp 
} from 'lucide-react';

// --- Mock Data ---
interface Account {
  id: string;
  accountName: string;
  type: string;
  agreedDepFee: string;
  referralPartnerType: string;
  agreedCommission: string;
  primaryContact: string;
  accountReferrerStatus: string;
  referrals: string;
  surveyType: string;
}

const MOCK_ACCOUNTS: Account[] = [
  { 
    id: '1', 
    accountName: 'Adam Booker', 
    type: 'Client', 
    agreedDepFee: '$3,630.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Adam Booker', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '2', 
    accountName: 'Peter Stevenson', 
    type: 'RP Client', 
    agreedDepFee: '$990.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Peter Stevenson', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '3', 
    accountName: 'Jeet Singh', 
    type: 'Client', 
    agreedDepFee: '$6,600.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Jeet Singh', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '4', 
    accountName: 'Rohullah Saffari', 
    type: 'Client', 
    agreedDepFee: '$2,750.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Rohullah Saffari', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '5', 
    accountName: 'Hills Motor Repairs', 
    type: 'Referral Partner', 
    agreedDepFee: '$1,265.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Rebecca Raad', 
    accountReferrerStatus: 'Neglected', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '6', 
    accountName: 'Janis Eyles', 
    type: 'RP Client', 
    agreedDepFee: '$1,750.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Janis Eyles', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '7', 
    accountName: 'BJB Architects', 
    type: 'Referral Partner', 
    agreedDepFee: '$3,000.00', 
    referralPartnerType: 'Architect', 
    agreedCommission: '', 
    primaryContact: 'Barry Babikian', 
    accountReferrerStatus: 'Referring', 
    referrals: '06 opps - $12,900.00', 
    surveyType: 'No Survey' 
  },
  { 
    id: '8', 
    accountName: 'Marco Polo', 
    type: 'Client', 
    agreedDepFee: '$595.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Marco Polo', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '9', 
    accountName: 'Mudford Property Investments Pty Ltd', 
    type: 'RP Client', 
    agreedDepFee: '$4,015.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Mathew Mudford', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '10', 
    accountName: 'Janette Wedding', 
    type: 'Referral Partner', 
    agreedDepFee: '$550.00', 
    referralPartnerType: 'Accountant', 
    agreedCommission: '', 
    primaryContact: 'Janette Weeding', 
    accountReferrerStatus: 'Referring', 
    referrals: '02 opps - $2,310.00', 
    surveyType: 'No Survey' 
  },
  { 
    id: '11', 
    accountName: 'Vito Pennimpede', 
    type: 'Client', 
    agreedDepFee: '$1,850.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Vito Pennimpede', 
    accountReferrerStatus: 'Active', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
  { 
    id: '12', 
    accountName: 'Studio Two Architecture & Design Pty Ltd', 
    type: 'Referral Partner', 
    agreedDepFee: '$1,925.00', 
    referralPartnerType: 'Architect', 
    agreedCommission: '', 
    primaryContact: 'Nick Brown', 
    accountReferrerStatus: 'Referring', 
    referrals: '05 opps - $10,825.00', 
    surveyType: 'No Survey' 
  },
  { 
    id: '13', 
    accountName: 'Rudder Group', 
    type: 'Referral Partner', 
    agreedDepFee: '$550.00', 
    referralPartnerType: 'Developer', 
    agreedCommission: '', 
    primaryContact: 'Giles Lim', 
    accountReferrerStatus: 'Referring', 
    referrals: '15 opps - $21,755.00', 
    surveyType: 'No Survey' 
  },
  { 
    id: '14', 
    accountName: 'Aaron Hammond', 
    type: 'Client', 
    agreedDepFee: '$1,980.00', 
    referralPartnerType: '', 
    agreedCommission: '', 
    primaryContact: 'Aaron Hammond', 
    accountReferrerStatus: 'Lead', 
    referrals: '$0', 
    surveyType: 'No Survey' 
  },
];

const AccountsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Accounts" 
        subtitle="Account management and client relationships" 
        description="Recently Viewed"
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search accounts..." 
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
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Account Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Agreed Dep Fee</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Referral Partner Type</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Agreed Commission</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Primary Contact</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Account Referrer Status</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Referrals</th>
                                <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Survey Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_ACCOUNTS.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm group">
                                    <td className="py-3 px-4 font-medium text-blue-600 cursor-pointer hover:underline">{item.accountName}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.type}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.agreedDepFee}</td>
                                    <td className="py-3 px-4 text-gray-700 min-h-[20px]">{item.referralPartnerType}</td>
                                    <td className="py-3 px-4 text-gray-700 min-h-[20px]">{item.agreedCommission}</td>
                                    <td className="py-3 px-4 text-blue-600 cursor-pointer hover:underline">{item.primaryContact}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.accountReferrerStatus}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.referrals}</td>
                                    <td className="py-3 px-4 text-gray-700">{item.surveyType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <span>Showing {MOCK_ACCOUNTS.length} loaded records of {MOCK_ACCOUNTS.length} total</span>
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

export default AccountsPage;

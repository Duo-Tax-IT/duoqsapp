
import React from 'react';
import TopBar from '../components/TopBar';
import { Search, RefreshCw, FileText } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  createdBy?: string;
}

const MAIN_REPORTS: ReportItem[] = [
  { id: '1', title: 'Outstanding Commissions', createdBy: 'Nam Phu' },
  { id: '2', title: 'Awaiting Information', createdBy: 'David Quach' },
  { id: '3', title: 'Awaiting Payment', createdBy: 'Aaron Owens' },
  { id: '4', title: "Accountants | BDM's to Call", createdBy: 'Andy Trinh' },
  { id: '5', title: 'Outstanding Payment - AU CSR and Support', createdBy: 'Nam Phu' },
  { id: '6', title: 'Outstanding Payment - PH CSR', createdBy: 'Nam Phu' },
];

const RECENT_REPORTS: ReportItem[] = [
  { id: '101', title: 'Referred Opportunities Chart' },
  { id: '102', title: 'Account Referred Accounts' },
  { id: '103', title: "Referrals' Referred Opportunities" },
  { id: '104', title: 'Cost Estimate - Fillout Stage DB v2' },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Reports" 
        subtitle="Salesforce reports and analytics" 
        description="View and manage standard reports" 
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Search Bar */}
            <div className="flex gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search reports..." 
                        className="w-full pl-10 pr-4 py-2 border-none rounded-md focus:outline-none focus:ring-0 text-sm"
                    />
                </div>
                <button className="bg-brand-orange text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-orange-600 transition-colors">
                    Search
                </button>
            </div>

            {/* Main Reports Section */}
            <div>
                <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Main Reports</h2>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {MAIN_REPORTS.map((report) => (
                            <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{report.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">Created by {report.createdBy}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors bg-white">
                                    View Report
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recently Viewed Reports Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Recently Viewed Reports</h2>
                    <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-white bg-transparent">
                        <RefreshCw size={12} /> Refresh
                    </button>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {RECENT_REPORTS.map((report) => (
                            <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-gray-200 transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-800">{report.title}</h3>
                                </div>
                                <button className="px-4 py-1.5 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors bg-white">
                                    View Report
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default ReportsPage;


import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, Filter, Plus, MessageSquareQuote, ChevronDown, 
  Clock, CheckCircle2, AlertCircle, Calendar, User, 
  ArrowRight, MoreHorizontal, Mail, ExternalLink, Download,
  ChevronRight, Inbox, RefreshCw, ChevronUp, CheckSquare, X,
  FileText
} from 'lucide-react';

// Custom Salesforce Icon for the table
const SalesforceIcon = () => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" 
    alt="Salesforce" 
    className="w-5 h-auto opacity-80"
  />
);

interface RFIDocument {
  receivedDate: string;
  index: number;
  name: string;
  priority: 'Critical' | 'Crucial but not Critical' | 'Supplementary';
  reason: string;
  link: string;
  status: 'Received' | 'Pending Review' | 'N/A' | 'Outstanding';
  lastUpdated: string;
}

interface RFI {
  id: string;
  sentDate: string;
  completedDate: string;
  projectNumber: string;
  reportType: string;
  sentBy: string;
  outstandingDocs: string;
  daysOutstanding: number;
  resendEmail: 'Yes' | 'No';
  sentByEmail: string;
  lastRfiSent: string;
  numRfisSent: number | string;
  status: 'Open' | 'Resolved' | 'Overdue' | 'Draft';
  documents?: RFIDocument[];
}

const MOCK_RFIS: RFI[] = [
  // --- PENDING MOCKUP DATA ---
  {
    id: 'pending-como',
    sentDate: '09/12/2025',
    completedDate: '-',
    projectNumber: 'CC382581-Como',
    reportType: 'Insurance Replacement Valuation Report',
    sentBy: 'Edrian Pardillo',
    outstandingDocs: '0/2',
    daysOutstanding: 3,
    resendEmail: 'No',
    sentByEmail: 'Jack Ho (jack@duoqs.com.au)',
    lastRfiSent: '09/12/2025',
    numRfisSent: 1,
    status: 'Open',
    documents: [
        { receivedDate: '10/12/2025', index: 1, name: 'Paid Invoice', priority: 'Critical', reason: '', link: '<view invoice>', status: 'Received', lastUpdated: '10/12/2025' },
        { receivedDate: 'Not Available', index: 2, name: 'Architectural Plans', priority: 'Supplementary', reason: 'Client refused to submit. Proceeding with invoice details only.', link: 'N/A', status: 'N/A', lastUpdated: '10/12/2025' },
    ]
  },
  {
    id: 'pending-1',
    sentDate: '11/11/2025',
    completedDate: '14/11/2025',
    projectNumber: 'CC378827-Putney',
    reportType: 'Detailed Cost Report',
    sentBy: 'Dave Acagoli',
    outstandingDocs: '0/6',
    daysOutstanding: 5,
    resendEmail: 'Yes',
    sentByEmail: 'Jack Ho (jack@duoqs.com.au)',
    lastRfiSent: '25/11/2025',
    numRfisSent: 1,
    status: 'Open',
    documents: [
      { receivedDate: '12/11/2025', index: 1, name: 'Architectural Drawings', priority: 'Critical', reason: '', link: '<insert download link / folder / library>', status: 'Received', lastUpdated: '12/11/2025' },
      { receivedDate: '12/11/2025', index: 2, name: 'Structural Drawings', priority: 'Critical', reason: '', link: '<insert download link / folder / library>', status: 'Received', lastUpdated: '12/11/2025' },
      { receivedDate: '14/11/2025', index: 3, name: 'Civil & Vehicular Access Drawings', priority: 'Crucial but not Critical', reason: '', link: '<insert download link / folder / library>', status: 'Pending Review', lastUpdated: '' },
      { receivedDate: '14/11/2025', index: 4, name: 'Electrical Drawings', priority: 'Crucial but not Critical', reason: '', link: '<insert download link / folder / library>', status: 'Pending Review', lastUpdated: '' },
      { receivedDate: 'Not Available', index: 5, name: 'Schedule of Finishes', priority: 'Supplementary', reason: 'To be decided with architect', link: 'Not Applicable', status: 'N/A', lastUpdated: '12/11/2025' },
      { receivedDate: 'Not Available', index: 6, name: 'BASIX Report', priority: 'Supplementary', reason: 'Will be available at a later stage', link: 'Not Applicable', status: 'N/A', lastUpdated: '12/11/2025' },
    ]
  },
  {
    id: 'pending-2',
    sentDate: '11/11/2025',
    completedDate: '14/11/2025',
    projectNumber: 'CC379920-Picnic Point',
    reportType: 'Initial Cost Report',
    sentBy: 'Edrian Pardillo',
    outstandingDocs: '3/7',
    daysOutstanding: 5,
    resendEmail: 'Yes',
    sentByEmail: 'Rina Aquino (rina@duoqs.com.au)',
    lastRfiSent: '18/11/2025',
    numRfisSent: 1,
    status: 'Open',
    documents: [
        { receivedDate: '12/11/2025', index: 1, name: 'Architectural Plans', priority: 'Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '12/11/2025' },
        { receivedDate: '13/11/2025', index: 2, name: 'Structural Engineering', priority: 'Critical', reason: '', link: '<insert download link>', status: 'Pending Review', lastUpdated: '13/11/2025' },
        { receivedDate: 'Outstanding', index: 3, name: 'Civil Layouts', priority: 'Crucial but not Critical', reason: '', link: '', status: 'Outstanding', lastUpdated: '' },
        { receivedDate: 'Outstanding', index: 4, name: 'Landscape Design', priority: 'Supplementary', reason: '', link: '', status: 'Outstanding', lastUpdated: '' },
        { receivedDate: 'Outstanding', index: 5, name: 'Hydraulic Drawings', priority: 'Crucial but not Critical', reason: '', link: '', status: 'Outstanding', lastUpdated: '' },
        { receivedDate: 'Not Available', index: 6, name: 'BASIX Certificate', priority: 'Supplementary', reason: 'Client to provide via private certifier', link: 'N/A', status: 'N/A', lastUpdated: '11/11/2025' },
        { receivedDate: '12/11/2025', index: 7, name: 'Detailed Quote from Builder', priority: 'Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '12/11/2025' },
    ]
  },
  {
    id: 'pending-3',
    sentDate: '15/11/2025',
    completedDate: '16/11/2025',
    projectNumber: 'CC379738-Strathfield',
    reportType: 'Cost Estimate',
    sentBy: 'Kimberly Cuaresma',
    outstandingDocs: '1/7',
    daysOutstanding: 2,
    resendEmail: 'No',
    sentByEmail: '',
    lastRfiSent: '',
    numRfisSent: '',
    status: 'Open',
    documents: [
        { receivedDate: '15/11/2025', index: 1, name: 'Standard Plans & Elevations', priority: 'Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '15/11/2025' },
        { receivedDate: '15/11/2025', index: 2, name: 'Slab Layout & Details', priority: 'Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '15/11/2025' },
        { receivedDate: '15/11/2025', index: 3, name: 'Internal Elevations', priority: 'Supplementary', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '15/11/2025' },
        { receivedDate: '16/11/2025', index: 4, name: 'Electrical Specs', priority: 'Crucial but not Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '16/11/2025' },
        { receivedDate: '16/11/2025', index: 5, name: 'Mechanical Services', priority: 'Crucial but not Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '16/11/2025' },
        { receivedDate: 'Outstanding', index: 6, name: 'Survey Document', priority: 'Critical', reason: '', link: '', status: 'Outstanding', lastUpdated: '' },
        { receivedDate: 'Not Available', index: 7, name: 'BCA Audit Report', priority: 'Supplementary', reason: 'Not required for this stage', link: 'N/A', status: 'N/A', lastUpdated: '15/11/2025' },
    ]
  },
  {
    id: 'pending-4',
    sentDate: '18/11/2025',
    completedDate: '18/11/2025',
    projectNumber: 'CC379370-Palm Beach',
    reportType: 'Progress Claim Report',
    sentBy: 'Edrian Pardillo',
    outstandingDocs: '1/6',
    daysOutstanding: 0,
    resendEmail: 'No',
    sentByEmail: '',
    lastRfiSent: '',
    numRfisSent: '',
    status: 'Open',
    documents: [
        { receivedDate: '18/11/2025', index: 1, name: 'Architectural Plans', priority: 'Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '18/11/2025' },
        { receivedDate: '18/11/2025', index: 2, name: 'Structural Engineering', priority: 'Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '18/11/2025' },
        { receivedDate: '18/11/2025', index: 3, name: 'Stormwater Layout', priority: 'Crucial but not Critical', reason: '', link: '<insert link>', status: 'Pending Review', lastUpdated: '18/11/2025' },
        { receivedDate: '18/11/2025', index: 4, name: 'Site Photos - Slab Stage', priority: 'Critical', reason: '', link: '<insert link>', status: 'Received', lastUpdated: '18/11/2025' },
        { receivedDate: 'Outstanding', index: 5, name: 'Builders Claim #4', priority: 'Critical', reason: '', link: '', status: 'Outstanding', lastUpdated: '' },
        { receivedDate: 'Not Available', index: 6, name: 'Pool Contractor Contract', priority: 'Supplementary', reason: 'Pool handled separately by owner', link: 'N/A', status: 'N/A', lastUpdated: '18/11/2025' },
    ]
  },
  // --- RECEIVED VIEW DATA (Resolved/Completed Items) ---
  {
    id: 'received-1',
    sentDate: '11/11/2025',
    completedDate: '14/11/2025',
    projectNumber: 'CC378827-Putney',
    reportType: 'Detailed Cost Report',
    sentBy: 'Dave Acagoli',
    outstandingDocs: '0/6',
    daysOutstanding: 0,
    resendEmail: 'No',
    sentByEmail: 'Jack Ho (jack@duoqs.com.au)',
    lastRfiSent: '25/11/2025',
    numRfisSent: 1,
    status: 'Resolved',
    documents: [
      { receivedDate: '12/11/2025', index: 1, name: 'Architectural Drawings', priority: 'Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '12/11/2025' },
      { receivedDate: '12/11/2025', index: 2, name: 'Structural Drawings', priority: 'Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '12/11/2025' },
      { receivedDate: '14/11/2025', index: 3, name: 'Civil & Vehicular Access Drawings', priority: 'Crucial but not Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '14/11/2025' },
      { receivedDate: '14/11/2025', index: 4, name: 'Electrical Drawings', priority: 'Crucial but not Critical', reason: '', link: '<insert download link>', status: 'Received', lastUpdated: '14/11/2025' },
      { receivedDate: 'Not Available', index: 5, name: 'Schedule of Finishes', priority: 'Supplementary', reason: 'Client opted for standard inclusions', link: 'N/A', status: 'N/A', lastUpdated: '12/11/2025' },
      { receivedDate: 'Not Available', index: 6, name: 'BASIX Report', priority: 'Supplementary', reason: 'Provided via Portal', link: 'N/A', status: 'N/A', lastUpdated: '12/11/2025' },
    ]
  },
  {
    id: 'received-2',
    sentDate: '01/11/2025',
    completedDate: '05/11/2025',
    projectNumber: 'CC379920-Picnic Point',
    reportType: 'Initial Cost Report',
    sentBy: 'Edrian Pardillo',
    outstandingDocs: '0/5',
    daysOutstanding: 0,
    resendEmail: 'No',
    sentByEmail: 'Rina Aquino (rina@duoqs.com.au)',
    lastRfiSent: '05/11/2025',
    numRfisSent: 2,
    status: 'Resolved',
    documents: [
        { receivedDate: '02/11/2025', index: 1, name: 'Full Design Set', priority: 'Critical', reason: '', link: '<download link>', status: 'Received', lastUpdated: '02/11/2025' },
        { receivedDate: '03/11/2025', index: 2, name: 'Engineering Specs', priority: 'Critical', reason: '', link: '<download link>', status: 'Received', lastUpdated: '03/11/2025' },
        { receivedDate: '05/11/2025', index: 3, name: 'Soil Test Report', priority: 'Crucial but not Critical', reason: '', link: '<download link>', status: 'Received', lastUpdated: '05/11/2025' },
    ]
  },
  {
    id: 'received-3',
    sentDate: '10/10/2025',
    completedDate: '15/10/2025',
    projectNumber: 'CC379738-Strathfield',
    reportType: 'Cost Estimate',
    sentBy: 'Kimberly Cuaresma',
    outstandingDocs: '0/4',
    daysOutstanding: 0,
    resendEmail: 'No',
    sentByEmail: 'Quoc Duong (quoc@duoqs.com.au)',
    lastRfiSent: '15/10/2025',
    numRfisSent: 1,
    status: 'Resolved',
    documents: [
        { receivedDate: '11/10/2025', index: 1, name: 'Standard Elevations', priority: 'Critical', reason: '', link: '<link>', status: 'Received', lastUpdated: '11/10/2025' },
        { receivedDate: '12/10/2025', index: 2, name: 'Internal Details', priority: 'Supplementary', reason: '', link: '<link>', status: 'Received', lastUpdated: '12/10/2025' },
    ]
  },
  {
    id: 'received-4',
    sentDate: '20/09/2025',
    completedDate: '25/09/2025',
    projectNumber: 'CC379370-Palm Beach',
    reportType: 'Progress Claim Report',
    sentBy: 'Edrian Pardillo',
    outstandingDocs: '0/3',
    daysOutstanding: 0,
    resendEmail: 'No',
    sentByEmail: 'Jack Ho (jack@duoqs.com.au)',
    lastRfiSent: '25/09/2025',
    numRfisSent: 3,
    status: 'Resolved',
    documents: [
        { receivedDate: '21/09/2025', index: 1, name: 'Builder Claim Form', priority: 'Critical', reason: '', link: '<link>', status: 'Received', lastUpdated: '21/09/2025' },
        { receivedDate: '22/09/2025', index: 2, name: 'Site Photos', priority: 'Critical', reason: '', link: '<link>', status: 'Received', lastUpdated: '22/09/2025' },
    ]
  }
];

interface QSRfiPageProps {
  view?: 'pending' | 'received';
  onProjectClick?: (projectNumber: string) => void;
  initialExpandedProject?: string;
}

const QSRfiPage: React.FC<QSRfiPageProps> = ({ view = 'pending', onProjectClick, initialExpandedProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(() => {
      const initial: Record<string, boolean> = { 
        'pending-1': view === 'pending',
        'received-1': view === 'received'
      };
      if (initialExpandedProject) {
          const found = MOCK_RFIS.find(r => r.projectNumber === initialExpandedProject);
          if (found) initial[found.id] = true;
      }
      return initial;
  }); 

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRfis = useMemo(() => {
    return MOCK_RFIS.filter(rfi => {
      // Show Resolved RFIs only in Received view, Open RFIs only in Pending view
      if (view === 'received' && rfi.status !== 'Resolved') return false;
      if (view === 'pending' && rfi.status === 'Resolved') return false;

      const matchesSearch = rfi.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            rfi.sentBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, view]);

  const hasAnyExpanded = Object.values(expandedRows).some(v => v);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white font-sans text-xs">
      <TopBar 
        title={view === 'received' ? "Received Report" : "Pending RFI Request"} 
        subtitle={view === 'received' ? "Track incoming documentation" : "View and manage pending reports"} 
        description="Monitor communication gaps and document requirements" 
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1920px] mx-auto space-y-6">
          
          {/* Controls Strip */}
          <div className="flex items-center justify-between gap-4 mb-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search project number or sender..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-brand-orange outline-none text-sm transition-all" 
                />
              </div>
              <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm">
                      <RefreshCw size={14} /> Sync Status
                  </button>
                  <button className="flex items-center gap-2 bg-brand-orange px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-orange-600 transition-all shadow-sm">
                      <Plus size={16} /> New Entry
                  </button>
              </div>
          </div>

          {/* Table Container */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse table-fixed min-w-[1600px]">
                      <thead>
                          {/* INITIAL HEADING: Matches Screenshot with specific background and red line */}
                          <tr className={`${view === 'received' ? 'bg-[#ffb800] border-b-2 border-red-600' : 'bg-[#334155] border-b-2 border-slate-900'} h-14`}>
                              <th className={`w-12 border-r ${view === 'received' ? 'border-orange-600' : 'border-slate-700'}`}></th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center`}>Initial RFI Sent Date</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center`}>RFI Completed Date</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'}`}>Project Number</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'}`}>Report Type</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'}`}>Sent By</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center leading-tight`}>No. Outstanding<br/>Documents</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center leading-tight`}>No. of Business<br/>Days Outstanding</th>
                              
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center leading-tight`}>Resend RFI<br/>Email</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center`}>Sent by</th>
                              <th className={`px-4 text-[10px] font-black uppercase border-r ${view === 'received' ? 'border-orange-600 text-black' : 'border-slate-700 text-white'} text-center leading-tight`}>Last RFI<br/>Sent</th>
                              <th className={`px-4 text-[10px] font-black uppercase text-center leading-tight ${view === 'received' ? 'text-black' : 'text-white'}`}>No. RFI's<br/>sent</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                          {filteredRfis.map((rfi) => {
                              const isExpanded = expandedRows[rfi.id];
                              const shouldDim = hasAnyExpanded && !isExpanded;

                              return (
                                <React.Fragment key={rfi.id}>
                                    <tr className={`h-16 transition-all ${shouldDim ? 'bg-gray-100 opacity-60' : 'bg-[#f1f3f4] hover:bg-gray-200'} border-b border-gray-300`}>
                                        <td className="px-2 border-r border-gray-300 text-center">
                                            <button 
                                              onClick={() => toggleRow(rfi.id)}
                                              className={`w-8 h-8 flex items-center justify-center border border-black rounded transition-colors shadow-sm ${isExpanded ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                                            >
                                                {isExpanded ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
                                            </button>
                                        </td>

                                        <td className="px-4 text-xs font-bold text-gray-700 border-r border-gray-300 text-center">{rfi.sentDate}</td>
                                        <td className="px-4 text-xs font-bold text-gray-700 border-r border-gray-300 text-center">{rfi.completedDate}</td>
                                        
                                        <td className="px-4 border-r border-gray-300">
                                            <div className="flex items-center justify-between">
                                                <button 
                                                    onClick={() => onProjectClick?.(rfi.projectNumber)}
                                                    className="text-xs font-black text-blue-600 uppercase tracking-tight hover:underline text-left"
                                                >
                                                    {rfi.projectNumber}
                                                </button>
                                                <SalesforceIcon />
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 text-xs font-medium text-gray-700 border-r border-gray-300">{rfi.reportType}</td>
                                        <td className="px-4 text-xs font-medium text-gray-700 border-r border-gray-300">{rfi.sentBy}</td>
                                        <td className="px-4 text-xs font-black text-gray-800 border-r border-gray-300 text-center">{rfi.outstandingDocs}</td>
                                        <td className="px-4 text-xs font-black text-gray-800 border-r border-gray-300 text-center">{rfi.daysOutstanding}</td>
                                        
                                        <td className="px-4 text-xs font-medium text-gray-700 border-r border-gray-300 text-center">{rfi.resendEmail}</td>
                                        <td className="px-4 text-xs font-medium text-gray-600 border-r border-gray-300 italic truncate text-center">{rfi.sentByEmail}</td>
                                        <td className="px-4 text-xs font-medium text-gray-700 border-r border-gray-300 text-center">{rfi.lastRfiSent}</td>
                                        <td className="px-4 text-xs font-black text-gray-800 text-center">{rfi.numRfisSent}</td>
                                    </tr>
                                    
                                    {/* EXPANDED SECTION: Differentiates each job with a local header and indentation */}
                                    {isExpanded && rfi.documents && (
                                      <tr className="bg-gray-200">
                                          <td colSpan={12} className="py-4 pl-12 pr-6 border-b border-black">
                                              
                                              {/* Local Project Indicator Bar: Helps differentiate between multiple expanded jobs */}
                                              <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-white border border-black border-b-0 rounded-t-md w-fit">
                                                 <FileText size={14} className="text-gray-600" />
                                                 <span className="text-[10px] font-black text-gray-800 uppercase tracking-[0.1em]">Project Documents: </span>
                                                 <button 
                                                    onClick={() => onProjectClick?.(rfi.projectNumber)}
                                                    className="text-[10px] font-black text-blue-600 uppercase tracking-[0.1em] hover:underline flex items-center gap-1"
                                                 >
                                                    {rfi.projectNumber} <ExternalLink size={10} />
                                                 </button>
                                              </div>

                                              <div className="overflow-x-auto shadow-lg border border-black">
                                                  <table className="w-full text-left border-collapse table-fixed">
                                                      <thead>
                                                          {/* Sub Header: Specific Sky Blue with Bold Black Text */}
                                                          <tr className="bg-[#55b8f6] h-12 border-b border-black">
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black w-[150px] text-center">Document Received Date</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black" colSpan={2}>Documents</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black">Document Priority</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black" colSpan={2}>Client Reason if N/A</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black" colSpan={2}>Document Link</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase border-r border-black text-center w-32">DUOQS Received?</th>
                                                              <th className="px-4 text-[10px] font-black text-black uppercase text-center w-32">Last Updated</th>
                                                          </tr>
                                                      </thead>
                                                      <tbody>
                                                          {rfi.documents.map((doc, dIdx) => {
                                                              let rowBg = 'bg-[#92D050]'; 
                                                              if (doc.status === 'Outstanding') rowBg = 'bg-[#e06666]'; 
                                                              if (doc.status === 'N/A') rowBg = 'bg-[#D9EAF7]'; 

                                                              return (
                                                                <tr key={dIdx} className={`h-12 border-b border-black ${rowBg} hover:opacity-90 transition-opacity`}>
                                                                    <td className="px-4 text-xs font-bold text-black border-r border-black text-center">{doc.receivedDate}</td>
                                                                    <td className="w-8 px-2 text-xs font-bold text-black border-r border-black text-center">{doc.index}</td>
                                                                    <td className="px-4 text-xs font-bold text-black border-r border-black truncate">{doc.name}</td>
                                                                    <td className="px-4 text-xs font-bold text-black border-r border-black">{doc.priority}</td>
                                                                    <td className="px-4 text-[10px] font-bold text-black border-r border-black italic leading-tight" colSpan={2}>{doc.reason}</td>
                                                                    <td className="px-4 text-[10px] font-bold text-black border-r border-black italic truncate" colSpan={2}>{doc.link}</td>
                                                                    <td className="px-4 border-r border-black text-center">
                                                                        {doc.status === 'Received' && (
                                                                            <div className="bg-white inline-block border border-green-900 rounded p-0.5 shadow-sm">
                                                                                <CheckSquare className="text-green-800" size={26} />
                                                                            </div>
                                                                        )}
                                                                        {doc.status === 'Pending Review' && (
                                                                            <span className="text-red-600 font-black uppercase text-[10px] bg-white px-2 py-0.5 rounded border border-red-200">Pending Review</span>
                                                                        )}
                                                                        {doc.status === 'N/A' && <span className="text-black font-black text-[10px]">N/A</span>}
                                                                        {doc.status === 'Outstanding' && <span className="text-black opacity-0">...</span>}
                                                                    </td>
                                                                    <td className="px-4 text-xs font-bold text-black text-center">{doc.lastUpdated}</td>
                                                                </tr>
                                                              );
                                                          })}
                                                      </tbody>
                                                  </table>
                                              </div>
                                          </td>
                                      </tr>
                                    )}
                                </React.Fragment>
                              );
                          })}
                      </tbody>
                  </table>
                  {filteredRfis.length === 0 && (
                      <div className="py-24 text-center">
                          <Inbox size={48} className="mx-auto text-gray-200 mb-4" />
                          <p className="text-sm font-bold text-gray-400">No reports found in this view</p>
                      </div>
                  )}
              </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2">
              <div>System Version: RFI-2025-v1.8-{view?.toUpperCase()}</div>
              <div>Connected to Salesforce Production</div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default QSRfiPage;

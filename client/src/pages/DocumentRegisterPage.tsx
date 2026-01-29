
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, Filter, Plus, FileStack, ChevronDown, 
  ExternalLink, Download, Clock, CheckCircle2, 
  AlertCircle, History, Info, FileText, Layers,
  Box, HardHat, Building2, Ruler
} from 'lucide-react';

interface ProjectDocument {
  id: string;
  opportunity: string;
  category: 'Architectural' | 'Structural' | 'Civil' | 'Certificates' | 'Contract';
  docName: string;
  revision: string;
  receivedDate: string;
  processedBy: string;
  status: 'Current' | 'Superseded' | 'Awaiting Info';
  link: string;
}

const MOCK_DOCUMENTS: ProjectDocument[] = [
  {
    id: 'DOC-9001',
    opportunity: 'CC382581-Como',
    category: 'Architectural',
    docName: 'Standard Plans & Elevations',
    revision: 'Rev C',
    receivedDate: '12/12/2025',
    processedBy: 'Jack Ho',
    status: 'Current',
    link: '#'
  },
  {
    id: 'DOC-9002',
    opportunity: 'CC382581-Como',
    category: 'Structural',
    docName: 'Slab Layout & Details',
    revision: 'Rev B',
    receivedDate: '10/12/2025',
    processedBy: 'Edrian Pardillo',
    status: 'Current',
    link: '#'
  },
  {
    id: 'DOC-9003',
    opportunity: 'CC383072-Picnic Point',
    category: 'Contract',
    docName: 'HIA Fixed Price Contract',
    revision: 'Final',
    receivedDate: '08/12/2025',
    processedBy: 'Steven Leuta',
    status: 'Current',
    link: '#'
  },
  {
    id: 'DOC-9004',
    opportunity: 'CC314870-Williamstown',
    category: 'Architectural',
    docName: 'Master Plan',
    revision: 'Rev A',
    receivedDate: '15/10/2024',
    processedBy: 'Quoc Duong',
    status: 'Superseded',
    link: '#'
  },
  {
    id: 'DOC-9005',
    opportunity: 'CC382096-Williamstown',
    category: 'Certificates',
    docName: 'Form 15 - Design Certificate',
    revision: '-',
    receivedDate: '02/12/2025',
    processedBy: 'Jack Ho',
    status: 'Current',
    link: '#'
  }
];

interface DocumentRegisterPageProps {
  onNavigate?: (page: string, id?: string) => void;
}

const DocumentRegisterPage: React.FC<DocumentRegisterPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter(doc => {
      const matchesSearch = doc.opportunity.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.docName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f4f7fa]">
      <TopBar 
        title="Document Register" 
        subtitle="Project Drawings & Specs" 
        description="Central repository for all incoming design documentation and certificates" 
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8">
          
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by opportunity or document name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium transition-all" 
                />
              </div>
              <div className="flex items-center gap-3">
                  <div className="relative">
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="appearance-none bg-slate-50 px-6 py-3 pr-10 rounded-2xl text-sm font-bold text-slate-600 border border-transparent hover:border-slate-200 outline-none cursor-pointer"
                      >
                          <option value="All">All Categories</option>
                          <option value="Architectural">Architectural</option>
                          <option value="Structural">Structural</option>
                          <option value="Civil">Civil</option>
                          <option value="Certificates">Certificates</option>
                          <option value="Contract">Contract</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 px-8 py-3 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 whitespace-nowrap">
                      <Plus size={20} /> Register New Document
                  </button>
              </div>
          </div>

          {/* KPI Mini-Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DocKPI icon={<Layers className="text-blue-500" />} label="Total Documents" value={MOCK_DOCUMENTS.length.toString()} />
              <DocKPI icon={<CheckCircle2 className="text-emerald-500" />} label="Current Versions" value="4" />
              <DocKPI icon={<History className="text-amber-500" />} label="Superseded" value="1" />
              <DocKPI icon={<AlertCircle className="text-rose-500" />} label="Missing Details" value="0" />
          </div>

          {/* Main Register Table */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Doc ID</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opportunity</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document Name</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Revision</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Received</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                          {filteredDocs.map((doc) => (
                              <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                                  <td className="px-8 py-6 font-mono text-[11px] font-bold text-slate-400">{doc.id}</td>
                                  <td className="px-8 py-6">
                                      <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-sm" />
                                          <span
                                            className={`text-sm font-bold tracking-tight ${onNavigate ? 'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer' : 'text-slate-900'}`}
                                            onClick={() => onNavigate && onNavigate('opportunity-detail', doc.opportunity)}
                                          >{doc.opportunity}</span>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <CategoryPill category={doc.category} />
                                  </td>
                                  <td className="px-8 py-6">
                                      <p className="text-sm font-semibold text-slate-700 leading-none mb-1 group-hover:text-blue-600 transition-colors cursor-pointer">{doc.docName}</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                          <Clock size={10} /> By {doc.processedBy}
                                      </p>
                                  </td>
                                  <td className="px-8 py-6">
                                      <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{doc.revision}</span>
                                  </td>
                                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{doc.receivedDate}</td>
                                  <td className="px-8 py-6">
                                      <StatusBadge status={doc.status} />
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                              <Download size={16} />
                                          </button>
                                          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                              <ExternalLink size={16} />
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {filteredDocs.length === 0 && (
                      <div className="py-20 text-center flex flex-col items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                              <FileStack size={40} strokeWidth={1} />
                          </div>
                          <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching documents</p>
                              <p className="text-xs text-slate-300 font-medium">Try adjusting your search or filters</p>
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

const DocKPI: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center gap-5 hover:translate-y-[-2px] transition-transform cursor-default group">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none mb-2">{label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
        </div>
    </div>
);

const CategoryPill: React.FC<{ category: string }> = ({ category }) => {
    const categoryStyles: Record<string, string> = {
        Architectural: 'bg-indigo-50 text-indigo-600 border-indigo-100 icon-Indigo',
        Structural: 'bg-rose-50 text-rose-600 border-rose-100 icon-Rose',
        Civil: 'bg-emerald-50 text-emerald-600 border-emerald-100 icon-Emerald',
        Certificates: 'bg-amber-50 text-amber-600 border-amber-100 icon-Amber',
        Contract: 'bg-slate-100 text-slate-700 border-slate-200 icon-Slate'
    };
    const styles = categoryStyles[category] || 'bg-slate-100 text-slate-600';

    const categoryIcons: Record<string, typeof Box> = {
        Architectural: Ruler,
        Structural: HardHat,
        Civil: Building2,
        Certificates: CheckCircle2,
        Contract: FileText
    };
    const Icon = categoryIcons[category] || Box;

    return (
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider shadow-sm ${styles}`}>
            <Icon size={12} />
            {category}
        </span>
    );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusStyles: Record<string, string> = {
        Current: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        Superseded: 'bg-slate-100 text-slate-400 border-slate-200',
        'Awaiting Info': 'bg-amber-50 text-amber-600 border-amber-100'
    };
    const styles = statusStyles[status] || 'bg-slate-100 text-slate-600';

    return <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${styles}`}>{status}</span>;
};

export default DocumentRegisterPage;


import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, ChevronRight, ChevronDown, Bookmark, Copy, 
  Send, Eye, Check, Info, FileText, PlusCircle 
} from 'lucide-react';

interface ReportCategory {
  id: string;
  name: string;
  total: number;
  items: string[];
}

const CATEGORIES: ReportCategory[] = [
  { id: '1', name: 'Drawings', total: 20, items: ['Architectural Plans', 'Structural Details', 'Civil Layouts', 'Electrical Specs', 'Mechanical Services', 'Landscape Plan'] },
  { id: '2', name: 'Documents', total: 21, items: ['Project Brief', 'Site Analysis', 'Budget Spreadsheet', 'Meeting Minutes'] },
  { id: '3', name: 'Design Certificate', total: 5, items: ['Form 15', 'Structural Certification', 'Fire Safety Cert'] },
  { id: '4', name: 'Insurances', total: 7, items: ['Public Liability', 'Professional Indemnity', 'Workers Comp'] },
  { id: '5', name: 'Legal Documents', total: 4, items: ['HIA Fixed Price Contract', 'Land Title Search'] },
  { id: '6', name: 'Progress', total: 6, items: ['Claim #1', 'Claim #2', 'Site Photos - Foundation'] },
  { id: '7', name: 'Soft Costs', total: 13, items: ['Council Fees', 'Water Connection', 'DA Fees'] },
  { id: '8', name: 'Reports', total: 35, items: ['Detailed Cost Report', 'Feasibility Study'] },
  { id: '9', name: 'Site Photos', total: 1, items: ['Pre-commencement Photos'] },
  { id: '10', name: 'Cost to Complete', total: 8, items: ['Budget Variance Report'] },
];

const CreateRfiReportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [jobSearch, setJobSearch] = useState('');
  
  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [reportType, setReportType] = useState('');
  const [uploadLink, setUploadLink] = useState('https://duoqs.com.au');

  const handleToggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleToggleItem = (categoryName: string, itemName: string) => {
    const key = `${categoryName}|${itemName}`;
    setSelectedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    const all: Record<string, boolean> = {};
    CATEGORIES.forEach(cat => {
      cat.items.forEach(item => {
        all[`${cat.name}|${item}`] = true;
      });
    });
    setSelectedItems(all);
  };

  const handleDeselectAll = () => {
    setSelectedItems({});
  };

  const selectedList = useMemo(() => {
    return Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => key.split('|')[1]);
  }, [selectedItems]);

  const categorySelectionCount = (catName: string) => {
    return Object.entries(selectedItems)
      .filter(([key, selected]) => selected && key.startsWith(catName))
      .length;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f4f7fa]">
      <TopBar 
        title="Create RFI Report" 
        subtitle="QS RFI Management" 
        description="Select reports to generate a list for clients" 
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 pb-20">
          
          {/* LEFT COLUMN: Report Selection (7 columns) */}
          <div className="xl:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search reports..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleSelectAll}
                            className="px-4 py-1.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                        >
                            Select All
                        </button>
                        <button 
                            onClick={handleDeselectAll}
                            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all"
                        >
                            Deselect All
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                            <div 
                                className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                                onClick={() => handleToggleCategory(cat.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-slate-400">
                                        {expandedCategories[cat.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={cat.items.every(item => selectedItems[`${cat.name}|${item}`])}
                                        onChange={() => {
                                            const allCatSelected = cat.items.every(item => selectedItems[`${cat.name}|${item}`]);
                                            const next: Record<string, boolean> = { ...selectedItems };
                                            cat.items.forEach(item => next[`${cat.name}|${item}`] = !allCatSelected);
                                            setSelectedItems(next);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                                    />
                                    <span className="text-sm font-bold text-slate-700">
                                        {cat.name} <span className="text-slate-400 font-medium ml-1">({categorySelectionCount(cat.name)}/{cat.total})</span>
                                    </span>
                                </div>
                            </div>
                            
                            {expandedCategories[cat.id] && (
                                <div className="bg-slate-50 px-12 py-3 border-t border-slate-50 space-y-2">
                                    {cat.items.map(item => (
                                        <label key={item} className="flex items-center gap-3 py-1 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedItems[`${cat.name}|${item}`] || false}
                                                onChange={() => handleToggleItem(cat.name, item)}
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                                            />
                                            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
              </div>
          </div>

          {/* RIGHT COLUMN: Controls & Delivery (5 columns) */}
          <div className="xl:col-span-5 space-y-6">
              
              {/* Templates Section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Templates</h3>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-colors">
                      <Bookmark size={14} /> Save as Template
                  </button>
              </div>

              {/* Text List Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800">Text List ({selectedList.length} selected)</h3>
                      <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold transition-all">
                          <Copy size={12} /> Copy
                      </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 min-h-[80px]">
                      {selectedList.length > 0 ? (
                          <div className="space-y-1">
                              {selectedList.map((text, i) => (
                                  <p key={i} className="text-xs font-medium text-slate-600">• {text}</p>
                              ))}
                          </div>
                      ) : (
                          <p className="text-xs text-slate-400 italic text-center py-4">No reports selected. Select reports from the left panel to see preview.</p>
                      )}
                  </div>
              </div>

              {/* Send to Client Form */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <h3 className="text-sm font-bold text-[#1E293B]">Send to Client</h3>
                  
                  <div className="space-y-4">
                      {/* Job Number Lookup */}
                      <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Search by Job Number</label>
                          <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="e.g., CC370778-Ascot" 
                                value={jobSearch}
                                onChange={(e) => setJobSearch(e.target.value)}
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:border-[#3B82F6] outline-none text-sm"
                              />
                              <button className="px-5 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition-all active:scale-95">
                                  Search
                              </button>
                          </div>
                      </div>

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 gap-4">
                          <FormInput label="Client Name *" value={clientName} onChange={setClientName} placeholder="Enter client name or search by job number" />
                          <FormInput label="Client Email *" value={clientEmail} onChange={setClientEmail} placeholder="client@example.com" type="email" />
                      </div>

                      {/* Report Type Dropdown */}
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Report Type *</label>
                          <div className="relative">
                              <select 
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="w-full appearance-none bg-white border border-slate-200 px-4 py-2 pr-10 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-[#3B82F6] cursor-pointer"
                              >
                                  <option value="">Select Report Type</option>
                                  <option value="detailed">Detailed Cost Report</option>
                                  <option value="council">Council Cost Report</option>
                                  <option value="initial">Initial Cost Report</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                      </div>

                      {/* Upload Link */}
                      <FormInput label="Upload Link (Optional)" value={uploadLink} onChange={setUploadLink} placeholder="https://duoqs.com.au" />

                      {/* Send Button */}
                      <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-50 text-slate-300 rounded-2xl font-bold text-sm border border-slate-100 cursor-not-allowed transition-all mt-4">
                          <Send size={18} /> Send Email
                      </button>
                  </div>
              </div>

              {/* Email Preview Accordion */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2">
                          <Eye size={18} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">Email Preview</span>
                      </div>
                      <ChevronDown size={18} className="text-slate-400" />
                  </div>
              </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const FormInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{label}</label>
        <input 
            type={type} 
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-[#3B82F6] outline-none text-sm font-medium text-slate-700 placeholder-slate-300 transition-all" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder} 
        />
    </div>
);

export default CreateRfiReportPage;

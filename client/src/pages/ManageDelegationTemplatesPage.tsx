
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  FileText, Plus, MoreHorizontal, Edit3, Trash2, Search, Filter, 
  ChevronDown, Copy, LayoutTemplate, ArrowLeft, ChevronRight, Save,
  Archive, User, Check, AlertCircle, RefreshCw
} from 'lucide-react';

// --- Types ---

interface Template {
  id: string;
  name: string;
  team: string;
  status: 'Active' | 'Archived';
  lastUpdated: string;
  updatedBy: string;
  tradeCount: number;
}

interface TeamMember {
  name: string;
  team: string;
}

// --- Mock Data ---

const TEAMS = ['Team Red', 'Team Blue', 'Team Green', 'Team Pink', 'Team Yellow'];

const TEAM_MEMBERS_DATA: TeamMember[] = [
    { name: 'Jack Ho', team: 'Team Red' },
    { name: 'Edrian Pardillo', team: 'Team Red' },
    { name: 'Dave Agcaoili', team: 'Team Red' },
    { name: 'Patrick Cuaresma', team: 'Team Red' },
    { name: 'Quoc Duong', team: 'Team Blue' },
    { name: 'Rina Aquino', team: 'Team Blue' },
    { name: 'Jerald Aben', team: 'Team Blue' },
    { name: 'John Christian Perez', team: 'Team Blue' },
    { name: 'Kimberly Cuaresma', team: 'Team Green' },
    { name: 'Regina De Los Reyes', team: 'Team Green' },
    { name: 'Camille Centeno', team: 'Team Green' },
    { name: 'Angelica De Castro', team: 'Team Green' },
    { name: 'Angelo Encabo', team: 'Team Pink' },
    { name: 'Dzung Nguyen', team: 'Team Pink' },
    { name: 'Rengie Ann Argana', team: 'Team Pink' },
    { name: 'Jennifer Espalmado', team: 'Team Pink' },
    { name: 'Steven Leuta', team: 'Team Yellow' },
    { name: 'Ian Joseph Larinay', team: 'Team Yellow' },
    { name: 'Jamielah Macadato', team: 'Team Yellow' },
];

const TEMPLATE_LIST: Template[] = [
    { id: '1', name: 'Residential - Standard (QS + Admin + QA)', team: 'Team Red', status: 'Active', lastUpdated: '2 days ago', updatedBy: 'Jack Ho', tradeCount: 14 },
    { id: '2', name: 'Commercial - Comprehensive', team: 'Team Red', status: 'Active', lastUpdated: '1 week ago', updatedBy: 'Jack Ho', tradeCount: 22 },
    { id: '3', name: 'Insurance Replacement - Basic', team: 'Team Blue', status: 'Active', lastUpdated: '3 days ago', updatedBy: 'Quoc Duong', tradeCount: 8 },
    { id: '4', name: 'Progress Claim - Simple', team: 'Team Blue', status: 'Archived', lastUpdated: '1 month ago', updatedBy: 'Rina Aquino', tradeCount: 6 },
    { id: '5', name: 'Residential - High End', team: 'Team Green', status: 'Active', lastUpdated: '5 days ago', updatedBy: 'Kimberly Cuaresma', tradeCount: 18 },
    { id: '6', name: 'Council Cost Report - Standard', team: 'Team Pink', status: 'Active', lastUpdated: 'Yesterday', updatedBy: 'Angelo Encabo', tradeCount: 10 },
];

const TRADE_ITEMS = [
  { id: '1', name: "Review of Documents (Incl. SF)", type: "item" },
  { id: '2', name: "Email (RFI, Explanation, Acknowledge, etc)", type: "item" },
  { id: '3', name: "Team Discussion", type: "item" },
  { 
    id: '4', 
    name: "Takeoff Stage (Expand for Delegation)", 
    type: "group", 
    children: [
      "Preliminaries", "Demolitions", "Earthworks", "Piling and Shoring", "Concrete Works", 
      "Reinforcement", "Formwork", "Structural Works", "Masonry", "Metalwork", 
      "Aluminium Windows And Doors", "Doors & Door Hardware", "Carpentry", 
      "Roofing And Roof Plumbing", "Hydraulic Services", "Electrical Services", 
      "Mechanical Services", "Plasterboard", "Tiling", "Floor Finishes", 
      "Waterproofing", "Sanitary Fixtures & Tapware", "Bathroom Accessories And Shower Screens", 
      "Joinery", "Electrical Appliances", "Painting", "Rendering", "Cladding", 
      "Swimming Pool", "Landscaping", "External Works", "GFA", 
      "Fire Protection Services", "Transportation Services", 
      "Provisional Sum & Prime Cost Allowances", "Special Features", "Others"
    ]
  },
  { id: '5', name: "Report Fillout", type: "item" },
  { id: '6', name: "Checking", type: "item" },
  { id: '7', name: "Upload and Salesforce Fillout", type: "item" }
];

const ManageDelegationTemplatesPage: React.FC = () => {
  // --- State ---
  const [selectedTeam, setSelectedTeam] = useState<string>('Team Red');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [takeoffExpanded, setTakeoffExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Archived'>('Active');
  
  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  // --- Derived Data ---
  
  const teamTemplates = useMemo(() => {
    return TEMPLATE_LIST.filter(t => {
        const matchesTeam = t.team === selectedTeam;
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        return matchesTeam && matchesSearch && matchesStatus;
    });
  }, [selectedTeam, searchQuery, statusFilter]);

  // Select first template if none selected or selection not in current list (when switching teams)
  // But strictly, we should probably just clear selection or pick first available
  const activeTemplate = useMemo(() => {
      const found = TEMPLATE_LIST.find(t => t.id === selectedTemplateId);
      if (found && found.team === selectedTeam) return found;
      return teamTemplates.length > 0 ? teamTemplates[0] : null;
  }, [selectedTemplateId, teamTemplates, selectedTeam]);

  // Filter members for dropdowns
  const primaryDelegateOptions = useMemo(() => {
      return TEAM_MEMBERS_DATA.filter(m => m.team === selectedTeam).map(m => m.name);
  }, [selectedTeam]);

  const secondaryDelegateOptions = useMemo(() => {
      // Allow cross-team delegation for secondary? Prompt says "Either same team... Or allow Any team".
      // Let's list all, but maybe group them or just list names. Simple list for now.
      return TEAM_MEMBERS_DATA.map(m => m.name).sort();
  }, []);

  // --- Handlers ---

  const handleCreateTemplate = () => {
      // Mock creation logic
      setIsNewModalOpen(false);
      setNewTemplateName('');
      alert(`Created new template "${newTemplateName}" for ${selectedTeam}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar 
        title="Manage CC Delegation Templates" 
        subtitle="Operations" 
        description="Configure standard delegation matrices per team" 
      />

      <div className="flex-1 overflow-hidden flex flex-row p-6 gap-6 max-w-[1800px] mx-auto w-full">
        
        {/* --- LEFT COLUMN: Team & Template List --- */}
        <aside className="w-80 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm flex-shrink-0 overflow-hidden">
            
            {/* Team Selector Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Owner Team</label>
                <div className="relative">
                    <select 
                        value={selectedTeam}
                        onChange={(e) => {
                            setSelectedTeam(e.target.value);
                            setSearchQuery(''); // Clear search on team switch
                        }}
                        className="w-full appearance-none bg-white border border-gray-300 hover:border-brand-orange text-gray-800 text-sm font-bold py-2.5 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-colors cursor-pointer shadow-sm"
                    >
                        {TEAMS.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            {/* Template List Controls */}
            <div className="p-4 flex flex-col gap-3 border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search templates..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-100 p-0.5 rounded-lg">
                        <button 
                            onClick={() => setStatusFilter('Active')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${statusFilter === 'Active' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Active
                        </button>
                        <button 
                            onClick={() => setStatusFilter('Archived')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${statusFilter === 'Archived' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Archived
                        </button>
                    </div>
                    <button 
                        onClick={() => setIsNewModalOpen(true)}
                        className="p-1.5 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm" 
                        title="Create New Template"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
                {teamTemplates.length > 0 ? (
                    teamTemplates.map(template => (
                        <div 
                            key={template.id}
                            onClick={() => setSelectedTemplateId(template.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all group ${
                                activeTemplate?.id === template.id 
                                ? 'bg-orange-50 border-orange-200 shadow-sm' 
                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-xs font-bold leading-tight ${activeTemplate?.id === template.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {template.name}
                                </h4>
                                {activeTemplate?.id === template.id && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1 shrink-0"></div>}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] text-gray-400 font-medium">{template.tradeCount} Items</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${template.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                    {template.status}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <LayoutTemplate size={32} className="opacity-20 mb-2" />
                        <p className="text-xs text-center px-4">No {statusFilter.toLowerCase()} templates found for {selectedTeam}.</p>
                    </div>
                )}
            </div>
        </aside>

        {/* --- RIGHT COLUMN: Editor --- */}
        <main className="flex-1 flex flex-col min-w-0 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            {activeTemplate ? (
                <>
                    {/* Editor Header */}
                    <div className="px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
                        <div>
                            <div className="flex items-center gap-3 mb-1.5">
                                <h2 className="text-lg font-bold text-gray-900">{activeTemplate.name}</h2>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${activeTemplate.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                    {activeTemplate.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="font-semibold text-gray-400">Owner:</span> 
                                    <span className={`font-bold ${selectedTeam === 'Team Red' ? 'text-red-600' : selectedTeam === 'Team Blue' ? 'text-blue-600' : selectedTeam === 'Team Green' ? 'text-green-600' : selectedTeam === 'Team Pink' ? 'text-pink-600' : 'text-yellow-600'}`}>
                                        {activeTemplate.team}
                                    </span>
                                </span>
                                <span className="text-gray-300">•</span>
                                <span>Updated {activeTemplate.lastUpdated} by {activeTemplate.updatedBy}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
                                <Copy size={14} /> Duplicate
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                                <Archive size={14} /> {activeTemplate.status === 'Active' ? 'Archive' : 'Restore'}
                            </button>
                            <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-md active:scale-95 ml-2">
                                <Save size={14} /> Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FFB300] border-b border-gray-200 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-black text-black uppercase tracking-wider w-1/2">Trades / Workstream</th>
                                        <th className="px-6 py-3 text-xs font-black text-black uppercase tracking-wider w-1/4 border-l border-black/10">
                                            Primary Delegate 
                                            <span className="block text-[9px] font-medium opacity-70 normal-case mt-0.5">Members of {activeTemplate.team}</span>
                                        </th>
                                        <th className="px-6 py-3 text-xs font-black text-black uppercase tracking-wider w-1/4 border-l border-black/10">
                                            Secondary Delegate
                                            <span className="block text-[9px] font-medium opacity-70 normal-case mt-0.5">Optional Backup (Any Team)</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {TRADE_ITEMS.map((item) => {
                                        if (item.type === 'group') {
                                            return (
                                                <React.Fragment key={item.id}>
                                                    {/* Group Header */}
                                                    <tr 
                                                        className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                                                        onClick={() => setTakeoffExpanded(!takeoffExpanded)}
                                                    >
                                                        <td className="px-6 py-2.5">
                                                            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide">
                                                                {takeoffExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                                {item.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-2.5 border-l border-gray-600 bg-gray-800/50"></td>
                                                        <td className="px-6 py-2.5 border-l border-gray-600 bg-gray-800/50"></td>
                                                    </tr>
                                                    
                                                    {/* Children */}
                                                    {takeoffExpanded && item.children?.map((child, idx) => (
                                                        <tr key={`${item.id}-${idx}`} className="hover:bg-blue-50/50 transition-colors group">
                                                            <td className="px-6 py-2 pl-12 text-xs text-gray-700 font-medium border-l-4 border-l-transparent hover:border-l-brand-orange transition-colors">
                                                                {child}
                                                            </td>
                                                            <td className="px-6 py-2 border-l border-gray-100">
                                                                <div className="relative">
                                                                    <select className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer font-medium hover:border-gray-300 transition-colors">
                                                                        <option value="">Unassigned</option>
                                                                        {primaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                                    </select>
                                                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-2 border-l border-gray-100">
                                                                <div className="relative">
                                                                    <select className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer hover:border-gray-300 transition-colors">
                                                                        <option value="">-- None --</option>
                                                                        {secondaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                                    </select>
                                                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        }
                                        
                                        // Normal Item
                                        return (
                                            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                                                <td className="px-6 py-3 text-xs text-gray-800 font-bold border-l-4 border-l-transparent hover:border-l-brand-orange transition-colors">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-3 border-l border-gray-100">
                                                    <div className="relative">
                                                        <select className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer font-medium hover:border-gray-300 transition-colors">
                                                            <option value="">Unassigned</option>
                                                            {primaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                        </select>
                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 border-l border-gray-100">
                                                    <div className="relative">
                                                        <select className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer hover:border-gray-300 transition-colors">
                                                            <option value="">-- None --</option>
                                                            {secondaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                        </select>
                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FileText size={32} className="opacity-20" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-700 mb-1">No Template Selected</h3>
                    <p className="text-xs max-w-xs text-center mb-6">Select a template from the list on the left or create a new one for {selectedTeam}.</p>
                    <button 
                        onClick={() => setIsNewModalOpen(true)}
                        className="px-4 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        Create New Template
                    </button>
                </div>
            )}
        </main>

        {/* --- New Template Modal --- */}
        {isNewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-sm">Create New Template</h3>
                        <button onClick={() => setIsNewModalOpen(false)} className="text-gray-400 hover:text-gray-600"><div className="sr-only">Close</div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Owner Team</label>
                            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 cursor-not-allowed">
                                {selectedTeam}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">Locked to currently selected team view.</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Template Name</label>
                            <input 
                                type="text" 
                                autoFocus
                                placeholder="e.g., Industrial Warehouse - Complex"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Start From</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="startFrom" defaultChecked className="text-brand-orange focus:ring-brand-orange" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-700">Blank Template</span>
                                        <span className="text-[10px] text-gray-500">Start with empty assignments</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="startFrom" className="text-brand-orange focus:ring-brand-orange" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-700">Copy Existing (Same Team)</span>
                                        <span className="text-[10px] text-gray-500">Duplicate an active template</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                        <button 
                            onClick={() => setIsNewModalOpen(false)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreateTemplate}
                            disabled={!newTemplateName.trim()}
                            className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            Create Template
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ManageDelegationTemplatesPage;


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
  secondaryTeam?: string; // For multi-team templates
  status: 'Active' | 'Archived';
  lastUpdated: string;
  updatedBy: string;
  tradeCount: number;
  delegations: Record<string, { primary: string; secondary: string }>;
}

interface TeamMember {
  name: string;
  team: string;
}

// --- Mock Data ---

const TEAMS = ['All Teams', 'Team Red', 'Team Blue', 'Team Green', 'Team Pink', 'Team Yellow'];

const TEAM_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Team Red': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  'Team Blue': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Team Green': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  'Team Pink': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', dot: 'bg-pink-500' },
  'Team Yellow': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
};

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
    { name: 'Gregory Christ', team: 'Team Pink' },
    { name: 'Rean Aquino', team: 'Team Pink' },
    { name: 'Steven Leuta', team: 'Team Yellow' },
    { name: 'Ian Joseph Larinay', team: 'Team Yellow' },
    { name: 'Jamielah Macadato', team: 'Team Yellow' },
    { name: 'Nexierose Baluyot', team: 'Team Yellow' },
    { name: 'Danilo Jr de la Cruz', team: 'Team Yellow' },
];

// Helper function to get team members by team name
const getTeamMembers = (team: string): string[] => {
    return TEAM_MEMBERS_DATA.filter(m => m.team === team).map(m => m.name);
};

// Helper function to create default delegations for a team
const createDefaultDelegations = (team: string, secondaryTeam?: string): Record<string, { primary: string; secondary: string }> => {
    const members = getTeamMembers(team);
    const secondaryMembers = secondaryTeam ? getTeamMembers(secondaryTeam) : [];
    const delegations: Record<string, { primary: string; secondary: string }> = {};

    // Assign primary delegates in rotation
    const trades = [
        'Review of Documents (Incl. SF)',
        'Email (RFI, Explanation, Acknowledge, etc)',
        'Team Discussion',
        'Report Fillout',
        'Checking',
        'Upload and Salesforce Fillout',
        'Preliminaries', 'Demolitions', 'Earthworks', 'Piling and Shoring', 'Concrete Works',
        'Reinforcement', 'Formwork', 'Structural Works', 'Masonry', 'Metalwork',
        'Aluminium Windows And Doors', 'Doors & Door Hardware', 'Carpentry',
        'Roofing And Roof Plumbing', 'Hydraulic Services', 'Electrical Services',
        'Mechanical Services', 'Plasterboard', 'Tiling', 'Floor Finishes',
        'Waterproofing', 'Sanitary Fixtures & Tapware', 'Bathroom Accessories And Shower Screens',
        'Joinery', 'Electrical Appliances', 'Painting', 'Rendering', 'Cladding',
        'Swimming Pool', 'Landscaping', 'External Works', 'GFA',
        'Fire Protection Services', 'Transportation Services',
        'Provisional Sum & Prime Cost Allowances', 'Special Features', 'Others'
    ];

    trades.forEach((trade, idx) => {
        delegations[trade] = {
            primary: members[idx % members.length] || '',
            // If there's a secondary team, assign secondary delegates from that team
            secondary: secondaryTeam && secondaryMembers.length > 0
                ? secondaryMembers[idx % secondaryMembers.length]
                : ''
        };
    });

    return delegations;
};

const TEMPLATE_LIST: Template[] = [
    // Team Red Templates
    {
        id: '1',
        name: 'Residential - Standard (QS + Admin + QA)',
        team: 'Team Red',
        status: 'Active',
        lastUpdated: '2 days ago',
        updatedBy: 'Jack Ho',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Red')
    },
    {
        id: '2',
        name: 'Commercial - Comprehensive',
        team: 'Team Red',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Jack Ho',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Red')
    },
    {
        id: '3',
        name: 'Industrial - Complex',
        team: 'Team Red',
        status: 'Active',
        lastUpdated: '3 days ago',
        updatedBy: 'Patrick Cuaresma',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Red')
    },
    {
        id: '4',
        name: 'Heritage Building - Detailed',
        team: 'Team Red',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Dave Agcaoili',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Red')
    },

    // Team Blue Templates
    {
        id: '5',
        name: 'Insurance Replacement - Basic',
        team: 'Team Blue',
        status: 'Active',
        lastUpdated: '3 days ago',
        updatedBy: 'Quoc Duong',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Blue')
    },
    {
        id: '6',
        name: 'Progress Claim - Simple',
        team: 'Team Blue',
        status: 'Active',
        lastUpdated: '1 month ago',
        updatedBy: 'Rina Aquino',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Blue')
    },
    {
        id: '7',
        name: 'Hospital - Comprehensive',
        team: 'Team Blue',
        status: 'Active',
        lastUpdated: '5 days ago',
        updatedBy: 'Jerald Aben',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Blue')
    },
    {
        id: '8',
        name: 'Educational Facility - Standard',
        team: 'Team Blue',
        status: 'Active',
        lastUpdated: 'Yesterday',
        updatedBy: 'John Christian Perez',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Blue')
    },

    // Team Green Templates
    {
        id: '9',
        name: 'Residential - High End',
        team: 'Team Green',
        status: 'Active',
        lastUpdated: '5 days ago',
        updatedBy: 'Kimberly Cuaresma',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green')
    },
    {
        id: '10',
        name: 'Apartment Complex - Multi-Story',
        team: 'Team Green',
        status: 'Active',
        lastUpdated: '2 days ago',
        updatedBy: 'Regina De Los Reyes',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green')
    },
    {
        id: '11',
        name: 'Townhouse Development - Standard',
        team: 'Team Green',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Camille Centeno',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green')
    },
    {
        id: '12',
        name: 'Luxury Villa - Premium',
        team: 'Team Green',
        status: 'Active',
        lastUpdated: '4 days ago',
        updatedBy: 'Angelica De Castro',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green')
    },

    // Team Pink Templates
    {
        id: '13',
        name: 'Council Cost Report - Standard',
        team: 'Team Pink',
        status: 'Active',
        lastUpdated: 'Yesterday',
        updatedBy: 'Angelo Encabo',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink')
    },
    {
        id: '14',
        name: 'Storm Damage Assessment',
        team: 'Team Pink',
        status: 'Active',
        lastUpdated: '2 days ago',
        updatedBy: 'Dzung Nguyen',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink')
    },
    {
        id: '15',
        name: 'Fire Damage Evaluation',
        team: 'Team Pink',
        status: 'Active',
        lastUpdated: '3 days ago',
        updatedBy: 'Rengie Ann Argana',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink')
    },
    {
        id: '16',
        name: 'Water Damage Report',
        team: 'Team Pink',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Jennifer Espalmado',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink')
    },
    {
        id: '17',
        name: 'Structural Damage Analysis',
        team: 'Team Pink',
        status: 'Active',
        lastUpdated: '5 days ago',
        updatedBy: 'Gregory Christ',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink')
    },

    // Team Yellow Templates
    {
        id: '18',
        name: 'DA Cost Report - Standard',
        team: 'Team Yellow',
        status: 'Active',
        lastUpdated: '2 days ago',
        updatedBy: 'Steven Leuta',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Yellow')
    },
    {
        id: '19',
        name: 'Infrastructure Development',
        team: 'Team Yellow',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Ian Joseph Larinay',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Yellow')
    },
    {
        id: '20',
        name: 'Subdivision Feasibility',
        team: 'Team Yellow',
        status: 'Active',
        lastUpdated: '3 days ago',
        updatedBy: 'Jamielah Macadato',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Yellow')
    },
    {
        id: '21',
        name: 'Civil Works - Complex',
        team: 'Team Yellow',
        status: 'Active',
        lastUpdated: '4 days ago',
        updatedBy: 'Nexierose Baluyot',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Yellow')
    },

    // Multi-team Templates
    {
        id: '22',
        name: 'Mixed-Use Development',
        team: 'Team Red',
        secondaryTeam: 'Team Blue',
        status: 'Active',
        lastUpdated: '2 days ago',
        updatedBy: 'Jack Ho',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Red', 'Team Blue')
    },
    {
        id: '23',
        name: 'Large Retail Complex',
        team: 'Team Green',
        secondaryTeam: 'Team Yellow',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Kimberly Cuaresma',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green', 'Team Yellow')
    },
    {
        id: '24',
        name: 'Healthcare Complex - Multi-Specialty',
        team: 'Team Blue',
        secondaryTeam: 'Team Pink',
        status: 'Active',
        lastUpdated: '4 days ago',
        updatedBy: 'Quoc Duong',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Blue', 'Team Pink')
    },
    {
        id: '25',
        name: 'Insurance Assessment - Large Scale',
        team: 'Team Pink',
        secondaryTeam: 'Team Red',
        status: 'Active',
        lastUpdated: '3 days ago',
        updatedBy: 'Angelo Encabo',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Pink', 'Team Red')
    },
    {
        id: '26',
        name: 'Infrastructure & Commercial Hub',
        team: 'Team Yellow',
        secondaryTeam: 'Team Blue',
        status: 'Active',
        lastUpdated: '6 days ago',
        updatedBy: 'Steven Leuta',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Yellow', 'Team Blue')
    },
    {
        id: '27',
        name: 'Residential Estate - Premium',
        team: 'Team Green',
        secondaryTeam: 'Team Pink',
        status: 'Active',
        lastUpdated: '1 week ago',
        updatedBy: 'Kimberly Cuaresma',
        tradeCount: 46,
        delegations: createDefaultDelegations('Team Green', 'Team Pink')
    },
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
  const [multiTeamOnly, setMultiTeamOnly] = useState(false);

  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  // --- Derived Data ---

  const teamTemplates = useMemo(() => {
    return TEMPLATE_LIST.filter(t => {
        const matchesTeam = selectedTeam === 'All Teams' || t.team === selectedTeam || t.secondaryTeam === selectedTeam;
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        const matchesMultiTeam = !multiTeamOnly || (multiTeamOnly && t.secondaryTeam);
        return matchesTeam && matchesSearch && matchesStatus && matchesMultiTeam;
    });
  }, [selectedTeam, searchQuery, statusFilter, multiTeamOnly]);

  // Select first template if none selected or selection not in current list
  const activeTemplate = useMemo(() => {
      const found = TEMPLATE_LIST.find(t => t.id === selectedTemplateId);
      if (found && (selectedTeam === 'All Teams' || found.team === selectedTeam)) return found;
      return teamTemplates.length > 0 ? teamTemplates[0] : null;
  }, [selectedTemplateId, teamTemplates, selectedTeam]);

  // Filter members for dropdowns
  const primaryDelegateOptions = useMemo(() => {
      if (!activeTemplate) return [];
      return TEAM_MEMBERS_DATA.filter(m => m.team === activeTemplate.team).map(m => m.name);
  }, [activeTemplate]);

  const secondaryDelegateOptions = useMemo(() => {
      return TEAM_MEMBERS_DATA.map(m => m.name).sort();
  }, []);

  // --- Handlers ---

  const handleCreateTemplate = () => {
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
                <div className="relative mb-3">
                    <select
                        value={selectedTeam}
                        onChange={(e) => {
                            setSelectedTeam(e.target.value);
                            setSearchQuery('');
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

                {/* Multi-Team Filter Toggle */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2.5 hover:border-brand-orange transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">Multi-Team Only</span>
                    </div>
                    <button
                        onClick={() => setMultiTeamOnly(!multiTeamOnly)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${
                            multiTeamOnly ? 'bg-brand-orange' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                multiTeamOnly ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                        />
                    </button>
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
                            className={`p-3 rounded-lg border cursor-pointer transition-all group relative ${
                                activeTemplate?.id === template.id
                                ? 'bg-orange-50 border-orange-200 shadow-sm'
                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            {/* Team Color Indicator */}
                            <div className="flex items-center gap-2 mb-2">
                                {template.secondaryTeam ? (
                                    // Multi-team indicator
                                    <div className="flex gap-0.5">
                                        <div className={`w-3 h-3 rounded-full ${TEAM_COLORS[template.team]?.dot || 'bg-gray-400'}`}></div>
                                        <div className={`w-3 h-3 rounded-full ${TEAM_COLORS[template.secondaryTeam]?.dot || 'bg-gray-400'}`}></div>
                                    </div>
                                ) : (
                                    // Single team indicator
                                    <div className={`w-3 h-3 rounded-full ${TEAM_COLORS[template.team]?.dot || 'bg-gray-400'}`}></div>
                                )}
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${TEAM_COLORS[template.team]?.bg} ${TEAM_COLORS[template.team]?.text} ${TEAM_COLORS[template.team]?.border} border`}>
                                    {template.team.replace('Team ', '')}
                                    {template.secondaryTeam && ` + ${template.secondaryTeam.replace('Team ', '')}`}
                                </span>
                            </div>

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
                        <p className="text-xs text-center px-4">No {statusFilter.toLowerCase()} templates found{selectedTeam !== 'All Teams' && ` for ${selectedTeam}`}.</p>
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
                                    <span className={`px-2 py-0.5 rounded font-bold ${TEAM_COLORS[activeTemplate.team]?.bg} ${TEAM_COLORS[activeTemplate.team]?.text} ${TEAM_COLORS[activeTemplate.team]?.border} border text-[10px]`}>
                                        {activeTemplate.team}
                                    </span>
                                    {activeTemplate.secondaryTeam && (
                                        <>
                                            <span className="text-gray-400 mx-1">+</span>
                                            <span className={`px-2 py-0.5 rounded font-bold ${TEAM_COLORS[activeTemplate.secondaryTeam]?.bg} ${TEAM_COLORS[activeTemplate.secondaryTeam]?.text} ${TEAM_COLORS[activeTemplate.secondaryTeam]?.border} border text-[10px]`}>
                                                {activeTemplate.secondaryTeam}
                                            </span>
                                        </>
                                    )}
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
                                                    {takeoffExpanded && item.children?.map((child, idx) => {
                                                        const delegation = activeTemplate.delegations[child] || { primary: '', secondary: '' };
                                                        return (
                                                            <tr key={`${item.id}-${idx}`} className="hover:bg-blue-50/50 transition-colors group">
                                                                <td className="px-6 py-2 pl-12 text-xs text-gray-700 font-medium border-l-4 border-l-transparent hover:border-l-brand-orange transition-colors">
                                                                    {child}
                                                                </td>
                                                                <td className="px-6 py-2 border-l border-gray-100">
                                                                    <div className="relative">
                                                                        <select
                                                                            value={delegation.primary}
                                                                            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer font-medium hover:border-gray-300 transition-colors"
                                                                        >
                                                                            <option value="">Unassigned</option>
                                                                            {primaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                                        </select>
                                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-2 border-l border-gray-100">
                                                                    <div className="relative">
                                                                        <select
                                                                            value={delegation.secondary}
                                                                            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                                                                        >
                                                                            <option value="">-- None --</option>
                                                                            {secondaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                                        </select>
                                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            );
                                        }

                                        // Normal Item
                                        const delegation = activeTemplate.delegations[item.name] || { primary: '', secondary: '' };
                                        return (
                                            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                                                <td className="px-6 py-3 text-xs text-gray-800 font-bold border-l-4 border-l-transparent hover:border-l-brand-orange transition-colors">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-3 border-l border-gray-100">
                                                    <div className="relative">
                                                        <select
                                                            value={delegation.primary}
                                                            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer font-medium hover:border-gray-300 transition-colors"
                                                        >
                                                            <option value="">Unassigned</option>
                                                            {primaryDelegateOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                        </select>
                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 border-l border-gray-100">
                                                    <div className="relative">
                                                        <select
                                                            value={delegation.secondary}
                                                            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                                                        >
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
                    <p className="text-xs max-w-xs text-center mb-6">Select a template from the list on the left or create a new one{selectedTeam !== 'All Teams' && ` for ${selectedTeam}`}.</p>
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
                                {selectedTeam === 'All Teams' ? 'Team Red' : selectedTeam}
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

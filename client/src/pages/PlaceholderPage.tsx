
import React, { useState, useEffect, useRef, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Construction, Briefcase, Calendar, ChevronDown, Layers, TrendingUp, 
  CheckCircle2, Filter, Check, ChevronRight, ChevronLeft, Search, 
  AlertCircle, CalendarClock, Users, X, List, ClipboardList, Plus, 
  Settings, Save, Trash2, ArrowLeft, LayoutTemplate, FileText, User, ChevronUp, GripVertical,
  Eye, Edit3, ExternalLink, Info, Maximize2, Minimize2, Copy, AlertTriangle
} from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  onNavigate?: (page: string, id?: string) => void;
}

// --- Mock Data Linked from Calendar ---

// Week 1: Jan 12 - 16
const WEEK1_DATA = [
  { id: '1', day: 'Mon 12', title: 'CC385452-Taylors Lakes', team: 'Team Green', status: 'Done', type: 'DUO TAX IMPROVEMENT REPORT' },
  { id: '2', day: 'Tue 13', title: 'CC384557-East Geelong', team: 'Team Green', status: 'In Progress', type: 'DETAILED COST REPORT' },
  { id: '3', day: 'Tue 13', title: 'CC385229-Buderim', team: 'Team Red', status: 'Done', type: 'COST ESTIMATE - PROGRESS CLAIM REPORT' },
  { id: '4', day: 'Tue 13', title: 'CC385935-Coogee', team: 'Team Pink', status: 'Done', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '5', day: 'Wed 14', title: 'CC384526-Witchcliffe', team: 'Team Red', status: 'In Progress', type: 'COST ESTIMATE - PROGRESS CLAIM REPORT' },
  { id: '6', day: 'Wed 14', title: 'CC384456-Kilmore', team: 'Team Blue', status: 'Done', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '7', day: 'Wed 14', title: 'CC386016-Condell Park', team: 'Team Pink', status: 'In Progress', type: 'COUNCIL COST REPORT' },
  { id: '8', day: 'Wed 14', title: 'CC386014-Murrumbateman', team: 'Team Pink', status: 'Done', type: 'COUNCIL COST REPORT' },
  { id: '9', day: 'Wed 14', title: 'CC384636-Heidelberg', team: 'Team Green', status: 'Done', type: 'DUO TAX IMPROVEMENT REPORT' },
  { id: '10', day: 'Thu 15', title: 'CC386262-North Ryde', team: 'Team Pink', status: 'Open', type: 'COUNCIL COST REPORT' },
  { id: '11', day: 'Thu 15', title: 'CC384336-Annandale', team: 'Team Pink', status: 'Open', type: 'COUNCIL COST REPORT' },
  { id: '12', day: 'Thu 15', title: 'CC386037-West End', team: 'Team Pink', status: 'In Progress', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '13', day: 'Thu 15', title: 'CC385863-East Victoria Park', team: 'Team Green', status: 'Done', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '14', day: 'Fri 16', title: 'CC385812-Hoxton Park', team: 'Team Yellow', status: 'Done', type: 'INITIAL COST REPORT' },
  { id: '15', day: 'Fri 16', title: 'CC354395-Haynes', team: 'Team Yellow', status: 'Open', type: 'INITIAL COST REPORT' },
];

// Week 2: Jan 19 - 23 (Derived from CalendarPage)
const WEEK2_DATA = [
  { id: '16', day: 'Mon 19', title: 'CC385583-Bohle', team: 'Team Pink', status: 'Open', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '17', day: 'Tue 20', title: 'CC385409-North Kellyville', team: 'Team Red', status: 'Open', type: 'INITIAL COST REPORT - COST TO COMPLETE' },
  { id: '18', day: 'Fri 23', title: 'CC379196-Woollahra', team: 'Team Yellow', status: 'Open', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '19', day: 'Fri 23', title: 'CC386002-Terrey Hills', team: 'Team Blue', status: 'Open', type: 'DETAILED COST REPORT' },
];

// New Intake Data for "Newly Converted - No Deadline"
const INITIAL_INTAKE_DATA = [
  { id: 'int-1', name: 'CC386500-Parramatta', reportType: 'Detailed Cost Report', convertedDate: '15/01/2026', assignedTo: '', seniorEstimator: '', primaryTeam: '', secondaryTeam: '', deadline: '' },
  { id: 'int-2', name: 'CC386501-Chatswood', reportType: 'Council Cost Report', convertedDate: '15/01/2026', assignedTo: '', seniorEstimator: '', primaryTeam: '', secondaryTeam: '', deadline: '' },
  { id: 'int-3', name: 'CC386505-Ryde', reportType: 'Tax Depreciation', convertedDate: '14/01/2026', assignedTo: 'Steven Leuta', seniorEstimator: 'Jack Ho', primaryTeam: 'Team Blue', secondaryTeam: '', deadline: '' },
];

// Project Tracker Portal - No Tasks Data
const NO_TASKS_DATA = [
  { id: 'nt-1', name: 'CC386600-Burwood', convertedDate: '16/01/2026', deadline: '23/01/2026', team: 'Team Red', secondaryTeam: 'Team Blue', projectLead: 'Jack Ho', reportType: 'Residential - Standard' },
  { id: 'nt-2', name: 'CC386605-Concord', convertedDate: '16/01/2026', deadline: '24/01/2026', team: 'Team Blue', secondaryTeam: '-', projectLead: 'Steven Leuta', reportType: 'Commercial - Comprehensive' },
  { id: 'nt-3', name: 'CC386612-Strathfield', convertedDate: '17/01/2026', deadline: '25/01/2026', team: 'Team Green', secondaryTeam: 'Team Pink', projectLead: 'Quoc Duong', reportType: 'Residential - Standard' },
];

const PM_OPTIONS = ['Jack Ho', 'Steven Leuta', 'Quoc Duong', 'Kimberly Cuaresma', 'Dave Agcaoili'];
const SENIOR_ESTIMATOR_OPTIONS = ['Jack Ho', 'Quoc Duong', 'Edrian Pardillo', 'Dave Agcaoili'];

const TEAMS = ['Team Red', 'Team Blue', 'Team Yellow', 'Team Green', 'Team Pink'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Review', 'Done'];

const TEAM_STYLES: Record<string, { bg: string, text: string, border: string, dot: string }> = {
    'Team Red': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-500' },
    'Team Blue': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500' },
    'Team Yellow': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100', dot: 'bg-yellow-500' },
    'Team Green': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', dot: 'bg-green-500' },
    'Team Pink': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100', dot: 'bg-pink-500' },
};

// --- Wizard / Matrix Data ---

// 1. Team Directories
const TEAM_DIRECTORY: Record<string, string[]> = {
    'Team Red': ['Jack Ho', 'Patrick Cuaresma', 'Dave Agcaoili', 'Edrian Pardillo'],
    'Team Blue': ['Quoc Duong', 'Rina Aquino', 'Jerald Aben', 'John Christian Perez'],
    'Team Green': ['Kimberly Cuaresma', 'Regina De Los Reyes', 'Camille Centeno', 'Angelica De Castro'],
    'Team Pink': ['Angelo Encabo', 'Dzung Nguyen', 'Rengie Ann Argana', 'Jennifer Espalmado', 'Gregory Christ', 'Rean Aquino'],
    'Team Yellow': ['Steven Leuta', 'Ian Joseph Larinay', 'Jamielah Macadato', 'Nexierose Baluyot', 'Danilo Jr de la Cruz'], // Adding Yellow for completeness
};

// 2. Matrix Structure (Trades)
// This will be used as the Default Structure for templates
const MATRIX_TRADES_STRUCTURE = [
    { id: 'review', label: 'Review of Documents (Incl. SF)', type: 'item' },
    { id: 'email', label: 'Email (RFI, Explanation, Acknowledge, etc)', type: 'item' },
    { id: 'discussion', label: 'Team Discussion', type: 'item' },
    { 
        id: 'takeoff', 
        label: 'Takeoff Stage (Expand for Delegation)', 
        type: 'group', 
        children: [
            "Preliminaries",
            "Demolitions",
            "Earthworks",
            "Piling and Shoring",
            "Concrete Works",
            "Reinforcement",
            "Formwork",
            "Structural Works",
            "Masonry",
            "Metalwork",
            "Aluminium Windows And Doors",
            "Doors & Door Hardware",
            "Carpentry",
            "Roofing And Roof Plumbing",
            "Hydraulic Services",
            "Electrical Services",
            "Mechanical Services",
            "Plasterboard",
            "Tiling",
            "Floor Finishes",
            "Waterproofing",
            "Sanitary Fixtures & Tapware",
            "Bathroom Accessories And Shower Screens",
            "Joinery",
            "Electrical Appliances",
            "Painting",
            "Rendering",
            "Cladding",
            "Swimming Pool",
            "Landscaping",
            "External Works",
            "GFA",
            "Fire Protection Services",
            "Transportation Services",
            "Provisional Sum & Prime Cost Allowances",
            "Special Features",
            "Others"
        ]
    },
    { id: 'fillout', label: 'Report Fillout', type: 'item' },
    { id: 'checking', label: 'Checking', type: 'item' },
    { id: 'upload', label: 'Upload and Salesforce Fillout', type: 'item' }
];

const TEMPLATES = [
    { id: 't1', name: 'Residential - Standard (QS + Admin + QA)', type: 'Residential', team: 'Team Red' },
    { id: 't2', name: 'Commercial - Comprehensive', type: 'Commercial', team: 'Team Blue' },
    { id: 't3', name: 'Insurance - Basic', type: 'Insurance', team: 'Team Pink' },
    { id: 't4', name: 'Residential - High End', type: 'Residential', team: 'Team Green' },
    { id: 't5', name: 'Council Cost Report', type: 'CCR', team: 'Team Yellow' },
    { id: 't_shared', name: 'Universal Base Template', type: 'General', team: 'Shared' }
];

// 3. Default Assignment Logic
const getDefaultAssignments = (variant: string) => {
    const defaults: Record<string, string> = {};
    if (!variant) return defaults;
    
    const teamUpper = variant.toUpperCase();

    // Logic based on prompt rules
    if (teamUpper === 'TEAM RED') {
        // Admin/Comms -> Jack Ho
        defaults['Review of Documents (Incl. SF)'] = 'Jack Ho';
        defaults['Email (RFI, Explanation, Acknowledge, etc)'] = 'Jack Ho';
        defaults['Team Discussion'] = 'Jack Ho';
        defaults['Checking'] = 'Jack Ho';
        // Takeoff -> Dave Agcaoili (Heavy) / Patrick Cuaresma (General)
        // Splitting evenly for mock
        defaults['Preliminaries'] = 'Dave Agcaoili';
        defaults['Demolitions'] = 'Dave Agcaoili';
        defaults['Earthworks'] = 'Dave Agcaoili';
        defaults['Concrete Works'] = 'Patrick Cuaresma';
        defaults['Carpentry'] = 'Patrick Cuaresma';
        defaults['Electrical Services'] = 'Patrick Cuaresma';
        defaults['Hydraulic Services'] = 'Patrick Cuaresma';
        defaults['Painting'] = 'Dave Agcaoili';
        defaults['External Works'] = 'Dave Agcaoili';
        defaults['Report Fillout'] = 'Patrick Cuaresma';
        defaults['Upload and Salesforce Fillout'] = 'Edrian Pardillo';
    } else if (teamUpper === 'TEAM BLUE') {
        // Admin/Comms -> Rina Aquino
        defaults['Review of Documents (Incl. SF)'] = 'Rina Aquino';
        defaults['Email (RFI, Explanation, Acknowledge, etc)'] = 'Rina Aquino';
        // Discussion -> Quoc
        defaults['Team Discussion'] = 'Quoc Duong';
        defaults['Checking'] = 'Quoc Duong';
        // Takeoff -> Jerald Aben (Heavy) / Quoc Duong (General)
        defaults['Preliminaries'] = 'Jerald Aben';
        defaults['Demolitions'] = 'Jerald Aben';
        defaults['Earthworks'] = 'Jerald Aben';
        defaults['Concrete Works'] = 'Quoc Duong';
        defaults['Carpentry'] = 'Quoc Duong';
        defaults['Electrical Services'] = 'Quoc Duong';
        defaults['Hydraulic Services'] = 'Quoc Duong';
        defaults['Painting'] = 'Jerald Aben';
        defaults['External Works'] = 'Jerald Aben';
        defaults['Report Fillout'] = 'Quoc Duong';
        defaults['Upload and Salesforce Fillout'] = 'John Christian Perez';
    }
    // Default fallback for other teams or unmapped
    return defaults;
};

// --- Components ---

const DeadlinePickerPopover: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    onSelect: (date: string, assignments?: { primaryTeam: string, secondaryTeam: string, seniorEstimator: string }) => void; 
    anchorRef: React.RefObject<HTMLDivElement>;
    onNavigate?: (page: string, id?: string) => void;
    initialValues?: { primaryTeam: string, secondaryTeam: string, seniorEstimator: string };
    jobTitle?: string;
    reportType?: string;
}> = ({ isOpen, onClose, onSelect, onNavigate, initialValues, jobTitle, reportType }) => {
    
    const [viewYear, setViewYear] = useState(2026);
    const [viewMonth, setViewMonth] = useState(0); // Jan
    const [selectedDate, setSelectedDate] = useState<{year: number, month: number, day: number} | null>(null);
    const [showJobDetails, setShowJobDetails] = useState(false);

    // Form State for Assignments
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedSecondaryTeam, setSelectedSecondaryTeam] = useState('');
    const [selectedSenior, setSelectedSenior] = useState('');

    useEffect(() => {
        if (isOpen) {
            setViewYear(2026);
            setViewMonth(0);
            setSelectedDate(null);
            setShowJobDetails(false);
            setSelectedTeam(initialValues?.primaryTeam || '');
            setSelectedSecondaryTeam(initialValues?.secondaryTeam || '');
            setSelectedSenior(initialValues?.seniorEstimator || '');
        }
    }, [isOpen, initialValues]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4" onClick={onClose}>
             {/* Simplified Popover for context - actual implementation in previous file */}
             <div className="bg-white p-6 rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
                 <h3 className="text-lg font-bold mb-4">Set Deadline</h3>
                 <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
             </div>
        </div>
    )
};

// --- Template Inspector Modal ---
const TemplateInspector: React.FC<{
    isOpen: boolean;
    onClose: (hasChanges: boolean) => void;
    templateName: string;
    structure: any[];
    onSaveAsNew: (newStructure: any[], name: string) => void;
    primaryTeam?: string;
    secondaryTeam?: string;
}> = ({ isOpen, onClose, templateName, structure, onSaveAsNew, primaryTeam, secondaryTeam }) => {
    const [localStructure, setLocalStructure] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const [hasChanges, setHasChanges] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [editingItem, setEditingItem] = useState<{ id: string; parentId?: string } | null>(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            setLocalStructure(JSON.parse(JSON.stringify(structure)));
            setHasChanges(false);
            setExpandedGroups({});
            setSearchQuery('');
            setNewTemplateName(`Copy of ${templateName}`);
        }
    }, [isOpen, structure, templateName]);

    const handleToggleGroup = (id: string) => {
        setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDeleteItem = (id: string, parentId?: string) => {
        if (parentId) {
            // Remove from group
            setLocalStructure(prev => prev.map(item => {
                if (item.id === parentId && item.children) {
                    return { ...item, children: item.children.filter((child: any) => (typeof child === 'string' ? child : child) !== id && child !== id) }; 
                    // Note: Mock data children are strings, but we treat them as items. 
                    // In real app, children would be objects with IDs.
                    // For mock simplicity with current data structure:
                    return { ...item, children: item.children.filter((c: string) => c !== id) };
                }
                return item;
            }));
        } else {
            // Remove top level
            setLocalStructure(prev => prev.filter(item => item.id !== id));
        }
        setHasChanges(true);
    };

    const handleRenameItem = (id: string, newLabel: string, parentId?: string) => {
        if (parentId) {
            // Update child in group
            setLocalStructure(prev => prev.map(item => {
                if (item.id === parentId && item.children) {
                    return {
                        ...item,
                        children: item.children.map((child: any) => {
                            if (typeof child === 'object' && child.id === id) {
                                return { ...child, label: newLabel };
                            } else if (typeof child === 'string' && child === id) {
                                return { id: child, label: newLabel };
                            }
                            return child;
                        })
                    };
                }
                return item;
            }));
        } else {
            // Update top level item
            setLocalStructure(prev => prev.map(item =>
                item.id === id ? { ...item, label: newLabel } : item
            ));
        }
        setHasChanges(true);
    };

    const handleUpdateAssignment = (id: string, field: 'primaryAssignment' | 'secondaryAssignment', value: string, parentId?: string) => {
        if (parentId) {
            // Update child in group
            setLocalStructure(prev => prev.map(item => {
                if (item.id === parentId && item.children) {
                    return {
                        ...item,
                        children: item.children.map((child: any) => {
                            if (typeof child === 'object' && child.id === id) {
                                return { ...child, [field]: value };
                            } else if (typeof child === 'string' && child === id) {
                                // Convert string to object
                                return { id: child, label: child, [field]: value };
                            }
                            return child;
                        })
                    };
                }
                return item;
            }));
        } else {
            // Update top level item
            setLocalStructure(prev => prev.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            ));
        }
        setHasChanges(true);
    };

    const handleAddTrade = () => {
        const newTradeId = `trade-${Date.now()}`;
        const newTrade = {
            id: newTradeId,
            label: 'New Trade Item',
            type: 'item',
            primaryAssignment: '',
            secondaryAssignment: ''
        };
        setLocalStructure(prev => [...prev, newTrade]);
        setHasChanges(true);
        // Automatically enter edit mode for the new trade
        setTimeout(() => {
            setEditingItem({ id: newTradeId });
            setEditValue('New Trade Item');
        }, 0);
    };

    const handleSave = () => {
        onSaveAsNew(localStructure, newTemplateName);
        setShowSaveDialog(false);
    };

    const handleClose = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Discard them?')) {
                onClose(false);
            }
        } else {
            onClose(false);
        }
    };

    if (!isOpen) return null;

    // Filter Logic
    const filteredStructure = localStructure.filter(item => {
        const matches = item.label.toLowerCase().includes(searchQuery.toLowerCase());
        if (item.type === 'group' && item.children) {
            const childrenMatch = item.children.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()));
            return matches || childrenMatch;
        }
        return matches;
    });

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {showSaveDialog ? (
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Save as New Template</h3>
                    <p className="text-sm text-gray-500 mb-4">You've made changes to the template structure. Please save this as a new template to use it.</p>
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Template Name</label>
                        <input 
                            type="text" 
                            value={newTemplateName}
                            onChange={(e) => setNewTemplateName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowSaveDialog(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 text-sm bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600">Save & Use</button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Maximize2 size={18} className="text-brand-orange" />
                                Template Inspector
                            </h2>
                            <p className="text-xs text-gray-500">Viewing: <span className="font-semibold">{templateName}</span> {hasChanges && <span className="text-orange-600 font-bold ml-2">(Modified)</span>}</p>
                        </div>
                        <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500"><X size={20} /></button>
                    </div>

                    {/* Toolbar */}
                    <div className="px-6 py-3 border-b border-gray-100 flex gap-4 items-center">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search trades..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                            />
                        </div>
                        <button
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                            onClick={handleAddTrade}
                        >
                            <Plus size={14} /> Add Trade
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
                        {/* Team Information Section */}
                        {(primaryTeam || secondaryTeam) && (
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Primary Team */}
                                {primaryTeam && (
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <Users size={16} className="text-blue-600" />
                                                Primary Team
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-3">
                                                <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border ${TEAM_STYLES[primaryTeam] ? `${TEAM_STYLES[primaryTeam].bg} ${TEAM_STYLES[primaryTeam].text} ${TEAM_STYLES[primaryTeam].border}` : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {primaryTeam}
                                                </span>
                                            </div>
                                            <div className="space-y-1.5">
                                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Team Members:</p>
                                                {TEAM_DIRECTORY[primaryTeam]?.map((member, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 py-1">
                                                        <div className={`w-2 h-2 rounded-full ${TEAM_STYLES[primaryTeam]?.dot || 'bg-gray-400'}`}></div>
                                                        <span>{member}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Secondary Team */}
                                {secondaryTeam && secondaryTeam !== '-' && (
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <Users size={16} className="text-purple-600" />
                                                Secondary Team
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-3">
                                                <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border ${TEAM_STYLES[secondaryTeam] ? `${TEAM_STYLES[secondaryTeam].bg} ${TEAM_STYLES[secondaryTeam].text} ${TEAM_STYLES[secondaryTeam].border}` : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {secondaryTeam}
                                                </span>
                                            </div>
                                            <div className="space-y-1.5">
                                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Team Members:</p>
                                                {TEAM_DIRECTORY[secondaryTeam]?.map((member, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 py-1">
                                                        <div className={`w-2 h-2 rounded-full ${TEAM_STYLES[secondaryTeam]?.dot || 'bg-gray-400'}`}></div>
                                                        <span>{member}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase w-1/3">Trade / Workstream</th>
                                        {primaryTeam && (
                                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase border-l border-gray-200 w-1/4">
                                                <span className={TEAM_STYLES[primaryTeam]?.text || 'text-gray-500'}>
                                                    {primaryTeam} (Primary)
                                                </span>
                                            </th>
                                        )}
                                        {secondaryTeam && secondaryTeam !== '-' && (
                                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase border-l border-gray-200 w-1/4">
                                                <span className={TEAM_STYLES[secondaryTeam]?.text || 'text-gray-500'}>
                                                    {secondaryTeam} (Secondary)
                                                </span>
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right border-l border-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStructure.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr className="hover:bg-gray-50 group">
                                                <td className="px-6 py-3">
                                                    {item.type === 'group' ? (
                                                        <button onClick={() => handleToggleGroup(item.id)} className="flex items-center gap-2 font-bold text-sm text-gray-800 hover:text-brand-orange">
                                                            {expandedGroups[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                            {item.label}
                                                            <span className="text-xs font-normal text-gray-400 ml-2">({item.children?.length || 0} items)</span>
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-2 pl-6">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                                            {editingItem?.id === item.id && !editingItem?.parentId ? (
                                                                <input
                                                                    type="text"
                                                                    value={editValue}
                                                                    onChange={(e) => setEditValue(e.target.value)}
                                                                    onBlur={() => {
                                                                        if (editValue.trim()) {
                                                                            handleRenameItem(item.id, editValue);
                                                                        }
                                                                        setEditingItem(null);
                                                                    }}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            if (editValue.trim()) {
                                                                                handleRenameItem(item.id, editValue);
                                                                            }
                                                                            setEditingItem(null);
                                                                        } else if (e.key === 'Escape') {
                                                                            setEditingItem(null);
                                                                        }
                                                                    }}
                                                                    autoFocus
                                                                    className="text-sm font-medium text-gray-700 border border-brand-orange rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                                                />
                                                            ) : (
                                                                <div className="flex items-center gap-2 group/edit">
                                                                    <span
                                                                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brand-orange"
                                                                        onDoubleClick={() => {
                                                                            setEditingItem({ id: item.id });
                                                                            setEditValue(item.label);
                                                                        }}
                                                                        title="Double-click to edit"
                                                                    >
                                                                        {item.label}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingItem({ id: item.id });
                                                                            setEditValue(item.label);
                                                                        }}
                                                                        className="opacity-0 group-hover/edit:opacity-100 p-1 hover:bg-orange-50 rounded transition-all"
                                                                        title="Edit trade name"
                                                                    >
                                                                        <Edit3 size={12} className="text-gray-400 hover:text-brand-orange" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                {primaryTeam && (
                                                    <td className="px-6 py-3 border-l border-gray-100">
                                                        {item.type !== 'group' && (
                                                            <select
                                                                value={item.primaryAssignment || ''}
                                                                onChange={(e) => handleUpdateAssignment(item.id, 'primaryAssignment', e.target.value)}
                                                                className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                                            >
                                                                <option value="">Unassigned</option>
                                                                {TEAM_DIRECTORY[primaryTeam]?.map(member => (
                                                                    <option key={member} value={member}>{member}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>
                                                )}
                                                {secondaryTeam && secondaryTeam !== '-' && (
                                                    <td className="px-6 py-3 border-l border-gray-100">
                                                        {item.type !== 'group' && (
                                                            <select
                                                                value={item.secondaryAssignment || ''}
                                                                onChange={(e) => handleUpdateAssignment(item.id, 'secondaryAssignment', e.target.value)}
                                                                className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                                            >
                                                                <option value="">Unassigned</option>
                                                                {TEAM_DIRECTORY[secondaryTeam]?.map(member => (
                                                                    <option key={member} value={member}>{member}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>
                                                )}
                                                <td className="px-6 py-3 text-right border-l border-gray-100">
                                                    <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                            {item.type === 'group' && expandedGroups[item.id] && item.children?.map((child: any, idx: number) => {
                                                const childObj = typeof child === 'string' ? { id: child, label: child } : child;
                                                return (
                                                    <tr key={`${item.id}-${idx}`} className="hover:bg-gray-50 bg-gray-50/30 group">
                                                        <td className="px-6 py-2 pl-12 border-l-4 border-l-transparent hover:border-l-brand-orange transition-colors">
                                                            {editingItem?.id === childObj.id && editingItem?.parentId === item.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editValue}
                                                                    onChange={(e) => setEditValue(e.target.value)}
                                                                    onBlur={() => {
                                                                        if (editValue.trim()) {
                                                                            handleRenameItem(childObj.id, editValue, item.id);
                                                                        }
                                                                        setEditingItem(null);
                                                                    }}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            if (editValue.trim()) {
                                                                                handleRenameItem(childObj.id, editValue, item.id);
                                                                            }
                                                                            setEditingItem(null);
                                                                        } else if (e.key === 'Escape') {
                                                                            setEditingItem(null);
                                                                        }
                                                                    }}
                                                                    autoFocus
                                                                    className="text-sm text-gray-600 border border-brand-orange rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-orange w-full"
                                                                />
                                                            ) : (
                                                                <div className="flex items-center gap-2 group/edit">
                                                                    <span
                                                                        className="text-sm text-gray-600 cursor-pointer hover:text-brand-orange"
                                                                        onDoubleClick={() => {
                                                                            setEditingItem({ id: childObj.id, parentId: item.id });
                                                                            setEditValue(childObj.label);
                                                                        }}
                                                                        title="Double-click to edit"
                                                                    >
                                                                        {childObj.label}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingItem({ id: childObj.id, parentId: item.id });
                                                                            setEditValue(childObj.label);
                                                                        }}
                                                                        className="opacity-0 group-hover/edit:opacity-100 p-1 hover:bg-orange-50 rounded transition-all"
                                                                        title="Edit trade name"
                                                                    >
                                                                        <Edit3 size={12} className="text-gray-400 hover:text-brand-orange" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                        {primaryTeam && (
                                                            <td className="px-6 py-2 border-l border-gray-100">
                                                                <select
                                                                    value={childObj.primaryAssignment || ''}
                                                                    onChange={(e) => handleUpdateAssignment(childObj.id, 'primaryAssignment', e.target.value, item.id)}
                                                                    className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                                                >
                                                                    <option value="">Unassigned</option>
                                                                    {TEAM_DIRECTORY[primaryTeam]?.map(member => (
                                                                        <option key={member} value={member}>{member}</option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                        )}
                                                        {secondaryTeam && secondaryTeam !== '-' && (
                                                            <td className="px-6 py-2 border-l border-gray-100">
                                                                <select
                                                                    value={childObj.secondaryAssignment || ''}
                                                                    onChange={(e) => handleUpdateAssignment(childObj.id, 'secondaryAssignment', e.target.value, item.id)}
                                                                    className="w-full text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                                                >
                                                                    <option value="">Unassigned</option>
                                                                    {TEAM_DIRECTORY[secondaryTeam]?.map(member => (
                                                                        <option key={member} value={member}>{member}</option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                        )}
                                                        <td className="px-6 py-2 text-right border-l border-gray-100">
                                                            <button onClick={() => handleDeleteItem(childObj.id, item.id)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100">
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                            {hasChanges ? 'Unsaved changes' : 'No changes made'}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Close
                            </button>
                            {hasChanges && (
                                <button onClick={() => setShowSaveDialog(true)} className="px-6 py-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 rounded-lg shadow-sm transition-colors">
                                    Save as New Template
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Delegation Wizard Modal ---
const DelegationWizardModal: React.FC<{ 
    isOpen: boolean, 
    onClose: () => void, 
    opportunity: any, 
    wizardData: any, 
    onUpdateData: (data: any) => void,
    onNavigate?: (page: string, id?: string) => void
}> = ({ isOpen, onClose, opportunity, wizardData, onUpdateData, onNavigate }) => {
    if (!isOpen || !opportunity) return null;

    const currentStep = wizardData.step || 1;
    const [takeoffExpanded, setTakeoffExpanded] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
    
    // Local Templates State (Initialized with default structure)
    const [localTemplates, setLocalTemplates] = useState(() => TEMPLATES.map(t => ({
        ...t,
        structure: JSON.parse(JSON.stringify(MATRIX_TRADES_STRUCTURE))
    })));

    // Inspector State
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);

    const hasSecondary = opportunity.secondaryTeam && opportunity.secondaryTeam !== '-';

    // --- Helpers ---
    const getTeamMembers = (teamName: string) => TEAM_DIRECTORY[teamName] || [];

    // --- Initial Load / Updates ---
    useEffect(() => {
        if (currentStep === 1 && !wizardData.initialized) {
            onUpdateData({ 
                ...wizardData, 
                filterTeam: opportunity.team, 
                teamVariant: hasSecondary ? opportunity.secondaryTeam : '', 
                initialized: true
            });
        }
    }, [currentStep, opportunity.team, opportunity.secondaryTeam, wizardData.initialized]);

    // --- Step 1 Handlers ---
    const handleFilterTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTeam = e.target.value;
        const tId = wizardData.selectedTemplateId;
        
        // If template selected, update assignments with new team
        if (tId) {
            const tmpl = localTemplates.find(t => t.id === tId);
            if (tmpl) {
                generateAssignments(tId, newTeam, wizardData.teamVariant, tmpl.structure);
            }
        } else {
            // Just update team
            onUpdateData({ 
                ...wizardData, 
                filterTeam: newTeam,
                selectedTemplateId: '' 
            });
        }
        setShowPreview(false); // Reset preview on team change to force re-evaluation if opened again
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tId = e.target.value;
        const selectedTemplate = localTemplates.find(t => t.id === tId);
        
        // When template changes, regenerate assignments based on THAT template's structure
        if (selectedTemplate) {
            generateAssignments(tId, wizardData.filterTeam, wizardData.teamVariant, selectedTemplate.structure);
        } else {
            onUpdateData({ ...wizardData, selectedTemplateId: '', assignments: {} });
        }
        setShowPreview(true); // Auto show preview on select
    };

    const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const variant = e.target.value;
        const selectedTemplate = localTemplates.find(t => t.id === wizardData.selectedTemplateId);
        if (selectedTemplate) {
            generateAssignments(wizardData.selectedTemplateId, wizardData.filterTeam, variant, selectedTemplate.structure);
        } else {
            onUpdateData({ ...wizardData, teamVariant: variant });
        }
    };

    const generateAssignments = (templateId: string, pTeam: string, sTeam: string, structure: any[]) => {
        if (!templateId) {
            onUpdateData({ ...wizardData, selectedTemplateId: '', assignments: {} });
            return;
        }

        const primaryDefaults = getDefaultAssignments(pTeam);
        const secondaryDefaults = getDefaultAssignments(sTeam);
        const newAssignments: Record<string, { primary: string, secondary: string }> = {};

        // Flatten trade list for assignment generation from the PASSED structure
        const allTrades: string[] = [];
        structure.forEach(row => {
            if (row.type === 'item') allTrades.push(row.label);
            if (row.type === 'group' && row.children) allTrades.push(...row.children);
        });

        allTrades.forEach(trade => {
            newAssignments[trade] = {
                primary: primaryDefaults[trade] || '',
                secondary: secondaryDefaults[trade] || '' 
            };
        });

        onUpdateData({ 
            ...wizardData, 
            selectedTemplateId: templateId,
            filterTeam: pTeam,
            teamVariant: sTeam,
            assignments: newAssignments
        });
    };

    // --- Save New Template Handler ---
    const handleSaveNewTemplate = (newStructure: any[], name: string) => {
        const newTemplateId = `cust-${Date.now()}`;
        const newTemplate = {
            id: newTemplateId,
            name: name,
            type: 'Custom',
            team: wizardData.filterTeam, // Assign to current filtered team
            structure: newStructure
        };

        setLocalTemplates(prev => [...prev, newTemplate]);
        
        // Auto select the new template
        generateAssignments(newTemplateId, wizardData.filterTeam, wizardData.teamVariant, newStructure);
        
        setIsInspectorOpen(false);
    };

    // --- Step 2 Handlers (Assignments) ---
    const updateAssignment = (trade: string, field: 'primary' | 'secondary', value: string) => {
        const updated = { ...wizardData.assignments };
        if (!updated[trade]) updated[trade] = { primary: '', secondary: '' };
        updated[trade] = { ...updated[trade], [field]: value };
        onUpdateData({ ...wizardData, assignments: updated });
    };

    const bulkAssign = (field: 'primary' | 'secondary', value: string) => {
        const updated = { ...wizardData.assignments };
        Object.keys(updated).forEach(trade => {
            updated[trade] = { ...updated[trade], [field]: value };
        });
        onUpdateData({ ...wizardData, assignments: updated });
    };

    const clearAssignments = () => {
        const updated = { ...wizardData.assignments };
        Object.keys(updated).forEach(trade => {
            updated[trade] = { primary: '', secondary: '' };
        });
        onUpdateData({ ...wizardData, assignments: updated });
    };

    // --- Navigation Handlers ---
    const handleNext = () => {
        if (currentStep < 3) onUpdateData({ ...wizardData, step: currentStep + 1 });
        else onClose(); // Finish
    };

    const handleBack = () => {
        if (currentStep > 1) onUpdateData({ ...wizardData, step: currentStep - 1 });
    };

    const handleManageTemplates = () => {
        if (onNavigate) onNavigate('templates');
    };

    const handleCreateTemplate = () => {
        if (onNavigate) onNavigate('templates'); 
    };

    // --- Render Helpers ---
    const renderMatrixRow = (tradeLabel: string, indent = false) => {
        const assignment = wizardData.assignments?.[tradeLabel] || { primary: '', secondary: '' };
        const primaryOptions = getTeamMembers(opportunity.team);
        const secondaryOptions = opportunity.secondaryTeam && opportunity.secondaryTeam !== '-' 
            ? getTeamMembers(opportunity.secondaryTeam) 
            : [];

        return (
            <tr key={tradeLabel} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                <td className={`px-4 py-2 text-xs text-gray-700 font-medium ${indent ? 'pl-8 border-l-4 border-l-gray-100' : ''}`}>
                    {tradeLabel}
                </td>
                <td className="px-4 py-2">
                    <select 
                        value={assignment.primary} 
                        onChange={(e) => updateAssignment(tradeLabel, 'primary', e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white focus:ring-1 focus:ring-brand-orange outline-none"
                    >
                        <option value="">-- Select --</option>
                        {primaryOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </td>
                <td className="px-4 py-2">
                    {secondaryOptions.length > 0 ? (
                        <select 
                            value={assignment.secondary}
                            onChange={(e) => updateAssignment(tradeLabel, 'secondary', e.target.value)}
                            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white focus:ring-1 focus:ring-brand-orange outline-none"
                        >
                            <option value="">-- Select --</option>
                            {secondaryOptions.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    ) : (
                        <span className="text-gray-300 text-xs text-center block">—</span>
                    )}
                </td>
            </tr>
        );
    };

    // Calculate Deadline Date (Mock +7 days)
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 7);
    const deadlineStr = deadlineDate.toLocaleDateString();

    const teamColorMap: Record<string, string> = {
        'Team Red': 'text-red-600',
        'Team Blue': 'text-blue-600',
        'Team Green': 'text-green-600',
        'Team Pink': 'text-pink-600',
        'Team Yellow': 'text-yellow-600'
    };

    const isAutoDetectedTeam = wizardData.filterTeam === opportunity.team;
    const isAutoDetectedVariant = !wizardData.teamVariant || wizardData.teamVariant === opportunity.secondaryTeam;
    
    // Get Selected Template Object
    const selectedTemplate = localTemplates.find(t => t.id === wizardData.selectedTemplateId);
    
    // Filter templates based on selected team
    const currentFilterTeam = wizardData.filterTeam || opportunity.team;
    const availableTemplates = localTemplates.filter(t => t.team === currentFilterTeam || t.team === 'Shared');

    // Get Defaults for Preview
    const pDefaults = getDefaultAssignments(wizardData.filterTeam || opportunity.team);
    const sDefaults = getDefaultAssignments(wizardData.teamVariant || '');

    const renderPreviewItem = (item: any) => {
        const pDel = pDefaults[item.label] || 'Unassigned';
        const sDel = !hasSecondary ? '—' : (sDefaults[item.label] || 'Unassigned');

        return (
            <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 hover:bg-blue-50/30 text-sm items-center border-b border-gray-100 last:border-0 group transition-colors">
                <div className="flex items-center gap-3 text-gray-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                    {item.label}
                </div>
                <div className={`truncate ${pDel === 'Unassigned' ? 'text-gray-400 italic' : 'text-gray-700 font-medium'}`} title={pDel}>{pDel}</div>
                <div className={`truncate ${sDel === 'Unassigned' ? 'text-gray-400 italic' : sDel === '—' ? 'text-gray-300' : 'text-gray-700 font-medium'}`} title={sDel}>{sDel}</div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <div className={`bg-white rounded-2xl shadow-2xl w-[1100px] max-w-full flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 transition-all ${currentStep === 2 ? 'h-[800px]' : 'h-auto'}`}>
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Create Delegation List</h2>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Opportunity: <span className="text-gray-700">{opportunity.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
                    
                    {/* Step Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map(step => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${currentStep >= step ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {step}
                                    </div>
                                    {step < 3 && <div className={`w-12 h-0.5 mx-2 ${currentStep > step ? 'bg-brand-orange' : 'bg-gray-200'}`}></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Template */}
                    {currentStep === 1 && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                                
                                {/* Team Selection (Filter) */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Primary Team</label>
                                    <div className="relative">
                                        <select 
                                            value={wizardData.filterTeam || opportunity.team} 
                                            onChange={handleFilterTeamChange}
                                            className="w-full text-sm border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-100 outline-none shadow-sm font-medium"
                                        >
                                            {TEAMS.map(team => (
                                                <option key={team} value={team}>{team}</option>
                                            ))}
                                        </select>
                                        <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${isAutoDetectedTeam ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {isAutoDetectedTeam ? 'Auto-Detected' : 'Manual'}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1 flex items-start gap-1.5">
                                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                                        <span>Defaults to the opportunity’s Primary Team. Changing this filters available templates.</span>
                                    </p>
                                </div>

                                {/* Template Selection Area */}
                                <div className="pt-2 border-t border-gray-100">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-4">Select Template</label>
                                    
                                    {availableTemplates.length > 0 ? (
                                        <>
                                            <select 
                                                value={wizardData.selectedTemplateId || ''} 
                                                onChange={handleTemplateChange}
                                                className="w-full text-sm border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-100 outline-none shadow-sm mb-2"
                                            >
                                                <option value="">-- Choose a Template --</option>
                                                {/* Group templates if needed, or list directly */}
                                                <optgroup label={`${currentFilterTeam} Templates`}>
                                                    {availableTemplates.filter(t => t.team !== 'Shared').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                                </optgroup>
                                                {availableTemplates.some(t => t.team === 'Shared') && (
                                                    <optgroup label="Shared Templates">
                                                        {availableTemplates.filter(t => t.team === 'Shared').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                                    </optgroup>
                                                )}
                                            </select>

                                            {/* Template Actions Row */}
                                            <div className="flex flex-wrap items-center justify-between mt-2 text-xs gap-y-2">
                                                <div className="text-gray-400 italic flex items-center gap-1">
                                                    <Info size={12} />
                                                    {wizardData.selectedTemplateId ? 'Expand to view or edit structure' : 'Select a template to view details'}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {wizardData.selectedTemplateId && (
                                                        <button 
                                                            onClick={() => setShowPreview(!showPreview)} 
                                                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                                        >
                                                            {showPreview ? <Eye size={12} className="opacity-50" /> : <Eye size={12} />}
                                                            {showPreview ? 'Hide Preview' : 'Preview'}
                                                        </button>
                                                    )}
                                                    {wizardData.selectedTemplateId && <span className="text-gray-300">|</span>}
                                                    <button onClick={handleManageTemplates} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                                        Manage templates
                                                    </button>
                                                    <button onClick={handleCreateTemplate} className="text-blue-600 hover:text-blue-800 font-bold hover:underline flex items-center gap-1">
                                                        <Plus size={10} strokeWidth={3} /> Create new
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Enhanced Inline Preview Panel */}
                                            {showPreview && selectedTemplate && (
                                                <div className={`mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-1 duration-200 flex flex-col transition-all ${isPreviewExpanded ? '' : ''}`}>
                                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center shrink-0">
                                                        <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                            <LayoutTemplate size={16} className="text-blue-500" />
                                                            Included Trades
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                                                                className="text-xs font-bold text-gray-600 bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-sm"
                                                            >
                                                                {isPreviewExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                                                                {isPreviewExpanded ? 'Collapse' : 'Expand'}
                                                            </button>
                                                            <button 
                                                                onClick={() => setIsInspectorOpen(true)}
                                                                className="text-xs font-bold text-brand-orange bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-sm"
                                                            >
                                                                <Edit3 size={12} /> Inspect & Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={`overflow-y-auto transition-all bg-white ${isPreviewExpanded ? 'h-[65vh]' : 'h-[400px]'}`}>
                                                        {/* Header for Delegate Columns */}
                                                        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider sticky top-0 z-20 shadow-sm">
                                                            <div>Trade</div>
                                                            <div>Primary ({wizardData.filterTeam})</div>
                                                            <div>Secondary ({wizardData.teamVariant || 'None'})</div>
                                                        </div>

                                                        <div className="divide-y divide-gray-100">
                                                            {selectedTemplate.structure.map((item: any) => (
                                                                <div key={item.id} className="text-sm">
                                                                    {item.type === 'group' ? (
                                                                        <details className="group" open>
                                                                            <summary className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 cursor-pointer list-none select-none font-bold text-gray-800 bg-gray-50/50 sticky top-[40px] z-10 border-b border-gray-100">
                                                                                <ChevronRight size={14} className="transition-transform group-open:rotate-90 text-gray-400" />
                                                                                {item.label}
                                                                                <span className="text-gray-400 font-normal text-xs ml-auto bg-white border border-gray-200 px-2 py-0.5 rounded-full">{item.children?.length || 0} items</span>
                                                                            </summary>
                                                                            <div className="bg-white">
                                                                                {item.children?.map((child: string, idx: number) => (
                                                                                    <div key={idx} className="border-b border-gray-50 last:border-0 pl-8 border-l-4 border-l-transparent">
                                                                                        {renderPreviewItem({ label: child })}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </details>
                                                                    ) : (
                                                                        renderPreviewItem(item)
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // Empty State Panel
                                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <LayoutTemplate size={24} className="text-gray-400" />
                                            </div>
                                            <h4 className="font-bold text-gray-800 mb-1">No templates found for {currentFilterTeam}.</h4>
                                            <p className="text-xs text-gray-500 mb-4">Create a template for this team to speed up delegation.</p>
                                            
                                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                                <button onClick={handleCreateTemplate} className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                                                    Create new
                                                </button>
                                                <button onClick={handleManageTemplates} className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition-colors">
                                                    Manage templates
                                                </button>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-gray-200/50">
                                                <button onClick={() => handleNext()} className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                                                    Continue without template
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Team Variant */}
                                <div className="pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mt-2">Secondary Team</label>
                                    <div className="relative">
                                        <select 
                                            value={wizardData.teamVariant || ''}
                                            onChange={handleVariantChange}
                                            disabled={!hasSecondary}
                                            className={`w-full text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm font-medium ${!hasSecondary ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50'}`}
                                        >
                                            {!hasSecondary && <option value="">None</option>}
                                            {Object.keys(TEAM_DIRECTORY).map(team => (
                                                <option key={team} value={team}>{team}</option>
                                            ))}
                                        </select>
                                        {/* Since teamVariant defaults to selected Team, we can check if it matches the current filter Team */}
                                        <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${isAutoDetectedVariant ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                                            {isAutoDetectedVariant ? 'Auto-Detected' : 'Manual'}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1 flex items-start gap-1.5">
                                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                                        <span>Defaults to <strong>{opportunity.secondaryTeam && opportunity.secondaryTeam !== '-' ? opportunity.secondaryTeam : 'None'}</strong>. Changing this will update default delegates.</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Step 2: Trade Delegation Matrix */}
                    {currentStep === 2 && (
                        <div className="max-w-5xl mx-auto flex flex-col h-full">
                            
                            {/* Header Strip */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm flex flex-wrap gap-6 items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Job Number</p>
                                    <p className="text-sm font-bold text-gray-800">{opportunity.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Report Type</p>
                                    <p className="text-sm font-medium text-gray-700">{opportunity.reportType || 'Standard Report'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Construction</p>
                                    <p className="text-sm font-medium text-gray-700">New Build</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Property Type</p>
                                    <p className="text-sm font-medium text-gray-700">Residential</p>
                                </div>
                                <div className="bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-0.5">Deadline</p>
                                    <p className="text-sm font-bold text-red-600">{deadlineStr}</p>
                                </div>
                            </div>

                            {/* Matrix Card */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                                
                                {/* Bulk Actions Toolbar */}
                                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center gap-4 overflow-x-auto">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Bulk Actions:</span>
                                    
                                    <div className="flex items-center gap-2">
                                        <select 
                                            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-brand-orange outline-none"
                                            onChange={(e) => { if(e.target.value) { bulkAssign('primary', e.target.value); e.target.value = ''; } }}
                                        >
                                            <option value="">Assign All Primary To...</option>
                                            {getTeamMembers(opportunity.team).map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>

                                    {opportunity.secondaryTeam && opportunity.secondaryTeam !== '-' && (
                                        <div className="flex items-center gap-2">
                                            <select 
                                                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-brand-orange outline-none"
                                                onChange={(e) => { if(e.target.value) { bulkAssign('secondary', e.target.value); e.target.value = ''; } }}
                                            >
                                                <option value="">Assign All Secondary To...</option>
                                                {getTeamMembers(opportunity.secondaryTeam).map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    <button onClick={clearAssignments} className="text-xs font-bold text-red-500 hover:text-red-700 ml-auto px-3 py-1 hover:bg-red-50 rounded transition-colors">
                                        Clear All
                                    </button>
                                </div>

                                {/* Matrix Table (Uses selected template structure) */}
                                <div className="flex-1 overflow-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-white sticky top-0 z-10 shadow-sm">
                                            <tr>
                                                <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50 w-1/3">
                                                    Trade / Workstream
                                                </th>
                                                <th className="px-4 py-3 text-xs font-black uppercase tracking-wider border-b border-gray-200 bg-gray-50 border-l border-gray-200 w-1/3">
                                                    <span className={teamColorMap[opportunity.team] || 'text-gray-700'}>
                                                        {opportunity.team} (Primary)
                                                    </span>
                                                </th>
                                                <th className="px-4 py-3 text-xs font-black uppercase tracking-wider border-b border-gray-200 bg-gray-50 border-l border-gray-200 w-1/3">
                                                    <span className={teamColorMap[opportunity.secondaryTeam] || 'text-gray-400'}>
                                                        {opportunity.secondaryTeam && opportunity.secondaryTeam !== '-' ? `${opportunity.secondaryTeam} (Secondary)` : 'Secondary Team (None)'}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {/* Render based on the selected template structure or fallback */}
                                            {(selectedTemplate ? selectedTemplate.structure : MATRIX_TRADES_STRUCTURE).map((row: any, idx: number) => {
                                                if (row.type === 'item') {
                                                    return renderMatrixRow(row.label);
                                                }
                                                if (row.type === 'group') {
                                                    return (
                                                        <React.Fragment key={row.id}>
                                                            <tr className="bg-gray-50/80 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setTakeoffExpanded(!takeoffExpanded)}>
                                                                <td colSpan={3} className="px-4 py-2 border-b border-gray-200">
                                                                    <div className="flex items-center gap-2">
                                                                        {takeoffExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                                                                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{row.label}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {takeoffExpanded && row.children?.map((childLabel: string) => renderMatrixRow(childLabel, true))}
                                                        </React.Fragment>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 3 && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                                    <ClipboardList size={16} /> Delegation Summary
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Template</p>
                                        <p className="text-sm font-bold text-gray-800">{TEMPLATES.find(t => t.id === wizardData.selectedTemplateId)?.name || localTemplates.find(t => t.id === wizardData.selectedTemplateId)?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Team Variant</p>
                                        <p className={`text-sm font-bold ${teamColorMap[wizardData.teamVariant] || 'text-gray-800'}`}>{wizardData.teamVariant}</p>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase">
                                                <th className="px-4 py-2 font-bold w-1/2">Trade</th>
                                                <th className="px-4 py-2 font-bold w-1/4 border-l border-gray-200">Primary ({opportunity.team})</th>
                                                <th className="px-4 py-2 font-bold w-1/4 border-l border-gray-200">Secondary ({opportunity.secondaryTeam === '-' ? 'None' : opportunity.secondaryTeam})</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {Object.entries(wizardData.assignments || {}).map(([trade, assign]: [string, any]) => (
                                                <tr key={trade} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 font-medium text-gray-700">{trade}</td>
                                                    <td className="px-4 py-2 border-l border-gray-100 text-blue-600 font-bold">{assign.primary || <span className="text-gray-300 font-normal italic">Unassigned</span>}</td>
                                                    <td className="px-4 py-2 border-l border-gray-100 text-gray-600">{assign.secondary || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center shrink-0">
                    <button 
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-100 active:scale-95"
                    >
                        {currentStep === 3 ? 'Create Delegation List' : 'Next'} {currentStep < 3 && <ChevronRight size={16} />}
                    </button>
                </div>

            </div>

            {/* Template Inspector Modal */}
            <TemplateInspector
                isOpen={isInspectorOpen}
                onClose={() => setIsInspectorOpen(false)}
                templateName={selectedTemplate?.name || 'Unknown Template'}
                structure={selectedTemplate?.structure || []}
                onSaveAsNew={handleSaveNewTemplate}
                primaryTeam={opportunity.team}
                secondaryTeam={opportunity.secondaryTeam}
            />
        </div>
    );
};

const NoTasksAssignedCard: React.FC<{ onNavigate?: (page: string, id?: string) => void, onOpenWizard?: (item: any) => void }> = ({ onNavigate, onOpenWizard }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg text-red-600 border border-red-100">
                    <ClipboardList size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Newly Converted - No Tasks Assigned</h3>
                    <p className="text-xs text-gray-500 font-medium">Opportunities ready for task delegation.</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs text-gray-500 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-4 py-3">Opportunity Name</th>
                            <th className="px-4 py-3">Date Converted</th>
                            <th className="px-4 py-3">Deadline Date</th>
                            <th className="px-4 py-3">Primary Team</th>
                            <th className="px-4 py-3">Secondary Team</th>
                            <th className="px-4 py-3">Project Lead</th>
                            <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {NO_TASKS_DATA.map(item => (
                            <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">
                                    <button 
                                        onClick={() => onNavigate && onNavigate('opportunity-detail', item.name)}
                                        className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-left text-xs"
                                    >
                                        {item.name}
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-gray-600 text-xs font-medium">{item.convertedDate}</td>
                                <td className="px-4 py-3 text-red-600 font-bold text-xs">{item.deadline}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wide ${
                                        TEAM_STYLES[item.team] 
                                        ? `${TEAM_STYLES[item.team].bg} ${TEAM_STYLES[item.team].text} ${TEAM_STYLES[item.team].border}` 
                                        : 'bg-gray-100 text-gray-600 border-gray-200'
                                    }`}>
                                        {item.team}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {item.secondaryTeam && item.secondaryTeam !== '-' ? (
                                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wide ${
                                            TEAM_STYLES[item.secondaryTeam] 
                                            ? `${TEAM_STYLES[item.secondaryTeam].bg} ${TEAM_STYLES[item.secondaryTeam].text} ${TEAM_STYLES[item.secondaryTeam].border}` 
                                            : 'bg-gray-100 text-gray-600 border-gray-200'
                                        }`}>
                                            {item.secondaryTeam}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-xs pl-2">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-xs font-medium text-gray-700">
                                    {item.projectLead}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button 
                                        onClick={() => onOpenWizard && onOpenWizard(item)}
                                        className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                                    >
                                        <Plus size={14} /> Create Delegation List
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const IntakeSection: React.FC<{ onNavigate?: (page: string, id?: string) => void }> = ({ onNavigate }) => {
    // ... Copying IntakeSection logic from previous file ...
    const [items, setItems] = useState(INITIAL_INTAKE_DATA);
    const [activePickerId, setActivePickerId] = useState<string | null>(null);
    const pickerAnchorRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleAssign = (id: string, field: 'assignedTo' | 'primaryTeam' | 'secondaryTeam' | 'seniorEstimator', value: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSetDeadline = (id: string, date: string, assignments?: any) => {
        if (date) {
             setItems(prev => prev.filter(item => item.id !== id));
             setActivePickerId(null);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Newly Converted – No Deadline</h3>
                    <p className="text-xs text-gray-500 font-medium">Assign teams and set a deadline based on capacity to proceed.</p>
                </div>
            </div>

            <div className="overflow-x-auto min-h-[200px]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Opportunity Name</th>
                            <th className="px-4 py-3">Date Converted</th>
                            <th className="px-4 py-3">Primary Team <span className="text-red-500">*</span></th>
                            <th className="px-4 py-3">Secondary Team</th>
                            <th className="px-4 py-3">Project Manager</th>
                            <th className="px-4 py-3">Senior Estimator</th>
                            <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map(item => (
                            <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-bold text-gray-800">{item.name}</td>
                                <td className="px-4 py-3 text-gray-600">{item.convertedDate}</td>
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.primaryTeam}
                                            onChange={(e) => handleAssign(item.id, 'primaryTeam', e.target.value)}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${item.primaryTeam && TEAM_STYLES[item.primaryTeam] ? `${TEAM_STYLES[item.primaryTeam].bg} ${TEAM_STYLES[item.primaryTeam].text} ${TEAM_STYLES[item.primaryTeam].border}` : 'bg-white text-gray-400 border-gray-200'}`}
                                        >
                                            <option value="">Select Team</option>
                                            {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.secondaryTeam}
                                            onChange={(e) => handleAssign(item.id, 'secondaryTeam', e.target.value)}
                                            disabled={!item.primaryTeam}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${!item.primaryTeam ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' : item.secondaryTeam && TEAM_STYLES[item.secondaryTeam] ? `${TEAM_STYLES[item.secondaryTeam].bg} ${TEAM_STYLES[item.secondaryTeam].text} ${TEAM_STYLES[item.secondaryTeam].border}` : 'bg-white text-gray-400 border-gray-200'}`}
                                        >
                                            <option value="">None</option>
                                            {TEAMS.filter(t => t !== item.primaryTeam).map(team => <option key={team} value={team}>{team}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.assignedTo}
                                            onChange={(e) => handleAssign(item.id, 'assignedTo', e.target.value)}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${item.assignedTo ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-400 border-gray-200'}`}
                                        >
                                            <option value="">Unassigned</option>
                                            {PM_OPTIONS.map(pm => <option key={pm} value={pm}>{pm}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.seniorEstimator}
                                            onChange={(e) => handleAssign(item.id, 'seniorEstimator', e.target.value)}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${item.seniorEstimator ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-400 border-gray-200'}`}
                                        >
                                            <option value="">Unassigned</option>
                                            {SENIOR_ESTIMATOR_OPTIONS.map(se => <option key={se} value={se}>{se}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="relative inline-block" ref={(el) => { pickerAnchorRefs.current[item.id] = el; }}>
                                        <button 
                                            onClick={() => setActivePickerId(activePickerId === item.id ? null : item.id)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activePickerId === item.id ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <CalendarClock size={14} /> Set Deadline
                                        </button>
                                        <DeadlinePickerPopover 
                                            isOpen={activePickerId === item.id}
                                            onClose={() => setActivePickerId(null)}
                                            onSelect={(date, assignments) => handleSetDeadline(item.id, date, assignments)}
                                            anchorRef={{ current: pickerAnchorRefs.current[item.id] }}
                                            onNavigate={onNavigate}
                                            initialValues={{ primaryTeam: item.primaryTeam, secondaryTeam: item.secondaryTeam, seniorEstimator: item.seniorEstimator }}
                                            jobTitle={item.name}
                                            reportType={item.reportType}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface WorkloadItem {
  id: string;
  day: string;
  title: string;
  team: string;
  status: string;
  type: string;
}

interface OperationsWorkloadCardProps {
  data: WorkloadItem[];
  weekLabel: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNavigate?: (page: string, id?: string) => void;
}

const OpsSummary: React.FC<{ current: typeof WEEK1_DATA, next: typeof WEEK2_DATA }> = ({ current, next }) => {
    // ... Copying OpsSummary logic ...
    const currentTotal = current.length;
    const nextTotal = next.length;
    const doneCount = current.filter(i => i.status === 'Done').length;
    const nextDoneCount = next.filter(i => i.status === 'Done').length;
    const progress = currentTotal > 0 ? Math.round((doneCount / currentTotal) * 100) : 0;

    const getTeamStats = (data: typeof WEEK1_DATA) => {
        return TEAMS.map(team => {
            const teamItems = data.filter(i => i.team === team);
            const done = teamItems.filter(i => i.status === 'Done').length;
            const total = teamItems.length;
            return { name: team, total, done, outstanding: total - done };
        }).filter(t => t.total > 0);
    };

    const teamLoadCurrent = getTeamStats(current);
    const teamLoadNextWeek = getTeamStats(next);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {/* Card 1: Overview */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={16} /></div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Workload Overview</h3>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-gray-900">{currentTotal}</span>
                        <span className="text-xs font-medium text-gray-500 mb-1">Opportunities this week</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <Calendar size={12} className="text-gray-400" />
                        <span className="text-[10px] font-semibold text-gray-600"><span className="text-gray-900 font-bold">{nextTotal}</span> upcoming next week</span>
                    </div>
                </div>
            </div>
            {/* Card 2: Progress */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={16} /></div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Weekly Progress</h3>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-gray-900">{progress}%</span>
                        <span className="text-xs font-medium text-gray-500 mb-1">completion rate</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="mt-1.5 text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider">{doneCount} of {currentTotal} Completed</div>
                </div>
            </div>
            {/* Card 3: Current Week Load */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg"><Calendar size={16} /></div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Current Week Load</h3>
                    </div>

                    {/* Summary Section */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                            <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide mb-0.5">Completed</div>
                            <div className="text-xl font-black text-emerald-600">{teamLoadCurrent.reduce((sum, t) => sum + t.done, 0)}</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                            <div className="text-[9px] font-bold text-amber-700 uppercase tracking-wide mb-0.5">Outstanding</div>
                            <div className="text-xl font-black text-amber-600">{teamLoadCurrent.reduce((sum, t) => sum + t.outstanding, 0)}</div>
                        </div>
                    </div>

                    {/* Team Breakdown */}
                    <div className="border-t border-gray-100 pt-2">
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Outstanding by Team</div>
                        <div className="space-y-1.5">
                            {teamLoadCurrent.map(t => (
                                <div key={t.name} className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-gray-600 flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                        {t.name}
                                    </span>
                                    <span className="font-bold text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 min-w-[32px] text-center">
                                        {t.outstanding}
                                    </span>
                                </div>
                            ))}
                            {teamLoadCurrent.length === 0 && <div className="text-[10px] text-gray-400 italic">No scheduled tasks yet</div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 4: Next Week Load */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={16} /></div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Next Week Load</h3>
                    </div>

                    {/* Summary Section */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                            <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide mb-0.5">Completed</div>
                            <div className="text-xl font-black text-emerald-600">{teamLoadNextWeek.reduce((sum, t) => sum + t.done, 0)}</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                            <div className="text-[9px] font-bold text-amber-700 uppercase tracking-wide mb-0.5">Outstanding</div>
                            <div className="text-xl font-black text-amber-600">{teamLoadNextWeek.reduce((sum, t) => sum + t.outstanding, 0)}</div>
                        </div>
                    </div>

                    {/* Team Breakdown */}
                    <div className="border-t border-gray-100 pt-2">
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Outstanding by Team</div>
                        <div className="space-y-1.5">
                            {teamLoadNextWeek.map(t => (
                                <div key={t.name} className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-gray-600 flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                        {t.name}
                                    </span>
                                    <span className="font-bold text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 min-w-[32px] text-center">
                                        {t.outstanding}
                                    </span>
                                </div>
                            ))}
                            {teamLoadNextWeek.length === 0 && <div className="text-[10px] text-gray-400 italic">No scheduled tasks yet</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OperationsWorkloadCard: React.FC<OperationsWorkloadCardProps> = ({ data, weekLabel, searchTerm, onSearchChange, onNavigate }) => {
    // ... Copying OperationsWorkloadCard logic ...
    const [filterTeam, setFilterTeam] = useState('All Teams');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Open', 'In Progress', 'Review', 'Done']);
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(TEAMS.reduce((acc, team) => ({ ...acc, [team]: true }), {}));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setStatusFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTeam = (teamName: string) => setExpandedTeams(prev => ({ ...prev, [teamName]: !prev[teamName] }));
    const toggleStatus = (status: string) => setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);

    const getTeamData = () => {
        // Define status priority order
        const statusPriority: Record<string, number> = {
            'Open': 1,
            'Review': 2,
            'In Progress': 3,
            'Done': 4
        };

        return TEAMS.map(team => {
            const teamItems = data.filter(d => d.team === team);
            const breakdown = {
                open: teamItems.filter(i => i.status === 'Open').length,
                inProgress: teamItems.filter(i => i.status === 'In Progress').length,
                review: teamItems.filter(i => i.status === 'Review').length,
                done: teamItems.filter(i => i.status === 'Done').length
            };
            const filteredItems = teamItems
                .filter(i => selectedStatuses.includes(i.status) && (i.title.toLowerCase().includes(searchTerm.toLowerCase())))
                .sort((a, b) => {
                    // Sort by status priority first
                    const priorityDiff = (statusPriority[a.status] || 999) - (statusPriority[b.status] || 999);
                    if (priorityDiff !== 0) return priorityDiff;
                    // If same status, sort by day
                    return a.day.localeCompare(b.day);
                });
            return { name: team, projects: teamItems.length, breakdown, items: filteredItems };
        }).filter(t => t.projects > 0);
    };

    const teamData = getTeamData();
    const filteredData = filterTeam === 'All Teams' ? teamData : teamData.filter(t => t.name === filterTeam);
    const getTotalProjects = () => filteredData.reduce((acc, curr) => acc + curr.projects, 0);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col h-full font-sans mb-8 last:mb-0">
            {/* ... Render code from previous file ... */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 relative">
                <div>
                    <div className="flex items-center gap-3 mb-1.5">
                        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shadow-sm"><Layers size={22} /></div>
                        <div><h3 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Operations Workload</h3><p className="text-xs text-gray-500 font-medium mt-1">Capacity & Project Distribution</p></div>
                    </div>
                </div>
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-md z-10">
                     <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                        <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-orange transition-colors" size={18} /><input type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search jobs across weeks..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-xl text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/10" /></div>
                     </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <div className="text-right hidden sm:block"><div className="text-2xl font-black text-gray-900 leading-none">{getTotalProjects()}</div><div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Active Projects</div></div>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setStatusFilterOpen(!statusFilterOpen)} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 py-2.5 px-4 rounded-xl transition-colors shadow-sm"><Filter size={14} /><span>Status</span>{selectedStatuses.length > 0 && selectedStatuses.length < 4 && (<div className="bg-gray-200 text-gray-600 px-1.5 rounded-md text-[10px]">{selectedStatuses.length}</div>)}</button>
                        {statusFilterOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Filter by Status</div>
                                {STATUS_OPTIONS.map(status => (<div key={status} onClick={() => toggleStatus(status)} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-xs font-medium text-gray-700"><div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedStatuses.includes(status) ? 'bg-brand-orange border-brand-orange text-white' : 'border-gray-300'}`}>{selectedStatuses.includes(status) && <Check size={10} strokeWidth={4} />}</div><span>{status}</span></div>))}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 py-2.5 pl-4 pr-10 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors shadow-sm">
                            <option>All Teams</option>
                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6"><Calendar size={14} className="text-gray-400" /><span>Showing workload for <span className="font-bold text-gray-700">{weekLabel}</span></span></div>
            <div className="space-y-6">
                {filteredData.map((team) => {
                    const total = team.breakdown.open + team.breakdown.inProgress + team.breakdown.review + team.breakdown.done;
                    const pctOpen = total ? (team.breakdown.open / total) * 100 : 0;
                    const pctInProgress = total ? (team.breakdown.inProgress / total) * 100 : 0;
                    const pctReview = total ? (team.breakdown.review / total) * 100 : 0;
                    const pctDone = total ? (team.breakdown.done / total) * 100 : 0;
                    const style = TEAM_STYLES[team.name] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' };
                    const isExpanded = expandedTeams[team.name];
                    return (
                        <div key={team.name} className="group">
                            <div className="flex justify-between items-end mb-1 cursor-pointer select-none" onClick={() => toggleTeam(team.name)}>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-colors ${style.bg} ${style.border}`}><div className={`w-2 h-2 rounded-full ${style.dot} shadow-sm ring-2 ring-white`}></div><span className={`text-xs font-black uppercase tracking-wide ${style.text}`}>{team.name}</span></div>
                                <div className="flex items-center gap-3"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{Math.round(pctDone)}% Complete</span><span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-md">{total} Projects</span><ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} /></div>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex mb-2 shadow-inner">
                                <div className="h-full bg-emerald-500" style={{ width: `${pctDone}%` }} title={`Done: ${team.breakdown.done}`}></div>
                                <div className="h-full bg-purple-500" style={{ width: `${pctReview}%` }} title={`Review: ${team.breakdown.review}`}></div>
                                <div className="h-full bg-blue-500" style={{ width: `${pctInProgress}%` }} title={`In Progress: ${team.breakdown.inProgress}`}></div>
                                <div className="h-full bg-gray-300" style={{ width: `${pctOpen}%` }} title={`Open: ${team.breakdown.open}`}></div>
                            </div>
                            {isExpanded && (
                                <div className="space-y-1 pl-1 mt-2 animate-in slide-in-from-top-2 duration-200">
                                    {team.items.length === 0 ? <div className="text-center py-4 text-xs text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">No projects match the selected filters for {team.name}</div> : team.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group/item">
                                            <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                <div className="flex flex-col items-center justify-center w-8 h-8 rounded-md bg-gray-50 text-gray-500 border border-gray-200 shrink-0"><span className="text-[8px] font-bold uppercase leading-none text-gray-400">{item.day.split(' ')[0]}</span><span className="text-xs font-bold leading-none text-gray-700 mt-0.5">{item.day.split(' ')[1]}</span></div>
                                                <div className="shrink-0 min-w-[70px]"><span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider block text-center ${item.status === 'Done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : item.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' : item.status === 'Open' ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>{item.status}</span></div>
                                                <div className="min-w-0 flex-1"><h4 className="text-xs font-bold text-gray-800 truncate group-hover/item:text-brand-orange transition-colors cursor-pointer hover:underline" onClick={() => onNavigate && onNavigate('opportunity-detail', item.title)}>{item.title}</h4><p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{item.type || 'Unspecified Type'}</p></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Done</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Review</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">In Progress</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-gray-300"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Open</span></div>
            </div>
        </div>
    );
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, onNavigate }) => {
  const [activeWeek, setActiveWeek] = useState<'week1' | 'week2'>('week1');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Wizard State
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentOppForWizard, setCurrentOppForWizard] = useState<any>(null);
  const [delegationWizardState, setDelegationWizardState] = useState<Record<string, any>>({});

  const handleOpenWizard = (opp: any) => {
      setCurrentOppForWizard(opp);
      setWizardOpen(true);
      // Initialize state if not exists
      if (!delegationWizardState[opp.id]) {
          setDelegationWizardState(prev => ({
              ...prev,
              [opp.id]: {
                  step: 1,
                  templateMode: 'preselect',
                  selectedTemplateId: '',
                  // filterTeam and teamVariant will be initialized in the modal via useEffect
                  assignments: {},
                  initialized: false
              }
          }));
      }
  };

  const updateWizardState = (data: any) => {
      if (currentOppForWizard) {
          setDelegationWizardState(prev => ({
              ...prev,
              [currentOppForWizard.id]: data
          }));
      }
  };

  // Auto-switch week based on search
  useEffect(() => {
    if (!searchTerm) return;
    const term = searchTerm.toLowerCase();
    
    // Check current week first to avoid jumping if present in both (unlikely for jobs but possible)
    const inWeek1 = WEEK1_DATA.some(i => i.title.toLowerCase().includes(term));
    const inWeek2 = WEEK2_DATA.some(i => i.title.toLowerCase().includes(term));

    if (inWeek1) {
        setActiveWeek('week1');
    } else if (inWeek2) {
        setActiveWeek('week2');
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar 
        title={title} 
        subtitle={title === 'Operations Portal' ? 'Overview' : (title === 'Project Tracker Portal' ? 'Portal' : "Under Construction")} 
        description={title === 'Operations Portal' ? 'Operational metrics and workload distribution' : (title === 'Project Tracker Portal' ? 'Track new projects pending delegation' : `Manage your ${title.toLowerCase()} here.`)} 
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {title === 'Operations Portal' ? (
            <div className="max-w-[1600px] mx-auto pb-12">
                <IntakeSection onNavigate={onNavigate} />
                <OpsSummary current={WEEK1_DATA} next={WEEK2_DATA} />
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm inline-flex">
                        <button onClick={() => setActiveWeek('week1')} className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeWeek === 'week1' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}><Calendar size={14} className={activeWeek === 'week1' ? 'text-brand-orange' : 'text-gray-400'} /> Week 1: Jan 12 - 16</button>
                        <button onClick={() => setActiveWeek('week2')} className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeWeek === 'week2' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}><Calendar size={14} className={activeWeek === 'week2' ? 'text-brand-orange' : 'text-gray-400'} /> Week 2: Jan 19 - 23</button>
                    </div>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {activeWeek === 'week1' ? <OperationsWorkloadCard data={WEEK1_DATA} weekLabel="Week of Jan 12 - 16, 2026" searchTerm={searchTerm} onSearchChange={setSearchTerm} onNavigate={onNavigate} /> : <OperationsWorkloadCard data={WEEK2_DATA} weekLabel="Week of Jan 19 - 23, 2026" searchTerm={searchTerm} onSearchChange={setSearchTerm} onNavigate={onNavigate} />}
                </div>
            </div>
        ) : title === 'Project Tracker Portal' ? (
            <div className="max-w-[1600px] mx-auto pb-12">
                {/* Outstanding Opportunities Card */}
                {(() => {
                    const thisWeekOutstanding = WEEK1_DATA.filter(i => i.status !== 'Done').length;
                    const nextWeekOutstanding = WEEK2_DATA.filter(i => i.status !== 'Done').length;
                    const thisWeekTotal = WEEK1_DATA.length;
                    const nextWeekTotal = WEEK2_DATA.length;
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {/* This Week */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-6 -mt-6 opacity-50"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-100"><AlertCircle size={16} /></div>
                                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Outstanding This Week</h3>
                                    </div>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-black text-gray-900">{thisWeekOutstanding}</span>
                                        <span className="text-sm font-medium text-gray-500 mb-1">/ {thisWeekTotal} Opportunities</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${thisWeekTotal > 0 ? Math.round((thisWeekOutstanding / thisWeekTotal) * 100) : 0}%` }}></div>
                                    </div>
                                    <div className="mt-1.5 text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider">{thisWeekTotal - thisWeekOutstanding} of {thisWeekTotal} Completed</div>
                                </div>
                            </div>
                            {/* Next Week */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-6 -mt-6 opacity-50"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg border border-purple-100"><CalendarClock size={16} /></div>
                                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Outstanding Next Week</h3>
                                    </div>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-black text-gray-900">{nextWeekOutstanding}</span>
                                        <span className="text-sm font-medium text-gray-500 mb-1">/ {nextWeekTotal} Opportunities</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-purple-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${nextWeekTotal > 0 ? Math.round((nextWeekOutstanding / nextWeekTotal) * 100) : 0}%` }}></div>
                                    </div>
                                    <div className="mt-1.5 text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider">{nextWeekTotal - nextWeekOutstanding} of {nextWeekTotal} Completed</div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Create New Template Card */}
                    <button
                        onClick={() => onNavigate && onNavigate('manage-delegation-templates')}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:border-brand-orange transition-all duration-200 text-left group animate-in fade-in slide-in-from-left-4"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange border border-brand-orange/20 group-hover:bg-brand-orange group-hover:text-white transition-all duration-200">
                                <Plus size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-1 group-hover:text-brand-orange transition-colors">
                                    Create New Template
                                </h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    Set up a new CC delegation template with custom task assignments and team workflows.
                                </p>
                            </div>
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                    </button>

                    {/* Manage Templates Card */}
                    <button
                        onClick={() => onNavigate && onNavigate('manage-delegation-templates')}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-200 text-left group animate-in fade-in slide-in-from-right-4"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                                <LayoutTemplate size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                                    Manage Templates
                                </h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    View, edit, and organize existing CC delegation templates for all teams.
                                </p>
                            </div>
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                    </button>
                </div>

                <NoTasksAssignedCard onNavigate={onNavigate} onOpenWizard={handleOpenWizard} />
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="bg-white p-8 rounded-full shadow-sm mb-4 border border-gray-100"><Construction size={48} className="text-brand-orange opacity-50" /></div>
                <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
                <p className="max-w-md text-center text-sm font-medium text-gray-500">This page is currently being built. Check back soon for the full {title} interface.</p>
            </div>
        )}
      </main>

      <DelegationWizardModal 
        isOpen={wizardOpen} 
        onClose={() => setWizardOpen(false)} 
        opportunity={currentOppForWizard} 
        wizardData={currentOppForWizard ? (delegationWizardState[currentOppForWizard.id] || {}) : {}}
        onUpdateData={updateWizardState}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default PlaceholderPage;

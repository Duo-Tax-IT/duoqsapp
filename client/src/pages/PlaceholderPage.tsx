
import React, { useState, useEffect, useRef, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Construction, Briefcase, Calendar, ChevronDown, Layers, TrendingUp, 
  CheckCircle2, Filter, Check, ChevronRight, ChevronLeft, Search, 
  AlertCircle, CalendarClock, Users, X, List, ClipboardList, Plus, 
  Settings, Save, Trash2, ArrowLeft, LayoutTemplate, FileText, User, ChevronUp, GripVertical
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
    'Team Yellow': ['Steven Leuta', 'Ian Joseph Larinay', 'Jamielah Macadato', 'Nexierose Baluyot', 'Danilo Jr de la Cruz'],
};

// 2. Matrix Structure (Trades)
const MATRIX_TRADES_STRUCTURE = [
    { id: 'review', label: 'Review of Documents (Incl. SF)', type: 'item' },
    { id: 'email', label: 'Email (RFI, Explanation, Acknowledge)', type: 'item' },
    { id: 'discussion', label: 'Team Discussion', type: 'item' },
    { 
        id: 'takeoff', 
        label: 'Takeoff Stage', 
        type: 'group', 
        children: [
            'Preliminaries', 'Demolitions', 'Earthworks', 'Concrete Works', 
            'Carpentry', 'Electrical Services', 'Plumbing', 'Painting', 'External Works'
        ]
    },
    { id: 'fillout', label: 'Report Fillout', type: 'item' },
    { id: 'checking', label: 'Checking', type: 'item' },
    { id: 'upload', label: 'Upload and Salesforce Fillout', type: 'item' }
];

const TEMPLATES = [
    { id: 't1', name: 'Residential - Standard (QS + Admin + QA)', type: 'Residential' },
    { id: 't2', name: 'Commercial - Comprehensive', type: 'Commercial' }
];

// 3. Default Assignment Logic
const getDefaultAssignments = (variant: string) => {
    const defaults: Record<string, string> = {};
    const teamUpper = variant.toUpperCase();

    if (teamUpper === 'TEAM RED') {
        defaults['Review of Documents (Incl. SF)'] = 'Jack Ho';
        defaults['Email (RFI, Explanation, Acknowledge)'] = 'Jack Ho';
        defaults['Team Discussion'] = 'Jack Ho';
        defaults['Checking'] = 'Jack Ho';
        defaults['Preliminaries'] = 'Dave Agcaoili';
        defaults['Demolitions'] = 'Dave Agcaoili';
        defaults['Earthworks'] = 'Dave Agcaoili';
        defaults['Concrete Works'] = 'Patrick Cuaresma';
        defaults['Carpentry'] = 'Patrick Cuaresma';
        defaults['Electrical Services'] = 'Patrick Cuaresma';
        defaults['Plumbing'] = 'Patrick Cuaresma';
        defaults['Painting'] = 'Dave Agcaoili';
        defaults['External Works'] = 'Dave Agcaoili';
        defaults['Report Fillout'] = 'Patrick Cuaresma';
        defaults['Upload and Salesforce Fillout'] = 'Edrian Pardillo';
    } else if (teamUpper === 'TEAM BLUE') {
        defaults['Review of Documents (Incl. SF)'] = 'Rina Aquino';
        defaults['Email (RFI, Explanation, Acknowledge)'] = 'Rina Aquino';
        defaults['Team Discussion'] = 'Quoc Duong';
        defaults['Checking'] = 'Quoc Duong';
        defaults['Preliminaries'] = 'Jerald Aben';
        defaults['Demolitions'] = 'Jerald Aben';
        defaults['Earthworks'] = 'Jerald Aben';
        defaults['Concrete Works'] = 'Quoc Duong';
        defaults['Carpentry'] = 'Quoc Duong';
        defaults['Electrical Services'] = 'Quoc Duong';
        defaults['Plumbing'] = 'Quoc Duong';
        defaults['Painting'] = 'Jerald Aben';
        defaults['External Works'] = 'Jerald Aben';
        defaults['Report Fillout'] = 'Quoc Duong';
        defaults['Upload and Salesforce Fillout'] = 'John Christian Perez';
    }
    return defaults;
};

// --- Helper Functions for Calendar ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // 0 = Mon, 6 = Sun
};

const getLoadForDate = (year: number, month: number, day: number) => {
    // 1. Check Mock Data (Jan 2026 only)
    if (year === 2026 && month === 0) {
        const dayStr = day.toString();
        const items = [...WEEK1_DATA, ...WEEK2_DATA].filter(i => {
            const d = i.day.split(' ')[1];
            return d === dayStr;
        });
        if (items.length > 0) {
            const breakdown: Record<string, number> = {};
            items.forEach(i => breakdown[i.team] = (breakdown[i.team] || 0) + 1);
            return { total: items.length, breakdown, items };
        }
        // Force mock data for Jan 1 (screenshot match)
        if (day === 1) {
             return {
                 total: 2,
                 breakdown: { 'Team Red': 1, 'Team Pink': 1 },
                 items: [
                     { id: 'm1', title: 'Mock Job 1', team: 'Team Red', status: 'In Progress' },
                     { id: 'm2', title: 'Mock Job 2', team: 'Team Pink', status: 'Open' }
                 ]
             };
        }
    }

    // 2. Fallback to Random Data for demo
    let seed = year * 10000 + (month + 1) * 100 + day;
    const nextRand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    const total = Math.floor(nextRand() * 6); 
    
    const breakdown: Record<string, number> = {};
    const items: any[] = []; 

    if (total > 0) {
        let remaining = total;
        const teams = ['Team Red', 'Team Blue', 'Team Yellow', 'Team Green', 'Team Pink'];
        const statuses = ['Open', 'In Progress', 'Review', 'Done'];
        const shuffled = [...teams].sort(() => 0.5 - nextRand());
        
        shuffled.forEach(team => {
            if (remaining > 0) {
                const count = Math.ceil(nextRand() * remaining); 
                breakdown[team] = count;
                for(let k=0; k<count; k++) {
                    const randomStatus = statuses[Math.floor(nextRand() * statuses.length)];
                    items.push({
                        id: `mock-${year}-${month}-${day}-${team}-${k}`,
                        title: `${team} Job ${k+1}`,
                        team: team,
                        status: randomStatus,
                        type: 'Standard Report'
                    });
                }
                remaining -= count;
            }
        });
    }

    return { total, breakdown, items };
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
    const [selectedDate, setSelectedDate] = useState<{year: number, month: number, day: number} | null>({ year: 2026, month: 0, day: 1 }); // Default to Jan 1 for demo
    const [showJobDetails, setShowJobDetails] = useState(false);

    // Form State for Assignments
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedSecondaryTeam, setSelectedSecondaryTeam] = useState('');
    const [selectedSenior, setSelectedSenior] = useState('');

    useEffect(() => {
        if (isOpen) {
            setViewYear(2026);
            setViewMonth(0);
            setSelectedDate({ year: 2026, month: 0, day: 1 });
            setShowJobDetails(false);
            setSelectedTeam(initialValues?.primaryTeam || '');
            setSelectedSecondaryTeam(initialValues?.secondaryTeam || '');
            setSelectedSenior(initialValues?.seniorEstimator || '');
        }
    }, [isOpen, initialValues]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getFirstDayOfMonth(viewYear, viewMonth);
    const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });

    const handlePrevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(prev => prev - 1);
        } else {
            setViewMonth(prev => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(prev => prev + 1);
        } else {
            setViewMonth(prev => prev + 1);
        }
    };

    const handleDayClick = (day: number) => {
        setSelectedDate({ year: viewYear, month: viewMonth, day });
    };

    const handleConfirm = () => {
        if (selectedDate) {
            const dateStr = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
            onSelect(dateStr, {
                primaryTeam: selectedTeam,
                secondaryTeam: selectedSecondaryTeam,
                seniorEstimator: selectedSenior
            });
        }
    };

    const gridCells = [];
    for (let i = 0; i < startDay; i++) gridCells.push(null);
    for (let i = 1; i <= daysInMonth; i++) gridCells.push(i);

    const selectedLoad = selectedDate ? getLoadForDate(selectedDate.year, selectedDate.month, selectedDate.day) : null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div 
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[1000px] max-w-full z-10 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-1 p-6 border-r border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <h4 className="text-xl font-bold text-gray-800">{monthName} {viewYear}</h4>
                        <div className="flex gap-1">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"><ChevronLeft size={20} /></button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2 flex-shrink-0">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} className="text-[11px] font-bold text-gray-400 uppercase text-center py-2 tracking-wide">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 flex-1 overflow-auto">
                        {gridCells.map((day, idx) => {
                            if (!day) return <div key={`empty-${idx}`} className="aspect-square"></div>;
                            
                            const load = getLoadForDate(viewYear, viewMonth, day);
                            const isSelected = selectedDate?.day === day && selectedDate?.month === viewMonth && selectedDate?.year === viewYear;
                            
                            let loadColor = 'bg-green-100 text-green-700';
                            if (load.total >= 3) loadColor = 'bg-orange-100 text-orange-700';
                            if (load.total >= 5) loadColor = 'bg-red-100 text-red-700';
                            if (load.total === 0) loadColor = 'bg-gray-50 text-gray-400';

                            return (
                                <button 
                                    key={day}
                                    onClick={() => handleDayClick(day)}
                                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all border-2
                                        ${isSelected 
                                            ? 'border-brand-orange bg-orange-50/50 shadow-inner' 
                                            : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                                        }`}
                                >
                                    <span className={`text-sm font-bold mb-1 ${isSelected ? 'text-brand-orange' : 'text-gray-700'}`}>{day}</span>
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center ${loadColor}`}>
                                        {load.total}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full md:w-[320px] bg-gray-50/50 p-6 flex flex-col border-t md:border-t-0 border-gray-100">
                    <div className="flex justify-between items-start mb-6 flex-shrink-0">
                        <div>
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Day Overview</h4>
                            <div className="flex items-center gap-2 mt-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={showJobDetails} onChange={() => setShowJobDetails(!showJobDetails)} />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-orange"></div>
                                    <span className="ml-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Show Jobs</span>
                                </label>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                    </div>

                    {selectedDate ? (
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="mb-6 flex-shrink-0">
                                <div className="text-2xl font-black text-gray-800 mb-1">
                                    {new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={14} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-600">
                                        <span className="font-bold text-gray-900">{selectedLoad?.total || 0}</span> Jobs Scheduled
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                {selectedLoad && selectedLoad.total > 0 ? (
                                    <div className="space-y-2">
                                        {Object.entries(selectedLoad.breakdown).map(([team, count]) => (
                                            <div key={team}>
                                                <div className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${TEAM_STYLES[team]?.dot || 'bg-gray-400'}`}></div>
                                                        <span className="text-xs font-bold text-gray-700">{team}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{count}</span>
                                                </div>
                                                
                                                {showJobDetails && (
                                                    <div className="mt-1 pl-2 space-y-1">
                                                        {selectedLoad.items.filter((i: any) => i.team === team).map((job: any) => (
                                                            <div 
                                                                key={job.id} 
                                                                className="flex items-center gap-2 p-1.5 bg-gray-50 border border-transparent hover:bg-white hover:border-gray-200 rounded cursor-pointer transition-all group"
                                                                onClick={() => onNavigate && onNavigate('opportunity-detail', job.title)}
                                                            >
                                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded flex-shrink-0 ${
                                                                    job.status === 'Done' ? 'bg-emerald-100 text-emerald-700' :
                                                                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                                    job.status === 'Review' ? 'bg-purple-100 text-purple-700' :
                                                                    'bg-gray-200 text-gray-600'
                                                                }`}>
                                                                    {job.status === 'In Progress' ? 'WIP' : job.status}
                                                                </span>
                                                                <span className="text-[10px] font-medium text-gray-700 truncate group-hover:text-blue-600 flex-1" title={job.title}>
                                                                    {job.title}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200/50 flex items-center justify-center mb-3">
                                            <Calendar size={20} className="opacity-50" />
                                        </div>
                                        <p className="text-xs font-medium">No jobs scheduled<br/>for this day.</p>
                                    </div>
                                )}
                            </div>

                            {/* Assignment Section */}
                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 mb-4">
                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Assignment</h5>
                                
                                {jobTitle && (
                                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2">
                                        <div className="text-xs font-bold text-gray-900 truncate">{jobTitle}</div>
                                        <div className="text-[10px] font-medium text-gray-500 truncate">{reportType || 'Standard Report'}</div>
                                    </div>
                                )}

                                {/* Primary Team */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 block mb-1">Primary Team</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedTeam}
                                            onChange={(e) => setSelectedTeam(e.target.value)}
                                            className={`w-full text-xs font-bold p-2 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors cursor-pointer ${
                                                selectedTeam && TEAM_STYLES[selectedTeam] 
                                                ? `${TEAM_STYLES[selectedTeam].bg} ${TEAM_STYLES[selectedTeam].text} ${TEAM_STYLES[selectedTeam].border}` 
                                                : 'bg-white border-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <option value="">Select Team</option>
                                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Secondary Team */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 block mb-1">Secondary Team</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedSecondaryTeam}
                                            onChange={(e) => setSelectedSecondaryTeam(e.target.value)}
                                            disabled={!selectedTeam}
                                            className={`w-full text-xs font-bold p-2 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors cursor-pointer ${
                                                !selectedTeam 
                                                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
                                                : selectedSecondaryTeam && TEAM_STYLES[selectedSecondaryTeam]
                                                    ? `${TEAM_STYLES[selectedSecondaryTeam].bg} ${TEAM_STYLES[selectedSecondaryTeam].text} ${TEAM_STYLES[selectedSecondaryTeam].border}`
                                                    : 'bg-white border-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <option value="">None</option>
                                            {TEAMS.filter(t => t !== selectedTeam).map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Senior Estimator */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 block mb-1">Senior Estimator</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedSenior}
                                            onChange={(e) => setSelectedSenior(e.target.value)}
                                            className="w-full text-xs font-bold p-2 rounded-lg border border-gray-200 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            <option value="">Unassigned</option>
                                            {SENIOR_ESTIMATOR_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleConfirm}
                                className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2 flex-shrink-0"
                            >
                                <CalendarClock size={16} /> Set Deadline
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center p-4">
                            <Calendar size={40} className="mb-4 opacity-30" />
                            <p className="text-xs font-medium">Select a date from the calendar to view workload and set deadline.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Delegation Wizard Modal ---
const DelegationWizardModal: React.FC<{ 
    isOpen: boolean, 
    onClose: () => void, 
    opportunity: any, 
    wizardData: any, 
    onUpdateData: (data: any) => void 
}> = ({ isOpen, onClose, opportunity, wizardData, onUpdateData }) => {
    if (!isOpen || !opportunity) return null;

    const currentStep = wizardData.step || 1;
    const [takeoffExpanded, setTakeoffExpanded] = useState(true);

    // --- Helpers ---
    const getTeamMembers = (teamName: string) => TEAM_DIRECTORY[teamName] || [];

    // --- Initial Load / Updates ---
    useEffect(() => {
        if (currentStep === 1 && !wizardData.teamVariant && opportunity.team) {
            // Default variant to Primary Team
            onUpdateData({ ...wizardData, teamVariant: opportunity.team });
        }
    }, [currentStep, opportunity.team, wizardData.teamVariant]);

    // --- Step 1 Handlers ---
    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tId = e.target.value;
        generateAssignments(tId, wizardData.teamVariant);
    };

    const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const variant = e.target.value;
        generateAssignments(wizardData.selectedTemplateId, variant);
    };

    const generateAssignments = (templateId: string, variant: string) => {
        if (!templateId) {
            onUpdateData({ ...wizardData, selectedTemplateId: '', assignments: {} });
            return;
        }

        const defaults = getDefaultAssignments(variant);
        const newAssignments: Record<string, { primary: string, secondary: string }> = {};

        // Flatten trade list for assignment generation
        const allTrades: string[] = [];
        MATRIX_TRADES_STRUCTURE.forEach(row => {
            if (row.type === 'item') allTrades.push(row.label);
            if (row.type === 'group' && row.children) allTrades.push(...row.children);
        });

        allTrades.forEach(trade => {
            newAssignments[trade] = {
                primary: defaults[trade] || '',
                secondary: '' // Always start empty for secondary unless we had specific rules
            };
        });

        onUpdateData({ 
            ...wizardData, 
            selectedTemplateId: templateId,
            teamVariant: variant,
            assignments: newAssignments
        });
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

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <div className={`bg-white rounded-2xl shadow-2xl w-[1000px] max-w-full flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 transition-all ${currentStep === 2 ? 'h-[800px]' : 'h-auto'}`}>
                
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
                        <div className="max-w-xl mx-auto space-y-6">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Template</label>
                                    <select 
                                        value={wizardData.selectedTemplateId || ''} 
                                        onChange={handleTemplateChange}
                                        className="w-full text-sm border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-100 outline-none shadow-sm"
                                    >
                                        <option value="">-- Choose a Template --</option>
                                        {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>

                                {wizardData.selectedTemplateId && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Team Variant</label>
                                        <div className="relative">
                                            <select 
                                                value={wizardData.teamVariant || ''}
                                                onChange={handleVariantChange}
                                                className="w-full text-sm border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm font-medium"
                                            >
                                                {Object.keys(TEAM_DIRECTORY).map(team => (
                                                    <option key={team} value={team}>{team}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                                                Auto-Detected
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 ml-1">
                                            Defaults to <strong>{opportunity.team}</strong> based on opportunity assignment. Changing this will update default delegates.
                                        </p>
                                    </div>
                                )}
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

                                {/* Matrix Table */}
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
                                            {MATRIX_TRADES_STRUCTURE.map((row, idx) => {
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
                                                            {takeoffExpanded && row.children?.map(childLabel => renderMatrixRow(childLabel, true))}
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
                                        <p className="text-sm font-bold text-gray-800">{TEMPLATES.find(t => t.id === wizardData.selectedTemplateId)?.name}</p>
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
                        <span className="text-xs font-medium text-gray-500 mb-1">tasks this week</span>
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
                    <div className="flex items-end gap-2 mb-4 px-1">
                        <span className="text-2xl font-black text-gray-900">{doneCount}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Completed Reports</span>
                    </div>
                    <div className="space-y-2">
                        {teamLoadCurrent.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-gray-600 flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>{t.name}</span>
                                <span className="font-bold text-xs text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 min-w-[40px] text-center"><span className="text-emerald-600">{t.done}</span><span className="text-gray-400 mx-0.5">/</span><span>{t.total}</span></span>
                            </div>
                        ))}
                        {teamLoadCurrent.length === 0 && <div className="text-[10px] text-gray-400 italic">No scheduled tasks yet</div>}
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
                    <div className="flex items-end gap-2 mb-4 px-1">
                        <span className="text-2xl font-black text-gray-900">{nextDoneCount}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Completed Reports</span>
                    </div>
                    <div className="space-y-2">
                        {teamLoadNextWeek.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-gray-600 flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>{t.name}</span>
                                <span className="font-bold text-xs text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 min-w-[40px] text-center"><span className="text-emerald-600">{t.done}</span><span className="text-gray-400 mx-0.5">/</span><span>{t.total}</span></span>
                            </div>
                        ))}
                        {teamLoadNextWeek.length === 0 && <div className="text-[10px] text-gray-400 italic">No scheduled tasks yet</div>}
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
        return TEAMS.map(team => {
            const teamItems = data.filter(d => d.team === team);
            const breakdown = {
                open: teamItems.filter(i => i.status === 'Open').length,
                inProgress: teamItems.filter(i => i.status === 'In Progress').length,
                review: teamItems.filter(i => i.status === 'Review').length,
                done: teamItems.filter(i => i.status === 'Done').length
            };
            const filteredItems = teamItems.filter(i => selectedStatuses.includes(i.status) && (i.title.toLowerCase().includes(searchTerm.toLowerCase())));
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
                  teamVariant: opp.team, // Default variant to primary team
                  assignments: {} 
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
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div onClick={() => onNavigate && onNavigate('calendar')} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group">
                        <div className="flex items-center gap-4"><div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl group-hover:scale-110 transition-transform"><Calendar size={24} /></div><div><h3 className="font-bold text-gray-800 text-sm">QS Tools Calendar</h3><p className="text-xs text-gray-500 font-medium">Manage scheduling & deadlines</p></div></div>
                        <div className="bg-gray-50 p-2 rounded-lg text-gray-400 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors"><ChevronRight size={20} /></div>
                    </div>
                </div>
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
      />
    </div>
  );
};

export default PlaceholderPage;

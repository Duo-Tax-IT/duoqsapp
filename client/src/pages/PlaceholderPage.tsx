
import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import { Construction, Briefcase, Calendar, ChevronDown, Layers, TrendingUp, CheckCircle2, Filter, Check, ChevronRight, ChevronLeft, Search, AlertCircle, CalendarClock, Users, X, List, ClipboardList, Plus } from 'lucide-react';

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
  { id: 'int-1', name: 'CC386500-Parramatta', convertedDate: '15/01/2026', assignedTo: '', seniorEstimator: '', primaryTeam: '', secondaryTeam: '', deadline: '' },
  { id: 'int-2', name: 'CC386501-Chatswood', convertedDate: '15/01/2026', assignedTo: '', seniorEstimator: '', primaryTeam: '', secondaryTeam: '', deadline: '' },
  { id: 'int-3', name: 'CC386505-Ryde', convertedDate: '14/01/2026', assignedTo: 'Steven Leuta', seniorEstimator: 'Jack Ho', primaryTeam: 'Team Blue', secondaryTeam: '', deadline: '' },
];

// Project Tracker Portal - No Tasks Data
const NO_TASKS_DATA = [
  { id: 'nt-1', name: 'CC386600-Burwood', convertedDate: '16/01/2026', deadline: '23/01/2026', team: 'Team Red', secondaryTeam: 'Team Blue', projectLead: 'Jack Ho' },
  { id: 'nt-2', name: 'CC386605-Concord', convertedDate: '16/01/2026', deadline: '24/01/2026', team: 'Team Blue', secondaryTeam: '-', projectLead: 'Steven Leuta' },
  { id: 'nt-3', name: 'CC386612-Strathfield', convertedDate: '17/01/2026', deadline: '25/01/2026', team: 'Team Green', secondaryTeam: 'Team Pink', projectLead: 'Quoc Duong' },
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

interface OperationsWorkloadCardProps {
    data: typeof WEEK1_DATA;
    weekLabel: string;
    searchTerm: string;
    onSearchChange: (val: string) => void;
    onNavigate?: (page: string, id?: string) => void;
}

// --- Calendar Logic Helpers ---

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
    }

    // 2. Fallback to Random Data for demo (Deterministic)
    // Seed based on date to ensure consistent results across renders
    let seed = year * 10000 + (month + 1) * 100 + day;
    
    // Simple LCG (Linear Congruential Generator)
    const nextRand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    const total = Math.floor(nextRand() * 6); // 0-5 jobs
    
    const breakdown: Record<string, number> = {};
    const items: any[] = []; // Mock items

    if (total > 0) {
        let remaining = total;
        const teams = ['Team Red', 'Team Blue', 'Team Yellow', 'Team Green', 'Team Pink'];
        const statuses = ['Open', 'In Progress', 'Review', 'Done'];
        // Shuffle teams based on deterministic random
        const shuffled = [...teams].sort(() => 0.5 - nextRand());
        
        shuffled.forEach(team => {
            if (remaining > 0) {
                const count = Math.ceil(nextRand() * remaining); 
                breakdown[team] = count;
                // Generate fake items
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
        // Ensure exact sum if any remaining
        if (remaining > 0) {
             const team = shuffled[0];
             breakdown[team] = (breakdown[team] || 0) + remaining; 
             for(let k=0; k<remaining; k++) {
                const randomStatus = statuses[Math.floor(nextRand() * statuses.length)];
                items.push({ id: `mock-${year}-${month}-${day}-${team}-rem-${k}`, title: `${team} Job Rem ${k+1}`, team: team, status: randomStatus, type: 'Standard Report' });
             }
        }
    }

    return { total, breakdown, items };
};

// --- Deadline Picker Component with Workload Context ---
const DeadlinePickerPopover: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    onSelect: (date: string) => void; 
    anchorRef: React.RefObject<HTMLDivElement>;
    onNavigate?: (page: string, id?: string) => void;
}> = ({ isOpen, onClose, onSelect, onNavigate }) => {
    const [viewYear, setViewYear] = useState(2026);
    const [viewMonth, setViewMonth] = useState(0); // Jan
    const [selectedDate, setSelectedDate] = useState<{year: number, month: number, day: number} | null>(null);
    const [showJobDetails, setShowJobDetails] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setViewYear(2026);
            setViewMonth(0);
            setSelectedDate(null);
            setShowJobDetails(false);
        }
    }, [isOpen]);

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
            onSelect(dateStr);
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

// --- No Tasks Assigned Card Component ---
const NoTasksAssignedCard: React.FC<{ onNavigate?: (page: string, id?: string) => void }> = ({ onNavigate }) => {
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
                                    <button className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95">
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

// --- Intake Section Component ---
const IntakeSection: React.FC<{ onNavigate?: (page: string, id?: string) => void }> = ({ onNavigate }) => {
    const [items, setItems] = useState(INITIAL_INTAKE_DATA);
    const [activePickerId, setActivePickerId] = useState<string | null>(null);
    const pickerAnchorRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleAssign = (id: string, field: 'assignedTo' | 'primaryTeam' | 'secondaryTeam' | 'seniorEstimator', value: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSetDeadline = (id: string, date: string) => {
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
                                
                                {/* Primary Team */}
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.primaryTeam}
                                            onChange={(e) => handleAssign(item.id, 'primaryTeam', e.target.value)}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${
                                                item.primaryTeam && TEAM_STYLES[item.primaryTeam] 
                                                ? `${TEAM_STYLES[item.primaryTeam].bg} ${TEAM_STYLES[item.primaryTeam].text} ${TEAM_STYLES[item.primaryTeam].border}` 
                                                : 'bg-white text-gray-400 border-gray-200'
                                            }`}
                                        >
                                            <option value="">Select Team</option>
                                            {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>

                                {/* Secondary Team */}
                                <td className="px-4 py-3">
                                    <div className="relative w-40">
                                        <select 
                                            value={item.secondaryTeam}
                                            onChange={(e) => handleAssign(item.id, 'secondaryTeam', e.target.value)}
                                            disabled={!item.primaryTeam}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${
                                                !item.primaryTeam 
                                                ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' 
                                                : item.secondaryTeam && TEAM_STYLES[item.secondaryTeam]
                                                    ? `${TEAM_STYLES[item.secondaryTeam].bg} ${TEAM_STYLES[item.secondaryTeam].text} ${TEAM_STYLES[item.secondaryTeam].border}`
                                                    : 'bg-white text-gray-400 border-gray-200'
                                            }`}
                                        >
                                            <option value="">None</option>
                                            {TEAMS.filter(t => t !== item.primaryTeam).map(team => <option key={team} value={team}>{team}</option>)}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </td>

                                {/* Project Manager */}
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

                                {/* Senior Estimator */}
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

                                {/* Action: Deadline */}
                                <td className="px-4 py-3 text-right">
                                    <div 
                                        className="relative inline-block"
                                        ref={el => pickerAnchorRefs.current[item.id] = el}
                                    >
                                        <button 
                                            onClick={() => setActivePickerId(activePickerId === item.id ? null : item.id)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activePickerId === item.id ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <CalendarClock size={14} /> Set Deadline
                                        </button>
                                        
                                        <DeadlinePickerPopover 
                                            isOpen={activePickerId === item.id}
                                            onClose={() => setActivePickerId(null)}
                                            onSelect={(date) => handleSetDeadline(item.id, date)}
                                            anchorRef={{ current: pickerAnchorRefs.current[item.id] }}
                                            onNavigate={onNavigate}
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

const OpsSummary: React.FC<{ current: typeof WEEK1_DATA, next: typeof WEEK2_DATA }> = ({ current, next }) => {
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
            const outstanding = total - done;
            return {
                name: team,
                total,
                done,
                outstanding
            };
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
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Briefcase size={16} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Workload Overview</h3>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-gray-900">{currentTotal}</span>
                        <span className="text-xs font-medium text-gray-500 mb-1">tasks this week</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <Calendar size={12} className="text-gray-400" />
                        <span className="text-[10px] font-semibold text-gray-600">
                            <span className="text-gray-900 font-bold">{nextTotal}</span> upcoming next week
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2: Progress */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                            <TrendingUp size={16} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Weekly Progress</h3>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-gray-900">{progress}%</span>
                        <span className="text-xs font-medium text-gray-500 mb-1">completion rate</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                            className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="mt-1.5 text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider">
                        {doneCount} of {currentTotal} Completed
                    </div>
                </div>
            </div>

            {/* Card 3: Current Week Load */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar size={16} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Current Week Load</h3>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-4 px-1">
                        <span className="text-2xl font-black text-gray-900">{doneCount}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Completed Reports</span>
                    </div>

                    <div className="space-y-2">
                        {teamLoadCurrent.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-gray-600 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                    {t.name}
                                </span>
                                <span className="font-bold text-xs text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 min-w-[40px] text-center">
                                    <span className="text-emerald-600">{t.done}</span>
                                    <span className="text-gray-400 mx-0.5">/</span>
                                    <span>{t.total}</span>
                                </span>
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
                        <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                            <Calendar size={16} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Next Week Load</h3>
                    </div>

                    <div className="flex items-end gap-2 mb-4 px-1">
                        <span className="text-2xl font-black text-gray-900">{nextDoneCount}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Completed Reports</span>
                    </div>

                    <div className="space-y-2">
                        {teamLoadNextWeek.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-gray-600 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                    {t.name}
                                </span>
                                <span className="font-bold text-xs text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 min-w-[40px] text-center">
                                    <span className="text-emerald-600">{t.done}</span>
                                    <span className="text-gray-400 mx-0.5">/</span>
                                    <span>{t.total}</span>
                                </span>
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
    const [filterTeam, setFilterTeam] = useState('All Teams');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Open', 'In Progress', 'Review', 'Done']);
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
        TEAMS.reduce((acc, team) => ({ ...acc, [team]: true }), {})
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setStatusFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTeam = (teamName: string) => {
        setExpandedTeams(prev => ({ ...prev, [teamName]: !prev[teamName] }));
    };

    const toggleStatus = (status: string) => {
        setSelectedStatuses(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const getTeamData = () => {
        return TEAMS.map(team => {
            const teamItems = data.filter(d => d.team === team);
            // Calculate capacity based on ALL items assigned to team
            const breakdown = {
                open: teamItems.filter(i => i.status === 'Open').length,
                inProgress: teamItems.filter(i => i.status === 'In Progress').length,
                review: teamItems.filter(i => i.status === 'Review').length,
                done: teamItems.filter(i => i.status === 'Done').length
            };
            
            // Filter items for list view based on selected statuses AND Search Query
            const filteredItems = teamItems.filter(i => 
                selectedStatuses.includes(i.status) &&
                (i.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            return {
                name: team,
                projects: teamItems.length,
                breakdown,
                items: filteredItems
            };
        }).filter(t => t.projects > 0); 
    };

    const teamData = getTeamData();

    const filteredData = filterTeam === 'All Teams' 
        ? teamData 
        : teamData.filter(t => t.name === filterTeam);

    const getTotalProjects = () => filteredData.reduce((acc, curr) => acc + curr.projects, 0);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col h-full font-sans mb-8 last:mb-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 relative">
                <div>
                    <div className="flex items-center gap-3 mb-1.5">
                        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shadow-sm">
                            <Layers size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Operations Workload</h3>
                            <p className="text-xs text-gray-500 font-medium mt-1">Capacity & Project Distribution</p>
                        </div>
                    </div>
                </div>
                
                {/* Centered Large Search Bar */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-md z-10">
                     <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-orange transition-colors" size={18} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search jobs across weeks..." 
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-xl text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/10"
                            />
                        </div>
                     </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <div className="text-right hidden sm:block">
                        <div className="text-2xl font-black text-gray-900 leading-none">{getTotalProjects()}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Active Projects</div>
                    </div>
                    
                    {/* Status Multi-Select */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                        >
                            <Filter size={14} />
                            <span>Status</span>
                            {selectedStatuses.length > 0 && selectedStatuses.length < 4 && (
                                <div className="bg-gray-200 text-gray-600 px-1.5 rounded-md text-[10px]">{selectedStatuses.length}</div>
                            )}
                        </button>
                        
                        {statusFilterOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Filter by Status</div>
                                {STATUS_OPTIONS.map(status => (
                                    <div 
                                        key={status} 
                                        onClick={() => toggleStatus(status)}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-xs font-medium text-gray-700"
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedStatuses.includes(status) ? 'bg-brand-orange border-brand-orange text-white' : 'border-gray-300'}`}>
                                            {selectedStatuses.includes(status) && <Check size={10} strokeWidth={4} />}
                                        </div>
                                        <span>{status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Team Filter */}
                    <div className="relative">
                        <select 
                            value={filterTeam}
                            onChange={(e) => setFilterTeam(e.target.value)}
                            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 py-2.5 pl-4 pr-10 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors shadow-sm"
                        >
                            <option>All Teams</option>
                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6">
                <Calendar size={14} className="text-gray-400" />
                <span>Showing workload for <span className="font-bold text-gray-700">{weekLabel}</span></span>
            </div>

            {/* Content List */}
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
                            <div 
                                className="flex justify-between items-end mb-1 cursor-pointer select-none" 
                                onClick={() => toggleTeam(team.name)}
                            >
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-colors ${style.bg} ${style.border}`}>
                                    <div className={`w-2 h-2 rounded-full ${style.dot} shadow-sm ring-2 ring-white`}></div>
                                    <span className={`text-xs font-black uppercase tracking-wide ${style.text}`}>{team.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{Math.round(pctDone)}% Complete</span>
                                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-md">{total} Projects</span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                            
                            {/* Capacity Bar (Shows ALL tasks regardless of filter) */}
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex mb-2 shadow-inner">
                                <div className="h-full bg-emerald-500" style={{ width: `${pctDone}%` }} title={`Done: ${team.breakdown.done}`}></div>
                                <div className="h-full bg-purple-500" style={{ width: `${pctReview}%` }} title={`Review: ${team.breakdown.review}`}></div>
                                <div className="h-full bg-blue-500" style={{ width: `${pctInProgress}%` }} title={`In Progress: ${team.breakdown.inProgress}`}></div>
                                <div className="h-full bg-gray-300" style={{ width: `${pctOpen}%` }} title={`Open: ${team.breakdown.open}`}></div>
                            </div>

                            {/* Project List (Filtered) */}
                            {isExpanded && (
                                <div className="space-y-1 pl-1 mt-2 animate-in slide-in-from-top-2 duration-200">
                                    {team.items.length === 0 ? (
                                        <div className="text-center py-4 text-xs text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            No projects match the selected filters for {team.name}
                                        </div>
                                    ) : (
                                        team.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group/item">
                                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                    <div className="flex flex-col items-center justify-center w-8 h-8 rounded-md bg-gray-50 text-gray-500 border border-gray-200 shrink-0">
                                                        <span className="text-[8px] font-bold uppercase leading-none text-gray-400">{item.day.split(' ')[0]}</span>
                                                        <span className="text-xs font-bold leading-none text-gray-700 mt-0.5">{item.day.split(' ')[1]}</span>
                                                    </div>
                                                    
                                                    <div className="shrink-0 min-w-[70px]">
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider block text-center ${
                                                            item.status === 'Done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            item.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                            item.status === 'Open' ? 'bg-gray-50 text-gray-500 border-gray-200' :
                                                            'bg-purple-50 text-purple-600 border-purple-100'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h4 
                                                            className="text-xs font-bold text-gray-800 truncate group-hover/item:text-brand-orange transition-colors cursor-pointer hover:underline"
                                                            onClick={() => onNavigate && onNavigate('opportunity-detail', item.title)}
                                                        >
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{item.type || 'Unspecified Type'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {/* Legend */}
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
                
                {/* Navigation Quick Links */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                        onClick={() => onNavigate && onNavigate('calendar')}
                        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl group-hover:scale-110 transition-transform">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">QS Tools Calendar</h3>
                                <p className="text-xs text-gray-500 font-medium">Manage scheduling & deadlines</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg text-gray-400 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Newly Converted Intake Section */}
                <IntakeSection onNavigate={onNavigate} />

                <OpsSummary current={WEEK1_DATA} next={WEEK2_DATA} />
                
                {/* Week Selector Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm inline-flex">
                        <button 
                            onClick={() => setActiveWeek('week1')}
                            className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                activeWeek === 'week1' 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <Calendar size={14} className={activeWeek === 'week1' ? 'text-brand-orange' : 'text-gray-400'} />
                            Week 1: Jan 12 - 16
                        </button>
                        <button 
                            onClick={() => setActiveWeek('week2')}
                            className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                activeWeek === 'week2' 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <Calendar size={14} className={activeWeek === 'week2' ? 'text-brand-orange' : 'text-gray-400'} />
                            Week 2: Jan 19 - 23
                        </button>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {activeWeek === 'week1' ? (
                        <OperationsWorkloadCard 
                            data={WEEK1_DATA} 
                            weekLabel="Week of Jan 12 - 16, 2026" 
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onNavigate={onNavigate}
                        />
                    ) : (
                        <OperationsWorkloadCard 
                            data={WEEK2_DATA} 
                            weekLabel="Week of Jan 19 - 23, 2026" 
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onNavigate={onNavigate}
                        />
                    )}
                </div>
            </div>
        ) : title === 'Project Tracker Portal' ? (
            <div className="max-w-[1600px] mx-auto pb-12">
                <NoTasksAssignedCard onNavigate={onNavigate} />
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="bg-white p-8 rounded-full shadow-sm mb-4 border border-gray-100">
                    <Construction size={48} className="text-brand-orange opacity-50" />
                </div>
                <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
                <p className="max-w-md text-center text-sm font-medium text-gray-500">
                This page is currently being built. Check back soon for the full {title} interface.
                </p>
            </div>
        )}
      </main>
    </div>
  );
};

export default PlaceholderPage;

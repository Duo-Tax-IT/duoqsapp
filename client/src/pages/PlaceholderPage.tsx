
import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import { Construction, Briefcase, Calendar, ChevronDown, Layers, TrendingUp, CheckCircle2, Filter, Check } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
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
}

const OpsSummary: React.FC<{ current: typeof WEEK1_DATA, next: typeof WEEK2_DATA }> = ({ current, next }) => {
    const currentTotal = current.length;
    const nextTotal = next.length;
    const doneCount = current.filter(i => i.status === 'Done').length;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: Overview */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Workload Overview</h3>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-gray-900">{currentTotal}</span>
                        <span className="text-sm font-medium text-gray-500 mb-1.5">tasks this week</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600">
                            <span className="text-gray-900 font-bold">{nextTotal}</span> upcoming next week
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2: Progress */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Weekly Progress</h3>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-3">
                        <span className="text-4xl font-black text-gray-900">{progress}%</span>
                        <span className="text-sm font-medium text-gray-500 mb-1.5">completion rate</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                            className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider">
                        {doneCount} of {currentTotal} Completed
                    </div>
                </div>
            </div>

            {/* Card 3: Current Week Load */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Current Week Load</h3>
                    </div>
                    <div className="space-y-4">
                        {teamLoadCurrent.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-600 flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                    {t.name}
                                </span>
                                <span className="font-bold text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-md border border-gray-100 min-w-[50px] text-center">
                                    <span className="text-emerald-600">{t.done}</span>
                                    <span className="text-gray-400 mx-0.5">/</span>
                                    <span>{t.total}</span>
                                </span>
                            </div>
                        ))}
                        {teamLoadCurrent.length === 0 && <div className="text-xs text-gray-400 italic">No scheduled tasks yet</div>}
                    </div>
                </div>
            </div>

            {/* Card 4: Next Week Load */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Next Week Load</h3>
                    </div>
                    <div className="space-y-4">
                        {teamLoadNextWeek.map(t => (
                            <div key={t.name} className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-600 flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${TEAM_STYLES[t.name]?.dot || 'bg-gray-400'}`}></span>
                                    {t.name}
                                </span>
                                <span className="font-bold text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-md border border-gray-100 min-w-[50px] text-center">
                                    <span className="text-emerald-600">{t.done}</span>
                                    <span className="text-gray-400 mx-0.5">/</span>
                                    <span>{t.total}</span>
                                </span>
                            </div>
                        ))}
                        {teamLoadNextWeek.length === 0 && <div className="text-xs text-gray-400 italic">No scheduled tasks yet</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OperationsWorkloadCard: React.FC<OperationsWorkloadCardProps> = ({ data, weekLabel }) => {
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
            
            // Filter items for list view based on selected statuses
            const filteredItems = teamItems.filter(i => selectedStatuses.includes(i.status));

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
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-full font-sans mb-8 last:mb-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
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
            <div className="space-y-8">
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
                                className="flex justify-between items-end mb-3 cursor-pointer select-none" 
                                onClick={() => toggleTeam(team.name)}
                            >
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${style.bg} ${style.border}`}>
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
                                <div className="space-y-2 pl-1 mt-4 animate-in slide-in-from-top-2 duration-200">
                                    {team.items.length === 0 ? (
                                        <div className="text-center py-4 text-xs text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            No projects match the selected filters for {team.name}
                                        </div>
                                    ) : (
                                        team.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group/item">
                                                <div className="flex items-center gap-4 overflow-hidden">
                                                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 shrink-0">
                                                        <span className="text-[9px] font-bold uppercase leading-none text-gray-400">{item.day.split(' ')[0]}</span>
                                                        <span className="text-sm font-bold leading-none text-gray-700 mt-0.5">{item.day.split(' ')[1]}</span>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-xs font-bold text-gray-800 truncate group-hover/item:text-brand-orange transition-colors">{item.title}</h4>
                                                        <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{item.type || 'Unspecified Type'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center shrink-0 pl-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${
                                                        item.status === 'Done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        item.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        item.status === 'Open' ? 'bg-gray-50 text-gray-500 border-gray-200' :
                                                        'bg-purple-50 text-purple-600 border-purple-100'
                                                    }`}>
                                                        {item.status}
                                                    </span>
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
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Done</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Review</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">In Progress</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-gray-300"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Open</span></div>
            </div>
        </div>
    );
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const [activeWeek, setActiveWeek] = useState<'week1' | 'week2'>('week1');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar 
        title={title} 
        subtitle={title === 'Operations Portal' ? 'Overview' : "Under Construction"} 
        description={title === 'Operations Portal' ? 'Operational metrics and workload distribution' : `Manage your ${title.toLowerCase()} here.`} 
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {title === 'Operations Portal' ? (
            <div className="max-w-[900px] mx-auto pb-12">
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
                        <OperationsWorkloadCard data={WEEK1_DATA} weekLabel="Week of Jan 12 - 16, 2026" />
                    ) : (
                        <OperationsWorkloadCard data={WEEK2_DATA} weekLabel="Week of Jan 19 - 23, 2026" />
                    )}
                </div>
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

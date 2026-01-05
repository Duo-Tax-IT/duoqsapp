
import React, { useState, useMemo, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { 
  Calendar, Users, FileText, ChevronRight, Search, 
  Plus, UserCheck, MessageSquare, Clock, ArrowLeft,
  CheckCircle2, PenTool, Hash, ExternalLink, X,
  LayoutDashboard, Target, Zap, Copy, BarChart3, ShieldAlert,
  TrendingUp, Briefcase, Workflow, ListTodo, Info, ArrowRight,
  Timer, Save, Link2, AlertCircle, Sparkles, MoreVertical,
  Flag, CheckSquare, MessageCircle, Mic, History, RefreshCw, Send, Smile, Circle,
  Trophy, Settings2, SlidersHorizontal, User, Sparkle, Trash2,
  Activity, Shield, Zap as ZapIcon, Users2, Target as TargetIcon, Sparkles as SparklesIcon,
  Layers, PackageSearch, FilePieChart, ClipboardCheck, Eye, SearchCode
} from 'lucide-react';

// --- Types ---
type MeetingType = 'operations' | 'sales' | 'resource' | 'strategic';

interface Staff {
  name: string;
  img: string;
}

interface ActionItem {
  id: string; // Internal ID for sync
  task: string;
  assignedBy: Staff;
  assignees: Staff[];
  status: 'open' | 'ongoing' | 'review' | 'completed';
  progress: number;
  portalId?: string;
  lastUpdated: string;
}

interface TeamStats {
  red: number;
  blue: number;
  green: number;
  yellow: number;
  pink: number;
}

interface Meeting {
  id: string;
  type: MeetingType;
  title: string;
  date: string;
  week: number;
  minuteTaker: string;
  minuteTakerImg: string;
  attendance: Staff[];
  summary: string;
  detailedNotes: string;
  opsMetrics?: { 
    pipelineStatus: string; 
    rfiBacklog: number;
    teamWorkload: TeamStats;
    overallCapacity: number;
    wipCount: number;
    checkCount: number;
    reviewCount: number;
    totalReports: number;
    outstanding: number;
  };
  salesMetrics?: { leadsConverted: number; conversionRate: string; topSource: string };
  actionItems: ActionItem[];
}

// --- Mock Team Directory ---
const TEAM_DIRECTORY: Staff[] = [
  { name: 'Quoc Duong', img: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Jack Ho', img: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Kimberly Cuaresma', img: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Regina De Los Reyes', img: 'https://i.pravatar.cc/150?img=43' },
  { name: 'Edrian Pardillo', img: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Steven Leuta', img: 'https://i.pravatar.cc/150?img=69' },
  { name: 'Lachlan Volpes', img: 'https://i.pravatar.cc/150?img=70' },
  { name: 'Dave Agcaoili', img: 'https://i.pravatar.cc/150?img=60' },
  { name: 'Angelo Encabo', img: 'https://i.pravatar.cc/150?img=53' },
  { name: 'Patrick Cuaresma', img: 'https://i.pravatar.cc/150?img=14' },
];

const INITIAL_MOCK_MEETINGS: Meeting[] = [
  {
    id: 'MTG-2025-W51-OPS',
    type: 'operations',
    title: 'Operations Weekly Meeting',
    date: '18/12/2025',
    week: 51,
    minuteTaker: 'Regina De Los Reyes',
    minuteTakerImg: 'https://i.pravatar.cc/150?img=43',
    attendance: [
      { name: 'Jack Ho', img: 'https://i.pravatar.cc/150?img=13' },
      { name: 'Quoc Duong', img: 'https://i.pravatar.cc/150?img=11' },
      { name: 'Regina De Los Reyes', img: 'https://i.pravatar.cc/150?img=43' },
      { name: 'Edrian Pardillo', img: 'https://i.pravatar.cc/150?img=15' },
    ],
    summary: 'Focus on 2026 holiday scheduling, supply rate adjustments for Revesby, and Cubit workflow streamlining.',
    detailedNotes: 'Production team reviewed the GANTT chart for the remaining December window. Identified high-priority reports requiring senior sign-off before EOY. Discussed need for updated masonry data in the database.',
    opsMetrics: { 
        pipelineStatus: 'At Capacity', 
        rfiBacklog: 12,
        overallCapacity: 92,
        wipCount: 8,
        checkCount: 4,
        reviewCount: 2,
        totalReports: 65,
        outstanding: 32,
        teamWorkload: { red: 95, blue: 88, green: 98, yellow: 85, pink: 94 }
    },
    actionItems: [
        { 
          id: 'T-101',
          task: 'Update masonry rates in Master DB', 
          assignedBy: { name: 'Jack Ho', img: 'https://i.pravatar.cc/150?img=13' }, // Assigned BY Jack
          assignees: [{ name: 'Quoc Duong', img: 'https://i.pravatar.cc/150?img=11' }], 
          status: 'ongoing', 
          progress: 45, 
          portalId: 'T-101',
          lastUpdated: '2h ago'
        },
        { 
          id: 'T-102',
          task: 'Review Bondi 3D structural discrepancies', 
          assignedBy: { name: 'Edrian Pardillo', img: 'https://i.pravatar.cc/150?img=15' },
          assignees: [
            { name: 'Jack Ho', img: 'https://i.pravatar.cc/150?img=13' } // Assigned TO Jack
          ], 
          status: 'open', 
          progress: 0, 
          portalId: 'T-102',
          lastUpdated: '1d ago'
        }
    ]
  }
];

const WeeklyMeetingsPage: React.FC<{ onNavigate?: (p: string) => void }> = ({ onNavigate }) => {
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MOCK_MEETINGS);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewMinutesModalOpen, setIsNewMinutesModalOpen] = useState(false);
  const [activeCreationType, setActiveCreationType] = useState<MeetingType | null>(null);

  const groupedMeetings = useMemo(() => {
    const filtered = meetings.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const groups: { [key: number]: Meeting[] } = {};
    filtered.forEach(m => {
      if (!groups[m.week]) groups[m.week] = [];
      groups[m.week].push(m);
    });
    return Object.keys(groups).map(Number).sort((a, b) => b - a).map(week => ({ week, meetings: groups[week] }));
  }, [searchQuery, meetings]);

  const handleSaveNewMeeting = (newMeeting: Meeting) => {
    setMeetings([newMeeting, ...meetings]);
    setActiveCreationType(null);
  };

  if (activeCreationType === 'operations') {
      return <NewOperationsSyncForm onCancel={() => setActiveCreationType(null)} onSave={handleSaveNewMeeting} />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#eef2f8]">
      <TopBar title="Weekly Meetings" subtitle="Operations & Strategy" description="Review outcomes and action items from departmental syncs" />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          {selectedMeeting ? (
            <MeetingDetailView meeting={selectedMeeting} onBack={() => setSelectedMeeting(null)} onNavigate={onNavigate} />
          ) : (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="text" placeholder="Search meeting topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium transition-all" />
                  </div>
                  <button onClick={() => setIsNewMinutesModalOpen(true)} className="flex items-center gap-2 bg-blue-600 px-8 py-3 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 whitespace-nowrap">
                      <Plus size={20} /> New Meeting Log
                  </button>
              </div>
              {groupedMeetings.map((group) => (
                <div key={group.week} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-4 px-2">
                        <div className="h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-xl bg-slate-900 text-xl border-2 border-slate-800">{group.week}</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Week {group.week}</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Archived Syncs • 2025</p>
                        </div>
                        <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {group.meetings.map(meeting => (
                            <MeetingHistoryCard key={meeting.id} meeting={meeting} onClick={() => setSelectedMeeting(meeting)} />
                        ))}
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <NewMinutesModal isOpen={isNewMinutesModalOpen} onClose={() => setIsNewMinutesModalOpen(false)} onSelectTemplate={(type) => { setIsNewMinutesModalOpen(false); setActiveCreationType(type); }} />
    </div>
  );
};

// --- Operations Creation Form ---
const NewOperationsSyncForm: React.FC<{ onCancel: () => void; onSave: (m: Meeting) => void }> = ({ onCancel, onSave }) => {
    const [title, setTitle] = useState('Operations Weekly Meeting');
    const [date, setDate] = useState('18/12/2025');
    const [week, setWeek] = useState(51);
    const [minuteTaker, setMinuteTaker] = useState(TEAM_DIRECTORY[0]);
    const [attendance, setAttendance] = useState<Staff[]>([TEAM_DIRECTORY[0]]);
    const [summary, setSummary] = useState('');
    const [detailedNotes, setDetailedNotes] = useState('');
    
    // ADJUSTABLE BENCHMARK STATE
    const [rfiBacklog, setRfiBacklog] = useState(12);
    const [wipCount, setWipCount] = useState(8);
    const [checkCount, setCheckCount] = useState(4);
    const [reviewCount, setReviewCount] = useState(2);
    const [totalReports, setTotalReports] = useState(65);
    const [teamStats, setTeamStats] = useState<TeamStats>({ red: 76, blue: 77, green: 69, yellow: 63, pink: 50 });

    const outstandingCount = useMemo(() => {
        return 32; 
    }, []);

    const overallCapacity = useMemo(() => {
        const avg = (teamStats.red + teamStats.blue + teamStats.green + teamStats.yellow + teamStats.pink) / 5;
        return Math.round(avg);
    }, [teamStats]);

    const pipelineStatus = useMemo(() => {
        if (overallCapacity > 90) return 'At Capacity';
        if (overallCapacity > 70) return 'High Volume';
        if (overallCapacity > 40) return 'Healthy';
        return 'Underloaded';
    }, [overallCapacity]);

    const handlePublish = () => {
        const newMeeting: Meeting = {
            id: `MTG-${Date.now()}`,
            type: 'operations',
            title,
            date,
            week,
            minuteTaker: minuteTaker.name,
            minuteTakerImg: minuteTaker.img,
            attendance,
            summary: summary || 'No summary provided.',
            detailedNotes: detailedNotes || 'No detailed notes provided.',
            opsMetrics: { 
                pipelineStatus, 
                rfiBacklog: Number(rfiBacklog),
                teamWorkload: teamStats,
                overallCapacity,
                wipCount,
                checkCount,
                reviewCount,
                totalReports,
                outstanding: outstandingCount
            },
            actionItems: []
        };
        onSave(newMeeting);
    };

    return (
        <div className="flex flex-col h-full bg-[#f1f5f9] animate-in slide-in-from-right-4 duration-500 overflow-hidden">
            <div className="px-12 py-6 bg-[#334155] flex justify-between items-center shrink-0 border-b border-slate-700 shadow-lg relative z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-3 hover:bg-slate-700 rounded-full text-slate-300 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-none">Drafting Minutes</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Sparkle size={12} className="text-indigo-400 fill-indigo-400" />
                            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">OPERATIONS TEMPLATE</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={onCancel} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">DISCARD</button>
                     <button onClick={handlePublish} className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:bg-indigo-500 active:scale-95 transition-all flex items-center gap-2">
                         <Save size={18} /> SAVE & PUBLISH
                     </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12">
                <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-12">
                    <div className="col-span-8 space-y-10">
                        <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-700">
                            <DraftingMetricCard 
                                label="Reports Completed (This Week)" 
                                value="21" 
                                icon={<CheckCircle2 size={20} className="text-emerald-500" />}
                                breakdown={[
                                    { label: 'Red', val: 5, color: 'bg-red-500' },
                                    { label: 'Blue', val: 3, color: 'bg-blue-500' },
                                    { label: 'Green', val: 6, color: 'bg-emerald-500' },
                                    { label: 'Yellow', val: 3, color: 'bg-yellow-400' },
                                    { label: 'Pink', val: 4, color: 'bg-pink-500' }
                                ]}
                            />
                            <DraftingMetricCard 
                                label="Reports Outstanding" 
                                value={outstandingCount.toString()} 
                                icon={<Clock size={20} className="text-amber-500" />}
                                sub="Pending calendar submission"
                            />
                            <DraftingMetricCard 
                                label="Number of Reports (Total)" 
                                value={totalReports.toString()} 
                                icon={<Layers size={20} className="text-indigo-500" />}
                                sub="Overall Pipeline"
                            />
                            <DraftingMetricCard 
                                label="Work In Progress" 
                                value={wipCount.toString()} 
                                icon={<PenTool size={20} className="text-blue-500" />}
                                sub="Drafting stage"
                            />
                            <DraftingMetricCard 
                                label="Check Stage" 
                                value={checkCount.toString()} 
                                icon={<ClipboardCheck size={20} className="text-purple-500" />}
                                sub="Quality review queue"
                            />
                            <DraftingMetricCard 
                                label="Review Document Stage" 
                                value={reviewCount.toString()} 
                                icon={<Eye size={20} className="text-rose-500" />}
                                sub="Awaiting sign-off"
                            />
                        </div>

                        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm space-y-8">
                             <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Meeting Title" value={title} onChange={setTitle} />
                                <FormInput label="Meeting Date" value={date} onChange={setDate} />
                             </div>
                             <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Week Number" value={week} onChange={(v) => setWeek(Number(v))} type="number" />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Minute Taker</label>
                                    <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-indigo-200 outline-none transition-all appearance-none" value={minuteTaker.name} onChange={(e) => setMinuteTaker(TEAM_DIRECTORY.find(t => t.name === e.target.value)!)}>
                                        {TEAM_DIRECTORY.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                                    </select>
                                </div>
                             </div>
                        </div>

                        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                                <FilePieChart className="text-indigo-500" size={20} /> Update Weekly Figures
                            </h3>
                            <div className="grid grid-cols-3 gap-8">
                                <FormInput label="Total Pipeline Reports" value={totalReports} onChange={(v) => setTotalReports(Number(v))} type="number" />
                                <FormInput label="Reports in W.I.P" value={wipCount} onChange={(v) => setWipCount(Number(v))} type="number" />
                                <FormInput label="Reports in Check" value={checkCount} onChange={(v) => setCheckCount(Number(v))} type="number" />
                                <FormInput label="Reports in Review" value={reviewCount} onChange={(v) => setReviewCount(Number(v))} type="number" />
                                <FormInput label="RFI Backlog" value={rfiBacklog} onChange={(v) => setRfiBacklog(Number(v))} type="number" />
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3"><FileText className="text-slate-400" size={18} /><h3 className="font-bold text-lg text-slate-800">Executive Summary</h3></div>
                                <textarea className="w-full bg-slate-50 border-2 border-slate-50 rounded-[32px] p-8 text-lg italic font-semibold text-slate-600 focus:bg-white focus:border-indigo-100 outline-none min-h-[160px] transition-all" placeholder="Enter key takeaway..." value={summary} onChange={(e) => setSummary(e.target.value)} />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3"><MessageSquare className="text-slate-400" size={18} /><h3 className="font-bold text-lg text-slate-800">Detailed Discussion</h3></div>
                                <textarea className="w-full bg-slate-50 border-2 border-slate-50 rounded-[32px] p-8 text-sm font-medium text-slate-600 focus:bg-white focus:border-indigo-100 outline-none min-h-[300px] transition-all leading-relaxed" placeholder="Document specific points..." value={detailedNotes} onChange={(e) => setDetailedNotes(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 space-y-8 h-fit">
                        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-3"><Users className="text-indigo-500" size={20} /><h3 className="font-bold text-lg text-slate-800 tracking-tight">Attendance</h3></div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{attendance.length} SELECTED</span>
                            </div>
                            <MultiStaffLookup selected={attendance} onChange={setAttendance} options={TEAM_DIRECTORY} />
                        </div>

                        <div className="bg-[#1e293b] p-10 rounded-[48px] shadow-2xl shadow-slate-200">
                             <div className="flex justify-between items-start mb-6">
                                <TrendingUp className="text-indigo-400 opacity-80" size={32} />
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pipeline Status</p>
                                    <p className="text-xl font-black text-white">{pipelineStatus}</p>
                                </div>
                             </div>
                             
                             <h4 className="text-white text-xl font-black mb-2">Team Workload</h4>
                             <p className="text-slate-400 text-[10px] font-medium leading-relaxed mb-8 uppercase tracking-wider">Adjust team busy-ness to calculate capacity</p>
                             
                             <div className="space-y-6">
                                <TeamWorkloadSlider icon={<Shield size={12} />} label="Red Team" value={teamStats.red} onChange={(v) => setTeamStats({...teamStats, red: v})} color="bg-red-400" />
                                <TeamWorkloadSlider icon={<ZapIcon size={12} />} label="Blue Team" value={teamStats.blue} onChange={(v) => setTeamStats({...teamStats, blue: v})} color="bg-blue-400" />
                                <TeamWorkloadSlider icon={<Users2 size={12} />} label="Green Team" value={teamStats.green} onChange={(v) => setTeamStats({...teamStats, green: v})} color="bg-emerald-400" />
                                <TeamWorkloadSlider icon={<TargetIcon size={12} />} label="Yellow Team" value={teamStats.yellow} onChange={(v) => setTeamStats({...teamStats, yellow: v})} color="bg-yellow-400" />
                                <TeamWorkloadSlider icon={<SparklesIcon size={12} />} label="Pink Team" value={teamStats.pink} onChange={(v) => setTeamStats({...teamStats, pink: v})} color="bg-pink-400" />
                                
                                <div className="pt-6 mt-6 border-t border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Overall Capacity</label>
                                        <span className="text-white font-black text-2xl">{overallCapacity}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${overallCapacity}%` }}></div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DraftingMetricCard: React.FC<{ 
    label: string, 
    value: string, 
    icon: React.ReactNode, 
    sub?: string,
    breakdown?: { label: string, val: number, color: string }[]
}> = ({ label, value, icon, sub, breakdown }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between group hover:shadow-lg hover:border-indigo-100 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
            </div>
        </div>
        
        {breakdown ? (
            <div className="flex gap-1.5 mt-2">
                {breakdown.map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div className={`w-full h-1 rounded-full ${b.color} mb-1 opacity-80`} />
                        <span className="text-[9px] font-black text-slate-400">{b.val}</span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{sub}</p>
        )}
    </div>
);

const TeamWorkloadSlider: React.FC<{ icon: React.ReactNode, label: string, value: number, onChange: (v: number) => void, color: string }> = ({ icon, label, value, onChange, color }) => (
    <div className="space-y-3 group">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${color} text-white shadow-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em] group-hover:text-white transition-colors">{label}</span>
            </div>
            <span className="text-xs font-black text-white bg-slate-800/50 px-2 py-0.5 rounded-md ring-1 ring-white/5">{value}%</span>
        </div>
        
        <div className="relative h-6 flex items-center">
            <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]" style={{ width: `${value}%` }} />
                </div>
            </div>
            <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-lg pointer-events-none transition-all duration-150 ease-out" style={{ left: `calc(${value}% - 8px)`, boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)' }} />
        </div>
    </div>
);

const FormInput: React.FC<{ label: string; value: any; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{label}</label>
        <input type={type} className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-indigo-200 outline-none transition-all" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
);

const MultiStaffLookup: React.FC<{ selected: Staff[]; onChange: (s: Staff[]) => void; options: Staff[] }> = ({ selected, onChange, options }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const filtered = options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) && !selected.some(s => s.name === o.name));
    const toggleStaff = (s: Staff) => {
        if (selected.some(item => item.name === s.name)) { onChange(selected.filter(item => item.name !== s.name)); } 
        else { onChange([...selected, s]); setSearch(''); setIsOpen(false); }
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
                {selected.map(s => (
                    <div key={s.name} className="flex items-center gap-2 bg-slate-50 pl-2 pr-3 py-1.5 rounded-full border border-slate-100 group hover:border-red-100 transition-all">
                        <img src={s.img} className="w-6 h-6 rounded-full object-cover shadow-sm" />
                        <span className="text-xs font-bold text-slate-700">{s.name}</span>
                        <button onClick={() => toggleStaff(s)} className="text-slate-300 hover:text-red-500 transition-colors"><X size={14} strokeWidth={3} /></button>
                    </div>
                ))}
            </div>
            <div className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold focus:bg-white focus:border-indigo-200 outline-none transition-all" placeholder="Search team members..." value={search} onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }} onFocus={() => setIsOpen(true)} />
                </div>
                {isOpen && search.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-3xl shadow-2xl z-20 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-200">
                        {filtered.length > 0 ? filtered.map(o => (
                            <button key={o.name} onClick={() => toggleStaff(o)} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                <img src={o.img} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
                                <span className="text-sm font-bold text-slate-700">{o.name}</span>
                                <Plus size={16} className="ml-auto text-indigo-500" strokeWidth={3} />
                            </button>
                        )) : <div className="p-8 text-center text-xs font-bold text-slate-400">NO RESULTS</div>}
                    </div>
                )}
                {isOpen && search.length > 0 && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />}
            </div>
        </div>
    );
};

const MeetingHistoryCard: React.FC<{ meeting: Meeting; onClick: () => void }> = ({ meeting, onClick }) => {
    const theme = useMemo(() => {
        switch(meeting.type) {
            case 'operations': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-50 hover:border-blue-100', icon: <LayoutDashboard size={24} />, label: 'Operations' };
            case 'sales': return { bg: 'bg-orange-50', text: 'text-brand-orange', border: 'border-orange-50 hover:border-orange-100', icon: <Target size={24} />, label: 'Sales & Strategy' };
            case 'resource': return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-50 hover:border-emerald-100', icon: <Users size={24} />, label: 'Resource Planning' };
            case 'strategic': return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-50 hover:border-purple-100', icon: <Trophy size={24} />, label: 'Strategic Review' };
            default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-50 hover:border-slate-100', icon: <FileText size={24} />, label: 'Meeting' };
        }
    }, [meeting.type]);

    return (
        <div onClick={onClick} className={`bg-white rounded-[40px] border-2 p-8 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all group cursor-pointer flex flex-col h-full ${theme.border}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${theme.bg} ${theme.text} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>{theme.icon}</div>
                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${theme.text}`}>{theme.label}</span>
                        <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">{meeting.title}</h4>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[11px] font-semibold text-gray-400 block">{meeting.date}</span>
                    <div className="flex items-center gap-1 justify-end mt-1"><div className="w-1 h-1 rounded-full bg-gray-200"></div><span className="text-[8px] font-bold text-gray-300 uppercase tracking-tight">Archived</span></div>
                </div>
            </div>
            <p className="text-[15px] text-gray-500 font-medium leading-relaxed line-clamp-2 italic mb-8">"{meeting.summary}"</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">{meeting.attendance.slice(0, 3).map((a, i) => <img key={i} src={a.img} className="w-8 h-8 rounded-full border-4 border-white object-cover shadow-sm ring-1 ring-slate-100" />)}</div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{meeting.attendance.length} Attended</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme.bg} ${theme.text} group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-lg`}><ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" /></div>
            </div>
        </div>
    );
};

const MeetingDetailView: React.FC<{ meeting: Meeting; onBack: () => void; onNavigate?: (p: string) => void }> = ({ meeting, onBack, onNavigate }) => {
    const isOps = meeting.type === 'operations';
    const accentColor = isOps ? '#6366f1' : (meeting.type === 'sales' ? '#f97316' : meeting.type === 'resource' ? '#10b981' : '#a855f7');
    const accentBg = isOps ? 'bg-indigo-600' : (meeting.type === 'sales' ? 'bg-brand-orange' : meeting.type === 'resource' ? 'bg-emerald-600' : 'bg-purple-600');

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 pb-20">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 mb-8 transition-colors group"><div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-indigo-400 group-hover:bg-indigo-50"><ArrowLeft size={18} /></div>Back to Dashboard</button>
            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className={`p-12 pb-8 bg-slate-50/50`}>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><span className={`text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-white border shadow-lg ${accentBg}`}>Week {meeting.week}</span><span className={`text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider bg-white border border-slate-100 shadow-sm`} style={{ color: accentColor }}>{meeting.type.toUpperCase()}</span></div>
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">{meeting.title}</h1>
                            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs uppercase tracking-wider"><Calendar size={14} className="text-gray-300" /> {meeting.date}</div>
                        </div>
                        <div className="bg-white p-5 rounded-[24px] shadow-xl shadow-slate-200/40 border border-slate-50 flex items-center gap-4 min-w-[280px]">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-inner"><img src={meeting.minuteTakerImg} className="w-full h-full object-cover" /></div>
                            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2 flex items-center gap-1"><PenTool size={10} className="text-gray-300" /> Minute Taker</p><p className="text-base font-bold text-gray-900">{meeting.minuteTaker}</p></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {meeting.type === 'operations' ? (
                            <>
                                <MetricKPI icon={<Activity size={20} className="text-indigo-500" />} label="Work In Progress" value={meeting.opsMetrics?.wipCount.toString() || '0'} />
                                <MetricKPI icon={<ClipboardCheck size={20} className="text-purple-500" />} label="Check Stage" value={meeting.opsMetrics?.checkCount.toString() || '0'} />
                                <MetricKPI icon={<Eye size={20} className="text-rose-500" />} label="Review Stage" value={meeting.opsMetrics?.reviewCount.toString() || '0'} />
                                <MetricKPI icon={<Layers size={20} className="text-indigo-500" />} label="Total Pipeline" value={meeting.opsMetrics?.totalReports.toString() || '0'} />
                            </>
                        ) : meeting.type === 'sales' ? (
                            <>
                                <MetricKPI icon={<TrendingUp size={20} className="text-orange-500" />} label="Conversions" value={meeting.salesMetrics?.leadsConverted.toString() || '0'} />
                                <MetricKPI icon={<Briefcase size={20} className="text-blue-500" />} label="Conv. Rate" value={meeting.salesMetrics?.conversionRate || '0%'} />
                                <MetricKPI icon={<Users size={20} className="text-emerald-500" />} label="Attendance" value={meeting.attendance.length.toString()} />
                                <MetricKPI icon={<Clock size={20} className="text-purple-500" />} label="Week" value={meeting.week.toString()} />
                            </>
                        ) : (
                            <>
                                <MetricKPI icon={<Users size={20} className="text-emerald-500" />} label="Team Size" value={meeting.attendance.length.toString()} />
                                <MetricKPI icon={<Zap size={20} className="text-yellow-500" />} label="Avg Progress" value="88%" />
                            </>
                        )}
                    </div>
                    
                    {meeting.type === 'operations' && meeting.opsMetrics?.teamWorkload && (
                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 mb-12 shadow-sm">
                            <div className="flex items-center gap-3 mb-6"><BarChart3 size={18} className="text-indigo-600" /><h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Team Workload Breakdown</h3></div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                <TeamPill icon={<Shield size={14} />} label="Red" value={meeting.opsMetrics.teamWorkload.red} color="bg-red-500" />
                                <TeamPill icon={<ZapIcon size={14} />} label="Blue" value={meeting.opsMetrics.teamWorkload.blue} color="bg-blue-500" />
                                <TeamPill icon={<Users2 size={14} />} label="Green" value={meeting.opsMetrics.teamWorkload.green} color="bg-emerald-500" />
                                <TeamPill icon={<TargetIcon size={14} />} label="Yellow" value={meeting.opsMetrics.teamWorkload.yellow} color="bg-yellow-400" />
                                <TeamPill icon={<SparklesIcon size={14} />} label="Pink" value={meeting.opsMetrics.teamWorkload.pink} color="bg-pink-500" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><Users size={14} className="text-gray-300" /> Attendance ({meeting.attendance.length})</div>
                        <div className="flex flex-wrap gap-4">{meeting.attendance.map((person, i) => <div key={i} className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm hover:border-indigo-400 transition-all cursor-default group"><img src={person.img} className="w-8 h-8 rounded-full object-cover border-2 border-slate-50 ring-2 ring-slate-50 group-hover:ring-indigo-100 transition-all" /><span className="text-xs font-bold text-gray-700">{person.name}</span></div>)}</div>
                    </div>
                </div>

                <div className="bg-white p-12 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-slate-100">
                    <div className="lg:col-span-7 space-y-12">
                        <section><div className="flex items-center gap-4 mb-6"><div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm bg-slate-100 text-slate-800`}><FileText size={20} /></div><h3 className="text-xl font-bold text-gray-900 tracking-tight">Executive Summary</h3></div><div className="bg-slate-50/50 p-10 rounded-r-[32px] border-l-8 border-slate-200"><p className="text-gray-700 font-semibold leading-relaxed italic text-xl">"{meeting.summary}"</p></div></section>
                        <section><div className="flex items-center gap-4 mb-6"><div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-sm"><MessageSquare size={20} /></div><h3 className="text-xl font-bold text-gray-900 tracking-tight">Detailed Discussion</h3></div><div className="text-gray-600 leading-relaxed space-y-6 bg-slate-50/30 p-10 rounded-[40px] border border-slate-100 whitespace-pre-wrap font-medium text-[15px]">{meeting.detailedNotes}</div></section>
                    </div>
                    <div className="lg:col-span-5 space-y-10">
                        <section className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10">
                            <div className="flex items-center justify-between mb-10"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm"><CheckCircle2 size={20} /></div><h3 className="text-xl font-bold text-gray-900 tracking-tight">Action Items</h3></div><button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><SlidersHorizontal size={18} /></button></div>
                            <div className="space-y-8">{meeting.actionItems.length > 0 ? meeting.actionItems.map((item, i) => <HighFidelityActionCard key={i} item={item} onNavigate={onNavigate} />) : <div className="py-12 text-center text-slate-300 font-bold text-sm uppercase tracking-widest">No Action Items Logged</div>}</div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TeamPill: React.FC<{ icon: React.ReactNode, label: string, value: number, color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center group hover:bg-white hover:shadow-lg hover:translate-y-[-2px] transition-all">
        <div className={`p-2 rounded-xl ${color} text-white mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-black text-slate-800 leading-none">{value}%</p>
    </div>
);

const HighFidelityActionCard: React.FC<{ item: ActionItem; onNavigate?: (p: string) => void }> = ({ item, onNavigate }) => {
    return (
        <div className="p-8 bg-white border border-[#dbeafe] rounded-[48px] shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all group">
            <div className="flex items-start gap-5 mb-6"><div className={`mt-1 w-10 h-10 rounded-full border-[3px] flex items-center justify-center flex-shrink-0 transition-all ${item.status === 'completed' ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-indigo-500'}`}>{item.status === 'completed' && <CheckCircle2 size={20} className="text-white" />}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-4 mb-2"><h4 className={`text-xl font-bold leading-tight ${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.task}</h4><ActionStatusPill status={item.status} /></div><div className="flex flex-col gap-3 mt-4"><div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center"><img src={item.assignedBy.img} className="w-full h-full object-cover" /></div><div className="flex items-center gap-2"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Assigned By:</span><span className="text-[11px] font-bold text-gray-500">{item.assignedBy.name}</span></div></div><div className="flex items-center gap-3"><div className="flex -space-x-2">{item.assignees.map((a, idx) => <div key={idx} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-50 shadow-sm relative group/av"><img src={a.img} className="w-full h-full object-cover" /></div>)}</div><div className="flex items-center gap-2 overflow-hidden"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest flex-shrink-0">Assignee:</span><span className="text-[11px] font-bold text-gray-500 truncate">{item.assignees.map(a => a.name).join(', ')}</span></div></div></div></div></div>
            <div className="pt-8 mt-6 border-t border-gray-100"><div className="flex justify-between items-center mb-4"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] flex items-center gap-2"><BarChart3 size={12} /> Task Progression</label><span className="text-sm font-bold text-gray-900">{item.progress}%</span></div><div className="space-y-4"><div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]`} style={{ width: `${item.progress}%` }} /></div></div><div className="flex items-center justify-between mt-10"><button onClick={() => onNavigate && onNavigate('task-portal')} className="text-[11px] font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 flex items-center gap-2 bg-[#f0f7ff] px-6 py-3 rounded-full transition-all border border-[#dbeafe] shadow-sm active:scale-95 uppercase tracking-wide">Open In Portal <ExternalLink size={14} /></button><div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest"><History size={14} className="opacity-50" /> Updated {item.lastUpdated}</div></div></div>
        </div>
    );
};

const ActionStatusPill: React.FC<{ status: string }> = ({ status }) => {
    const styles = useMemo(() => {
        switch(status) {
            case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'ongoing': return 'bg-[#f0f7ff] text-indigo-600 border-[#dbeafe]';
            case 'review': return 'bg-purple-50 text-purple-700 border-purple-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    }, [status]);
    return <span className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-sm flex-shrink-0 ${styles}`}>{status}</span>;
};

const MetricKPI: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-5 p-7 rounded-[32px] border border-slate-100 bg-white shadow-lg shadow-slate-100/50 hover:translate-y-[-2px] transition-transform cursor-default">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-inner shrink-0">{icon}</div>
        <div><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-2">{label}</p><p className="text-xl font-bold tracking-tight text-gray-900">{value}</p></div>
    </div>
);

const NewMinutesModal: React.FC<{ isOpen: boolean; onClose: () => void; onSelectTemplate: (type: MeetingType) => void }> = ({ isOpen, onClose, onSelectTemplate }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#334155]/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-xl rounded-[64px] p-12 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-12"><h2 className="text-4xl font-extrabold text-[#1e293b] tracking-tight">New Minutes</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X size={28} strokeWidth={2.5} /></button></div>
                <div className="space-y-6 mb-12">
                    <TemplateChoice title="Operations" sub="WEEKLY PRODUCTION REVIEW" icon={<LayoutDashboard size={24} />} color="blue" onClick={() => onSelectTemplate('operations')} />
                    <TemplateChoice title="Sales & Strategy" sub="GROWTH & CONVERSIONS" icon={<Target size={24} />} color="orange" onClick={() => onSelectTemplate('sales')} />
                    <TemplateChoice title="Strategic Review" sub="SPECIAL TOPIC / AD-HOC" icon={<Sparkle size={24} />} color="purple" onClick={() => onSelectTemplate('strategic')} />
                    <TemplateChoice title="Resource Planning" sub="HEADCOUNT & TRAINING" icon={<Users size={24} />} color="green" onClick={() => onSelectTemplate('resource')} />
                </div>
                <div className="flex justify-center"><button onClick={onClose} className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-colors">CANCEL</button></div>
            </div>
        </div>
    );
};

const TemplateChoice: React.FC<{ title: string, sub: string, icon: React.ReactNode, color: 'blue' | 'orange' | 'green' | 'purple', onClick: () => void }> = ({ title, sub, icon, color, onClick }) => {
    const themeStyles = {
        blue: { bg: 'bg-[#f0f7ff]', border: 'border-[#dbeafe]', text: 'text-[#2563eb]', hover: 'hover:shadow-blue-100 hover:scale-[1.02]' },
        orange: { bg: 'bg-[#fffaf0]', border: 'border-[#ffedd5]', text: 'text-[#9a3412]', hover: 'hover:shadow-orange-100 hover:scale-[1.02]' },
        green: { bg: 'bg-[#f0fdf4]', border: 'border-[#dcfce7]', text: 'text-[#166534]', hover: 'hover:shadow-green-100 hover:scale-[1.02]' },
        purple: { bg: 'bg-[#f5f3ff]', border: 'border-[#ede9fe]', text: 'text-[#5b21b6]', hover: 'hover:shadow-purple-100 hover:scale-[1.02]' }
    }[color];
    return (<button onClick={onClick} className={`w-full flex items-center justify-between p-7 rounded-[40px] border-2 shadow-sm transition-all group text-left ${themeStyles.bg} ${themeStyles.border} ${themeStyles.hover}`}><div className="flex items-center gap-6"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm bg-white transition-transform duration-300 group-hover:scale-110 ${themeStyles.text}`}>{icon}</div><div><p className={`font-extrabold text-xl ${themeStyles.text}`}>{title}</p><p className={`text-[11px] opacity-60 font-bold uppercase tracking-[0.1em] mt-1`}>{sub}</p></div></div><ChevronRight className={`w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 ${themeStyles.text}`} strokeWidth={3} /></button>);
};

export default WeeklyMeetingsPage;

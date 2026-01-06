
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { 
  Search, Filter, Plus, ListChecks, Clock, Calendar, 
  CheckCircle, MoreHorizontal, User, Star, MessageSquare,
  AlertTriangle, Flag, Users, ArrowRight, BarChart3, LayoutDashboard,
  ShieldCheck, TrendingUp, ChevronRight, Link2, PenTool
} from 'lucide-react';
import { CreateSelectionModal, NewTaskModal } from '../components/TaskCreationModals';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Open' | 'Ongoing' | 'Completed' | 'In Review';
  dueDate: string;
  assignee?: string;
  assigneeImg?: string;
  assignedBy?: string;
  assignedByImg?: string;
  createdBy?: string;
  createdByImg?: string;
  meeting?: string;
  meetingId?: string; // Links to MTG IDs
  progress: number;
}

const MOCK_ASSIGNED_TO_ME: Task[] = [
  {
    id: 'T-102',
    title: 'Review Bondi 3D structural discrepancies',
    description: 'Check for discrepancies in slab thickness between structural and architectural drawings as requested by Edrian in the W51 Operations Sync.',
    priority: 'Normal',
    status: 'Open',
    dueDate: '20/12/2025',
    assignedBy: 'Edrian Pardillo',
    assignedByImg: 'https://i.pravatar.cc/150?img=15',
    createdBy: 'Edrian Pardillo',
    createdByImg: 'https://i.pravatar.cc/150?img=15',
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    progress: 0
  },
  {
    id: 'T-304',
    title: 'Clean up redundant SF opportunity fields',
    description: 'Remove redundant fields from the Opportunity object as discussed in the Production Sync to improve UX for the CSR team.',
    priority: 'Low',
    status: 'Ongoing',
    dueDate: '22/12/2025',
    assignedBy: 'Steven Leuta',
    assignedByImg: 'https://i.pravatar.cc/150?img=69',
    createdBy: 'Steven Leuta',
    createdByImg: 'https://i.pravatar.cc/150?img=69',
    meeting: 'Weekly Production Sync',
    meetingId: 'MTG-2025-W51-PROD',
    progress: 25
  }
];

const MOCK_ASSIGNED_BY_ME: Task[] = [
  {
    id: 'T-101',
    title: 'Update masonry rates in Master DB',
    description: 'Adjust the masonry rates based on the new supplier quote discussed in Week 51 Operations WIP.',
    priority: 'High',
    status: 'Ongoing',
    dueDate: '18/12/2025',
    assignee: 'Quoc Duong',
    assigneeImg: 'https://i.pravatar.cc/150?img=11',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    progress: 45
  },
  {
    id: 'T-202',
    title: 'Prep documents for tomorrow\'s training',
    description: 'Collate the new pricing matrix examples for the junior consultants training session.',
    priority: 'High',
    status: 'Open',
    dueDate: '17/12/2025',
    assignee: 'Regina De Los Reyes',
    assigneeImg: 'https://i.pravatar.cc/150?img=43',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    progress: 10
  }
];

const MOCK_BY_MEETING: Task[] = [
  ...MOCK_ASSIGNED_TO_ME.filter(t => t.meetingId === 'MTG-2025-W51-OPS'),
  ...MOCK_ASSIGNED_BY_ME.filter(t => t.meetingId === 'MTG-2025-W51-OPS'),
  {
    id: 'T-401',
    title: 'Finalize Jan 2026 leave schedule',
    description: 'Confirm all team members have logged their January leave to ensure production coverage.',
    priority: 'Normal',
    status: 'Completed',
    dueDate: '15/12/2025',
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    assignee: 'Jack Ho',
    progress: 100
  }
];

const MOCK_ARCHIVED_TASKS: Task[] = [
  {
    id: 'T-099',
    title: 'Q3 Revenue Report Analysis',
    description: 'Compile and analyze Q3 revenue figures for the quarterly board meeting. Ensure all cost centers are accounted for.',
    priority: 'High',
    status: 'Completed',
    dueDate: '10/10/2025',
    assignee: 'Jack Ho',
    assigneeImg: 'https://i.pravatar.cc/150?img=13',
    assignedBy: 'Quoc Duong',
    assignedByImg: 'https://i.pravatar.cc/150?img=11',
    createdBy: 'Quoc Duong',
    createdByImg: 'https://i.pravatar.cc/150?img=11',
    progress: 100
  },
  {
    id: 'T-085',
    title: 'Update Client Onboarding Packet',
    description: 'Refresh the PDF templates and welcome email sequence for new residential clients. Update branding assets.',
    priority: 'Low',
    status: 'Completed',
    dueDate: '01/09/2025',
    assignee: 'Regina De Los Reyes',
    assigneeImg: 'https://i.pravatar.cc/150?img=43',
    assignedBy: 'Jack Ho',
    assignedByImg: 'https://i.pravatar.cc/150?img=13',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    progress: 100
  },
   {
    id: 'T-072',
    title: 'Fix Salesforce Sync Error #402',
    description: 'Investigate and resolve the API timeout issue occurring during nightly syncs. Patch applied and verified.',
    priority: 'High',
    status: 'Completed',
    dueDate: '15/08/2025',
    assignee: 'Dave Agcaoili',
    assigneeImg: 'https://i.pravatar.cc/150?img=60',
    assignedBy: 'Edrian Pardillo',
    assignedByImg: 'https://i.pravatar.cc/150?img=15',
    createdBy: 'Edrian Pardillo',
    createdByImg: 'https://i.pravatar.cc/150?img=15',
    progress: 100
  }
];

interface TaskPortalPageProps {
    onNavigate?: (page: string, id?: string) => void;
}

const TaskPortalPage: React.FC<TaskPortalPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Assigned to Me');
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const tabKPIs = useMemo(() => {
    let tasks: Task[] = [];
    if (activeTab === 'Assigned to Me') tasks = MOCK_ASSIGNED_TO_ME;
    else if (activeTab === 'Assigned by Me') tasks = MOCK_ASSIGNED_BY_ME;
    else if (activeTab === 'By Meeting') tasks = MOCK_BY_MEETING;
    else if (activeTab === 'Archived Tasks') tasks = MOCK_ARCHIVED_TASKS;

    return {
      total: tasks.length,
      highPriority: tasks.filter(t => t.priority === 'High').length,
      ongoing: tasks.filter(t => t.status === 'Ongoing').length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      avgProgress: tasks.length ? Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length) : 0,
      tasks
    };
  }, [activeTab]);

  const currentTasks = useMemo(() => {
    switch (activeTab) {
      case 'Assigned to Me': return MOCK_ASSIGNED_TO_ME;
      case 'Assigned by Me': return MOCK_ASSIGNED_BY_ME;
      case 'By Meeting': return MOCK_BY_MEETING;
      case 'Archived Tasks': return MOCK_ARCHIVED_TASKS;
      default: return [];
    }
  }, [activeTab]);

  const groupedMeetingTasks = useMemo(() => {
    if (activeTab !== 'By Meeting') return {};
    return MOCK_BY_MEETING.reduce((acc: any, task) => {
      const key = task.meeting || 'Uncategorized';
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar title="Task Portal" subtitle="Operational Oversight" description="Monitor and manage task distribution across the QS team" />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1700px] mx-auto p-6 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 space-y-6 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-4">
                <SummaryCard label="Active Workload" value={tabKPIs.total.toString()} subtext="Total tasks in view" icon={<LayoutDashboard size={20} />} color="blue" />
                <SummaryCard label="High Priority" value={tabKPIs.highPriority.toString()} subtext="Urgent actions" icon={<AlertTriangle size={20} />} color="red" />
                <SummaryCard label="Overall Progress" value={`${tabKPIs.avgProgress}%`} subtext="Avg. completion rate" icon={<BarChart3 size={20} />} color="green" />
                <SummaryCard label="Ongoing" value={tabKPIs.ongoing.toString()} subtext="Currently in progress" icon={<Clock size={20} />} color="orange" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    <NavTab label="Assigned to Me" count={MOCK_ASSIGNED_TO_ME.length} active={activeTab === 'Assigned to Me'} onClick={() => setActiveTab('Assigned to Me')} />
                    <NavTab label="Assigned by Me" count={MOCK_ASSIGNED_BY_ME.length} active={activeTab === 'Assigned by Me'} onClick={() => setActiveTab('Assigned by Me')} />
                    <NavTab label="By Meeting" count={MOCK_BY_MEETING.length} active={activeTab === 'By Meeting'} onClick={() => setActiveTab('By Meeting')} />
                    <NavTab label="Archived Tasks" count={MOCK_ARCHIVED_TASKS.length} active={activeTab === 'Archived Tasks'} onClick={() => setActiveTab('Archived Tasks')} />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Search tasks..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm" />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"><Filter size={18} /></button>
                    <button onClick={() => setIsSelectionModalOpen(true)} className="flex items-center gap-2 bg-brand-orange px-5 py-2 rounded-xl text-sm font-bold text-white hover:bg-orange-600 transition-all shadow-md shadow-brand-orange/20 active:scale-95 whitespace-nowrap"><Plus size={18} /> New Task</button>
                </div>
            </div>

            <div className="space-y-8 pb-20">
                {activeTab === 'By Meeting' ? (
                    Object.entries(groupedMeetingTasks).map(([meetingName, tasks]: [string, any]) => (
                        <div key={meetingName} className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-orange shadow-sm">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">{meetingName}</h3>
                                    <p className="text-xs text-gray-500 font-medium">{tasks.length} Action Items</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 pl-2">
                                {tasks.map((task: Task) => <TaskCard key={task.id} task={task} onNavigate={onNavigate} />)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {currentTasks.length > 0 ? currentTasks.map((task) => <TaskCard key={task.id} task={task} onNavigate={onNavigate} />) : <EmptyState />}
                    </div>
                )}
            </div>
          </div>
          <div className="w-full xl:w-[360px] flex-shrink-0 space-y-6">
            <TaskOversightSidebar tasks={tabKPIs.tasks} />
          </div>
        </div>
      </main>

      <CreateSelectionModal isOpen={isSelectionModalOpen} onClose={() => setIsSelectionModalOpen(false)} onSelectTask={() => { setIsSelectionModalOpen(false); setIsNewTaskModalOpen(true); }} />
      <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} />
    </div>
  );
};

// --- Sub-Components ---
const SummaryCard: React.FC<{ label: string, value: string, subtext: string, icon: React.ReactNode, color: string }> = ({ label, value, subtext, icon, color }) => {
    const colorStyles: any = { blue: 'bg-blue-50 text-blue-600 border-blue-100', red: 'bg-red-50 text-red-600 border-red-100', green: 'bg-emerald-50 text-emerald-600 border-emerald-100', orange: 'bg-orange-50 text-brand-orange border-orange-100' };
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-5 transition-transform hover:translate-y-[-2px] group h-full">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorStyles[color]} shadow-inner group-hover:scale-110 transition-transform flex-shrink-0`}>{icon}</div>
            <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1.5 truncate">{label}</p>
                <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
                <p className="text-[10px] text-gray-500 font-medium truncate">{subtext}</p>
            </div>
        </div>
    );
};

const NavTab: React.FC<{ label: string, count: number, active: boolean, onClick: () => void }> = ({ label, count, active, onClick }) => (
    <button onClick={onClick} className={`px-6 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>{label} <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${active ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'}`}>{count}</span></button>
);

const TaskCard: React.FC<{ task: Task; onNavigate?: (page: string, id?: string) => void }> = ({ task, onNavigate }) => {
    const getPriorityStyles = (p: string) => {
        switch(p) { case 'High': return 'bg-red-50 text-red-600 border-red-100'; case 'Normal': return 'bg-blue-50 text-blue-600 border-blue-100'; case 'Low': return 'bg-gray-50 text-gray-500 border-gray-100'; default: return 'bg-gray-50 text-gray-500'; }
    };
    const getStatusStyles = (s: string) => {
        switch(s) { case 'Completed': return 'bg-emerald-500 text-white shadow-emerald-200'; case 'Ongoing': return 'bg-blue-600 text-white shadow-blue-200'; case 'In Review': return 'bg-purple-50 text-white shadow-purple-200'; case 'Open': default: return 'bg-white border border-gray-200 text-gray-600'; }
    };
    return (
        <div 
            onClick={() => onNavigate && onNavigate('task-detail', task.id)}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                 <div className={`w-full bg-brand-orange transition-all duration-1000`} style={{ height: `${task.progress}%` }}></div>
            </div>
            <div className="flex-1 min-w-0 pl-2">
                <div className="flex items-center gap-3 mb-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${getPriorityStyles(task.priority)}`}>{task.priority} Priority</span>
                    <span className="text-[10px] font-mono text-gray-400 font-bold">{task.id}</span>
                    {task.meeting && (
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                if (onNavigate && task.meetingId) {
                                    onNavigate('weekly-meetings', task.meetingId);
                                } else if (onNavigate) {
                                    onNavigate('weekly-meetings');
                                }
                            }} 
                            className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-100"
                        >
                            <Link2 size={10} /> {task.meeting}
                        </button>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-orange transition-colors">{task.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">{task.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-8 w-full md:w-auto flex-shrink-0">
                <div className="flex flex-col gap-3 min-w-[180px]">
                    {task.assignee && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50">{task.assigneeImg ? <img src={task.assigneeImg} className="w-full h-full object-cover" /> : <User size={14} className="m-auto text-gray-300" />}</div>
                            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assignee</p><p className="text-xs font-bold text-gray-700">{task.assignee}</p></div>
                        </div>
                    )}
                    {task.assignedBy && (
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50">{task.assignedByImg ? <img src={task.assignedByImg} className="w-full h-full object-cover" /> : <Flag size={14} className="m-auto text-gray-300" />}</div>
                            <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigner</p><p className="text-xs font-bold text-gray-700">{task.assignedBy}</p></div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100"><Calendar size={14} className="text-gray-400" /> Due {task.dueDate}</div>
                    <div className="flex items-center gap-3">
                         <div className="flex-1 h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden border border-gray-50"><div className="h-full bg-brand-orange" style={{ width: `${task.progress}%` }}></div></div>
                         <span className="text-[10px] font-bold text-gray-600">{task.progress}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg shadow-black/5 transition-all group-hover:scale-105 ${getStatusStyles(task.status)}`}>{task.status}</span>
                    <button className="p-2.5 text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-full transition-all active:scale-90"><MoreHorizontal size={20} /></button>
                </div>
            </div>
        </div>
    );
};

const TaskOversightSidebar: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const urgentItems = useMemo(() => tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').slice(0, 3), [tasks]);
    const upcomingDeadlines = useMemo(() => tasks.filter(t => t.status !== 'Completed').slice(0, 4), [tasks]);
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
                    <div className="flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /><h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Action Required</h3></div>
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{urgentItems.length}</span>
                </div>
                <div className="p-2 divide-y divide-gray-50">
                    {urgentItems.length > 0 ? urgentItems.map(item => (
                        <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2"><span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-wider">{item.id}</span><span className="text-[9px] font-bold text-gray-400">{item.dueDate}</span></div>
                            <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-brand-orange mb-3">{item.title}</h4>
                            <div className="space-y-2 mt-2 pt-2 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 overflow-hidden border border-blue-100">{item.createdByImg ? <img src={item.createdByImg} className="w-full h-full object-cover" /> : <PenTool size={10} />}</div>
                                    <p className="text-[9px] text-gray-500 font-medium"><span className="font-bold uppercase tracking-tighter text-gray-400 mr-1">Created By:</span><span className="font-bold text-gray-700">{item.createdBy}</span></p>
                                </div>
                            </div>
                        </div>
                    )) : <div className="p-8 text-center"><ShieldCheck size={32} className="text-green-200 mx-auto mb-2" /><p className="text-[10px] font-bold text-gray-400">No urgent items!</p></div>}
                </div>
                <button className="w-full py-3 text-[10px] font-bold text-gray-400 hover:text-brand-orange hover:bg-gray-50 transition-all border-t border-gray-50 uppercase tracking-widest flex items-center justify-center gap-1">View All Urgent <ChevronRight size={12} /></button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2"><Calendar size={18} className="text-brand-orange" /><h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Upcoming Deadlines</h3></div>
                <div className="p-4 space-y-4">
                    {upcomingDeadlines.map(item => (
                        <div key={item.id} className="flex gap-3">
                             <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 font-bold"><span className="text-[9px] leading-none">{item.dueDate.split('/')[0]}</span><span className="text-[9px] leading-none uppercase">Dec</span></div>
                             <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-bold text-gray-800 truncate">{item.title}</h4>
                                <div className="flex items-center gap-2 mt-1"><div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-brand-orange" style={{ width: `${item.progress}%` }}></div></div><span className="text-[9px] font-bold text-gray-400">{item.progress}%</span></div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const WorkloadItem: React.FC<{ label: string, value: string, total: string, color: string }> = ({ label, value, total, color }) => (
    <div>
        <div className="flex justify-between items-end mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span><span className="text-xs font-bold text-gray-800">{value}<span className="text-[10px] text-gray-400 font-bold ml-1">/ {total}</span></span></div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${(parseInt(value) / parseInt(total)) * 100}%` }}></div></div>
    </div>
);

const EmptyState = () => (
    <div className="bg-white rounded-3xl border border-dashed border-gray-300 min-h-[400px] flex flex-col items-center justify-center p-12 text-center group"><div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100"><ListChecks size={48} className="text-gray-300" strokeWidth={1} /></div><h3 className="text-xl font-bold text-gray-800 mb-2">No active tasks found</h3><p className="text-gray-400 max-w-sm text-sm leading-relaxed font-medium">Looks like everything is up to date! Switch tabs or create a new task to get started.</p></div>
);

export default TaskPortalPage;

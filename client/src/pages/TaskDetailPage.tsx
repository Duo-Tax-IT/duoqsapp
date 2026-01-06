
import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { 
  ArrowLeft, Calendar, User, CheckCircle2, 
  MessageSquare, Link2, Archive, BarChart3, PenTool, Check,
  Plus, Clock, Users, Shield, Zap, Target, X, ArrowRight, Search
} from 'lucide-react';

interface TaskDetailPageProps {
  taskId: string;
  onBack: () => void;
  onNavigate?: (page: string, id?: string) => void;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
}

interface ActivityItem {
  id: string;
  user: string;
  userImg?: string;
  action: string; 
  content?: string;
  timestamp: string;
  type: 'comment' | 'system';
}

interface Collaborator {
  name: string;
  img?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Open' | 'Ongoing' | 'Completed' | 'In Review';
  dueDate: string; // ISO format YYYY-MM-DD
  createdAt: string; // Display string or ISO
  assignee?: string;
  assigneeImg?: string;
  assignedBy?: string;
  assignedByImg?: string;
  createdBy?: string;
  createdByImg?: string;
  collaborators?: Collaborator[];
  meeting?: string;
  meetingId?: string;
  subtasks?: Subtask[];
  activity?: ActivityItem[];
  isArchived?: boolean;
}

// Current User Mock
const CURRENT_USER = {
  name: 'Jack Ho',
  img: 'https://i.pravatar.cc/150?img=13'
};

// Mock Staff for Selection - Updated based on Team Directory
const AVAILABLE_STAFF = [
  // Cost Consultants
  { name: 'Quoc Duong', img: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Jack Ho', img: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Kimberly Cuaresma', img: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Patrick Cuaresma', img: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Dave Agcaoili', img: 'https://i.pravatar.cc/150?img=60' },
  { name: 'Angelo Encabo', img: 'https://i.pravatar.cc/150?img=53' },
  { name: 'Edrian Pardillo', img: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Jerald Aben', img: 'https://i.pravatar.cc/150?img=8' },
  { name: 'John Christian Perez', img: 'https://i.pravatar.cc/150?img=59' },
  { name: 'Rina Aquino', img: 'https://i.pravatar.cc/150?img=41' },
  { name: 'Dzung Nguyen', img: 'https://i.pravatar.cc/150?img=68' },
  { name: 'Rengie Ann Argana', img: 'https://i.pravatar.cc/150?img=42' },
  { name: 'Regina De Los Reyes', img: 'https://i.pravatar.cc/150?img=43' },
  { name: 'Camille Centeno', img: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Rean Aquino', img: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Jennifer Espalmado', img: 'https://i.pravatar.cc/150?img=45' },
  { name: 'Angelica De Castro', img: 'https://i.pravatar.cc/150?img=49' },
  { name: 'Gregory Christ', img: 'https://i.pravatar.cc/150?img=51' },
  { name: 'Anamie Rance', img: 'https://i.pravatar.cc/150?img=35' },
  { name: 'Ian Joseph Larinay', img: 'https://i.pravatar.cc/150?img=52' },
  { name: 'Jamielah Villanueva', img: 'https://i.pravatar.cc/150?img=36' },
  { name: 'Nexierose Baluyot', img: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Danilo Jr de la Cruz', img: 'https://i.pravatar.cc/150?img=55' },
  { name: 'Daniel Venus', img: 'https://i.pravatar.cc/150?img=54' },
  { name: 'Georgie Mercado', img: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Dorothy Tumbaga', img: 'https://i.pravatar.cc/150?img=21' },
  { name: 'Joahna Marie Pios', img: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Rica Galit', img: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Ariel Monsalud', img: 'https://i.pravatar.cc/150?img=57' },
  { name: 'Myra Manalac', img: 'https://i.pravatar.cc/150?img=26' },
  // Business Development Managers
  { name: 'Steven Leuta', img: 'https://i.pravatar.cc/150?img=69' },
  { name: 'Lachlan Volpes', img: 'https://i.pravatar.cc/150?img=70' },
];

// Mock Data
const MOCK_TASKS: Task[] = [
  {
    id: 'T-102',
    title: 'Review Bondi 3D structural discrepancies',
    description: 'Check for discrepancies in slab thickness between structural and architectural drawings as requested by Edrian in the W51 Operations Sync.',
    priority: 'Normal',
    status: 'Open',
    dueDate: '2025-12-20',
    createdAt: '15/12/2025',
    assignedBy: 'Edrian Pardillo',
    assignedByImg: 'https://i.pravatar.cc/150?img=15',
    createdBy: 'Edrian Pardillo',
    createdByImg: 'https://i.pravatar.cc/150?img=15',
    collaborators: [
      { name: 'Kimberly Cuaresma', img: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Dave Agcaoili', img: 'https://i.pravatar.cc/150?img=60' }
    ],
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    subtasks: [
        { id: 'st-1', title: 'Download latest architectural set (Rev C)', completed: true, completedBy: 'Edrian Pardillo', completedAt: '2 days ago' },
        { id: 'st-2', title: 'Cross reference structural engineering plans', completed: true, completedBy: 'Jack Ho', completedAt: 'Just now' },
        { id: 'st-3', title: 'Identify slab thickness discrepancies on Grid A-4', completed: false },
        { id: 'st-4', title: 'Draft RFI for client review', completed: false },
    ],
    activity: [
        { 
            id: 'a1', 
            user: 'Edrian Pardillo', 
            userImg: 'https://i.pravatar.cc/150?img=15', 
            action: 'completed subtask', 
            content: 'Download latest architectural set (Rev C)', 
            timestamp: '2 days ago', 
            type: 'system' 
        },
        { 
            id: 'a2', 
            user: 'Jack Ho', 
            userImg: 'https://i.pravatar.cc/150?img=13', 
            action: 'completed subtask', 
            content: 'Cross reference structural engineering plans', 
            timestamp: 'Just now', 
            type: 'system' 
        }
    ]
  },
  {
    id: 'T-304',
    title: 'Clean up redundant SF opportunity fields',
    description: 'Remove redundant fields from the Opportunity object as discussed in the Production Sync to improve UX for the CSR team.',
    priority: 'Low',
    status: 'Ongoing',
    dueDate: '2025-12-22',
    createdAt: '10/12/2025',
    assignedBy: 'Steven Leuta',
    assignedByImg: 'https://i.pravatar.cc/150?img=69',
    createdBy: 'Steven Leuta',
    createdByImg: 'https://i.pravatar.cc/150?img=69',
    collaborators: [],
    meeting: 'Weekly Production Sync',
    subtasks: [
        { id: 'st-1', title: 'Audit current Opportunity fields', completed: true, completedBy: 'Steven Leuta' },
        { id: 'st-2', title: 'List candidates for deprecation', completed: false },
    ],
    activity: []
  }
];

const TaskDetailPage: React.FC<TaskDetailPageProps> = ({ taskId, onBack, onNavigate }) => {
  const [taskData, setTaskData] = useState<Task | null>(null);
  
  // Interactive Inputs
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isAddCollabOpen, setIsAddCollabOpen] = useState(false);
  const [collabSearch, setCollabSearch] = useState('');

  // Calculate live progress based on subtasks if they exist
  const progressPercentage = React.useMemo(() => {
    if (!taskData || !taskData.subtasks || taskData.subtasks.length === 0) return 0;
    const completed = taskData.subtasks.filter(s => s.completed).length;
    return Math.round((completed / taskData.subtasks.length) * 100);
  }, [taskData]);

  useEffect(() => {
    const foundTask = MOCK_TASKS.find(t => t.id === taskId);
    if (foundTask) {
      setTaskData(JSON.parse(JSON.stringify(foundTask)));
    } else {
        setTaskData(JSON.parse(JSON.stringify(MOCK_TASKS[0])));
    }
  }, [taskId]);

  const addActivityLog = (action: string, content: string, type: 'comment' | 'system') => {
      setTaskData(prev => {
          if (!prev) return null;
          const newActivity: ActivityItem = {
              id: Date.now().toString(),
              user: CURRENT_USER.name,
              userImg: CURRENT_USER.img,
              action,
              content,
              timestamp: 'Just now',
              type
          };
          return {
              ...prev,
              activity: [newActivity, ...(prev.activity || [])]
          };
      });
  };

  const handleMarkComplete = () => {
    if (taskData) {
      const updatedSubtasks = taskData.subtasks?.map(st => ({
          ...st,
          completed: true,
          completedBy: CURRENT_USER.name,
          completedAt: 'Just now'
      })) || [];

      setTaskData(prev => prev ? ({ 
          ...prev, 
          status: 'Completed',
          subtasks: updatedSubtasks
      }) : null);
      addActivityLog('marked task as completed', '', 'system');
    }
  };

  const handleArchive = () => {
      if (progressPercentage === 100) {
          setTaskData(prev => prev ? ({ ...prev, isArchived: true }) : null);
          addActivityLog('archived task', '', 'system');
      }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (taskData) {
          const newDate = e.target.value;
          setTaskData({ ...taskData, dueDate: newDate });
          addActivityLog('changed due date to', newDate, 'system');
      }
  };

  const toggleSubtask = (subtaskId: string) => {
    if (!taskData || !taskData.subtasks) return;
    
    let changedSubtask: Subtask | undefined;

    const updatedSubtasks = taskData.subtasks.map(st => {
        if (st.id === subtaskId) {
            const isCompleted = !st.completed;
            changedSubtask = { 
                ...st, 
                completed: isCompleted,
                completedBy: isCompleted ? CURRENT_USER.name : undefined 
            };
            return changedSubtask;
        }
        return st;
    });
    
    if (changedSubtask) {
        // Logic: If any subtask is now incomplete, and the main task was 'Completed' or 'Archived', revert it to 'Ongoing'
        // This ensures the status and button state reflect the 100% progress rule.
        const allComplete = updatedSubtasks.every(st => st.completed);
        let newStatus = taskData.status;
        let newArchived = taskData.isArchived;
        
        if (!allComplete) {
             if (taskData.status === 'Completed' || taskData.isArchived) {
                 newStatus = 'Ongoing';
             }
             // If task is no longer 100% complete, it cannot be archived.
             newArchived = false;
        }

        setTaskData(prev => prev ? ({ 
            ...prev, 
            subtasks: updatedSubtasks,
            status: newStatus,
            isArchived: newArchived
        }) : null);

        const action = changedSubtask.completed ? 'completed subtask' : 'unmarked subtask';
        addActivityLog(action, changedSubtask.title, 'system');
    }
  };

  const handleAddSubtask = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newSubtaskTitle.trim()) return;

      const newSubtask: Subtask = {
          id: `new-${Date.now()}`,
          title: newSubtaskTitle,
          completed: false
      };

      // Adding a new (incomplete) subtask implies the task is no longer 100% complete.
      // Revert status to 'Ongoing' if it was 'Completed'. Unarchive if archived.
      const newStatus = (taskData?.status === 'Completed') ? 'Ongoing' : (taskData?.status || 'Open');

      setTaskData(prev => prev ? ({
          ...prev,
          subtasks: [...(prev.subtasks || []), newSubtask],
          status: newStatus,
          isArchived: false
      }) : null);
      
      addActivityLog('added subtask', newSubtaskTitle, 'system');
      setNewSubtaskTitle('');
  };

  const handlePostComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      addActivityLog('commented', newComment, 'comment');
      setNewComment('');
  };

  const handleAddCollaborator = (staff: { name: string; img: string }) => {
    if (!taskData) return;
    
    if (taskData.collaborators?.some(c => c.name === staff.name)) {
        setIsAddCollabOpen(false);
        return;
    }

    const newCollab = { name: staff.name, img: staff.img };
    const updatedCollaborators = [...(taskData.collaborators || []), newCollab];
    
    setTaskData({
        ...taskData,
        collaborators: updatedCollaborators
    });
    
    addActivityLog('added collaborator', staff.name, 'system');
    setIsAddCollabOpen(false);
    setCollabSearch('');
  };

  const getPriorityStyles = (p: string) => {
    switch(p) { 
        case 'High': return 'bg-red-50 text-red-600 border-red-200 shadow-sm shadow-red-100'; 
        case 'Normal': return 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm shadow-blue-100'; 
        case 'Low': return 'bg-slate-50 text-slate-500 border-slate-200 shadow-sm shadow-slate-100'; 
        default: return 'bg-slate-50 text-slate-500'; 
    }
  };

  if (!taskData) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f4f7fa]">
      <TopBar 
        title="Task Portal" 
        subtitle="Review Task" 
        description="Detailed view of operational tasks" 
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
            
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors group mb-8"
            >
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-indigo-400 group-hover:bg-indigo-50 shadow-sm transition-all">
                    <ArrowLeft size={18} />
                </div>
                Back to Task List
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                
                {/* --- Left Column: Main Content (8 cols) --- */}
                <div className="xl:col-span-8 space-y-8">
                    
                    {/* Task Header & Description */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest ${getPriorityStyles(taskData.priority)}`}>
                                {taskData.priority} Priority
                            </span>
                            {/* STATUS CHIP - Auto-updates based on state */}
                            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest shadow-sm transition-colors ${
                                taskData.status === 'Completed' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                : 'bg-white border-slate-200 text-slate-500'
                            }`}>
                                {taskData.status}
                            </span>
                            {taskData.isArchived && (
                                <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-widest shadow-sm">
                                    Archived
                                </span>
                            )}
                            {taskData.meeting && (
                                <button 
                                    onClick={() => onNavigate && taskData.meetingId && onNavigate('weekly-meetings', taskData.meetingId)}
                                    className="text-[10px] font-black px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-widest flex items-center gap-1.5 hover:bg-indigo-100 transition-colors shadow-sm"
                                >
                                    <Link2 size={12} /> Linked to Meeting
                                </button>
                            )}
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{taskData.title}</h1>
                        
                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                {taskData.description}
                            </p>
                        </div>
                    </div>

                    {/* Subtasks Section */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-2xl shadow-slate-200/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-slate-300" /> Subtasks
                            </h3>
                            <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200">
                                {taskData.subtasks ? taskData.subtasks.filter(s => s.completed).length : 0} / {taskData.subtasks ? taskData.subtasks.length : 0} Completed
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {taskData.subtasks && taskData.subtasks.map(st => (
                                <div 
                                    key={st.id}
                                    className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                                        st.completed 
                                        ? 'bg-slate-50 border-slate-100' 
                                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5'
                                    }`}
                                    onClick={() => toggleSubtask(st.id)}
                                >
                                    <div 
                                        className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                            st.completed 
                                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                                            : 'bg-white border-slate-300 group-hover:border-indigo-400'
                                        }`}
                                    >
                                        {st.completed && <Check size={14} strokeWidth={4} />}
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <span className={`text-sm font-bold block leading-snug transition-colors ${st.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                            {st.title}
                                        </span>
                                        {st.completed && st.completedBy && (
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Completed by {st.completedBy}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Add Subtask Input */}
                            <form 
                                onSubmit={handleAddSubtask} 
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-text mt-4 group ${
                                    newSubtaskTitle 
                                    ? 'border-indigo-400 bg-indigo-50/10 shadow-sm ring-4 ring-indigo-50/50' 
                                    : 'border-dashed border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                                }`}
                                onClick={(e) => {
                                    const input = e.currentTarget.querySelector('input');
                                    input?.focus();
                                }}
                            >
                                <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${
                                    newSubtaskTitle ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400'
                                }`}>
                                    <Plus size={14} strokeWidth={3} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Add a new subtask..." 
                                    className="flex-1 bg-transparent text-sm font-bold outline-none placeholder-slate-400 text-slate-800"
                                    value={newSubtaskTitle}
                                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                />
                                {newSubtaskTitle && (
                                    <button 
                                        type="submit"
                                        className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200"
                                    >
                                        ADD <ArrowRight size={10} strokeWidth={3} />
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Activity Section */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-2xl shadow-slate-200/50">
                        {/* ... Activity content kept same ... */}
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-8">
                            <MessageSquare size={16} className="text-slate-300" /> Activity & Comments
                        </h3>
                        
                        {/* Comment Input */}
                        <div className="flex gap-4 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0 border border-white shadow-md overflow-hidden">
                                <img src={CURRENT_USER.img} alt={CURRENT_USER.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 relative">
                                <form onSubmit={handlePostComment}>
                                    <input 
                                        type="text" 
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write a comment..." 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder-slate-400 text-slate-700"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ArrowLeft size={16} className="rotate-180" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Activity List */}
                        <div className="space-y-6 relative pl-5">
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

                            {taskData.activity && taskData.activity.map((item) => (
                                <div key={item.id} className="relative flex gap-4 group">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 border-[3px] border-white shadow-md ${item.type === 'system' ? 'bg-slate-100' : 'bg-white'}`}>
                                        {item.userImg ? (
                                            <img src={item.userImg} alt={item.user} className="w-full h-full rounded-[10px] object-cover" />
                                        ) : (
                                            <User size={14} className="text-slate-400" />
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 pt-1 pb-2">
                                        <div className="flex items-baseline justify-between mb-1">
                                            <p className="text-xs text-slate-800">
                                                <span className="font-bold">{item.user}</span> <span className="text-slate-500 font-medium">{item.action}</span>
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{item.timestamp}</span>
                                        </div>
                                        {item.content && (
                                            <div className={`text-xs font-medium ${
                                                item.type === 'comment' 
                                                ? 'bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-600 mt-2 inline-block' 
                                                : 'text-slate-400 italic'
                                            }`}>
                                                {item.content}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* --- Right Column: Sidebar (4 cols) --- */}
                <div className="xl:col-span-4 space-y-6 sticky top-6">
                    
                    {/* People Card */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-2xl shadow-slate-200/50">
                        {/* ... People content ... */}
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Users size={16} /> People
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {taskData.assignedBy && (
                                    <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-white shadow-md overflow-hidden mb-3">
                                            {taskData.assignedByImg ? <img src={taskData.assignedByImg} alt="" className="w-full h-full object-cover" /> : <User size={20} className="m-auto text-slate-300" />}
                                        </div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Assigned By</p>
                                        <p className="text-xs font-bold text-slate-800 line-clamp-1">{taskData.assignedBy}</p>
                                    </div>
                                )}
                                {taskData.createdBy && (
                                    <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-white shadow-md overflow-hidden mb-3">
                                            {taskData.createdByImg ? <img src={taskData.createdByImg} alt="" className="w-full h-full object-cover" /> : <PenTool size={20} className="m-auto text-slate-300" />}
                                        </div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Created By</p>
                                        <p className="text-xs font-bold text-slate-800 line-clamp-1">{taskData.createdBy}</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-slate-100 mt-2">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Collaborators</p>
                                    <span className="text-[10px] font-bold text-slate-300">{taskData.collaborators?.length || 0} Active</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    {taskData.collaborators && taskData.collaborators.length > 0 && (
                                        <div className="flex -space-x-3 overflow-hidden p-1">
                                            {taskData.collaborators.map((collab, i) => (
                                                <div key={i} className="relative inline-block h-10 w-10 rounded-full ring-2 ring-white shadow-md transition-transform hover:scale-110 hover:z-10 cursor-default" title={collab.name}>
                                                    {collab.img ? (
                                                        <img src={collab.img} alt={collab.name} className="h-full w-full rounded-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">{collab.name.charAt(0)}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="relative">
                                        <button 
                                            onClick={() => setIsAddCollabOpen(!isAddCollabOpen)}
                                            className={`h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50 transition-all ${(!taskData.collaborators || taskData.collaborators.length === 0) ? 'w-full gap-2 px-4' : 'w-10'}`}
                                        >
                                            <Plus size={16} strokeWidth={3} />
                                            {(!taskData.collaborators || taskData.collaborators.length === 0) && <span className="text-xs font-bold">Add Collaborator</span>}
                                        </button>
                                        
                                        {isAddCollabOpen && (
                                            <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                                {/* ... collab dropdown ... */}
                                                <div className="flex justify-between items-center px-3 py-2 border-b border-slate-50 mb-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Select Team Member</span>
                                                    <button onClick={() => setIsAddCollabOpen(false)}><X size={14} className="text-slate-400 hover:text-slate-600" /></button>
                                                </div>
                                                <div className="px-2 pb-2">
                                                    <div className="relative">
                                                        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <input 
                                                            type="text" 
                                                            placeholder="Search..." 
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-1.5 pl-7 pr-2 text-xs font-bold text-slate-600 outline-none focus:ring-1 focus:ring-indigo-100"
                                                            value={collabSearch}
                                                            onChange={(e) => setCollabSearch(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-48 overflow-y-auto">
                                                    {AVAILABLE_STAFF
                                                        .filter(staff => staff.name.toLowerCase().includes(collabSearch.toLowerCase()))
                                                        .map(staff => (
                                                        <button 
                                                            key={staff.name}
                                                            onClick={() => handleAddCollaborator(staff)}
                                                            className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                                                        >
                                                            <img src={staff.img} className="w-8 h-8 rounded-full border border-slate-100" alt={staff.name} />
                                                            <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600">{staff.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Info Card */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-2xl shadow-slate-200/50">
                        {/* ... Timeline content ... */}
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Clock size={16} /> Timeline
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 transition-transform hover:scale-[1.02]">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Created On</p>
                                    <p className="text-sm font-bold text-slate-800">{taskData.createdAt}</p>
                                </div>
                            </div>

                            <div className="relative group overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/30 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-100 hover:border-indigo-200">
                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-500 border border-indigo-50 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md transition-all duration-300 ease-out">
                                        <Calendar size={22} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 relative z-10">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5 group-hover:text-indigo-600 transition-colors">Due Date</p>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                value={taskData.dueDate} 
                                                onChange={handleDateChange}
                                                className="bg-transparent text-sm font-bold text-indigo-950 outline-none cursor-pointer w-full z-10 relative opacity-0 absolute inset-0"
                                            />
                                            <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">{taskData.dueDate}</p>
                                        </div>
                                    </div>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 border border-indigo-100">
                                            <PenTool size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 size={16} className="text-slate-400" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{progressPercentage}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-indigo-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button 
                            onClick={handleMarkComplete}
                            className={`w-full py-4 rounded-3xl text-xs font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 transform active:scale-95 ${
                                taskData.status === 'Completed' 
                                ? 'bg-emerald-500 text-white cursor-default shadow-emerald-200 hover:shadow-emerald-200 hover:scale-100' 
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-xl hover:shadow-emerald-200'
                            }`}
                            disabled={taskData.status === 'Completed'}
                        >
                            {taskData.status === 'Completed' ? (
                                <>
                                    <div className="p-1 bg-white/20 rounded-full"><CheckCircle2 size={16} /></div>
                                    TASK COMPLETED
                                </>
                            ) : (
                                <>
                                    <div className="p-1 bg-white/20 rounded-full"><Check size={16} /></div> 
                                    Mark as Complete
                                </>
                            )}
                        </button>
                        
                        <button 
                            onClick={handleArchive}
                            className={`w-full py-4 border-2 rounded-3xl text-xs font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95 ${
                                progressPercentage === 100 
                                ? 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 hover:shadow-md' 
                                : 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                            disabled={progressPercentage !== 100 || taskData.isArchived}
                            title={progressPercentage !== 100 ? "Task must be 100% complete to archive" : "Archive Task"}
                        >
                            {taskData.isArchived ? (
                                <>
                                    <Archive size={16} className="text-emerald-500" /> Archived
                                </>
                            ) : (
                                <>
                                    <Archive size={16} /> Archive Task
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailPage;

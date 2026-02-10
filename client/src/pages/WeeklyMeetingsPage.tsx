
import React, { useState, useEffect, useMemo, useRef } from 'react';
import TopBar from '../components/TopBar';
import {
  Calendar, Clock, Users, Search, Plus, MoreHorizontal, 
  CheckCircle2, Circle, GripVertical, Trash2, CornerDownRight, 
  ArrowRight, FileText, Zap, Copy, Sparkles, ChevronDown,
  CalendarDays, MapPin, Video, Save, RotateCcw, User, X,
  CheckSquare, Filter, ExternalLink, AlignLeft, Link as LinkIcon,
  PlayCircle, MinusCircle, Edit3, Info, ChevronRight, Check,
  MessageSquare, Bold, Italic, Underline, List, ListOrdered,
  FileDown, LayoutTemplate, Share2, Download, AlertCircle, Archive,
  ArrowRight as ArrowRightIcon
} from 'lucide-react';
import { CreateSelectionModal, NewTaskModal } from '../components/TaskCreationModals';

// --- Types ---

type MeetingStatus = 'Upcoming' | 'Completed' | 'Overdue' | 'Draft';
type AgendaStatus = 'todo' | 'in-progress' | 'done';
type Priority = 'High' | 'Medium' | 'Low';
type MinutesStatus = 'Draft' | 'Issued' | 'Confirmed';

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  role: 'Organizer' | 'Required' | 'Optional';
}

interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  status: AgendaStatus;
  duration?: number; // minutes
}

interface Subtask {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Done' | 'Completed' | 'Cancelled';
  owner?: string;
  completedBy?: string;
  cancelledBy?: string;
}

interface Activity {
  id: string;
  user: string;
  userImg: string;
  action: string;
  content?: string;
  timestamp: string;
  type: 'system' | 'comment';
}

interface ActionItem {
  id: string;
  taskId?: string; // Link to Task Portal
  title: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: 'Open' | 'Done';
  progress?: number; // Percentage 0-100
  subtasks?: Subtask[];
  completedBy?: string;
  activity?: Activity[];
}

interface SuggestedTask {
  id: string;
  title: string;
  tag: string; // Team or Agenda Item
  owner: string; // Assignee
  assigner: string; // Assigner
  dueDate: string;
  priority: Priority;
  status?: 'Pending' | 'Archived';
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  weekLabel: string; // e.g. "Week 51"
  status: MeetingStatus;
  minutesStatus: MinutesStatus; // Workflow status for minutes
  attendees: Attendee[];
  agenda: AgendaItem[];
  actionItems: ActionItem[];
  suggestedTasks: SuggestedTask[];
  notes: string; // Summary Text
  fathomLink?: string;
  summarySyncStatus?: string;
  summaryLastUpdated?: string;
}

interface WeeklyMeetingsPageProps {
  onNavigate?: (page: string, id?: string) => void;
  initialMeetingId?: string;
}

// --- Mock Data ---

const ALL_STAFF = [
  { id: 's1', name: 'Jack Ho', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 's2', name: 'Edrian Pardillo', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 's3', name: 'Dzung Nguyen', avatar: 'https://i.pravatar.cc/150?img=68' },
  { id: 's4', name: 'Quoc Duong', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 's5', name: 'Steven Leuta', avatar: 'https://i.pravatar.cc/150?img=69' },
  { id: 's6', name: 'Kimberly Cuaresma', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 's7', name: 'Dave Agcaoili', avatar: 'https://i.pravatar.cc/150?img=60' },
  { id: 's8', name: 'Rengie Ann Argana', avatar: 'https://i.pravatar.cc/150?img=42' },
  { id: 's9', name: 'Angelo Encabo', avatar: 'https://i.pravatar.cc/150?img=53' },
  { id: 's10', name: 'Jamielah Macadato', avatar: 'https://i.pravatar.cc/150?img=36' },
  { id: 's11', name: 'Gregory Christ', avatar: 'https://i.pravatar.cc/150?img=51' },
  { id: 's12', name: 'Patrick Cuaresma', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 's13', name: 'Jerald Aben', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 's14', name: 'John Christian Perez', avatar: 'https://i.pravatar.cc/150?img=59' },
  { id: 's15', name: 'Rina Aquino', avatar: 'https://i.pravatar.cc/150?img=41' },
  { id: 's16', name: 'Regina De Los Reyes', avatar: 'https://i.pravatar.cc/150?img=43' },
  { id: 's17', name: 'Camille Centeno', avatar: 'https://i.pravatar.cc/150?img=44' },
  { id: 's18', name: 'Rean Aquino', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 's19', name: 'Jennifer Espalmado', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: 's20', name: 'Angelica De Castro', avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: 's21', name: 'Anamie Rance', avatar: 'https://i.pravatar.cc/150?img=35' },
  { id: 's22', name: 'Ian Joseph Larinay', avatar: 'https://i.pravatar.cc/150?img=52' },
  { id: 's23', name: 'Nexierose Baluyot', avatar: 'https://i.pravatar.cc/150?img=24' },
  { id: 's24', name: 'Danilo Jr de la Cruz', avatar: 'https://i.pravatar.cc/150?img=55' },
  { id: 's25', name: 'Daniel Venus', avatar: 'https://i.pravatar.cc/150?img=54' },
  { id: 's26', name: 'Georgie Mercado', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 's28', name: 'Joahna Marie Pios', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 's29', name: 'Rica Galit', avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: 's30', name: 'Ariel Monsalud', avatar: 'https://i.pravatar.cc/150?img=57' },
  { id: 's31', name: 'Myra Manalac', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 's32', name: 'Lachlan Volpes', avatar: 'https://i.pravatar.cc/150?img=70' },
];

// Helper to generate attendees list
const getAttendees = (count: number) => ALL_STAFF.slice(0, count).map(s => ({
    id: s.id, name: s.name, avatar: s.avatar, role: 'Required' as const
}));

const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'MTG-2025-W51-OPS',
    title: 'Operations Weekly Meeting',
    date: '2025-12-18', 
    startTime: '10:00',
    endTime: '11:00',
    location: 'Boardroom 1',
    weekLabel: 'Week 51',
    status: 'Completed',
    minutesStatus: 'Confirmed',
    summarySyncStatus: 'Synced 15m ago',
    summaryLastUpdated: '11:05 AM',
    notes: `Purpose: Review team performance and address operational challenges, with focus on process gaps, rework, templates, and communication.

# 1. Key Takeaways
Process gaps are causing rework and lost capacity
Draft drawings, missing content lists, incomplete plans, and uncontrolled revisions (e.g. PCE → DCR) are creating significant unbilled rework.
New policies will better protect scope and time.

# 2. Process Gaps & Rework Drivers
**2.1 Draft Drawings & Document Status**
Problem: Jobs are being completed on draft drawings, then final plans arrive, forcing rework.
Decision:
- CSRs must confirm at quoting/acceptance stage whether drawings are final or draft.
- If draft, obtain written client approval to proceed and flag that major changes may incur a revision fee.

# 3. Template & Process Standardisation
**3.1 POQ Template (Trade → Level → Sub-scope)**
Current state: Detailed breakdown is too slow for simple jobs.
Decision: Schedule a meeting (Jack + TLs + Greg) to finalise a single, company-wide POQ structure for 2026.`,
    fathomLink: 'https://fathom.video/share/demo-link',
    attendees: getAttendees(8), 
    agenda: [
      { id: 'a1', title: 'Review Week 50 KPIs', status: 'done', owner: 'Jack Ho', duration: 10 },
      { id: 'a2', title: 'Bondi Project Structural Issues', status: 'in-progress', description: 'Discuss discrepancies in 3D model vs site', owner: 'Edrian Pardillo', duration: 20 },
      { id: 'a3', title: 'Resource Planning Jan 2026', status: 'todo', owner: 'Quoc Duong', duration: 15 }
    ],
    suggestedTasks: [
        { 
            id: 'sug-1', 
            title: 'Schedule follow-up with structural engineer re: Bondi', 
            tag: 'Agenda 2', 
            owner: '', 
            assigner: 'Jack Ho',
            dueDate: '', 
            priority: 'High',
            status: 'Pending'
        },
        { 
            id: 'sug-2', 
            title: 'Review Q1 resource allocation report', 
            tag: 'Agenda 3', 
            owner: 'Quoc Duong', 
            assigner: 'Jack Ho',
            dueDate: '2025-12-20', 
            priority: 'Medium',
            status: 'Pending' 
        },
        { 
            id: 'sug-3', 
            title: 'Update POQ template for simple jobs', 
            tag: 'Process', 
            owner: 'Jack Ho', 
            assigner: 'Quoc Duong',
            dueDate: '2025-12-24', 
            priority: 'Low',
            status: 'Pending'
        }
    ],
    actionItems: [
        { 
            id: 'ac1', 
            taskId: 'T-101', 
            title: 'Update masonry rates in Master DB', 
            owner: 'Quoc Duong', 
            dueDate: '18/12/2025', 
            priority: 'High', 
            status: 'Open', 
            progress: 45,
            subtasks: [
                { id: 'st-101-1', title: 'Review new supplier price list (PDF)', status: 'Done', completedBy: 'Quoc Duong' },
                { id: 'st-101-2', title: "Update 'Common Brick' supply rate", status: 'In Progress', owner: 'Quoc Duong' },
                { id: 'st-101-3', title: "Update 'Face Brick' supply rate", status: 'Open', owner: 'Quoc Duong' }
            ],
            activity: [
                { id: 'act-1', user: 'Quoc Duong', userImg: 'https://i.pravatar.cc/150?img=11', action: 'commented', content: 'Supplier confirmed new rates valid from Jan 1st', timestamp: '1 day ago', type: 'comment' }
            ]
        },
        { 
            id: 'ac2', 
            taskId: 'T-102', 
            title: 'Review Bondi 3D structural discrepancies', 
            owner: 'Jack Ho', 
            dueDate: '20/12/2025', 
            priority: 'Medium', 
            status: 'Open', 
            progress: 67, 
            subtasks: [
                { id: 'st-102-1', title: 'Download latest rev', status: 'Done' },
                { id: 'st-102-2', title: 'Cross check', status: 'In Progress' }
            ],
            activity: []
        },
        {
            id: 'ac3',
            taskId: 'T-401',
            title: 'Finalize Jan 2026 leave schedule',
            owner: 'Jack Ho',
            dueDate: '15/12/2025',
            priority: 'Medium',
            status: 'Done',
            progress: 100,
            subtasks: [
                { id: 'st-401-1', title: 'Collect leave requests', status: 'Done' },
                { id: 'st-401-2', title: 'Update calendar', status: 'Done' }
            ]
        },
        {
            id: 'ac4',
            taskId: 'T-501',
            title: 'Prepare Q1 2026 Hiring Plan',
            owner: 'Kimberly Cuaresma',
            dueDate: '15/01/2026',
            priority: 'Low',
            status: 'Open',
            progress: 25,
            subtasks: [
                { id: 'st-501-1', title: 'Review current capacity utilization reports', status: 'Done' },
                { id: 'st-501-2', title: 'Forecast lead volume for Q1 2026', status: 'In Progress' },
                { id: 'st-501-3', title: 'Draft job descriptions for Junior QS role', status: 'Open' },
                { id: 'st-501-4', title: 'Calculate budget impact for 2 new hires', status: 'Open' }
            ]
        },
        {
            id: 'ac5',
            taskId: 'T-502',
            title: 'Vendor Risk Assessment for New Steel Supplier',
            owner: 'Dave Agcaoili',
            dueDate: '19/12/2025',
            priority: 'High',
            status: 'Open',
            progress: 75,
            subtasks: [
                { id: 'st-502-1', title: "Collect financial statements from 'MetalWorks Pty Ltd'", status: 'Done' },
                { id: 'st-502-2', title: 'Verify ISO 9001 certification validity', status: 'Done' },
                { id: 'st-502-3', title: 'Check reference projects with 2 existing clients', status: 'In Progress' },
                { id: 'st-502-4', title: 'Finalize risk score in procurement matrix', status: 'Open' }
            ]
        }
    ]
  },
  {
    id: 'MTG-2025-W51-PROD',
    title: 'Weekly Production Sync',
    date: '2025-12-16', 
    startTime: '14:00', 
    endTime: '15:00',
    location: 'Google Meet',
    weekLabel: 'Week 51',
    status: 'Completed', 
    minutesStatus: 'Issued',
    notes: 'Brief summary.',
    attendees: getAttendees(5), 
    agenda: [],
    actionItems: [
        {
            id: 'ac-prod-1',
            taskId: 'T-304',
            title: 'Clean up redundant SF opportunity fields',
            owner: 'Jack Ho',
            dueDate: '22/12/2025',
            priority: 'Low',
            status: 'Open',
            progress: 40,
            subtasks: [
                { id: 'st-304-1', title: 'Audit Opportunity object for unused text fields', status: 'Done' },
                { id: 'st-304-2', title: 'Backup data from "Legacy Notes" field', status: 'In Progress' },
                { id: 'st-304-3', title: 'Remove "Internal Comments" from main Page Layout', status: 'Open' },
                { id: 'st-304-4', title: 'Verify integration scripts do not rely on "Old Description"', status: 'Open' }
            ]
        },
        {
            id: 'ac-prod-2',
            taskId: 'T-601',
            title: 'Investigate slow report generation for large commercial jobs',
            owner: 'Jack Ho',
            dueDate: '20/12/2025',
            priority: 'High',
            status: 'Open',
            progress: 50,
            subtasks: [
                { id: 'st-601-1', title: 'Reproduce timeout with test large project', status: 'Done' },
                { id: 'st-601-2', title: 'Analyze PDF generation service logs', status: 'In Progress' },
                { id: 'st-601-3', title: 'Optimize SQL query for line items fetch', status: 'Open' },
                { id: 'st-601-4', title: 'Increase timeout threshold in load balancer', status: 'Open' }
            ]
        },
        {
            id: 'ac-prod-3',
            taskId: 'T-602',
            title: 'Sync new template changes to standard library',
            owner: 'Angelo Encabo',
            dueDate: '16/12/2025',
            priority: 'Medium',
            status: 'Done',
            progress: 100,
            subtasks: [
                { id: 'st-602-1', title: 'Upload V2.4 template to SharePoint', status: 'Done' },
                { id: 'st-602-2', title: 'Update master index in Salesforce', status: 'Done' },
                { id: 'st-602-3', title: 'Notify consulting team via Slack', status: 'Done' },
                { id: 'st-602-4', title: 'Archive V2.3 templates', status: 'Done' }
            ]
        }
    ],
    suggestedTasks: []
  },
  {
    id: 'MTG-2025-W52-OPS',
    title: 'Operations Weekly Meeting',
    date: '2025-12-24', 
    startTime: '10:00',
    endTime: '11:00',
    location: 'Boardroom 1',
    weekLabel: 'Week 52',
    status: 'Upcoming', 
    minutesStatus: 'Draft',
    notes: '',
    attendees: getAttendees(7), 
    agenda: [],
    actionItems: [
        {
            id: 'ac-ops-52-1',
            taskId: 'T-701',
            title: 'Draft agenda for Year End Review',
            owner: 'Jack Ho',
            dueDate: '24/12/2025',
            priority: 'Medium',
            status: 'Open',
            progress: 33,
            subtasks: [
                { id: 'st-701-1', title: 'Review 2025 KPI performance reports', status: 'Open' },
                { id: 'st-701-2', title: 'Collect department head feedback on 2026 goals', status: 'Open' },
                { id: 'st-701-3', title: 'Book venue for team lunch', status: 'Done' }
            ]
        }
    ],
    suggestedTasks: []
  }
];

// --- Sub Components ---

const StatusBadge = ({ status }: { status: MeetingStatus }) => {
  const styles = {
    Upcoming: 'bg-indigo-50 text-indigo-600 border-indigo-100', // Scheduled style
    Completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Overdue: 'bg-red-50 text-red-600 border-red-100',
    Draft: 'bg-gray-50 text-gray-500 border-gray-200'
  };
  const label = status === 'Upcoming' ? 'SCHEDULED' : status.toUpperCase();
  return (
    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${styles[status]}`}>
      {label}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const styles = {
        High: 'text-red-600 bg-red-50',
        Medium: 'text-orange-600 bg-orange-50',
        Low: 'text-gray-600 bg-gray-50'
    };
    return <span className={`text-[9px] font-bold px-1.5 rounded ${styles[priority]}`}>{priority}</span>
}

const AgendaStatusIndicator = ({ status, onClick }: { status: AgendaStatus; onClick: (e: React.MouseEvent) => void }) => {
  let icon = <Circle size={14} className="text-gray-400" />;
  let label = "Not Discussed";
  let style = "bg-gray-100 text-gray-500 border-gray-200";

  if (status === 'done') {
    icon = <CheckCircle2 size={14} className="text-green-600" />;
    label = "Discussed";
    style = "bg-green-50 text-green-700 border-green-200";
  }

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide transition-all hover:opacity-80 ${style}`}
      title="Click to toggle status"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// --- Main Page Component ---

const WeeklyMeetingsPage: React.FC<WeeklyMeetingsPageProps> = ({ onNavigate, initialMeetingId }) => {
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [selectedId, setSelectedId] = useState<string | null>(initialMeetingId || meetings[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAddAttendeeOpen, setIsAddAttendeeOpen] = useState(false);
  const [attendeeSearch, setAttendeeSearch] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [suggestedTaskTab, setSuggestedTaskTab] = useState<'Pending' | 'Archived'>('Pending');
  
  // Agenda Edit State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempOwner, setTempOwner] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // Subtask Expanded State
  const [expandedActionIds, setExpandedActionIds] = useState<Set<string>>(new Set());

  // Task Creation Modal State
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const activeMeeting = useMemo(() => meetings.find(m => m.id === selectedId), [meetings, selectedId]);

  useEffect(() => {
    if (initialMeetingId) setSelectedId(initialMeetingId);
  }, [initialMeetingId]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 600);
    return () => clearTimeout(timer);
  }, [meetings]);

  useEffect(() => {
    if (editingItemId && editInputRef.current) editInputRef.current.focus();
  }, [editingItemId]);

  const handleUpdateMeeting = (field: keyof Meeting, value: any) => {
    if (!selectedId) return;
    setMeetings(prev => prev.map(m => m.id === selectedId ? { ...m, [field]: value } : m));
  };

  const handleAddAttendee = (staff: typeof ALL_STAFF[0]) => {
    if (!activeMeeting) return;
    if (activeMeeting.attendees.some(a => a.name === staff.name)) {
        setIsAddAttendeeOpen(false);
        return;
    }
    const newAttendee: Attendee = { id: `att-${Date.now()}`, name: staff.name, role: 'Optional', avatar: staff.avatar };
    handleUpdateMeeting('attendees', [...activeMeeting.attendees, newAttendee]);
    setIsAddAttendeeOpen(false);
    setAttendeeSearch('');
  };

  // --- Suggested Tasks Logic ---
  const handleUpdateSuggestedTask = (id: string, field: keyof SuggestedTask, value: string) => {
      if (!activeMeeting) return;
      const updatedTasks = activeMeeting.suggestedTasks.map(t => t.id === id ? { ...t, [field]: value } : t);
      handleUpdateMeeting('suggestedTasks', updatedTasks);
  };

  const handleApproveTask = (id: string) => {
      if (!activeMeeting) return;
      const task = activeMeeting.suggestedTasks.find(t => t.id === id);
      if (!task) return;

      // Validation
      if (!task.owner || !task.dueDate) {
          alert('Please assign an owner and due date before approving.');
          return;
      }

      // Move to Action Items
      const newAction: ActionItem = {
          id: `ac-${Date.now()}`,
          taskId: `T-NEW-${Math.floor(Math.random() * 1000)}`, // Simulate link creation
          title: task.title,
          owner: task.owner,
          dueDate: task.dueDate,
          priority: task.priority,
          status: 'Open',
          progress: 0,
          subtasks: [],
          activity: []
      };

      const remainingSuggested = activeMeeting.suggestedTasks.filter(t => t.id !== id);
      
      setMeetings(prev => prev.map(m => {
          if (m.id === activeMeeting.id) {
              return {
                  ...m,
                  suggestedTasks: remainingSuggested,
                  actionItems: [newAction, ...m.actionItems]
              };
          }
          return m;
      }));
  };

  const handleArchiveTask = (id: string) => {
      if (!activeMeeting) return;
      const updatedTasks = activeMeeting.suggestedTasks.map(t => 
          t.id === id ? { ...t, status: 'Archived' as const } : t
      );
      handleUpdateMeeting('suggestedTasks', updatedTasks);
  };

  const handleRestoreTask = (id: string) => {
      if (!activeMeeting) return;
      const updatedTasks = activeMeeting.suggestedTasks.map(t => 
          t.id === id ? { ...t, status: 'Pending' as const } : t
      );
      handleUpdateMeeting('suggestedTasks', updatedTasks);
  };

  // --- Action Items Logic ---
  const toggleActionExpand = (id: string) => {
      setExpandedActionIds(prev => {
          const newSet = new Set(prev);
          if (newSet.has(id)) newSet.delete(id);
          else newSet.add(id);
          return newSet;
      });
  };

  // --- Agenda Logic (Simplified for brevity as no changes requested there) ---
  const handleStartEdit = (item: AgendaItem) => { setEditingItemId(item.id); setTempTitle(item.title); setTempOwner(item.owner || 'Unassigned'); };
  const handleSaveEdit = () => { if (editingItemId && activeMeeting) { const updated = activeMeeting.agenda.map(item => item.id === editingItemId ? { ...item, title: tempTitle, owner: tempOwner } : item); handleUpdateMeeting('agenda', updated); setEditingItemId(null); }};
  const handleCancelEdit = () => setEditingItemId(null);
  const handleCycleStatus = (itemId: string) => { if (!activeMeeting) return; const updated = activeMeeting.agenda.map(item => item.id === itemId ? { ...item, status: item.status === 'done' ? 'todo' : 'done' as AgendaStatus } : item); handleUpdateMeeting('agenda', updated); };
  const handleAddAgendaItem = () => { if (!activeMeeting) return; const newItem: AgendaItem = { id: `agenda-${Date.now()}`, title: '', status: 'todo', owner: 'Unassigned', duration: 15 }; handleUpdateMeeting('agenda', [...activeMeeting.agenda, newItem]); setEditingItemId(newItem.id); setTempTitle(''); setTempOwner('Unassigned'); };
  const handleDeleteAgendaItem = (itemId: string) => { if (!activeMeeting) return; handleUpdateMeeting('agenda', activeMeeting.agenda.filter(i => i.id !== itemId)); };
  
  const groupedMeetings = useMemo<Record<string, Meeting[]>>(() => {
    const groups: Record<string, Meeting[]> = {};
    meetings.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).forEach(m => { if (!groups[m.weekLabel]) groups[m.weekLabel] = []; groups[m.weekLabel].push(m); });
    return groups;
  }, [meetings, searchQuery]);

  const availableToAdd = useMemo(() => { if (!activeMeeting) return []; return ALL_STAFF.filter(s => !activeMeeting.attendees.some(att => att.name === s.name) && s.name.toLowerCase().includes(attendeeSearch.toLowerCase())); }, [activeMeeting, attendeeSearch]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar title="Weekly Meetings" subtitle="Team Syncs" description="Plan, run, and track weekly operating meetings." />

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[320px] xl:w-[380px] flex flex-col border-r border-gray-200 bg-white flex-shrink-0 z-20">
            <div className="p-4 border-b border-gray-100 space-y-3">
                <div className="flex justify-between items-center"><h2 className="text-sm font-bold text-gray-800">Your Calendar</h2><button className="bg-brand-orange text-white p-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"><Plus size={16} /></button></div>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} /><input type="text" placeholder="Search meetings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none" /></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(groupedMeetings).map(([week, groupMeetings]) => (
                    <div key={week}>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1"><CalendarDays size={12} /> {week}</div>
                        <div className="space-y-3">
                            {(groupMeetings as Meeting[]).map(m => (
                                <button key={m.id} onClick={() => setSelectedId(m.id)} className={`w-full text-left p-4 rounded-xl border transition-all group relative overflow-hidden ${selectedId === m.id ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-50' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'}`}>
                                    {selectedId === m.id && <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r-full"></div>}
                                    <div className="flex justify-between items-start mb-2 pl-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span><StatusBadge status={m.status} /></div>
                                    <div className="pl-2"><h3 className={`text-sm font-bold mb-2 truncate ${selectedId === m.id ? 'text-gray-900' : 'text-gray-700'}`}>{m.title}</h3><div className="flex items-center gap-4 text-xs text-gray-500"><div className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /><span className="font-medium">{m.startTime}</span></div><div className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" /><span className="font-medium">{m.attendees.length}</span></div></div></div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* MAIN CONTENT */}
        {activeMeeting ? (
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center justify-between px-8 py-2 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-3 text-xs text-gray-500"><span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200"><User size={12} className="text-gray-400" /> Facilitator: <span className="font-bold text-gray-700">Jack Ho</span></span><span className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${isSaving ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'}`}>{isSaving ? <RotateCcw size={12} className="animate-spin" /> : <CheckCircle2 size={12} />} <span className="font-medium">{isSaving ? 'Saving...' : 'All changes saved'}</span></span></div>
                        <div className="flex items-center gap-2"><button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm"><Sparkles size={12} /> AI Summary</button></div>
                    </div>
                    <div className="px-8 py-6">
                        <input type="text" value={activeMeeting.title} onChange={(e) => handleUpdateMeeting('title', e.target.value)} className="text-3xl font-black text-gray-900 w-full bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300 mb-4" placeholder="Meeting Title" />
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"><Calendar size={14} className="text-gray-400" /><span className="font-medium">{activeMeeting.date}</span></div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"><Clock size={14} className="text-gray-400" /><span className="font-medium">{activeMeeting.startTime} - {activeMeeting.endTime}</span></div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"><MapPin size={14} className="text-gray-400" /><span className="font-medium">{activeMeeting.location}</span></div>
                        </div>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1920px] mx-auto w-full">
                    {/* LEFT COLUMN: Agenda & Actions */}
                    <div className="space-y-6">
                        {/* Agenda */}
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <div><h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> Meeting Agenda</h3><p className="text-[10px] text-gray-400 mt-0.5">Topics to discuss</p></div>
                                <button onClick={handleAddAgendaItem} className="text-xs font-bold text-white bg-brand-orange hover:bg-orange-600 flex items-center gap-1 px-4 py-1.5 rounded-md transition-colors shadow-sm"><Plus size={14} /> Add Item</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activeMeeting.agenda.map((item, index) => (
                                    <div key={item.id} className={`group hover:bg-blue-50/30 transition-colors ${editingItemId === item.id ? 'bg-blue-50/50' : ''}`}>
                                        <div className="flex items-start gap-3 p-3 pl-4">
                                            <div className="pt-2.5 cursor-grab text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"><GripVertical size={14} /></div>
                                            <div className="mt-1.5 flex-shrink-0"><AgendaStatusIndicator status={item.status} onClick={() => handleCycleStatus(item.id)} /></div>
                                            <div className="flex-1 min-w-0 pt-1.5">
                                                {editingItemId === item.id ? (
                                                    <div className="flex flex-col gap-2 animate-in fade-in duration-200" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) handleSaveEdit(); }}>
                                                        <input ref={editInputRef} type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') handleCancelEdit(); }} className="w-full bg-white border border-blue-300 rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-900 shadow-sm" />
                                                    </div>
                                                ) : (
                                                    <div onClick={() => handleStartEdit(item)} className="cursor-text group/text"><div className="flex items-center gap-2"><div className="text-sm font-medium text-gray-800">{item.title || <span className="text-gray-300 italic">Empty item...</span>}</div><Edit3 size={10} className="text-gray-300 opacity-0 group-hover/text:opacity-100 transition-opacity" /></div>{item.description && <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>}</div>
                                                )}
                                            </div>
                                            {editingItemId !== item.id && <div className="flex items-center gap-4 pt-1.5 pr-2">{item.owner && <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{item.owner}</span>}<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleDeleteAgendaItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button></div></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Action Items */}
                        <section>
                            <div className="flex items-center justify-between mb-4"><h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Zap size={14} /> Action Items (Approved)</h3></div>
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 w-10"></th>
                                            <th className="px-4 py-3">Task</th>
                                            <th className="px-4 py-3 w-32">Owner</th>
                                            <th className="px-4 py-3 w-28">Due Date</th>
                                            <th className="px-4 py-3 w-24">Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {activeMeeting.actionItems.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-gray-400 italic">No approved action items.</td></tr> : activeMeeting.actionItems.map(action => (
                                            <React.Fragment key={action.id}>
                                                <tr 
                                                    className={`group hover:bg-gray-50 transition-colors cursor-pointer ${expandedActionIds.has(action.id) ? 'bg-gray-50' : ''}`}
                                                    onClick={() => toggleActionExpand(action.id)}
                                                >
                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                {expandedActionIds.has(action.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                            </button>
                                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${action.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                                                {action.status === 'Done' && <CheckSquare size={10} className="text-white" />}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        <div className="flex flex-col gap-1">
                                                            {action.taskId ? (
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('task-detail', action.taskId); }} 
                                                                    className="text-left hover:text-blue-600 hover:underline flex items-center gap-1 group/link"
                                                                >
                                                                    {action.title}
                                                                    <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-blue-400" />
                                                                </button>
                                                            ) : action.title}
                                                            
                                                            {/* Progress Bar */}
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50 max-w-[120px]">
                                                                    <div 
                                                                        className="h-full bg-brand-orange rounded-full transition-all duration-500" 
                                                                        style={{ width: `${action.progress || 0}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-[9px] font-bold text-gray-400">{action.progress || 0}%</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-gray-200 text-[9px] font-bold flex items-center justify-center text-gray-600">{action.owner.charAt(0)}</div><span className="text-gray-600">{action.owner}</span></div></td>
                                                    <td className="px-4 py-3 text-gray-600 font-mono text-[11px]">{action.dueDate}</td>
                                                    <td className="px-4 py-3"><PriorityBadge priority={action.priority} /></td>
                                                </tr>
                                                
                                                {/* Expanded Content */}
                                                {expandedActionIds.has(action.id) && (
                                                    <tr className="bg-gray-50/50">
                                                        <td colSpan={5} className="px-10 py-4 border-b border-gray-100">
                                                            <div className="flex gap-8">
                                                                {/* Read-Only Subtasks */}
                                                                <div className="flex-1">
                                                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Subtasks</h4>
                                                                    {action.subtasks && action.subtasks.length > 0 ? (
                                                                        <div className="space-y-2">
                                                                            {action.subtasks.map((st, idx) => {
                                                                                const isDone = st.status === 'Done' || st.status === 'Completed';
                                                                                const isCancelled = st.status === 'Cancelled';
                                                                                const isInProgress = st.status === 'In Progress';
                                                                                
                                                                                let statusColor = "bg-gray-100 text-gray-500 border-gray-200"; // Open
                                                                                if (isDone) statusColor = "bg-green-50 text-green-700 border-green-200";
                                                                                if (isInProgress) statusColor = "bg-blue-50 text-blue-700 border-blue-200";
                                                                                if (isCancelled) statusColor = "bg-red-50 text-red-700 border-red-200";

                                                                                return (
                                                                                    <div key={idx} className="flex items-center justify-between gap-4 p-2 rounded hover:bg-white border border-transparent hover:border-gray-100 transition-colors">
                                                                                        <div className="flex items-center gap-2 text-xs text-gray-700">
                                                                                            <div className={`w-3 h-3 rounded-full border ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                                                                                            <span className={isDone || isCancelled ? 'text-gray-400 line-through' : ''}>{st.title}</span>
                                                                                        </div>
                                                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${statusColor}`}>
                                                                                            {st.status === 'Done' ? 'Completed' : st.status}
                                                                                        </span>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : <p className="text-xs text-gray-400 italic">No subtasks.</p>}
                                                                </div>

                                                                {/* Read-Only Activity */}
                                                                <div className="flex-1 border-l border-gray-200 pl-6">
                                                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Activity</h4>
                                                                    {action.activity && action.activity.length > 0 ? (
                                                                        <div className="space-y-3">
                                                                            {action.activity.map((act, idx) => (
                                                                                <div key={idx} className="flex gap-2">
                                                                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden"><img src={act.userImg} className="w-full h-full object-cover" /></div>
                                                                                    <div>
                                                                                        <p className="text-[10px] text-gray-800"><span className="font-bold">{act.user}</span> {act.action}</p>
                                                                                        {act.content && <p className="text-[10px] text-gray-600 italic">"{act.content}"</p>}
                                                                                        <p className="text-[9px] text-gray-400">{act.timestamp}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : <p className="text-xs text-gray-400 italic">No activity recorded.</p>}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </section>

                        {/* Attendees */}
                        <section>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Users size={14} /> Attendees</h3>
                            <div className="flex flex-wrap gap-4">
                                {activeMeeting.attendees.map(att => (
                                    <div key={att.id} className="flex items-center gap-3 bg-white pl-1 pr-4 py-1 rounded-full border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"><img src={att.avatar} className="w-8 h-8 rounded-full border border-white shadow-sm" /><div><p className="text-xs font-bold text-gray-800">{att.name}</p><p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{att.role}</p></div></div>
                                ))}
                                <button onClick={() => setIsAddAttendeeOpen(!isAddAttendeeOpen)} className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors"><Plus size={18} /></button>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Suggested Tasks & Summary */}
                    <div className="flex flex-col gap-6 h-full pb-6">
                        
                        {/* SUGGESTED TASKS PANEL (Main Working Area) */}
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[400px]">
                            {/* Header */}
                            <div className="px-6 pt-4 pb-0 border-b border-gray-100 bg-purple-50/30 shrink-0">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                                            <Sparkles size={14} /> Suggested Tasks
                                        </h3>
                                        <p className="text-[10px] text-gray-400 mt-0.5">AI-extracted from Fathom transcript</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setSuggestedTaskTab('Pending')}
                                        className={`pb-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all ${
                                            suggestedTaskTab === 'Pending' 
                                            ? 'text-purple-700 border-purple-600' 
                                            : 'text-gray-400 border-transparent hover:text-gray-600'
                                        }`}
                                    >
                                        Pending ({activeMeeting.suggestedTasks.filter(t => !t.status || t.status === 'Pending').length})
                                    </button>
                                    <button
                                        onClick={() => setSuggestedTaskTab('Archived')}
                                        className={`pb-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all ${
                                            suggestedTaskTab === 'Archived' 
                                            ? 'text-purple-700 border-purple-600' 
                                            : 'text-gray-400 border-transparent hover:text-gray-600'
                                        }`}
                                    >
                                        Archived ({activeMeeting.suggestedTasks.filter(t => t.status === 'Archived').length})
                                    </button>
                                </div>
                            </div>

                            {/* Task List */}
                            <div className="flex-1 overflow-y-auto p-0">
                                {activeMeeting.suggestedTasks.filter(t => suggestedTaskTab === 'Archived' ? t.status === 'Archived' : (!t.status || t.status === 'Pending')).length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <CheckCircle2 size={32} className="mb-2 opacity-20" />
                                        <p className="text-xs">No {suggestedTaskTab.toLowerCase()} tasks.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-50">
                                        {activeMeeting.suggestedTasks
                                            .filter(t => suggestedTaskTab === 'Archived' ? t.status === 'Archived' : (!t.status || t.status === 'Pending'))
                                            .map(task => (
                                            <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors group">
                                                <div className="flex items-start gap-3">
                                                    <div className="pt-1"><AlertCircle size={14} className="text-purple-400" /></div>
                                                    <div className="flex-1 min-w-0 space-y-3">
                                                        <input 
                                                            type="text" 
                                                            value={task.title}
                                                            onChange={(e) => {
                                                                const updated = activeMeeting.suggestedTasks.map(t => t.id === task.id ? { ...t, title: e.target.value } : t);
                                                                handleUpdateMeeting('suggestedTasks', updated);
                                                            }}
                                                            className="w-full text-sm font-medium text-gray-800 bg-transparent border-none focus:ring-0 p-0 leading-tight"
                                                            disabled={suggestedTaskTab === 'Archived'}
                                                        />
                                                        
                                                        <div className={`flex flex-wrap items-center gap-3 ${suggestedTaskTab === 'Archived' ? 'opacity-50 pointer-events-none' : ''}`}>
                                                            {/* Tag */}
                                                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                                {task.tag}
                                                            </div>

                                                            {/* Assigner */}
                                                            <div className="relative group/assigner">
                                                                <div className="absolute -top-3 left-0 text-[8px] text-gray-400 font-bold uppercase tracking-wider opacity-0 group-hover/assigner:opacity-100 transition-opacity">Assigner</div>
                                                                <select 
                                                                    value={task.assigner}
                                                                    onChange={(e) => {
                                                                        const updated = activeMeeting.suggestedTasks.map(t => t.id === task.id ? { ...t, assigner: e.target.value } : t);
                                                                        handleUpdateMeeting('suggestedTasks', updated);
                                                                    }}
                                                                    className={`appearance-none text-xs border rounded px-2 py-1 pr-6 cursor-pointer focus:outline-none focus:border-purple-500 bg-gray-50 text-gray-600 border-gray-200`}
                                                                >
                                                                    <option value="">Select Assigner</option>
                                                                    {activeMeeting.attendees.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                                                                </select>
                                                                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                            </div>

                                                            <div className="text-gray-300"><ArrowRightIcon size={12} /></div>

                                                            {/* Assignee (Owner) */}
                                                            <div className="relative group/owner">
                                                                <div className="absolute -top-3 left-0 text-[8px] text-gray-400 font-bold uppercase tracking-wider opacity-0 group-hover/owner:opacity-100 transition-opacity">Assignee</div>
                                                                <select 
                                                                    value={task.owner}
                                                                    onChange={(e) => {
                                                                        const updated = activeMeeting.suggestedTasks.map(t => t.id === task.id ? { ...t, owner: e.target.value } : t);
                                                                        handleUpdateMeeting('suggestedTasks', updated);
                                                                    }}
                                                                    className={`appearance-none text-xs border rounded px-2 py-1 pr-6 cursor-pointer focus:outline-none focus:border-purple-500 ${!task.owner ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-200 text-gray-700 bg-white'}`}
                                                                >
                                                                    <option value="">Select Assignee *</option>
                                                                    {activeMeeting.attendees.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                                                                </select>
                                                                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                            </div>

                                                            {/* Due Date */}
                                                            <div className="relative">
                                                                <input 
                                                                    type="date"
                                                                    value={task.dueDate}
                                                                    onChange={(e) => {
                                                                        const updated = activeMeeting.suggestedTasks.map(t => t.id === task.id ? { ...t, dueDate: e.target.value } : t);
                                                                        handleUpdateMeeting('suggestedTasks', updated);
                                                                    }}
                                                                    className={`text-xs border rounded px-2 py-0.5 cursor-pointer focus:outline-none focus:border-purple-500 h-[26px] ${!task.dueDate ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-200 text-gray-700 bg-white'}`}
                                                                />
                                                            </div>

                                                            {/* Priority */}
                                                            <div className="relative">
                                                                <select 
                                                                    value={task.priority}
                                                                    onChange={(e) => {
                                                                        const updated = activeMeeting.suggestedTasks.map(t => t.id === task.id ? { ...t, priority: e.target.value as Priority } : t);
                                                                        handleUpdateMeeting('suggestedTasks', updated);
                                                                    }}
                                                                    className="appearance-none text-xs border border-gray-200 rounded px-2 py-1 pr-6 bg-white text-gray-700 cursor-pointer focus:outline-none focus:border-purple-500"
                                                                >
                                                                    <option value="High">High</option>
                                                                    <option value="Medium">Medium</option>
                                                                    <option value="Low">Low</option>
                                                                </select>
                                                                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-1 opacity-100 transition-opacity">
                                                        {suggestedTaskTab === 'Pending' ? (
                                                            <>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newTask: ActionItem = {
                                                                            id: `ac-${Date.now()}`,
                                                                            taskId: `T-NEW-${Math.floor(Math.random() * 1000)}`,
                                                                            title: task.title,
                                                                            owner: task.owner,
                                                                            dueDate: task.dueDate,
                                                                            priority: task.priority,
                                                                            status: 'Open',
                                                                            progress: 0,
                                                                            subtasks: [],
                                                                            activity: [
                                                                                {
                                                                                    id: `act-${Date.now()}`,
                                                                                    user: task.assigner || 'System',
                                                                                    userImg: 'https://i.pravatar.cc/150?img=13', // Mock img
                                                                                    action: 'created task',
                                                                                    timestamp: 'Just now',
                                                                                    type: 'system'
                                                                                }
                                                                            ]
                                                                        };
                                                                        if (!task.owner || !task.dueDate) {
                                                                            alert('Please select an owner and due date.');
                                                                            return;
                                                                        }
                                                                        handleUpdateMeeting('actionItems', [newTask, ...activeMeeting.actionItems]);
                                                                        // Remove from suggested list after approval
                                                                        const remainingSuggested = activeMeeting.suggestedTasks.filter(t => t.id !== task.id);
                                                                        handleUpdateMeeting('suggestedTasks', remainingSuggested);
                                                                    }}
                                                                    className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                                                                    title="Approve & Create Task"
                                                                >
                                                                    <Check size={16} />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleArchiveTask(task.id)}
                                                                    className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                                                    title="Archive"
                                                                >
                                                                    <Archive size={16} />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleRestoreTask(task.id)}
                                                                className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                                                title="Restore to Pending"
                                                            >
                                                                <RotateCcw size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* SUMMARY CARD (Secondary/Collapsed) */}
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden shrink-0">
                           <div className="p-4 flex items-center justify-between bg-white">
                               <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 border border-green-100">
                                       <FileText size={20} />
                                   </div>
                                   <div>
                                       <h3 className="text-xs font-bold text-gray-800">Meeting Summary</h3>
                                       <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                           <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 size={10} /> {activeMeeting.summarySyncStatus || 'Synced'}</span>
                                           <span className="text-gray-300">|</span>
                                           <span>Updated {activeMeeting.summaryLastUpdated || 'Recently'}</span>
                                       </div>
                                   </div>
                               </div>
                               <div className="flex items-center gap-2">
                                   <button 
                                       onClick={() => setShowSummary(!showSummary)}
                                       className="px-3 py-1.5 border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                                   >
                                       {showSummary ? 'Hide' : 'View'}
                                   </button>
                                   <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-transparent hover:border-gray-200 rounded transition-colors">
                                       <Download size={16} />
                                   </button>
                               </div>
                           </div>
                           
                           {showSummary && (
                               <div className="px-6 pb-6 pt-0 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                   <textarea 
                                       readOnly
                                       className="w-full h-64 p-4 mt-4 bg-gray-50/50 rounded-lg text-xs text-gray-600 leading-relaxed resize-none focus:outline-none border border-gray-200 font-medium"
                                       value={activeMeeting.notes}
                                   />
                               </div>
                           )}
                        </section>

                        {/* Fathom Recording Link */}
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 shrink-0">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Video size={14} /> Fathom Recording Link
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <input 
                                            type="text" 
                                            placeholder="Paste Fathom meeting link here..."
                                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all placeholder-gray-400"
                                            value={activeMeeting.fathomLink || ''}
                                            onChange={(e) => handleUpdateMeeting('fathomLink', e.target.value)}
                                        />
                                    </div>
                                    {activeMeeting.fathomLink && (
                                        <a 
                                            href={activeMeeting.fathomLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                            title="Open Link"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-[10px] text-gray-400 pl-1">Paste the recording link here for AI analysis and transcript reference.</p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100"><Calendar size={48} className="text-gray-300" /></div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Select a Meeting</h2>
                <p className="text-gray-500 max-w-sm text-sm">Choose a meeting from the list on the left to view details, edit the agenda, or track action items.</p>
            </div>
        )}
      </main>

      <CreateSelectionModal isOpen={isSelectionModalOpen} onClose={() => setIsSelectionModalOpen(false)} onSelectTask={() => { setIsSelectionModalOpen(false); setIsNewTaskModalOpen(true); }} />
      <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} />
    </div>
  );
};

export default WeeklyMeetingsPage;

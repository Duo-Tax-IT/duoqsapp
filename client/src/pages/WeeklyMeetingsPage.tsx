
import React, { useState, useEffect, useMemo, useRef } from 'react';
import TopBar from '../components/TopBar';
import {
  Calendar, Clock, Users, Search, Plus, MoreHorizontal, 
  CheckCircle2, Circle, GripVertical, Trash2, CornerDownRight, 
  ArrowRight, FileText, Zap, Copy, Sparkles, ChevronDown,
  CalendarDays, MapPin, Video, Save, RotateCcw, User, X,
  CheckSquare, Filter, ExternalLink, AlignLeft, Link as LinkIcon,
  PlayCircle, MinusCircle, Edit3, Info
} from 'lucide-react';

// --- Types ---

type MeetingStatus = 'Upcoming' | 'Completed' | 'Overdue' | 'Draft';
type AgendaStatus = 'todo' | 'in-progress' | 'done';
type Priority = 'High' | 'Medium' | 'Low';

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

interface ActionItem {
  id: string;
  taskId?: string; // Link to Task Portal
  title: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: 'Open' | 'Done';
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
  attendees: Attendee[];
  agenda: AgendaItem[];
  actionItems: ActionItem[];
  notes: string;
  fathomLink?: string;
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
  { id: 's27', name: 'Dorothy Tumbaga', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: 's28', name: 'Joahna Marie Pios', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 's29', name: 'Rica Galit', avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: 's30', name: 'Ariel Monsalud', avatar: 'https://i.pravatar.cc/150?img=57' },
  { id: 's31', name: 'Myra Manalac', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 's32', name: 'Lachlan Volpes', avatar: 'https://i.pravatar.cc/150?img=70' },
];

const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'MTG-2025-W51-OPS',
    title: 'Operations Weekly Meeting',
    date: '2025-12-15',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Boardroom 1',
    weekLabel: 'Week 51',
    status: 'Completed',
    notes: 'Key focus on end-of-year wrapping up.',
    fathomLink: '',
    attendees: [
      { id: '1', name: 'Jack Ho', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: '2', name: 'Edrian Pardillo', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: '3', name: 'Dzung Nguyen', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=68' },
      { id: '4', name: 'Quoc Duong', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: '5', name: 'Steven Leuta', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=69' },
      { id: '6', name: 'Kimberly Cuaresma', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '7', name: 'Dave Agcaoili', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=60' },
      { id: '8', name: 'Rengie Ann Argana', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=42' },
      { id: '9', name: 'Angelo Encabo', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=53' },
      { id: '10', name: 'Jamielah Macadato', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=36' },
      { id: '11', name: 'Gregory Christ', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=51' }
    ],
    agenda: [
      { id: 'a1', title: 'Review Week 50 KPIs', status: 'done', owner: 'Jack Ho', duration: 10 },
      { id: 'a2', title: 'Bondi Project Structural Issues', status: 'in-progress', description: 'Discuss discrepancies in 3D model vs site', owner: 'Edrian Pardillo', duration: 20 },
      { id: 'a3', title: 'Resource Planning Jan 2026', status: 'todo', owner: 'Quoc Duong', duration: 15 }
    ],
    actionItems: [
        { id: 'ac1', taskId: 'T-101', title: 'Update masonry rates in Master DB', owner: 'Quoc Duong', dueDate: '2025-12-18', priority: 'High', status: 'Open' },
        { id: 'ac2', taskId: 'T-102', title: 'Review Bondi 3D structural discrepancies', owner: 'Jack Ho', dueDate: '2025-12-20', priority: 'Medium', status: 'Open' }
    ]
  },
  {
    id: 'MTG-2025-W51-PROD',
    title: 'Weekly Production Sync',
    date: '2025-12-16',
    startTime: '11:00',
    endTime: '11:30',
    location: 'Google Meet',
    weekLabel: 'Week 51',
    status: 'Upcoming',
    notes: '',
    fathomLink: '',
    attendees: [
      { id: '1', name: 'Jack Ho', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: '4', name: 'Dave Agcaoili', role: 'Required', avatar: 'https://i.pravatar.cc/150?img=60' }
    ],
    agenda: [
      { id: 'b1', title: 'Production Pipeline Review', status: 'todo', owner: 'Dave Agcaoili', duration: 15 },
      { id: 'b2', title: 'Blockers & Impediments', status: 'todo', owner: 'Jack Ho', duration: 10 }
    ],
    actionItems: []
  },
  {
    id: 'MTG-2025-W52-OPS',
    title: 'Operations Weekly Meeting',
    date: '2025-12-22',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Boardroom 1',
    weekLabel: 'Week 52',
    status: 'Upcoming',
    notes: '',
    fathomLink: '',
    attendees: [
      { id: '1', name: 'Jack Ho', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=13' }
    ],
    agenda: [],
    actionItems: []
  }
];

// --- Sub Components ---

const StatusBadge = ({ status }: { status: MeetingStatus }) => {
  const styles = {
    Upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    Completed: 'bg-green-50 text-green-700 border-green-200',
    Overdue: 'bg-red-50 text-red-700 border-red-200',
    Draft: 'bg-gray-100 text-gray-600 border-gray-200'
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${styles[status]}`}>
      {status}
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

  if (status === 'in-progress') {
    icon = <PlayCircle size={14} className="text-blue-500" />;
    label = "In Progress";
    style = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (status === 'done') {
    icon = <CheckCircle2 size={14} className="text-green-600" />;
    label = "Discussed";
    style = "bg-green-50 text-green-700 border-green-200";
  }

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide transition-all hover:opacity-80 ${style}`}
      title="Click to cycle status"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// --- Main Page Component ---

const WeeklyMeetingsPage: React.FC<WeeklyMeetingsPageProps> = ({ onNavigate, initialMeetingId }) => {
  // 1. Initialize state from LocalStorage or Mock Data
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    try {
      const saved = localStorage.getItem('duoqs_meetings_v8');
      return saved ? JSON.parse(saved) : INITIAL_MEETINGS;
    } catch (e) {
      return INITIAL_MEETINGS;
    }
  });

  const [selectedId, setSelectedId] = useState<string | null>(initialMeetingId || meetings[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAddAttendeeOpen, setIsAddAttendeeOpen] = useState(false);
  const [attendeeSearch, setAttendeeSearch] = useState('');
  
  // Agenda Edit State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempOwner, setTempOwner] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // Active Meeting
  const activeMeeting = useMemo(() => meetings.find(m => m.id === selectedId), [meetings, selectedId]);

  // --- Effects ---

  // Handle incoming deep link props
  useEffect(() => {
    if (initialMeetingId) {
        setSelectedId(initialMeetingId);
    }
  }, [initialMeetingId]);

  // Persistence with fake latency
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('duoqs_meetings_v8', JSON.stringify(meetings));
      setIsSaving(false);
    }, 600); // 600ms save delay for realism
    return () => clearTimeout(timer);
  }, [meetings]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingItemId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingItemId]);

  // --- Actions ---

  const handleUpdateMeeting = (field: keyof Meeting, value: any) => {
    if (!selectedId) return;
    setMeetings(prev => prev.map(m => 
      m.id === selectedId ? { ...m, [field]: value } : m
    ));
  };

  const handleAddAttendee = (staff: typeof ALL_STAFF[0]) => {
    if (!activeMeeting) return;
    
    // Check if already exists
    if (activeMeeting.attendees.some(a => a.name === staff.name)) {
        setIsAddAttendeeOpen(false);
        return;
    }

    const newAttendee: Attendee = {
        id: `att-${Date.now()}`,
        name: staff.name,
        role: 'Optional',
        avatar: staff.avatar
    };

    handleUpdateMeeting('attendees', [...activeMeeting.attendees, newAttendee]);
    setIsAddAttendeeOpen(false);
    setAttendeeSearch('');
  };

  // Agenda Logic
  const handleStartEdit = (item: AgendaItem) => {
    setEditingItemId(item.id);
    setTempTitle(item.title);
    setTempOwner(item.owner || 'Unassigned');
  };

  const handleSaveEdit = () => {
    if (editingItemId && activeMeeting) {
      const updatedAgenda = activeMeeting.agenda.map(item => 
        item.id === editingItemId ? { ...item, title: tempTitle, owner: tempOwner } : item
      );
      handleUpdateMeeting('agenda', updatedAgenda);
      setEditingItemId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleCycleStatus = (itemId: string) => {
    if (!activeMeeting) return;
    const updatedAgenda = activeMeeting.agenda.map(item => {
      if (item.id === itemId) {
        // Cycle: todo -> in-progress -> done -> todo
        let nextStatus: AgendaStatus = 'todo';
        if (item.status === 'todo') nextStatus = 'in-progress';
        else if (item.status === 'in-progress') nextStatus = 'done';
        
        return { ...item, status: nextStatus };
      }
      return item;
    });
    handleUpdateMeeting('agenda', updatedAgenda);
  };

  const handleAddAgendaItem = () => {
    if (!activeMeeting) return;
    const newItem: AgendaItem = {
      id: `agenda-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Stable Unique ID
      title: '',
      status: 'todo',
      owner: 'Unassigned',
      duration: 15
    };
    // Add to state
    handleUpdateMeeting('agenda', [...activeMeeting.agenda, newItem]);
    // Enter edit mode immediately
    setEditingItemId(newItem.id);
    setTempTitle('');
    setTempOwner('Unassigned');
  };

  const handleDeleteAgendaItem = (itemId: string) => {
    if (!activeMeeting) return;
    const updatedAgenda = activeMeeting.agenda.filter(i => i.id !== itemId);
    handleUpdateMeeting('agenda', updatedAgenda);
  };

  const handleCloneAgenda = () => {
    if (!activeMeeting) return;
    // Find previous meeting with content
    const prevMeeting = meetings.find(m => m.id !== activeMeeting.id && m.agenda.length > 0);
    if (prevMeeting) {
      const cloned = prevMeeting.agenda.map(item => ({
        ...item,
        id: `cloned-${Date.now()}-${Math.random()}`, // New IDs
        status: 'todo' as AgendaStatus
      }));
      handleUpdateMeeting('agenda', cloned);
    }
  };

  // Action Items Logic
  const handleToggleActionStatus = (itemId: string) => {
      if (!activeMeeting) return;
      const updatedActions = activeMeeting.actionItems.map(item =>
        item.id === itemId ? { ...item, status: item.status === 'Done' ? 'Open' : 'Done' as 'Open' | 'Done' } : item
      );
      handleUpdateMeeting('actionItems', updatedActions);
  };

  // Grouping
  const groupedMeetings = useMemo(() => {
    const groups: Record<string, Meeting[]> = {};
    meetings
      .filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .forEach(m => {
        if (!groups[m.weekLabel]) groups[m.weekLabel] = [];
        groups[m.weekLabel].push(m);
      });
    return groups;
  }, [meetings, searchQuery]);

  // Filter available staff for adding
  const availableToAdd = useMemo(() => {
    if (!activeMeeting) return [];
    return ALL_STAFF.filter(
        staff => !activeMeeting.attendees.some(att => att.name === staff.name) &&
                 staff.name.toLowerCase().includes(attendeeSearch.toLowerCase())
    );
  }, [activeMeeting, attendeeSearch]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        title="Weekly Meetings"
        subtitle="Team Syncs"
        description="Plan, run, and track weekly operating meetings."
      />

      <main className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT PANEL: Sidebar --- */}
        <div className="w-[320px] xl:w-[380px] flex flex-col border-r border-gray-200 bg-white flex-shrink-0 z-20">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-gray-800">Your Calendar</h2>
                    <button className="bg-brand-orange text-white p-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        <Plus size={16} />
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search meetings..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
                {Object.entries(groupedMeetings).map(([week, groupMeetings]) => (
                    <div key={week}>
                        <div className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center gap-2 mb-1">
                            <CalendarDays size={12} /> {week}
                        </div>
                        <div className="space-y-1">
                            {groupMeetings.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedId(m.id)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all group relative ${
                                        selectedId === m.id 
                                        ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-200' 
                                        : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1.5">
                                        <StatusBadge status={m.status} />
                                        <span className="text-[10px] text-gray-400 font-mono font-medium">{m.startTime}</span>
                                    </div>
                                    <h3 className={`text-sm font-bold truncate mb-2 ${selectedId === m.id ? 'text-blue-700' : 'text-gray-700'}`}>
                                        {m.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                        <div className="flex -space-x-1.5">
                                            {m.attendees.slice(0, 3).map(att => (
                                                <img key={att.id} src={att.avatar} className="w-5 h-5 rounded-full border border-white" alt="" />
                                            ))}
                                            {m.attendees.length > 3 && (
                                                <div className="w-5 h-5 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">
                                                    +{m.attendees.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <span>• {m.attendees.length} Attendees</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- RIGHT PANEL: Main Content --- */}
        {activeMeeting ? (
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
                
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    {/* Facilitator Bar */}
                    <div className="flex items-center justify-between px-8 py-2 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200">
                                <User size={12} className="text-gray-400" /> 
                                Facilitator: <span className="font-bold text-gray-700">Jack Ho</span>
                            </span>
                            <span className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${isSaving ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'}`}>
                                {isSaving ? <RotateCcw size={12} className="animate-spin" /> : <CheckCircle2 size={12} />} 
                                <span className="font-medium">{isSaving ? 'Saving...' : 'All changes saved'}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {activeMeeting.agenda.length === 0 && (
                                <button onClick={handleCloneAgenda} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors">
                                    <Copy size={12} /> Clone Previous Agenda
                                </button>
                            )}
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm">
                                <Sparkles size={12} /> AI Summary
                            </button>
                        </div>
                    </div>

                    {/* Title Block */}
                    <div className="px-8 py-6">
                        <input 
                            type="text"
                            value={activeMeeting.title}
                            onChange={(e) => handleUpdateMeeting('title', e.target.value)}
                            className="text-3xl font-black text-gray-900 w-full bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300 mb-4"
                            placeholder="Meeting Title"
                        />
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="font-medium">{activeMeeting.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <Clock size={14} className="text-gray-400" />
                                <span className="font-medium">{activeMeeting.startTime} - {activeMeeting.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <MapPin size={14} className="text-gray-400" />
                                <span className="font-medium">{activeMeeting.location}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1920px] mx-auto w-full">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        {/* AGENDA SECTION */}
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <div>
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <FileText size={14} /> Meeting Agenda
                                    </h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Topics to discuss</p>
                                </div>
                                <button 
                                    onClick={handleAddAgendaItem} 
                                    className="text-xs font-bold text-white bg-brand-orange hover:bg-orange-600 flex items-center gap-1 px-4 py-1.5 rounded-md transition-colors shadow-sm"
                                >
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                            
                            <div className="bg-blue-50/30 px-6 py-2 border-b border-blue-50/50 text-[10px] text-blue-600 font-medium flex items-center gap-2">
                                <Info size={12} /> Click an agenda item text to edit content. Select an attendee to assign the topic.
                            </div>

                            {activeMeeting.agenda.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                        <FileText size={24} className="text-gray-300" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-700 mb-1">Agenda is empty</h4>
                                    <p className="text-xs text-gray-500 mb-4">Start adding items or clone from a previous meeting.</p>
                                    <button onClick={handleAddAgendaItem} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 shadow-sm">
                                        Start Fresh
                                    </button>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {activeMeeting.agenda.map((item, index) => (
                                        <div 
                                            key={item.id} 
                                            className={`group hover:bg-blue-50/30 transition-colors ${editingItemId === item.id ? 'bg-blue-50/50' : ''}`}
                                        >
                                            <div className="flex items-start gap-3 p-3 pl-4">
                                                {/* Drag Handle */}
                                                <div className="pt-2.5 cursor-grab text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <GripVertical size={14} />
                                                </div>

                                                {/* Status Button */}
                                                <div className="mt-1.5 flex-shrink-0">
                                                    <AgendaStatusIndicator status={item.status} onClick={() => handleCycleStatus(item.id)} />
                                                </div>

                                                {/* Content Area */}
                                                <div className="flex-1 min-w-0 pt-1.5">
                                                    {editingItemId === item.id ? (
                                                        <div 
                                                            className="flex flex-col gap-2 animate-in fade-in duration-200"
                                                            onBlur={(e) => {
                                                                // Only save if focus leaves the container
                                                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                                                    handleSaveEdit();
                                                                }
                                                            }}
                                                        >
                                                            <input
                                                                ref={editInputRef}
                                                                type="text"
                                                                value={tempTitle}
                                                                onChange={(e) => setTempTitle(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        handleSaveEdit();
                                                                        const isLastItem = index === activeMeeting.agenda.length - 1;
                                                                        if (isLastItem) {
                                                                            handleAddAgendaItem();
                                                                        }
                                                                    }
                                                                    if (e.key === 'Escape') handleCancelEdit();
                                                                }}
                                                                className="w-full bg-white border border-blue-300 rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-900 shadow-sm"
                                                                placeholder="Enter agenda item..."
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative">
                                                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                                        <User size={12} />
                                                                    </div>
                                                                    <select
                                                                        value={tempOwner}
                                                                        onChange={(e) => setTempOwner(e.target.value)}
                                                                        className="appearance-none bg-white border border-gray-200 pl-7 pr-8 py-1 rounded-md text-xs font-bold text-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange cursor-pointer hover:bg-gray-50"
                                                                    >
                                                                        <option value="Unassigned">Unassigned</option>
                                                                        {activeMeeting.attendees.map(att => (
                                                                            <option key={att.id} value={att.name}>{att.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                </div>
                                                                <span className="text-[10px] text-gray-400 italic ml-auto">Press Enter to save</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div 
                                                            onClick={() => handleStartEdit(item)}
                                                            className="cursor-text group/text"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-sm font-medium text-gray-800">
                                                                    {item.title || <span className="text-gray-300 italic">Empty item...</span>}
                                                                </div>
                                                                <Edit3 size={10} className="text-gray-300 opacity-0 group-hover/text:opacity-100 transition-opacity" />
                                                            </div>
                                                            {item.description && (
                                                                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Metadata & Actions */}
                                                {editingItemId !== item.id && (
                                                    <div className="flex items-center gap-4 pt-1.5 pr-2">
                                                        {item.owner && (
                                                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                                                                {item.owner}
                                                            </span>
                                                        )}
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleDeleteAgendaItem(item.id)}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* ACTION ITEMS SECTION */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Zap size={14} /> Action Items
                                </h3>
                            </div>
                            
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3 w-10"></th>
                                            <th className="px-6 py-3">Task</th>
                                            <th className="px-6 py-3 w-40">Owner</th>
                                            <th className="px-6 py-3 w-32">Due Date</th>
                                            <th className="px-6 py-3 w-24">Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {activeMeeting.actionItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                                    No action items yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            activeMeeting.actionItems.map(action => (
                                                <tr key={action.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-3 text-center">
                                                        <div 
                                                            onClick={() => handleToggleActionStatus(action.id)}
                                                            className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center ${action.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                                                        >
                                                            {action.status === 'Done' && <CheckSquare size={10} className="text-white" />}
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-3 font-medium ${action.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                                        {action.taskId ? (
                                                            <button 
                                                                onClick={() => onNavigate && onNavigate('task-detail', action.taskId)}
                                                                className="text-left hover:text-blue-600 hover:underline flex items-center gap-1 group/link"
                                                            >
                                                                {action.title}
                                                                <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                            </button>
                                                        ) : (
                                                            action.title
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-gray-200 text-[9px] font-bold flex items-center justify-center text-gray-600">
                                                                {action.owner.charAt(0)}
                                                            </div>
                                                            <span className="text-gray-600">{action.owner}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 text-gray-600 font-mono text-[11px]">
                                                        {action.dueDate}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <PriorityBadge priority={action.priority} />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* ATTENDEES SECTION */}
                        <section>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Users size={14} /> Attendees
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {activeMeeting.attendees.map(att => (
                                    <div key={att.id} className="flex items-center gap-3 bg-white pl-1 pr-4 py-1 rounded-full border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                                        <img src={att.avatar} alt={att.name} className="w-8 h-8 rounded-full border border-white shadow-sm" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{att.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{att.role}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsAddAttendeeOpen(!isAddAttendeeOpen)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors"
                                        title="Add Attendee"
                                    >
                                        <Plus size={18} />
                                    </button>
                                    
                                    {isAddAttendeeOpen && (
                                        <div className="absolute bottom-full mb-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="flex justify-between items-center px-3 py-2 border-b border-gray-50 mb-1">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Add Attendee</span>
                                                <button onClick={() => setIsAddAttendeeOpen(false)}><X size={14} className="text-gray-400 hover:text-gray-600" /></button>
                                            </div>
                                            <div className="px-2 pb-2">
                                                <div className="relative">
                                                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="Search Staff..." 
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-7 pr-2 text-xs font-bold text-gray-600 outline-none focus:ring-1 focus:ring-brand-orange"
                                                        value={attendeeSearch}
                                                        onChange={(e) => setAttendeeSearch(e.target.value)}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-48 overflow-y-auto">
                                                {availableToAdd.length > 0 ? (
                                                    availableToAdd.map(staff => (
                                                        <button 
                                                            key={staff.id}
                                                            onClick={() => handleAddAttendee(staff)}
                                                            className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                                                        >
                                                            <img src={staff.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt={staff.name} />
                                                            <span className="text-xs font-bold text-gray-700 group-hover:text-brand-orange">{staff.name}</span>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-3 text-center text-xs text-gray-400 italic">No staff found</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN - NEW NOTES SECTION */}
                    <div className="flex flex-col gap-6 h-full pb-6">
                         
                         {/* Meeting Minutes - Takes available height */}
                         <section className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[400px]">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30 shrink-0">
                                <div>
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <AlignLeft size={14} /> Meeting Minutes
                                    </h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Discussion notes and outcomes</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Markdown Supported</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <textarea 
                                    className="w-full h-full p-6 resize-none focus:outline-none text-sm text-gray-700 leading-relaxed placeholder-gray-300"
                                    placeholder="Type meeting minutes here. Use markdown for formatting (e.g., # for headers, - for bullets)."
                                    value={activeMeeting.notes}
                                    onChange={(e) => handleUpdateMeeting('notes', e.target.value)}
                                />
                            </div>
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
            // Empty State
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                    <Calendar size={48} className="text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Select a Meeting</h2>
                <p className="text-gray-500 max-w-sm text-sm">Choose a meeting from the list on the left to view details, edit the agenda, or track action items.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default WeeklyMeetingsPage;

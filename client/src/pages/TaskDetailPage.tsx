
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { pageToPath } from '../utils/pageToPath';
import { 
  ArrowLeft, Calendar, CheckSquare, Clock, User, 
  MessageSquare, MoreHorizontal, Link2, CheckCircle2,
  Circle, AlertTriangle, Flag, Paperclip, Send, ChevronDown,
  Search, X
} from 'lucide-react';

interface Subtask {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  completedBy?: string;
  completedAt?: string;
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

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Open' | 'Ongoing' | 'Completed' | 'In Review';
  dueDate: string;
  createdAt: string;
  assignedBy: string;
  assignedByImg: string;
  createdBy: string;
  createdByImg: string;
  collaborators: { name: string; img: string }[];
  meeting?: string;
  meetingId?: string;
  subtasks: Subtask[];
  activity: Activity[];
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

const MOCK_TASKS: Task[] = [
  {
    id: 'T-101',
    title: 'Update masonry rates in Master DB',
    description: "Adjust the masonry rates based on the new supplier quote discussed in Week 51 Operations WIP. Ensure the '04 Masonry' category reflects the 15% increase in brick supply costs.",
    priority: 'High',
    status: 'Ongoing',
    dueDate: '18/12/2025',
    createdAt: '10/12/2025',
    assignedBy: 'Quoc Duong',
    assignedByImg: 'https://i.pravatar.cc/150?img=11',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    collaborators: [
      { name: 'Dave Agcaoili', img: 'https://i.pravatar.cc/150?img=60' }
    ],
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    subtasks: [
        { id: 'st-101-1', title: 'Review new supplier price list (PDF)', status: 'Completed', completedBy: 'Quoc Duong', completedAt: '1 day ago' },
        { id: 'st-101-2', title: "Update 'Common Brick' supply rate", status: 'In Progress' },
        { id: 'st-101-3', title: "Update 'Face Brick' supply rate", status: 'Open' },
        { id: 'st-101-4', title: "Verify 'Blockwork' rates against market average", status: 'Open' },
    ],
    activity: [
        { 
            id: 'a101-1', 
            user: 'Jack Ho', 
            userImg: 'https://i.pravatar.cc/150?img=13', 
            action: 'created task', 
            timestamp: '5 days ago', 
            type: 'system' 
        },
        { 
            id: 'a101-2', 
            user: 'Quoc Duong', 
            userImg: 'https://i.pravatar.cc/150?img=11', 
            action: 'commented', 
            content: "I've received the PDF from ABC Supplies. Will start updating today.", 
            timestamp: '2 days ago', 
            type: 'comment' 
        },
        { 
            id: 'a101-3', 
            user: 'Quoc Duong', 
            userImg: 'https://i.pravatar.cc/150?img=11', 
            action: 'completed subtask', 
            content: 'Review new supplier price list (PDF)', 
            timestamp: '1 day ago', 
            type: 'system' 
        }
    ]
  },
  {
    id: 'T-102',
    title: 'Review Bondi 3D structural discrepancies',
    description: 'Check for discrepancies in slab thickness between structural and architectural drawings as requested by Edrian in the W51 Operations Sync.',
    priority: 'Normal',
    status: 'Open',
    dueDate: '20/12/2025',
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
        { id: 'st-1', title: 'Download latest architectural set (Rev C)', status: 'Completed', completedBy: 'Edrian Pardillo', completedAt: '2 days ago' },
        { id: 'st-2', title: 'Cross reference structural engineering plans', status: 'Completed', completedBy: 'Jack Ho', completedAt: 'Just now' },
        { id: 'st-3', title: 'Identify slab thickness discrepancies on Grid A-4', status: 'In Progress' },
        { id: 'st-4', title: 'Draft RFI for client review', status: 'Cancelled' },
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
    description: 'Remove redundant fields from the Opportunity object as discussed in the Production Sync. Focus on consolidating the various "Notes" fields into a single source of truth.',
    priority: 'Low',
    status: 'Ongoing',
    dueDate: '22/12/2025',
    createdAt: '10/12/2025',
    assignedBy: 'Steven Leuta',
    assignedByImg: 'https://i.pravatar.cc/150?img=69',
    createdBy: 'Steven Leuta',
    createdByImg: 'https://i.pravatar.cc/150?img=69',
    collaborators: [
        { name: 'Angelo Encabo', img: 'https://i.pravatar.cc/150?img=53' }
    ],
    meeting: 'Weekly Production Sync',
    meetingId: 'MTG-2025-W51-PROD',
    subtasks: [
        { id: 'st-304-1', title: 'Audit Opportunity object for unused text fields', status: 'Completed', completedBy: 'Jack Ho', completedAt: '1 day ago' },
        { id: 'st-304-2', title: 'Backup data from "Legacy Notes" field', status: 'In Progress' },
        { id: 'st-304-3', title: 'Remove "Internal Comments" from main Page Layout', status: 'Open' },
        { id: 'st-304-4', title: 'Verify integration scripts do not rely on "Old Description"', status: 'Open' }
    ],
    activity: [
        {
            id: 'a304-1',
            user: 'Steven Leuta',
            userImg: 'https://i.pravatar.cc/150?img=69',
            action: 'created task',
            timestamp: '5 days ago',
            type: 'system'
        },
        {
            id: 'a304-2',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'commented',
            content: 'I found that "Internal Comments" is actually used by the old Xero integration. We need to check that first.',
            timestamp: '2 days ago',
            type: 'comment'
        },
        {
            id: 'a304-3',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'completed subtask',
            content: 'Audit Opportunity object for unused text fields',
            timestamp: '1 day ago',
            type: 'system'
        }
    ]
  },
  {
    id: 'T-501',
    title: 'Prepare Q1 2026 Hiring Plan',
    description: 'Draft the headcount requirements for Q1 based on current lead volume projections. Consider the impact of the new marketing campaign starting in February.',
    priority: 'Low',
    status: 'Open',
    dueDate: '15/01/2026',
    createdAt: '14/12/2025',
    assignedBy: 'Jack Ho',
    assignedByImg: 'https://i.pravatar.cc/150?img=13',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    collaborators: [
      { name: 'Edrian Pardillo', img: 'https://i.pravatar.cc/150?img=15' }
    ],
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    subtasks: [
        { id: 'st-501-1', title: 'Review current capacity utilization reports', status: 'Completed', completedBy: 'Kimberly Cuaresma', completedAt: '1 day ago' },
        { id: 'st-501-2', title: 'Forecast lead volume for Q1 2026', status: 'In Progress' },
        { id: 'st-501-3', title: 'Draft job descriptions for Junior QS role', status: 'Open' },
        { id: 'st-501-4', title: 'Calculate budget impact for 2 new hires', status: 'Open' }
    ],
    activity: [
        {
            id: 'a501-1',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'created task',
            timestamp: '3 days ago',
            type: 'system'
        },
        {
            id: 'a501-2',
            user: 'Kimberly Cuaresma',
            userImg: 'https://i.pravatar.cc/150?img=5',
            action: 'commented',
            content: 'I have pulled the utilization reports. We are consistently over 85% capacity in the production team.',
            timestamp: '1 day ago',
            type: 'comment'
        },
        {
            id: 'a501-3',
            user: 'Kimberly Cuaresma',
            userImg: 'https://i.pravatar.cc/150?img=5',
            action: 'completed subtask',
            content: 'Review current capacity utilization reports',
            timestamp: '1 day ago',
            type: 'system'
        }
    ]
  },
  {
    id: 'T-502',
    title: 'Vendor Risk Assessment for New Steel Supplier',
    description: 'Complete the risk matrix for the new steel supplier before we integrate their pricing. Focus on supply chain stability and quality assurance certifications.',
    priority: 'High',
    status: 'In Review',
    dueDate: '19/12/2025',
    createdAt: '14/12/2025',
    assignedBy: 'Dave Agcaoili',
    assignedByImg: 'https://i.pravatar.cc/150?img=60',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    collaborators: [],
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W51-OPS',
    subtasks: [
        { id: 'st-502-1', title: "Collect financial statements from 'MetalWorks Pty Ltd'", status: 'Completed', completedBy: 'Dave Agcaoili', completedAt: '2 days ago' },
        { id: 'st-502-2', title: 'Verify ISO 9001 certification validity', status: 'Completed', completedBy: 'Dave Agcaoili', completedAt: '1 day ago' },
        { id: 'st-502-3', title: 'Check reference projects with 2 existing clients', status: 'In Progress' },
        { id: 'st-502-4', title: 'Finalize risk score in procurement matrix', status: 'Open' }
    ],
    activity: [
        {
            id: 'a502-1',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'created task',
            timestamp: '5 days ago',
            type: 'system'
        },
        {
            id: 'a502-2',
            user: 'Dave Agcaoili',
            userImg: 'https://i.pravatar.cc/150?img=60',
            action: 'commented',
            content: 'Received their financial docs yesterday. Looks stable.',
            timestamp: '2 days ago',
            type: 'comment'
        },
        {
            id: 'a502-3',
            user: 'Dave Agcaoili',
            userImg: 'https://i.pravatar.cc/150?img=60',
            action: 'completed subtask',
            content: "Collect financial statements from 'MetalWorks Pty Ltd'",
            timestamp: '2 days ago',
            type: 'system'
        },
        {
            id: 'a502-4',
            user: 'Dave Agcaoili',
            userImg: 'https://i.pravatar.cc/150?img=60',
            action: 'completed subtask',
            content: 'Verify ISO 9001 certification validity',
            timestamp: '1 day ago',
            type: 'system'
        }
    ]
  },
  {
    id: 'T-601',
    title: 'Investigate slow report generation for large commercial jobs',
    description: 'Look into why the template generation times out for projects over $50m. Several users have reported that generating the "Detailed Cost Report" for large commercial assets results in a 504 Gateway Timeout.',
    priority: 'High',
    status: 'Open',
    dueDate: '20/12/2025',
    createdAt: '12/12/2025',
    assignedBy: 'Dave Agcaoili',
    assignedByImg: 'https://i.pravatar.cc/150?img=60',
    createdBy: 'Dave Agcaoili',
    createdByImg: 'https://i.pravatar.cc/150?img=60',
    collaborators: [
        { name: 'Angelo Encabo', img: 'https://i.pravatar.cc/150?img=53' }
    ],
    meeting: 'Weekly Production Sync',
    meetingId: 'MTG-2025-W51-PROD',
    subtasks: [
        { id: 'st-601-1', title: 'Reproduce timeout with test large project', status: 'Completed', completedBy: 'Jack Ho', completedAt: '2 days ago' },
        { id: 'st-601-2', title: 'Analyze PDF generation service logs', status: 'In Progress' },
        { id: 'st-601-3', title: 'Optimize SQL query for line items fetch', status: 'Open' },
        { id: 'st-601-4', title: 'Increase timeout threshold in load balancer', status: 'Open' }
    ],
    activity: [
        {
            id: 'a601-1',
            user: 'Dave Agcaoili',
            userImg: 'https://i.pravatar.cc/150?img=60',
            action: 'created task',
            timestamp: '5 days ago',
            type: 'system'
        },
        {
            id: 'a601-2',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'commented',
            content: 'I managed to reproduce this on the "Westfield Extension" project. The query takes 45s alone.',
            timestamp: '2 days ago',
            type: 'comment'
        },
        {
            id: 'a601-3',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'completed subtask',
            content: 'Reproduce timeout with test large project',
            timestamp: '2 days ago',
            type: 'system'
        }
    ]
  },
  {
    id: 'T-602',
    title: 'Sync new template changes to standard library',
    description: 'Ensure the V2.4 template is live for all consultants. This includes the new disclaimer text and updated logo placement.',
    priority: 'Normal',
    status: 'Completed',
    dueDate: '16/12/2025',
    createdAt: '12/12/2025',
    assignedBy: 'Jack Ho',
    assignedByImg: 'https://i.pravatar.cc/150?img=13',
    createdBy: 'Jack Ho',
    createdByImg: 'https://i.pravatar.cc/150?img=13',
    collaborators: [
        { name: 'Angelo Encabo', img: 'https://i.pravatar.cc/150?img=53' }
    ],
    meeting: 'Weekly Production Sync',
    meetingId: 'MTG-2025-W51-PROD',
    subtasks: [
        { id: 'st-602-1', title: 'Upload V2.4 template to SharePoint', status: 'Completed', completedBy: 'Angelo Encabo', completedAt: '3 days ago' },
        { id: 'st-602-2', title: 'Update master index in Salesforce', status: 'Completed', completedBy: 'Angelo Encabo', completedAt: '3 days ago' },
        { id: 'st-602-3', title: 'Notify consulting team via Slack', status: 'Completed', completedBy: 'Angelo Encabo', completedAt: '2 days ago' },
        { id: 'st-602-4', title: 'Archive V2.3 templates', status: 'Completed', completedBy: 'Jack Ho', completedAt: '2 days ago' }
    ],
    activity: [
        {
            id: 'a602-1',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'created task',
            timestamp: '5 days ago',
            type: 'system'
        },
        {
            id: 'a602-2',
            user: 'Angelo Encabo',
            userImg: 'https://i.pravatar.cc/150?img=53',
            action: 'commented',
            content: 'Uploading the new files now. Just waiting for SharePoint sync.',
            timestamp: '3 days ago',
            type: 'comment'
        },
        {
            id: 'a602-3',
            user: 'Angelo Encabo',
            userImg: 'https://i.pravatar.cc/150?img=53',
            action: 'completed subtask',
            content: 'Notify consulting team via Slack',
            timestamp: '2 days ago',
            type: 'system'
        },
        {
            id: 'a602-4',
            user: 'Angelo Encabo',
            userImg: 'https://i.pravatar.cc/150?img=53',
            action: 'marked task as completed',
            timestamp: '2 days ago',
            type: 'system'
        }
    ]
  },
  {
    id: 'T-701',
    title: 'Draft agenda for Year End Review',
    description: 'Outline key topics for the final meeting of the year. Focus on performance reviews, strategic goals for 2026, and team building activities.',
    priority: 'Normal',
    status: 'Open',
    dueDate: '24/12/2025',
    createdAt: '18/12/2025',
    assignedBy: 'Quoc Duong',
    assignedByImg: 'https://i.pravatar.cc/150?img=11',
    createdBy: 'Quoc Duong',
    createdByImg: 'https://i.pravatar.cc/150?img=11',
    collaborators: [
        { name: 'Kimberly Cuaresma', img: 'https://i.pravatar.cc/150?img=5' }
    ],
    meeting: 'Operations Weekly Meeting',
    meetingId: 'MTG-2025-W52-OPS',
    subtasks: [
        { id: 'st-701-1', title: 'Review 2025 KPI performance reports', status: 'Open' },
        { id: 'st-701-2', title: 'Collect department head feedback on 2026 goals', status: 'Open' },
        { id: 'st-701-3', title: 'Book venue for team lunch', status: 'Completed', completedBy: 'Jack Ho', completedAt: '1 day ago' }
    ],
    activity: [
        {
            id: 'a701-1',
            user: 'Quoc Duong',
            userImg: 'https://i.pravatar.cc/150?img=11',
            action: 'created task',
            timestamp: '2 days ago',
            type: 'system'
        },
        {
            id: 'a701-2',
            user: 'Jack Ho',
            userImg: 'https://i.pravatar.cc/150?img=13',
            action: 'completed subtask',
            content: 'Book venue for team lunch',
            timestamp: '1 day ago',
            type: 'system'
        }
    ]
  }
];

interface TaskDetailPageProps {
  // All props now come from hooks
}

const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
    }
    return dateStr;
};

const formatDateFromInput = (dateVal: string) => {
    if (!dateVal) return '';
    const parts = dateVal.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
    }
    return dateVal;
};

const TaskDetailPage: React.FC<TaskDetailPageProps> = () => {
  const { taskId: taskIdParam } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const taskId = taskIdParam || '';
  const onBack = () => navigate('/task-portal');
  const onNavigate = (page: string, id?: string) => navigate(pageToPath(page, id));

  const [task, setTask] = useState<Task>(() => MOCK_TASKS.find(t => t.id === taskId) || MOCK_TASKS[0]);

  useEffect(() => {
      setTask(MOCK_TASKS.find(t => t.id === taskId) || MOCK_TASKS[0]);
  }, [taskId]);

  const [commentText, setCommentText] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  
  // Collaborator State
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);
  const [searchCollaborator, setSearchCollaborator] = useState('');

  const completedCount = task.subtasks.filter(s => s.status === 'Completed').length;
  const totalCount = task.subtasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const handleSubtaskStatusChange = (subId: string, newStatus: string) => {
      const status = newStatus as Subtask['status'];
      setTask(prev => {
          const targetSubtask = prev.subtasks.find(s => s.id === subId);
          
          let updatedActivity = [...prev.activity];
          
          if (targetSubtask && targetSubtask.status !== status) {
              let actionText = '';
              if (status === 'Completed') actionText = 'completed subtask';
              else if (status === 'In Progress') actionText = 'started subtask';
              else if (status === 'Cancelled') actionText = 'cancelled subtask';
              else if (status === 'Open') actionText = 'reopened subtask';

              if (actionText) {
                  updatedActivity.push({
                      id: `act-${Date.now()}`,
                      user: 'Jack Ho',
                      userImg: 'https://i.pravatar.cc/150?img=13',
                      action: actionText,
                      content: targetSubtask.title,
                      timestamp: 'Just now',
                      type: 'system'
                  });
              }
          }

          return {
              ...prev,
              subtasks: prev.subtasks.map(s => {
                  if (s.id === subId) {
                      const isDone = status === 'Completed';
                      return {
                          ...s,
                          status: status,
                          completedBy: isDone ? (s.completedBy || 'You') : undefined,
                          completedAt: isDone ? (s.completedAt || 'Just now') : undefined
                      } as Subtask;
                  }
                  return s;
              }),
              activity: updatedActivity
          };
      });
  };

  const handleAddSubtask = () => {
      if (!newSubtaskTitle.trim()) {
          setIsAddingSubtask(false);
          return;
      }
      const newSub: Subtask = {
          id: `new-${Date.now()}`,
          title: newSubtaskTitle,
          status: 'Open'
      };
      
      const newActivity: Activity = {
          id: `sys-${Date.now()}`,
          user: 'Jack Ho',
          userImg: 'https://i.pravatar.cc/150?img=13',
          action: 'added subtask',
          content: newSubtaskTitle,
          timestamp: 'Just now',
          type: 'system'
      };

      setTask(prev => ({
          ...prev,
          subtasks: [...prev.subtasks, newSub],
          activity: [...prev.activity, newActivity]
      }));
      setNewSubtaskTitle('');
      setIsAddingSubtask(false);
  };

  const handlePostComment = () => {
      if (!commentText.trim()) return;
      const newActivity: Activity = {
          id: `cmt-${Date.now()}`,
          user: 'Jack Ho',
          userImg: 'https://i.pravatar.cc/150?img=13',
          action: 'commented',
          content: commentText,
          timestamp: 'Just now',
          type: 'comment'
      };
      setTask(prev => ({
          ...prev,
          activity: [...prev.activity, newActivity]
      }));
      setCommentText('');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      setTask(prev => ({
          ...prev,
          dueDate: formatDateFromInput(newVal)
      }));
  };

  const handleAddCollaborator = (staff: typeof ALL_STAFF[0]) => {
    // Check if already exists
    if (task.collaborators.some(c => c.name === staff.name)) {
        setIsAddingCollaborator(false);
        return;
    }
    const newCollab = { name: staff.name, img: staff.avatar };
    setTask(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollab]
    }));
    setIsAddingCollaborator(false);
    setSearchCollaborator('');
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Normal': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Low': return 'text-gray-600 bg-gray-50 border-gray-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-100';
      case 'Ongoing': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'In Review': return 'text-purple-600 bg-purple-50 border-purple-100';
      default: return 'text-gray-600 bg-white border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <TopBar 
        title="Task Details" 
        subtitle={task.id} 
        description="View and update task progress" 
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Board
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border uppercase tracking-wider ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  {task.meeting && (
                    <button 
                        onClick={() => onNavigate && task.meetingId && onNavigate('weekly-meetings', task.meetingId)}
                        className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200"
                    >
                        <Link2 size={12} /> {task.meeting}
                    </button>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{task.title}</h1>
                <p className="text-gray-600 leading-relaxed text-sm">{task.description}</p>
              </div>

              {/* Subtasks */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-1">
                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <CheckSquare size={16} className="text-gray-400" /> Subtasks
                    </h3>
                    <span className="text-xs font-bold text-gray-400">
                        {completedCount} / {totalCount} Done
                    </span>
                </div>
                <div className="divide-y divide-gray-100 bg-white rounded-b-lg">
                    {task.subtasks.map(sub => (
                        <div 
                            key={sub.id} 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 group"
                        >
                            <div 
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${sub.status === 'Completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-gray-400 text-transparent'}`}
                                onClick={() => handleSubtaskStatusChange(sub.id, sub.status === 'Completed' ? 'Open' : 'Completed')}
                            >
                                <CheckCircle2 size={14} fill={sub.status === 'Completed' ? "currentColor" : "none"} />
                            </div>
                            <span className={`text-sm flex-1 ${sub.status === 'Completed' || sub.status === 'Cancelled' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                {sub.title}
                            </span>
                            
                            {/* Status Dropdown */}
                            <div className="relative">
                                <select
                                    value={sub.status}
                                    onChange={(e) => handleSubtaskStatusChange(sub.id, e.target.value)}
                                    className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider cursor-pointer appearance-none pr-5 focus:outline-none transition-colors ${
                                        sub.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                        sub.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        sub.status === 'Cancelled' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                        'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Complete</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {sub.status === 'Completed' && sub.completedBy && (
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                    {sub.completedBy}
                                </span>
                            )}
                        </div>
                    ))}
                    <div className="p-2">
                        {isAddingSubtask ? (
                            <div className="flex items-center gap-2 px-2">
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="flex-1 text-sm border border-brand-orange/50 rounded px-2 py-1 outline-none ring-1 ring-brand-orange/20"
                                    placeholder="Enter subtask title..."
                                    value={newSubtaskTitle}
                                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddSubtask();
                                        if (e.key === 'Escape') setIsAddingSubtask(false);
                                    }}
                                    onBlur={() => {
                                        if (newSubtaskTitle.trim()) handleAddSubtask();
                                        else setIsAddingSubtask(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <button 
                                onClick={() => setIsAddingSubtask(true)}
                                className="w-full py-2 text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-dashed border-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon /> Add Subtask
                            </button>
                        )}
                    </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare size={16} className="text-gray-400" /> Activity & Comments
                </h3>
                
                <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100">
                    {/* Items */}
                    {task.activity.map(item => (
                        <div key={item.id} className="relative pl-6">
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white ring-1 ring-gray-100"></div>
                            <div className="flex gap-3">
                                <img src={item.userImg} alt={item.user} className="w-8 h-8 rounded-full border border-gray-100 shadow-sm flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-sm font-bold text-gray-900">{item.user}</span>
                                        <span className="text-xs text-gray-500">{item.action}</span>
                                        <span className="text-xs text-gray-400">{item.timestamp}</span>
                                    </div>
                                    {item.content && (
                                        <div className={`text-sm text-gray-700 ${item.type === 'comment' ? 'bg-gray-50 p-3 rounded-lg border border-gray-100' : 'italic text-gray-500'}`}>
                                            {item.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comment Input */}
                <div className="mt-6 flex gap-3 pl-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-200">
                        <User size={14} />
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <textarea 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..." 
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none min-h-[80px] resize-none pr-10"
                            />
                            <button className="absolute bottom-2 right-2 p-1.5 text-gray-400 hover:text-brand-orange rounded hover:bg-orange-50 transition-colors">
                                <Paperclip size={16} />
                            </button>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button 
                                disabled={!commentText.trim()}
                                onClick={handlePostComment}
                                className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2"
                            >
                                <Send size={14} /> Post Comment
                            </button>
                        </div>
                    </div>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                
                {/* Details Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Details</h3>
                    
                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Assignee</label>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                                {task.assignedByImg ? <img src={task.assignedByImg} className="w-full h-full object-cover" /> : <User size={12} className="m-auto text-gray-400" />}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{task.assignedBy}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Due Date</label>
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <Clock size={14} className="text-gray-400" />
                            <input 
                                type="date" 
                                value={formatDateForInput(task.dueDate)}
                                onChange={handleDateChange}
                                className="bg-transparent border-b border-dashed border-gray-300 focus:border-brand-orange focus:outline-none text-sm text-gray-800 font-medium pb-0.5 w-full cursor-pointer hover:bg-gray-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Created By</label>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                                {task.createdByImg ? <img src={task.createdByImg} className="w-full h-full object-cover" /> : <User size={12} className="m-auto text-gray-400" />}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{task.createdBy}</span>
                        </div>
                        <span className="text-xs text-gray-400 ml-8">{task.createdAt}</span>
                    </div>
                </div>

                {/* Collaborators */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collaborators</h3>
                        <button 
                            onClick={() => setIsAddingCollaborator(!isAddingCollaborator)}
                            className="text-brand-orange hover:text-orange-700 text-xs font-bold flex items-center gap-1"
                        >
                            <PlusIcon size={10} /> Add
                        </button>
                    </div>

                    {isAddingCollaborator && (
                        <div className="absolute top-10 right-0 z-50 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Select Staff</span>
                                <button onClick={() => setIsAddingCollaborator(false)}><X size={14} className="text-gray-400 hover:text-gray-600" /></button>
                            </div>
                            <div className="p-2">
                                <div className="relative mb-2">
                                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        autoFocus
                                        placeholder="Search team..." 
                                        className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-shadow"
                                        value={searchCollaborator}
                                        onChange={(e) => setSearchCollaborator(e.target.value)}
                                    />
                                </div>
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                    {ALL_STAFF
                                        .filter(s => !task.collaborators.some(c => c.name === s.name))
                                        .filter(s => s.name.toLowerCase().includes(searchCollaborator.toLowerCase()))
                                        .map(staff => (
                                            <button 
                                                key={staff.id}
                                                onClick={() => handleAddCollaborator(staff)}
                                                className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                                            >
                                                <img src={staff.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt={staff.name} />
                                                <div>
                                                    <p className="text-xs font-bold text-gray-700 group-hover:text-brand-orange">{staff.name}</p>
                                                    <p className="text-[10px] text-gray-400">Duo Tax Cost Consultants</p>
                                                </div>
                                            </button>
                                        ))
                                    }
                                    {ALL_STAFF.filter(s => !task.collaborators.some(c => c.name === s.name) && s.name.toLowerCase().includes(searchCollaborator.toLowerCase())).length === 0 && (
                                        <div className="text-center py-4 text-xs text-gray-400">No staff found</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mb-4">
                        {task.collaborators.map((col, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <img src={col.img} alt={col.name} className="w-6 h-6 rounded-full border border-gray-100" />
                                <span className="text-sm text-gray-700">{col.name}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Progress</span>
                            <span className="text-xs font-bold text-gray-700">{progressPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-orange rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Metadata */}
                <div className="text-xs text-gray-400 flex flex-col gap-1 px-1">
                    <span>Task ID: <span className="font-mono text-gray-500">{task.id}</span></span>
                    <span>Last updated: Just now</span>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default TaskDetailPage;

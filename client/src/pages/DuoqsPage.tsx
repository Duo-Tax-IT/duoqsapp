
import React, { useState } from 'react';
import { 
  CheckCircle, Calendar as CalendarIcon, Users, Bell, 
  Plus, Coffee, Trophy, Monitor, Tent, Cake, CalendarDays,
  X, Send, MapPin, Video, Sparkles, Heart, Star
} from 'lucide-react';

// --- Mock Data ---

const TEAM_MEMBERS = [
  { name: 'Quoc Duong', role: 'Line Manager', email: 'quoc@duoqs.com.au', bday: '09 Apr', tenure: '10y 7m', img: 'https://i.pravatar.cc/150?img=11', isManager: true },
  { name: 'Jack Ho', role: 'Line Manager', email: 'jack@duoqs.com.au', bday: '21 Jun', tenure: '5y 9m', img: 'https://i.pravatar.cc/150?img=13', isManager: true },
  { name: 'Kimberly Cuaresma', role: 'Line Manager', email: 'kimberly@duoqs.com.au', bday: '29 Dec', tenure: '4y 2m', img: 'https://i.pravatar.cc/150?img=5', isManager: true },
  { name: 'Patrick Cuaresma', role: 'Cost Consultant', email: 'patrick@duoqs.com.au', bday: '03 Apr', tenure: '3y 3m', img: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Dave Agcaoili', role: 'Cost Consultant', email: 'dave@duoqs.com.au', bday: '26 Oct', tenure: '3y 1m', img: 'https://i.pravatar.cc/150?img=60' },
  { name: 'Angelo Encabo', role: 'Cost Consultant', email: 'angelo@duoqs.com.au', bday: '02 Jan', tenure: '2y 7m', img: 'https://i.pravatar.cc/150?img=53' },
  { name: 'Edrian Pardillo', role: 'Cost Consultant', email: 'edrian@duoqs.com.au', bday: '28 Mar', tenure: '2y 7m', img: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Jerald Aben', role: 'Cost Consultant', email: 'jerald@duoqs.com.au', bday: '10 Dec', tenure: '2y 1m', img: 'https://i.pravatar.cc/150?img=8' },
  { name: 'John Christian Perez', role: 'Cost Consultant', email: 'christian@duoqs.com.au', bday: '14 Dec', tenure: '1y 7m', img: 'https://i.pravatar.cc/150?img=59' },
  { name: 'Rina Aquino', role: 'Cost Consultant', email: 'rina@duoqs.com.au', bday: '17 Mar', tenure: '1y 5m', img: 'https://i.pravatar.cc/150?img=41' },
  { name: 'Dzung Nguyen', role: 'Cost Consultant', email: 'dzung@duoqs.com.au', bday: '07 Aug', tenure: '1y 4m', img: 'https://i.pravatar.cc/150?img=68' },
  { name: 'Rengie Ann Argana', role: 'Cost Consultant', email: 'rengie@duoqs.com.au', bday: '20 Jul', tenure: '1y 2m', img: 'https://i.pravatar.cc/150?img=42' },
  { name: 'Regina De Los Reyes', role: 'Cost Consultant', email: 'regina@duoqs.com.au', bday: '06 Feb', tenure: '11m', img: 'https://i.pravatar.cc/150?img=43' },
  { name: 'Camille Centeno', role: 'Cost Consultant', email: 'camillec@duoqs.com.au', bday: '22 May', tenure: '11m', img: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Rean Aquino', role: 'Cost Consultant', email: 'rean@duoqs.com.au', bday: '15 Jun', tenure: '10m', img: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Jennifer Espalmado', role: 'Cost Consultant', email: 'jennifer@duoqs.com.au', bday: '15 Jul', tenure: '9m', img: 'https://i.pravatar.cc/150?img=45' },
  { name: 'Angelica De Castro', role: 'Cost Consultant', email: 'angelica@duoqs.com.au', bday: '15 Feb', tenure: '8m', img: 'https://i.pravatar.cc/150?img=49' },
  { name: 'Gregory Christ', role: 'Cost Consultant', email: 'gregory@duoqs.com.au', bday: '23 Jun', tenure: '7m', img: 'https://i.pravatar.cc/150?img=51' },
  { name: 'Anamie Rance', role: 'Cost Consultant', email: 'anamie@duoqs.com.au', bday: '07 Dec', tenure: '7m', img: 'https://i.pravatar.cc/150?img=35' },
  { name: 'Ian Joseph Larinay', role: 'Cost Consultant', email: 'ian@duoqs.com.au', bday: '26 Jan', tenure: '7m', img: 'https://i.pravatar.cc/150?img=52' },
  { name: 'Jamielah Villanueva', role: 'Cost Consultant', email: 'jamielah@duoqs.com.au', bday: '26 Jan', tenure: '7m', img: 'https://i.pravatar.cc/150?img=36' },
  { name: 'Nexierose Baluyot', role: 'Cost Consultant', email: 'nexierose@duoqs.com.au', bday: '25 Feb', tenure: '6m', img: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Danilo Jr de la Cruz', role: 'Cost Consultant', email: 'danilo@duoqs.com.au', bday: '20 Oct', tenure: '5m', img: 'https://i.pravatar.cc/150?img=55' },
  { name: 'Daniel Venus', role: 'Cost Consultant', email: 'daniel@duoqs.com.au', bday: '12 Oct', tenure: '5m', img: 'https://i.pravatar.cc/150?img=54' },
  { name: 'Georgie Mercado', role: 'Cost Consultant', email: 'georgie@duoqs.com.au', bday: '20 Feb', tenure: '5m', img: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Dorothy Tumbaga', role: 'Cost Consultant', email: 'dorothy@duoqs.com.au', bday: '24 Aug', tenure: '5m', img: 'https://i.pravatar.cc/150?img=21' },
  { name: 'Joahna Marie Pios', role: 'Cost Consultant', email: 'joahna@duoqs.com.au', bday: '26 Sep', tenure: '5m', img: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Rica Galit', role: 'Cost Consultant', email: 'rica@duoqs.com.au', bday: '13 Aug', tenure: '5m', img: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Ariel Monsalud', role: 'Cost Consultant', email: 'ariel@duoqs.com.au', bday: '03 Apr', tenure: '3m', img: 'https://i.pravatar.cc/150?img=57' },
  { name: 'Myra Manalac', role: 'Cost Consultant', email: 'myra@duoqs.com.au', bday: '04 Dec', tenure: '2m', img: 'https://i.pravatar.cc/150?img=26' },
];

const BDM_MEMBERS = [
  { name: 'Steven Leuta', role: 'Business Development Manager', email: 'steven@duoqs.com.au', bday: '07 Jun', tenure: '5m', img: 'https://i.pravatar.cc/150?img=69' },
  { name: 'Lachlan Volpes', role: 'Business Development Manager', email: 'lachlan@duoqs.com.au', bday: '07 Dec', tenure: '1m', img: 'https://i.pravatar.cc/150?img=70' },
];

const CORE_VALUES = [
  { title: 'RADICALLY HONEST', desc: 'Speaking up and providing honest, constructive feedback regardless of hierarchical position. Prioritising what\'s best for the organisation over personal comfort or politics.' },
  { title: 'INTROSPECTION', desc: 'Self-reflection that drives continuous improvement and thoughtful decision-making. Cultivating empathy to build stronger relationships with our team and clients.' },
  { title: 'PURPOSE', desc: 'Guided by our core function as we pursue our mission with clarity and direction. Taking accountability and doing what\'s right for our team, customers, and company.' },
  { title: 'HIGH PERFORMANCE', desc: 'Prioritise the well-being, dignity, and success of our people, our customers, and our communities. Create a culture where everyone feels seen, supported, and valued.' },
];

// Mock Calendar Events
const CALENDAR_EVENTS = [
  { date: '15', title: 'WIP Team Meeting', time: '09:00 AM', type: 'meeting' },
  { date: '16', title: 'Site Inspection: Bondi', time: '11:00 AM', type: 'site' },
  { date: '16', title: 'Client Call: MGM', time: '02:00 PM', type: 'call' },
  { date: '18', title: 'Training: New Matrix', time: '10:00 AM', type: 'training' },
  { date: '19', title: 'Friday Drinks', time: '04:00 PM', type: 'social' },
];

const DuoqsPage: React.FC = () => {
  // --- Noticeboard State ---
  const [notices, setNotices] = useState([
    { 
      id: 1, 
      title: 'System Maintenance', 
      content: 'Scheduled for Friday 10PM.', 
      type: 'maintenance', 
      date: '1h ago',
      sender: 'System Admin',
      senderImg: '' 
    },
    { 
      id: 2, 
      title: 'New Pricing Matrix', 
      content: 'Updated Q4 rates are live.', 
      type: 'update', 
      date: '3h ago',
      sender: 'Quoc Duong',
      senderImg: 'https://i.pravatar.cc/150?img=11'
    }
  ]);
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    const newNotice = {
      id: Date.now(),
      title: newNoticeTitle,
      content: newNoticeContent,
      type: 'general',
      date: 'Just now',
      sender: 'Jack Ho',
      senderImg: 'https://i.pravatar.cc/150?img=13'
    };

    setNotices([newNotice, ...notices]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setIsAddingNotice(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#eef2f6] font-sans">
      
      {/* Page Header Area - More vibrant gradient */}
      <div className="px-8 pt-8 pb-4 flex-shrink-0 bg-gradient-to-r from-[#eef2f6] to-white/50">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Good Afternoon, <span className="text-brand-orange font-extrabold">Jack!</span> <Sparkles size={20} className="text-yellow-400 fill-yellow-400 animate-pulse" />
        </h1>
        <p className="text-xs text-gray-500 mt-1">Here's what's happening in Duoqs today.</p>
      </div>

      <main className="flex-1 overflow-y-auto px-8 pb-8">
         <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-[1920px]">
            
            {/* --- LEFT COLUMN (Takes 3/4 width on large screens) --- */}
            <div className="xl:col-span-3 space-y-6">
                
                {/* No Outstanding Tasks - Brighter accent */}
                <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-green-500 border-y border-r border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 rounded-full p-1.5">
                            <CheckCircle size={18} className="text-green-600" />
                        </div>
                        <div>
                            <span className="font-bold text-gray-800 block text-sm">You're all caught up!</span>
                            <span className="text-xs text-gray-500">No outstanding tasks for today.</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-all shadow-sm hover:shadow active:scale-95">
                        <Plus size={14} /> New Task
                    </button>
                </div>

                {/* Calendar Strip */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white">
                        <CalendarIcon size={18} className="text-brand-orange" />
                        <h3 className="font-bold text-sm text-gray-800">Weekly Schedule</h3>
                    </div>
                    <div className="grid grid-cols-5 divide-x divide-gray-100 min-h-[160px]">
                        {/* Days - Highlight today (Wednesday) */}
                        <CalendarDay day="MON" date="15" events={CALENDAR_EVENTS.filter(e => e.date === '15')} />
                        <CalendarDay day="TUE" date="16" events={CALENDAR_EVENTS.filter(e => e.date === '16')} />
                        <CalendarDay day="WED" date="17" isToday events={CALENDAR_EVENTS.filter(e => e.date === '17')} />
                        <CalendarDay day="THU" date="18" events={CALENDAR_EVENTS.filter(e => e.date === '18')} />
                        <CalendarDay day="FRI" date="19" events={CALENDAR_EVENTS.filter(e => e.date === '19')} />
                    </div>
                </div>

                {/* Noticeboard */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bell size={18} className="text-brand-orange" />
                            <h3 className="font-bold text-base text-gray-800">Team Updates & Notices</h3>
                        </div>
                        {!isAddingNotice && (
                            <button 
                                onClick={() => setIsAddingNotice(true)}
                                className="text-xs font-bold text-brand-orange hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                            >
                                <Plus size={14} /> Post Update
                            </button>
                        )}
                    </div>
                    
                    {/* Add Notice Form */}
                    {isAddingNotice && (
                        <form onSubmit={handlePostNotice} className="p-6 bg-orange-50 border-b border-orange-100 animate-in slide-in-from-top-2 duration-200">
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Title"
                                    value={newNoticeTitle}
                                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                                    className="w-full text-sm px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 mb-3"
                                    autoFocus
                                />
                                <textarea 
                                    placeholder="What's happening?"
                                    value={newNoticeContent}
                                    onChange={(e) => setNewNoticeContent(e.target.value)}
                                    className="w-full text-sm px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 min-h-[100px]"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsAddingNotice(false)}
                                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 hover:bg-orange-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={!newNoticeTitle || !newNoticeContent}
                                    className="flex items-center gap-2 px-5 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-transform hover:scale-105 shadow-sm"
                                >
                                    Post <Send size={12} />
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                        {notices.map((notice) => (
                            <div key={notice.id} className="flex gap-5 p-6 hover:bg-gray-50 transition-colors group">
                                {/* Sender Avatar */}
                                <div className="flex-shrink-0 pt-1">
                                    {notice.sender === 'System Admin' ? (
                                         <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white ring-2 ring-blue-50">
                                            SA
                                         </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-white ring-2 ring-gray-50">
                                            <img src={notice.senderImg} alt={notice.sender} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-900">{notice.sender}</span>
                                            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{notice.date}</span>
                                        </div>
                                        {/* Status Dot */}
                                        <div 
                                            className={`w-2.5 h-2.5 rounded-full mt-1.5 shadow-sm flex-shrink-0 ${
                                                notice.type === 'maintenance' ? 'bg-blue-500 ring-2 ring-blue-100' : 'bg-green-500 ring-2 ring-green-100'
                                            }`} 
                                            title={notice.type === 'maintenance' ? 'System Notice' : 'Team Update'}
                                        />
                                    </div>
                                    
                                    <h4 className="text-sm font-bold text-gray-800 mb-1">{notice.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{notice.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Team Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-gray-800" />
                            <h3 className="font-bold text-base text-gray-800">My Team: <span className="font-normal text-gray-600">Duo Tax Cost Consultants</span></h3>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand-orange transition-colors">Directory</button>
                            <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand-orange transition-colors">Org Chart</button>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                            Cost Consultant
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {TEAM_MEMBERS.map((member, idx) => (
                                <TeamCard key={idx} member={member} accentColor="border-t-brand-orange" />
                            ))}
                        </div>

                        <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            Business Development Manager
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {BDM_MEMBERS.map((member, idx) => (
                                <TeamCard key={idx} member={member} accentColor="border-t-blue-500" />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* --- RIGHT COLUMN (Takes 1/4 width on large screens) --- */}
            <div className="xl:col-span-1 space-y-6">
                
                {/* Quick Actions - VIBRANT */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-bold text-sm text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-yellow-500">⚡</span> Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <QuickActionBtn 
                            label="Log Leave" 
                            icon={<Tent size={20} className="text-emerald-600" />} 
                            colorClass="bg-emerald-50 hover:bg-emerald-100 border-emerald-100 text-emerald-800"
                        />
                        <QuickActionBtn 
                            label="Nominate" 
                            icon={<Trophy size={20} className="text-amber-500" />} 
                            colorClass="bg-amber-50 hover:bg-amber-100 border-amber-100 text-amber-800"
                        />
                        <QuickActionBtn 
                            label="IT Ticket" 
                            icon={<Monitor size={20} className="text-violet-600" />} 
                            colorClass="bg-violet-50 hover:bg-violet-100 border-violet-100 text-violet-800"
                        />
                        <QuickActionBtn 
                            label="Coffee" 
                            icon={<Coffee size={20} className="text-orange-700" />} 
                            colorClass="bg-orange-50 hover:bg-orange-100 border-orange-100 text-orange-800"
                        />
                    </div>
                </div>

                {/* Our Core Values */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                    
                    <h3 className="font-bold text-sm text-gray-800 mb-6 border-b border-gray-100 pb-2 relative z-10">Our Core Values</h3>
                    <div className="space-y-6 relative z-10">
                        {/* Simple vertical line decoration */}
                        <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-orange to-orange-100 rounded-full"></div>
                        
                        {CORE_VALUES.map((val, idx) => (
                            <div key={idx} className="pl-6 relative group">
                                {/* Dot on the line */}
                                <div className="absolute left-[-2px] top-1.5 w-2.5 h-2.5 bg-white border-2 border-brand-orange rounded-full group-hover:scale-125 transition-transform"></div>
                                <h4 className="text-xs font-bold text-gray-800 uppercase mb-1 group-hover:text-brand-orange transition-colors">{val.title}</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

         </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const CalendarDay: React.FC<{ day: string, date: string, events: any[], isToday?: boolean }> = ({ day, date, events, isToday }) => (
    <div className={`flex flex-col items-center justify-start py-4 group transition-colors relative ${isToday ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}>
        {isToday && <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange"></div>}
        
        <div className="flex items-start justify-between w-full px-4 mb-4">
            <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-brand-orange' : 'text-gray-400'}`}>{day}</span>
            <span className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-brand-orange text-white shadow-sm' : (events.length > 0 ? 'text-gray-800' : 'text-gray-600')}`}>
                {date}
            </span>
        </div>
        
        <div className="w-full px-2 space-y-1">
            {events.length > 0 ? (
                events.map((evt, i) => (
                    <div key={i} className="bg-white border border-blue-100 rounded p-1.5 mb-1 cursor-pointer hover:bg-blue-50 hover:border-blue-200 shadow-sm transition-all group/evt">
                        <div className="flex items-center gap-1 mb-0.5">
                            {evt.type === 'site' ? <MapPin size={8} className="text-blue-600" /> : 
                             evt.type === 'call' ? <Users size={8} className="text-green-600" /> :
                             <Video size={8} className="text-purple-600" />
                            }
                            <span className="text-[9px] font-bold text-gray-700 truncate group-hover/evt:text-blue-700">{evt.time}</span>
                        </div>
                        <div className="text-[9px] text-gray-600 leading-tight truncate" title={evt.title}>
                            {evt.title}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-400">No events</span>
                </div>
            )}
        </div>
    </div>
);

const QuickActionBtn: React.FC<{ label: string, icon: React.ReactNode, colorClass: string }> = ({ label, icon, colorClass }) => (
    <button className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all text-center h-24 group border ${colorClass}`}>
        <div className="mb-2 transform group-hover:-translate-y-1 transition-transform drop-shadow-sm">{icon}</div>
        <span className="text-[10px] font-bold leading-tight uppercase tracking-wide">{label}</span>
    </button>
);

const TeamCard: React.FC<{ member: any, accentColor?: string }> = ({ member, accentColor = 'border-t-gray-200' }) => (
    <div className={`bg-white border border-gray-100 rounded-lg p-3 flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer group border-t-4 ${accentColor}`}>
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-white shadow-sm ring-1 ring-gray-100 group-hover:ring-brand-orange/30 transition-all">
            <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                loading="lazy"
            />
        </div>
        <div className="flex-1 min-w-0">
            {member.isManager && <div className="text-[9px] text-blue-600 font-bold mb-0.5 uppercase tracking-wider flex items-center gap-1"><Star size={8} className="fill-blue-600" /> Line Manager</div>}
            <div className="text-sm font-bold text-gray-800 truncate group-hover:text-brand-orange transition-colors">{member.name}</div>
            <div className="text-xs text-gray-500 truncate mb-2">{member.email}</div>
            
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <div className="flex items-center gap-1" title="Birthday">
                    <Cake size={10} className="text-pink-400" />
                    <span>{member.bday}</span>
                </div>
                <div className="flex items-center gap-1" title="Tenure">
                    <CalendarDays size={10} className="text-blue-400" />
                    <span>{member.tenure}</span>
                </div>
            </div>
        </div>
    </div>
);

export default DuoqsPage;

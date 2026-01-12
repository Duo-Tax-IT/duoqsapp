
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, ClipboardList, ListChecks, Users, 
  Briefcase, FileText, Contact, Building2, Trash2, FileCode, 
  Database, Calculator, MapPin, Book, BarChart3, PieChart, Shield,
  LayoutTemplate, GanttChart, ListTodo, ClipboardEdit, FileStack,
  MessageSquareQuote, PlusCircle, Clock, Inbox, ChevronDown, ChevronRight,
  Globe
} from 'lucide-react';

interface SideNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

// Custom Duo Icon Component
const DuoIcon = () => (
  <div className="w-[18px] h-[18px] bg-brand-orange rounded flex items-center justify-center text-white font-bold text-[10px] leading-none select-none">
    D
  </div>
);

const SideNav: React.FC<SideNavProps> = ({ activePage, onNavigate }) => {
  // State to manage the RFI dropdown
  const [isRfiExpanded, setIsRfiExpanded] = useState(false);

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col flex-shrink-0 font-sans">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
         <div className="flex items-center gap-2">
            <div className="bg-brand-orange w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xl">D</div>
            <span className="text-xl font-extrabold text-gray-800 tracking-tight">duoqs</span>
         </div>
      </div>
      
      {/* Scrollable Nav Items */}
      <div className="flex-1 overflow-y-auto py-6">
        
        {/* Section: Your Company Apps */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Your Company Apps
          </h3>
          <nav className="space-y-0.5 px-3">
            <NavItem 
              id="home" 
              label="Duo Hub" 
              icon={<DuoIcon />} 
              isActive={activePage === 'home'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="duoqs" 
              label="DUOQS" 
              icon={<LayoutTemplate />} 
              isActive={activePage === 'duoqs'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="task-portal" 
              label="Task Portal" 
              icon={<ListTodo />} 
              isActive={activePage === 'task-portal'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="weekly-meetings" 
              label="Weekly Meetings" 
              icon={<ClipboardEdit />} 
              isActive={activePage === 'weekly-meetings'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="operations-portal" 
              label="Operations Portal" 
              icon={<Globe />} 
              isActive={activePage === 'operations-portal'} 
              onClick={onNavigate} 
            />
          </nav>
        </div>

        {/* Section: Job Management */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Job Management
          </h3>
          <nav className="space-y-0.5 px-3">
            <NavItem 
              id="dashboard" 
              label="CSR Dashboard" 
              icon={<LayoutDashboard />} 
              isActive={activePage === 'dashboard'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="dashboard-bdm" 
              label="BDM Dashboard" 
              icon={<BarChart3 />} 
              isActive={activePage === 'dashboard-bdm'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="dashboard-ops" 
              label="Operations Dashboard" 
              icon={<PieChart />} 
              isActive={activePage === 'dashboard-ops'} 
              onClick={onNavigate} 
            />
          </nav>
        </div>

        {/* Section: QS Tools */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            QS Tools
          </h3>
          <nav className="space-y-0.5 px-3">
            <NavItem 
              id="calendar" 
              label="Calendar" 
              icon={<Calendar />} 
              isActive={activePage === 'calendar'} 
              onClick={onNavigate} 
            />
            
            {/* --- QS RFI SECTION START (Collapsible) --- */}
            <div className="mt-1">
              <button
                onClick={() => setIsRfiExpanded(!isRfiExpanded)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group ${
                  activePage.startsWith('qs-rfi') 
                    ? 'bg-orange-50/50 text-brand-orange' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquareQuote 
                    size={18} 
                    className={activePage.startsWith('qs-rfi') ? 'text-brand-orange' : 'text-gray-400'} 
                  />
                  <span>QS RFI</span>
                </div>
                {isRfiExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
              </button>
              
              {isRfiExpanded && (
                <div className="ml-4 mt-2 space-y-2 pr-3 animate-in slide-in-from-top-1 duration-200">
                  {/* Create RFI Button - Blue Style from Image */}
                  <button 
                    onClick={() => onNavigate('qs-rfi-create')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white shadow-sm transition-all active:scale-[0.98]"
                  >
                    <PlusCircle size={18} />
                    <span className="text-xs font-bold">Create RFI Report</span>
                  </button>
                  
                  {/* Pending Report */}
                  <button 
                    onClick={() => onNavigate('qs-rfi-pending')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left ${
                      activePage === 'qs-rfi-pending' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Clock size={18} className={activePage === 'qs-rfi-pending' ? 'text-gray-900' : 'text-gray-400'} />
                    <span className="text-xs font-semibold">Pending Report</span>
                  </button>

                  {/* Received Report */}
                  <button 
                    onClick={() => onNavigate('qs-rfi-received')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left ${
                      activePage === 'qs-rfi-received' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Inbox size={18} className={activePage === 'qs-rfi-received' ? 'text-gray-900' : 'text-gray-400'} />
                    <span className="text-xs font-semibold">Received Report</span>
                  </button>
                </div>
              )}
            </div>
            {/* --- QS RFI SECTION END --- */}

            <NavItem 
              id="gantt-chart" 
              label="GANTT Chart" 
              icon={<GanttChart />} 
              isActive={activePage === 'gantt-chart'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="project-tracker" 
              label="Project Tracker" 
              icon={<ClipboardList />} 
              isActive={activePage === 'project-tracker' || activePage === 'cc-delegate-list'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="qs-database" 
              label="QS Database" 
              icon={<Database />} 
              isActive={activePage === 'qs-database'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="quantification-manual" 
              label="Quantification Manual" 
              icon={<Book />} 
              isActive={activePage === 'quantification-manual'} 
              onClick={onNavigate} 
            />
          </nav>
        </div>

        {/* Section: Main */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Main
          </h3>
          <nav className="space-y-0.5 px-3">
            <NavItem 
              id="leads" 
              label="Leads" 
              icon={<Briefcase />} 
              isActive={activePage === 'leads' || activePage === 'lead-detail'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="opportunities" 
              label="Opportunities" 
              icon={<Briefcase />} 
              isActive={activePage === 'opportunities' || activePage === 'opportunity-detail'} 
              onClick={onNavigate} 
            />
             <NavItem 
              id="follow-ups" 
              label="Follow Ups" 
              icon={<ListChecks />} 
              isActive={activePage === 'follow-ups'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="assignments" 
              label="Assignments" 
              icon={<Users />} 
              isActive={activePage === 'assignments'} 
              onClick={onNavigate} 
            />
             <NavItem 
              id="reports" 
              label="Reports" 
              icon={<FileText />} 
              isActive={activePage === 'reports'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="contacts" 
              label="Contacts" 
              icon={<Contact />} 
              isActive={activePage === 'contacts'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="accounts" 
              label="Accounts" 
              icon={<Building2 />} 
              isActive={activePage === 'accounts'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="case-studies" 
              label="Case Studies" 
              icon={<FileCode />} 
              isActive={activePage === 'case-studies'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="recycle-bin" 
              label="Recycle Bin" 
              icon={<Trash2 />} 
              isActive={activePage === 'recycle-bin'} 
              onClick={onNavigate} 
            />
          </nav>
        </div>

        {/* Section: Tools */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Tools
          </h3>
          <nav className="space-y-0.5 px-3">
            <NavItem 
              id="pricing-matrix" 
              label="Pricing Matrix" 
              icon={<Calculator />} 
              isActive={activePage === 'pricing-matrix'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="rp-data" 
              label="RP Data" 
              icon={<Shield />} 
              isActive={activePage === 'rp-data'} 
              onClick={onNavigate} 
            />
             <NavItem 
              id="inspectors" 
              label="Inspectors Range" 
              icon={<MapPin />} 
              isActive={activePage === 'inspectors'} 
              onClick={onNavigate} 
            />
            <NavItem 
              id="document-register" 
              label="Document Register" 
              icon={<FileStack />} 
              isActive={activePage === 'document-register'} 
              onClick={onNavigate} 
            />
          </nav>
        </div>

      </div>

       {/* Footer / Version */}
       <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  JH
              </div>
              <div>
                  <div className="text-xs font-bold text-gray-800">Jack Ho</div>
                  <div className="text-[10px] text-gray-500">jack@duoqs.com.au</div>
              </div>
          </div>
       </div>
    </div>
  );
};

// --- Sub Component: Nav Item ---
interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, isActive, onClick }) => {
  // Check if icon is a valid React element before cloning, otherwise just render it (for custom components)
  const IconElement = React.isValidElement(icon) 
    ? React.cloneElement(icon as React.ReactElement<any>, { 
        size: 18, 
        className: `transition-colors ${isActive ? 'text-brand-orange' : 'text-gray-400 group-hover:text-gray-600'}` 
      }) 
    : icon;

  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
        isActive 
          ? 'bg-orange-50 text-brand-orange shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <div className={`flex items-center justify-center ${isActive ? '' : 'opacity-70 group-hover:opacity-100'}`}>
        {IconElement}
      </div>
      <span>{label}</span>
    </button>
  );
};

export default SideNav;

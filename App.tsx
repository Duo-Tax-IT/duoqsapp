
import React, { useState } from 'react';
import DashboardPage from './client/src/pages/DashboardPage';
import BDMDashboardPage from './client/src/pages/BDMDashboardPage';
import OpsDashboardPage from './client/src/pages/OpsDashboardPage';
import OpportunitiesPage from './client/src/pages/OpportunitiesPage';
import OpportunityDetailPage from './client/src/pages/OpportunityDetailPage';
import PlaceholderPage from './client/src/pages/PlaceholderPage';
import CalendarPage from './client/src/pages/CalendarPage';
import FollowUpsPage from './client/src/pages/FollowUpsPage';
import AssignmentsPage from './client/src/pages/AssignmentsPage';
import LeadsPage from './client/src/pages/LeadsPage';
import LeadDetailPage from './client/src/pages/LeadDetailPage';
import ReportsPage from './client/src/pages/ReportsPage';
import ContactsPage from './client/src/pages/ContactsPage';
import AccountsPage from './client/src/pages/AccountsPage';
import ProjectTrackerPage from './client/src/pages/ProjectTrackerPage';
import CCDelegateListPage from './client/src/pages/CCDelegateListPage';
import HomePage from './client/src/pages/HomePage';
import DuoqsPage from './client/src/pages/DuoqsPage';
import PricingMatrixPage from './client/src/pages/PricingMatrixPage';
import QSDatabasePage from './client/src/pages/QSDatabasePage';
import InspectorsRangePage from './client/src/pages/InspectorsRangePage';
import DocumentRegisterPage from './client/src/pages/DocumentRegisterPage';
import CaseStudiesPage from './client/src/pages/CaseStudiesPage';
import RPDataPage from './client/src/pages/RPDataPage';
import QuantificationManualPage from './client/src/pages/QuantificationManualPage';
import GanttChartPage from './client/src/pages/GanttChartPage';
import TaskPortalPage from './client/src/pages/TaskPortalPage';
import TaskDetailPage from './client/src/pages/TaskDetailPage';
import WeeklyMeetingsPage from './client/src/pages/WeeklyMeetingsPage';
import QSRfiPage from './client/src/pages/QSRfiPage';
import CreateRfiReportPage from './client/src/pages/CreateRfiReportPage';
import SideNav from './client/src/components/SideNav';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      
      case 'duoqs':
        return <DuoqsPage />;
        
      // Job Management
      case 'dashboard':
        return <DashboardPage />;
      case 'dashboard-bdm':
        return <BDMDashboardPage />;
      case 'dashboard-ops':
        return <OpsDashboardPage />;
      case 'calendar':
        return <CalendarPage onEventClick={(title) => {
            setSelectedOpportunity(title);
            setCurrentPage('opportunity-detail');
        }} />;
      case 'task-portal':
        return <TaskPortalPage onNavigate={(page, id) => {
          if (page === 'task-detail' && id) {
            setSelectedTaskId(id);
          }
          setCurrentPage(page);
        }} />;
      case 'task-detail':
        return <TaskDetailPage 
          taskId={selectedTaskId} 
          onBack={() => setCurrentPage('task-portal')}
          onNavigate={(page, id) => {
            if (id) setSelectedTaskId(id);
            setCurrentPage(page);
          }}
        />;
      case 'weekly-meetings':
        return <WeeklyMeetingsPage onNavigate={setCurrentPage} />;
      case 'operations-portal':
        return <PlaceholderPage title="Operations Portal" />;
      
      case 'project-tracker':
        return <ProjectTrackerPage 
            onProjectClick={(name) => {
                setSelectedProject(name);
                setCurrentPage('cc-delegate-list');
            }}
        />;
      
      case 'cc-delegate-list':
        return <CCDelegateListPage 
            projectName={selectedProject || 'CC382581-Como'} 
            onBack={() => setCurrentPage('project-tracker')}
            onViewOpportunity={() => {
              setSelectedOpportunity(selectedProject || 'CC382581-Como');
              setCurrentPage('opportunity-detail');
            }}
        />;

      case 'follow-ups':
        return <FollowUpsPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'leads':
        return <LeadsPage 
            onLeadClick={(name) => {
                setSelectedLead(name);
                setCurrentPage('lead-detail');
            }}
        />;
      
      case 'lead-detail':
        return <LeadDetailPage 
            leadName={selectedLead} 
            onBack={() => setCurrentPage('leads')} 
        />;

      // Main Opportunities List
      case 'opportunities':
        return <OpportunitiesPage 
          onOpportunityClick={(name) => {
            setSelectedOpportunity(name);
            setCurrentPage('opportunity-detail');
          }}
        />;
        
      // Opportunity Detail View
      case 'opportunity-detail':
        return <OpportunityDetailPage 
          opportunityName={selectedOpportunity}
          onBack={() => setCurrentPage('opportunities')}
          onOpenTracker={() => setCurrentPage('project-tracker')}
          onViewRfi={() => setCurrentPage('qs-rfi-pending')}
        />;

      case 'reports':
        return <ReportsPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'accounts':
        return <AccountsPage />;
      case 'recycle-bin':
        return <PlaceholderPage title="Recycle Bin" />;
      case 'case-studies':
        return <CaseStudiesPage />;
      
      // Tools
      case 'pricing-matrix':
        return <PricingMatrixPage />;
      case 'rp-data':
        return <RPDataPage />;
      case 'qs-database':
        return <QSDatabasePage />;
      case 'inspectors':
        return <InspectorsRangePage />;
      case 'document-register':
        return <DocumentRegisterPage onNavigate={(page: string, id?: string) => {
          if (page === 'opportunity-detail' && id) {
            setSelectedOpportunity(id);
          }
          setCurrentPage(page);
        }} />;
      case 'quantification-manual':
        return <QuantificationManualPage />;
      case 'gantt-chart':
        return <GanttChartPage />;
      
      // QS RFI Views
      case 'qs-rfi':
      case 'qs-rfi-pending':
        return <QSRfiPage 
          view="pending" 
          onProjectClick={(projectNumber) => {
            setSelectedOpportunity(projectNumber);
            setCurrentPage('opportunity-detail');
          }}
        />;
      case 'qs-rfi-received':
        return <QSRfiPage 
          view="received" 
          onProjectClick={(projectNumber) => {
            setSelectedOpportunity(projectNumber);
            setCurrentPage('opportunity-detail');
          }}
        />;
      case 'qs-rfi-create':
        return <CreateRfiReportPage />;
        
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      {/* Left Navigation */}
      <SideNav 
        activePage={
            currentPage === 'opportunity-detail' ? 'opportunities' : 
            (currentPage === 'cc-delegate-list' ? 'project-tracker' : 
            (currentPage === 'lead-detail' ? 'leads' : currentPage))
        } 
        onNavigate={(page) => setCurrentPage(page)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {renderPage()}

        {/* Floating Action Button (FAB) - Global */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-50">
           <div className="bg-white px-2 py-1 rounded shadow-sm border border-orange-100">
             <img src="https://placehold.co/100x40/ffffff/F97316?text=DUOQS&font=sans" alt="DUOQS" className="h-4 w-auto" />
           </div>
           <button 
             onClick={() => setCurrentPage('task-portal')}
             className="bg-brand-orange hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
             aria-label="New Task"
           >
             <Plus size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;

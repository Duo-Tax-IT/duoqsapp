
import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import ProjectTrackerDashboardPage from './client/src/pages/ProjectTrackerDashboardPage';
import ManageDelegationTemplatesPage from './client/src/pages/ManageDelegationTemplatesPage';
import OpsWeeklyReportPage from './client/src/pages/OpsWeeklyReportPage';
import SideNav from './client/src/components/SideNav';
import { pageToPath, pathToPage } from './client/src/utils/pageToPath';
import { Plus } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = pathToPage(location.pathname);

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      <SideNav
        activePage={activePage}
        onNavigate={(page) => navigate(pageToPath(page))}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Outlet />

        {/* Floating Action Button (FAB) - Global */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-50">
           <div className="bg-white px-2 py-1 rounded shadow-sm border border-orange-100">
             <img src="https://placehold.co/100x40/ffffff/F97316?text=DUOQS&font=sans" alt="DUOQS" className="h-4 w-auto" />
           </div>
           <button
             onClick={() => navigate('/task-portal')}
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

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="duoqs" element={<DuoqsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="dashboard-bdm" element={<BDMDashboardPage />} />
        <Route path="dashboard-ops" element={<OpsDashboardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="task-portal" element={<TaskPortalPage />} />
        <Route path="task-detail/:taskId" element={<TaskDetailPage />} />
        <Route path="weekly-meetings" element={<WeeklyMeetingsPage />} />
        <Route path="operations-portal" element={<PlaceholderPage title="Operations Portal" />} />
        <Route path="ops-weekly-report" element={<OpsWeeklyReportPage />} />
        <Route path="project-tracker-portal" element={<PlaceholderPage title="Project Tracker Portal" />} />
        <Route path="project-tracker-dashboard" element={<ProjectTrackerDashboardPage />} />
        <Route path="templates" element={<ManageDelegationTemplatesPage />} />
        <Route path="project-tracker" element={<ProjectTrackerPage />} />
        <Route path="cc-delegate-list/:projectName" element={<CCDelegateListPage />} />
        <Route path="follow-ups" element={<FollowUpsPage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="leads/:name" element={<LeadDetailPage />} />
        <Route path="opportunities" element={<OpportunitiesPage />} />
        <Route path="opportunities/:name" element={<OpportunityDetailPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="recycle-bin" element={<PlaceholderPage title="Recycle Bin" />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="pricing-matrix" element={<PricingMatrixPage />} />
        <Route path="rp-data" element={<RPDataPage />} />
        <Route path="qs-database" element={<QSDatabasePage />} />
        <Route path="inspectors" element={<InspectorsRangePage />} />
        <Route path="document-register" element={<DocumentRegisterPage />} />
        <Route path="quantification-manual" element={<QuantificationManualPage />} />
        <Route path="gantt-chart" element={<GanttChartPage />} />
        <Route path="qs-rfi/pending" element={<QSRfiPage view="pending" />} />
        <Route path="qs-rfi/received" element={<QSRfiPage view="received" />} />
        <Route path="qs-rfi/create" element={<CreateRfiReportPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

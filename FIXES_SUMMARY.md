# Build and Navigation Fixes Summary

## Overview
This document summarizes the key issues encountered during development and their solutions, particularly related to TypeScript compilation errors, GitHub Pages deployment, and navigation routing.

## Issues and Fixes

### 1. TypeScript Circular Type Reference Errors

**Problem:**
The `DocumentRegisterPage.tsx` file had TypeScript compilation errors due to circular type references. The pattern:
```typescript
const styles = { ... }[category as keyof typeof styles]
```
creates a circular dependency where TypeScript tries to infer the type of `styles` but needs `typeof styles` to do so, which requires knowing what `styles` is first.

**Error Messages:**
- `error TS7022: 'styles' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.`
- `error TS7053: Element implicitly has an 'any' type because expression of type 'string | number | symbol' can't be used to index type...`

**Solution:**
Extract the objects into separate constants with explicit types before indexing:
```typescript
const categoryStyles: Record<string, string> = { ... };
const styles = categoryStyles[category] || 'default';

const categoryIcons: Record<string, LucideIcon> = { ... };
const Icon = categoryIcons[category] || Box;
```

**Files Affected:**
- `client/src/pages/DocumentRegisterPage.tsx` (lines 233-266)

**Key Takeaway:** Never use `typeof` on a variable in its own initializer. Always extract lookup objects into separate constants with explicit types.

---

### 2. GitHub Pages Base Path Configuration

**Problem:**
The application was deployed to GitHub Pages at `https://duo-tax-it.github.io/duoqsapp/` (subdirectory), but the build was configured for root path (`/`), causing assets to fail loading and the app to appear blank.

**Solution:**
1. Added `base: '/duoqsapp/'` to `vite.config.ts`
2. Changed absolute paths in `index.html` to relative paths:
   - `/logo.png` → `./logo.png`
   - `/index.css` → `./index.css`
   - `/index.tsx` → `./index.tsx`

**Files Affected:**
- `vite.config.ts`
- `index.html`

---

### 3. Task Detail Page Navigation

**Problem:**
Clicking on tasks in the Task Portal would navigate to `'task-detail'` but the page would not render, instead falling back to the default Dashboard page.

**Root Cause:**
The `App.tsx` switch statement was missing a case handler for `'task-detail'`, even though the `TaskDetailPage` component existed.

**Solution:**
1. Added import for `TaskDetailPage` component
2. Added `selectedTaskId` state variable
3. Added case handler in `renderPage()`:
```typescript
case 'task-detail':
  return <TaskDetailPage 
    taskId={selectedTaskId} 
    onBack={() => setCurrentPage('task-portal')}
    onNavigate={(page, id) => {
      if (id) setSelectedTaskId(id);
      setCurrentPage(page);
    }}
  />;
```
4. Updated `TaskPortalPage` navigation handler to properly set task ID

**Files Affected:**
- `App.tsx`

---

### 4. Operations Portal Page Not Showing

**Problem:**
Clicking "Operations Portal" in the left sidebar navigated to `'operations-portal'` but the page would not render, instead showing the default Dashboard.

**Root Cause:**
The `App.tsx` switch statement was missing a case handler for `'operations-portal'`, even though the `PlaceholderPage` component had the Operations Portal UI built in.

**Solution:**
Added case handler in `renderPage()`:
```typescript
case 'operations-portal':
  return <PlaceholderPage title="Operations Portal" />;
```

**Files Affected:**
- `App.tsx`

**Note:** The `PlaceholderPage` component has special handling for `title="Operations Portal"` that renders the full Operations Portal dashboard with workload overview, weekly progress, team distribution, and week selector.

---

### 5. Opportunity Detail Page Links Not Working

**Problem:**
In the Opportunity Detail page, two action buttons were not functioning:
1. "Open Tracker" button in the PROJECT TRACKER card - should navigate to Project Tracker page
2. "Yes (View Report)" link in the RFI SENT section - should navigate to Pending RFI Queue

**Root Cause:**
The `OpportunityDetailPage` component accepts `onOpenTracker` and `onViewRfi` as optional props, but these handlers were not being passed when the component was rendered in `App.tsx`.

**Solution:**
Added navigation handlers in `App.tsx` when rendering `OpportunityDetailPage`:
```typescript
case 'opportunity-detail':
  return <OpportunityDetailPage 
    opportunityName={selectedOpportunity}
    onBack={() => setCurrentPage('opportunities')}
    onOpenTracker={() => setCurrentPage('project-tracker')}
    onViewRfi={() => setCurrentPage('qs-rfi-pending')}
  />;
```

**Files Affected:**
- `App.tsx`

**Note:** 
- The "Open Tracker" button navigates to the Project Tracker page which shows all active projects
- The "View Report" link navigates to the QS RFI Pending queue which shows all pending RFI reports

---

### 6. Document Register and CC Delegate List Opportunity Links Not Working

**Problem:**
Two pages had opportunity links that were not functional:
1. In `DocumentRegisterPage`, clicking on an opportunity name in the table did not navigate to the opportunity detail page
2. In `CCDelegateListPage`, clicking on the "Opportunity" link in the right sidebar Details panel did not navigate to the opportunity detail page

**Root Cause:**
Both components had navigation props defined (`onNavigate` and `onViewOpportunity` respectively) but these handlers were not being passed when the components were rendered in `App.tsx`.

**Solution:**

1. **DocumentRegisterPage:**
   - Added `onNavigate` prop to component interface
   - Made opportunity name clickable with navigation handler
   - Updated `App.tsx` to pass navigation handler:
   ```typescript
   case 'document-register':
     return <DocumentRegisterPage onNavigate={(page, id) => {
       if (page === 'opportunity-detail' && id) {
         setSelectedOpportunity(id);
       }
       setCurrentPage(page);
     }} />;
   ```

2. **CCDelegateListPage:**
   - Updated `App.tsx` to pass `onViewOpportunity` handler:
   ```typescript
   case 'cc-delegate-list':
     return <CCDelegateListPage 
       projectName={selectedProject || 'CC382581-Como'} 
       onBack={() => setCurrentPage('project-tracker')}
       onViewOpportunity={() => {
         setSelectedOpportunity(selectedProject || 'CC382581-Como');
         setCurrentPage('opportunity-detail');
       }}
     />;
   ```

**Files Affected:**
- `App.tsx`
- `client/src/pages/DocumentRegisterPage.tsx`
- `client/src/pages/CCDelegateListPage.tsx` (already had the prop, just needed handler passed)

---

### 7. QS RFI Page Project Number Links Not Working

**Problem:**
In the QS RFI Pending and Received pages, clicking on project numbers in the "PROJECT NUMBER" column did not navigate to the opportunity detail page. The project numbers were displayed as clickable blue links but had no navigation functionality.

**Root Cause:**
The `QSRfiPage` component accepts an `onProjectClick` prop that handles project number clicks, but this handler was not being passed when the component was rendered in `App.tsx` for both the pending and received views.

**Solution:**
Added `onProjectClick` handlers in `App.tsx` for both RFI views:
```typescript
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
```

**Files Affected:**
- `App.tsx`

**Note:** The project number (e.g., "CC382581-Como") is used as the opportunity name to navigate to the opportunity detail page.

---

## Common Patterns

### TypeScript Object Indexing Best Practices
- ✅ Use explicit `Record<string, Type>` types for lookup objects
- ✅ Extract lookup objects into separate constants before indexing
- ❌ Never use `typeof variable` in the same line where `variable` is defined

### Navigation Routing Pattern
When adding new pages:
1. Create the page component
2. Import it in `App.tsx`
3. Add a case handler in the `renderPage()` switch statement
4. Ensure the `SideNav` component uses the correct page ID
5. If the page needs state (like selected IDs), add state variables and pass them as props

### GitHub Pages Deployment
- Always set `base` path in `vite.config.ts` to match the repository subdirectory
- Use relative paths (`./`) instead of absolute paths (`/`) in `index.html` for assets

---

## Testing Checklist

After making changes, verify:
- [ ] TypeScript compilation passes (`tsc` or `npm run build`)
- [ ] GitHub Actions build succeeds
- [ ] All navigation links work correctly
- [ ] Pages render with correct content
- [ ] Assets load correctly on GitHub Pages


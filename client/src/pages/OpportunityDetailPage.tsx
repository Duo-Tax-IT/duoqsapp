
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import StatusPath from '../components/StatusPath';
import { FormSection, FormRow } from '../components/FormElements';
import { 
  ArrowLeft, User, TrendingUp, Settings, FolderKanban, Construction, Share2, UploadCloud,
  Crown, Wrench, RefreshCw, ExternalLink, FileText, ChevronDown, Copy, Pencil,
  Search, Filter, ListFilter, MessageCircle, ThumbsUp, MoreHorizontal, Archive
} from 'lucide-react';

interface OpportunityDetailPageProps {
  opportunityName: string;
  onBack: () => void;
}

const OpportunityDetailPage: React.FC<OpportunityDetailPageProps> = ({ opportunityName, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CSR' | 'BDM' | 'Operations' | 'PM'>('CSR');

  // Notes data for readability
  const opportunityNotes = `(09/12/25 JH) CC Deadline Date set to 2025-12-12
(08/12/25 RA) Received an email form Damien with notes:
ANZ have confirmed they will cover the cost of your inspection so can you please now organise a time to visit our site with our building foreman Phil Jeffries on 0417 063 014. The sooner the better if possible as our builders are obviously keen to get paid soon.

(05/12/25 AD) JH sent an email via surveying:
I have cancelled this progress claim on our system until ANZ confirms directly with you whether a QS inspection is required at slab stage and how the fee will be handled. As noted earlier, DUOQS will only proceed once we have your instruction, and at this stage no action has been taken.
-
(18/07/2025 RA) Manually send the report to client only via surveying
(16/07/2025 RA) NM sent an email to Damien we will have it ready by Friday
(16/07/2025 RA) Received an email from Damien regarding status of the report
(11/07/25 NA) CC Deadline Date updated from 2025-07-15 to 2025-07-18
08/07/2025 AD) Received an email from Ante Bacic (builder) via surveying with attached files:
Please find attached to complete your report
Builders all risk insurance
Home owners warranty certificate
(04/07/2025 RA) Received an email from Ante Bacic (builder) via surveying with attached dropbox link and notes regarding:
Landscape Drawings - landscape works not included in charleston contract
Insurances - currently in middle of application – should have shortly
Construction Programme - demo to commence on Monday. Until demo is completed and contract requirements are fulfilled, we do not have a programe per-se. works to commence on site within 20 days of all contracts requirements being met
(03/07/2025 RA) Sent an email via surveying requesting for:
Structural Drawings
Stormwater Drawings
Electrical/Mechanical Drawings
Landscape Drawings
Insurances
-Builder's All Risk Insurance
-Home Owners Warranty
-Workers Compensation
-Professional Indemnity Insurance
Construction Programme (Commencement Date of Construction)
Geotech Report (if available)
BASIX Report (if available)
Arboricultural Report (if available)
(01/07/2025 AD) Sent FP via NM
(01/07/2025 AD) Received forwarded email from NM:
As discussed I have asked my mortgage broker to confirm with ANZ that they will accept the report from your firm (or if they have some particular panel of approved firms).
No work has been started yet, the existing house is being knocked down next week.
Contract attached together with the plans. Let me know if this is sufficient for your proposal.
-
This is for me personally, I am building a new house.
Our lender, ANZ, has requested an independent QS report. Have you done these before for a bank for a newbuild?
Attached is what our builder sent us but ANZ keep coming back with they want a more detailed report before they approve our loan.
I googled this and it appears this is becoming a new common requirement for banks when approving construction loans.`;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title={opportunityName || "Opportunity Detail"} 
        subtitle="cost estimate - progress claim report" 
        description="View and manage opportunity specifics" 
      />

      {/* Top Status Bar */}
      <StatusPath currentStep="Fillout" />

      {/* Action Toolbar with Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-6 w-full md:w-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-brand-orange transition-colors flex-shrink-0"
            >
              <ArrowLeft size={14} /> Back
            </button>

            {/* Department Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
                <TabButton 
                    label="CSR" 
                    icon={<User size={14} />} 
                    isActive={activeTab === 'CSR'} 
                    onClick={() => setActiveTab('CSR')} 
                />
                <TabButton 
                    label="BDM" 
                    icon={<TrendingUp size={14} />} 
                    isActive={activeTab === 'BDM'} 
                    onClick={() => setActiveTab('BDM')} 
                />
                <TabButton 
                    label="Operations" 
                    icon={<Settings size={14} />} 
                    isActive={activeTab === 'Operations'} 
                    onClick={() => setActiveTab('Operations')} 
                />
                <TabButton 
                    label="Project Mgmt" 
                    icon={<FolderKanban size={14} />} 
                    isActive={activeTab === 'PM'} 
                    onClick={() => setActiveTab('PM')} 
                />
            </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end">
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-white bg-brand-orange rounded hover:bg-orange-600 transition-colors">
                Create Lead
             </button>
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
                Resend Invoice
             </button>
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                Cancel
             </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        
        {/* CSR TAB CONTENT (Standard Layout - No General Section) */}
        {activeTab === 'CSR' && (
            <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - MAIN FORMS */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Scope */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Type" value="insurance replacement valuation report" />
                                <FormRow label="Owner Builder" value={false} type="checkbox" />
                                <FormRow label="New Build" value={false} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={false} type="checkbox" />
                                <FormRow label="CC Cost Base" value={false} type="checkbox" />
                                <FormRow label="CC Year Built" value="" info />
                                <FormRow label="Report Send Off Conditions" value="Proceed Without Payment, 100% Payment Upon Completion – Report Uploaded to SF" type="multiline" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={false} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value="" />
                                <FormRow label="Steep or Difficult Access Site" value={false} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={false} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value="" />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={false} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={false} type="checkbox" />
                                <FormRow label="Building Works" value={false} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value="" />
                                <FormRow label="External Works & Services" value={false} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value="" />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={false} type="checkbox" />
                                <FormRow label="Fitout" value={false} type="checkbox" />
                                <FormRow label="Earthworks" value={false} type="checkbox" />
                                <FormRow label="Amenities" value={false} type="checkbox" />
                                <FormRow label="Other" value="" info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 2: Accounting */}
                    <FormSection title="Accounting">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Fee" value="$1,100.00" />
                                <FormRow label="Invoice Description" value="Provision of an insurance replacement valuation report for the house at 4 Appian Way Burwood NSW 2134" type="multiline" />
                                <FormRow label="Property Address On Invoice" value="30 Verona Range Como NSW 2226" info />
                                <FormRow label="Deposit Amount" value="" info />
                                <FormRow label="Invoice Deposit Paid" value="" />
                                <FormRow label="Deposit Received" value={false} type="checkbox" info />
                                <FormRow label="Deposit Reconciled Date" value="" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="DNS Invoice" value={false} type="checkbox" />
                                <FormRow label="Invoice Paid Date" value="" />
                                <FormRow label="Invoice Paid" value={false} type="checkbox" />
                                <FormRow label="Delay Invoice Reminder" value="" />
                                <FormRow label="Delay Invoice Reminder Reason" value="" />
                                <FormRow label="Trusted Reason" value="" info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 3: Report */}
                    <FormSection title="Report">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Documents Reviewed" value={false} type="checkbox" info />
                                <FormRow label="CC Documents Reviewed By" value="" info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value="" />
                                <FormRow label="Draft Report Send Via Email" value={false} type="checkbox" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Report Sent" value={false} type="checkbox" info />
                                <FormRow label="Report Uploaded" value="No" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 4: Request for Information */}
                    <FormSection title="Request for Information">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="CC Assign To Team - Leader" value="Edrian Pardillo" info />
                                <FormRow label="RFI Send Date" value="" />
                                <FormRow label="RFI Sender" value="" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="RFI Received Date" value="" />
                                <FormRow label="RFI Notes" value="" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 5: Property Details */}
                    <FormSection title="Property Details">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Property Type" value="House" />
                                <FormRow label="Property Address Street" value="30 Verona Range" />
                                <FormRow label="Property Address City" value="Como" />
                                <FormRow label="Property Address State" value="NSW" />
                                <FormRow label="Property Address Postcode" value="2226" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Scope of Works" value="" />
                                <FormRow label="LGA (Council)" value="Sutherland" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 6: Contact */}
                    <FormSection title="Contact">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Primary Contact Mobile" value="(02) 9262 4919" />
                                <FormRow label="Contact First Name" value="Damien" />
                                <FormRow label="Contact Last Name" value="Barker" />
                                <FormRow label="Contact Mobile" value="(02) 9262 4919" type="link" />
                                <FormRow label="Contact #2 First Name" value="" />
                                <FormRow label="Contact #2 Last Name" value="" />
                                <FormRow label="Contact #2 Email" value="" />
                                <FormRow label="Contact #2 Mobile" value="" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Primary Contact Email" value="damien@mgmca.com.au" type="link" />
                                <FormRow label="Contact Email" value="damien@mgmca.com.au" type="link" />
                                <FormRow label="Contact is Referral Partner" value="No" info />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 7: Ownership */}
                     <FormSection title="Ownership">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="First Name (Owner 1)" value="Damien" />
                                <FormRow label="First Name (Owner 2)" value="Kathleen" />
                                <FormRow label="First Name (Owner 3)" value="" />
                                <FormRow label="First Name (Owner 4)" value="" />
                                <FormRow label="First Name (Owner 5)" value="" />
                                <FormRow label="Owners" value="Damien & Kathleen Barker" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Last Name (Owner 1)" value="Barker" />
                                <FormRow label="Last Name (Owner 2)" value="Barker" />
                                <FormRow label="Last Name (Owner 3)" value="" />
                                <FormRow label="Last Name (Owner 4)" value="" />
                                <FormRow label="Last Name (Owner 5)" value="" />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 8: Inspection */}
                     <FormSection title="Inspection">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Inspection Booked by CC" value={true} type="checkbox" />
                                <FormRow label="Survey Type" value="Inspection" />
                                <FormRow label="Access Type" value="Owner Occupied" />
                                <FormRow label="Tenant info" value="Phil Jeffries - building foreman" />
                                <FormRow label="Booking Notes (Admin Only)" value="(04/12 DTB) LD called owner #not in use/sent email" />
                                <FormRow label="Instructions for Inspector" value="Building foreman Phil Jeffries on 0417 063 014" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Inspection Booked By" value="Jack Ho" type="link" />
                                <FormRow label="Inspector" value="Jack Ho" type="link" />
                                <FormRow label="Inspection Date (new)" value="9/12/2025" />
                                <FormRow label="Inspection Time (new)" value="10:30 AM" />
                                <FormRow label="Who Inspector is meet-ing on site" value="You are meeting the PM" />
                                <FormRow label="Inspection Outcome" value="Surveyed. Photos Uploaded." info />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar />
                </div>
            </div>
        )}

        {/* BDM TAB CONTENT (New DUOQS Layout) */}
        {activeTab === 'BDM' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - BDM View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: DUOQS - General */}
                    <FormSection title="DUOQS - General">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Conversion Date" value="4/12/2025" />
                                <FormRow label="Account Name" value="Damien ." type="link" />
                                <FormRow label="Deadline Date" value="12/12/2025" />
                                <FormRow label="Non-Negotiable Deadline Date" value={false} type="checkbox" />
                                <FormRow label="CC Check Date (Estimated)" value="" />
                                <FormRow label="Repeat Customer" value={true} type="checkbox" info />
                                <FormRow label="Fee Proposal Minimum Turnaround Date" value="" />
                                <FormRow label="Fee Proposal Maximum Turnaround Date" value="" />
                                <FormRow label="Invoice Paid Date" value="" />
                                <FormRow label="Proceed without Payment" value={true} type="checkbox" />
                                <FormRow label="Report Fee" value="$990.00" />
                                <FormRow label="Deposit Received" value={false} type="checkbox" info />
                                <FormRow label="Deposit Amount" value="" info />
                                <FormRow label="Log Opp Notes" value="" info />
                                <FormRow label="Opportunity Notes" value={opportunityNotes} type="multiline" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Report Type" value="cost estimate - progress claim report" />
                                <FormRow label="Entered By" value="Rina Aquino" type="link" info />
                                <FormRow label="Closed By" value="Steven Leuta" type="link" />
                                <FormRow label="Relationship Manager" value="James Li" type="link" />
                                <FormRow label="Referral Details" value="Masselos Grahame Masselos Pty Ltd > Damien Barker > $990" />
                                <FormRow label="CC Senior Onshore Estimator Incharge" value="" />
                                <FormRow label="CC Senior Offshore Estimator Incharge" value="" />
                                <FormRow label="CC Report Commencement Status" value="" />
                                <FormRow label="Account Opportunity Notes" value="" />
                                <FormRow label="Fillout Stage Instructions" value="" info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value="Email from client 05/12 - to be determined by ANZ if PC is required or not." info />
                            </div>
                        </div>
                    </FormSection>

                    <div className="px-1">
                        <FormRow label="IsOldXeroProcess" value={false} type="checkbox" />
                    </div>

                    {/* SECTION 2: Project Scope (BDM Version) */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                {/* BDM SPECIFIC: cost estimate - progress claim report */}
                                <FormRow label="Report Type" value="cost estimate - progress claim report" />
                                <FormRow label="Owner Builder" value={false} type="checkbox" />
                                <FormRow label="New Build" value={false} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={false} type="checkbox" />
                                <FormRow label="CC Cost Base" value={false} type="checkbox" />
                                <FormRow label="CC Year Built" value="" info />
                                <FormRow label="Report Send Off Conditions" value="Proceed Without Payment, 100% Payment Upon Completion – Report Uploaded to SF" type="multiline" />
                                <FormRow label="Draft Report Send Via Email" value={false} type="checkbox" info />
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={false} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value="" />
                                <FormRow label="Steep or Difficult Access Site" value={false} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={false} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value="" />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={false} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={false} type="checkbox" />
                                <FormRow label="Building Works" value={false} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value="" />
                                <FormRow label="External Works & Services" value={false} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value="" />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={false} type="checkbox" />
                                <FormRow label="Fitout" value={false} type="checkbox" />
                                <FormRow label="Earthworks" value={false} type="checkbox" />
                                <FormRow label="Amenities" value={false} type="checkbox" />
                                <FormRow label="Other" value="" info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 3: DUOQS Inspection */}
                    <FormSection title="DUOQS Inspection">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Survey Type" value="Inspection" />
                                <FormRow label="Inspection Booked By" value="Jack Ho" type="link" />
                                <FormRow label="Inspection Time (new)" value="10:30 AM" />
                                <FormRow label="Who Inspector is meeting on site" value="You are meeting the PM" />
                                <FormRow label="Inspection Outcome" value="Surveyed. Photos Uploaded." info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Inspection Booked by CC" value={true} type="checkbox" />
                                <FormRow label="Inspector" value="Jack Ho" type="link" />
                                <FormRow label="Inspector Fee" value="" />
                                <FormRow label="Instructions for Inspector" value="Building foreman Phil Jeffries on 0417 063 014" />
                                <FormRow label="Inspection Cancelled Reason" value="" info />
                                <FormRow label="Inspection Booked by Closed By" value={false} type="checkbox" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 4: Request for Information */}
                    <FormSection title="Request for Information">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="CC Assign To Team - Leader" value="Edrian Pardillo" info />
                                <FormRow label="RFI Send Date" value="" />
                                <FormRow label="RFI Sender" value="" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="RFI Received Date" value="" />
                                <FormRow label="RFI Notes" value="" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 5: Property Details */}
                    <FormSection title="Property Details">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Property Type" value="House" />
                                <FormRow label="Property Address Street" value="30 Verona Range" />
                                <FormRow label="Property Address City" value="Como" />
                                <FormRow label="Property Address State" value="NSW" />
                                <FormRow label="Property Address Postcode" value="2226" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Scope of Works" value="" />
                                <FormRow label="LGA (Council)" value="Sutherland" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 6: Contact */}
                    <FormSection title="Contact">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Primary Contact Mobile" value="(02) 9262 4919" />
                                <FormRow label="Contact First Name" value="Damien" />
                                <FormRow label="Contact Last Name" value="Barker" />
                                <FormRow label="Contact Mobile" value="(02) 9262 4919" type="link" />
                                <FormRow label="Contact #2 First Name" value="" />
                                <FormRow label="Contact #2 Last Name" value="" />
                                <FormRow label="Contact #2 Email" value="" />
                                <FormRow label="Contact #2 Mobile" value="" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Primary Contact Email" value="damien@mgmca.com.au" type="link" />
                                <FormRow label="Contact Email" value="damien@mgmca.com.au" type="link" />
                                <FormRow label="Contact is Referral Partner" value="No" info />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 7: Ownership */}
                     <FormSection title="Ownership">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="First Name (Owner 1)" value="Damien" />
                                <FormRow label="First Name (Owner 2)" value="Kathleen" />
                                <FormRow label="First Name (Owner 3)" value="" />
                                <FormRow label="First Name (Owner 4)" value="" />
                                <FormRow label="First Name (Owner 5)" value="" />
                                <FormRow label="Owners" value="Damien & Kathleen Barker" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Last Name (Owner 1)" value="Barker" />
                                <FormRow label="Last Name (Owner 2)" value="Barker" />
                                <FormRow label="Last Name (Owner 3)" value="" />
                                <FormRow label="Last Name (Owner 4)" value="" />
                                <FormRow label="Last Name (Owner 5)" value="" />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar />
                </div>
             </div>
        )}

        {/* OPERATIONS TAB CONTENT (New Layout) */}
        {activeTab === 'Operations' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - Operations View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Scope (Added) */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Type" value="cost estimate - progress claim report" />
                                <FormRow label="Owner Builder" value={false} type="checkbox" />
                                <FormRow label="New Build" value={false} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={false} type="checkbox" />
                                <FormRow label="CC Cost Base" value={false} type="checkbox" />
                                <FormRow label="CC Year Built" value="" info />
                                <FormRow label="Report Send Off Conditions" value="Proceed Without Payment, 100% Payment Upon Completion – Report Uploaded to SF" type="multiline" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={false} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value="" />
                                <FormRow label="Steep or Difficult Access Site" value={false} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={false} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value="" />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={false} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={false} type="checkbox" />
                                <FormRow label="Building Works" value={false} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value="" />
                                <FormRow label="External Works & Services" value={false} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value="" />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={false} type="checkbox" />
                                <FormRow label="Fitout" value={false} type="checkbox" />
                                <FormRow label="Earthworks" value={false} type="checkbox" />
                                <FormRow label="Amenities" value={false} type="checkbox" />
                                <FormRow label="Other" value="" info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 2: DUOQS - Operations */}
                    <FormSection title="DUOQS - Operations">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Deadline Date" value="12/12/2025" />
                                <FormRow label="CC Delegate List" value="" />
                                <FormRow label="CC Folder Name" value="CC382581-Como - [Cost Estimate - Progress Claim Report]" />
                                <FormRow label="Draft Report Send Via Email" value={false} type="checkbox" info />
                                <FormRow label="Draft Report Send Via Email Date" value="" />
                                <FormRow label="Days Since Draft Report Sent" value="0" />
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={false} type="checkbox" />
                                <FormRow label="Log Opp Notes" value="" info />
                                <FormRow label="Opportunity Notes" value={opportunityNotes} type="multiline" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Deadline Priority" value="Medium" />
                                <FormRow label="CC Senior Onshore Estimator Incharge" value="" />
                                <FormRow label="CC Senior Offshore Estimator Incharge" value="" />
                                <FormRow label="CC Cubit Fillout By" value="" />
                                <FormRow label="CC Excel Fillout By" value="" />
                                <FormRow label="CC Final Review By" value="" />
                                <FormRow label="Check By" value="" info />
                                <FormRow label="Fillout By" value="" info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value="Email from client 05/12 - to be determined by ANZ if PC is required or not." info />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar />
                </div>
             </div>
        )}

        {/* PM TAB CONTENT (New Project Management Layout) */}
        {activeTab === 'PM' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - PM View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Management */}
                    <FormSection title="Project Management">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Conversion Date" value="10/12/2025" />
                                <FormRow label="Account Name" value="Greg Rowell" type="link" />
                                <FormRow label="Deadline Date" value="16/12/2025" />
                                <FormRow label="Non-Negotiable Deadline Date" value={false} type="checkbox" />
                                <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value="" info />
                                <FormRow label="Documents Reviewed" value={false} type="checkbox" info />
                                <FormRow label="CC Documents Reviewed By" value="" info />
                                <FormRow label="Documents Reviewed Notes" value="" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Assign To Team" value="Team Green" info />
                                <FormRow label="CC Assign To Team - Leader" value="Angelo Encabo" info />
                                <FormRow label="CC Assign to Secondary Team" value="" info />
                                <FormRow label="CC Internal Take Off - Start Date" value="11/12/2025" />
                                <FormRow label="CC Internal Take Off - Completion Date" value="16/12/2025" />
                                <FormRow label="CC Final Review By" value="Gregory Christ" />
                                <FormRow label="CC Internal Checking - Start Date" value="16/12/2025" />
                                <FormRow label="CC Internal Checking - Completion Date" value="16/12/2025" />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar />
                </div>
             </div>
        )}

        {/* OTHER TABS (Placeholder) */}
        {activeTab !== 'CSR' && activeTab !== 'BDM' && activeTab !== 'Operations' && activeTab !== 'PM' && (
             <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Construction size={40} className="text-brand-orange opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">{activeTab} View</h3>
                <p className="text-sm">The {activeTab} details for this opportunity are under construction.</p>
             </div>
        )}

      </main>
    </div>
  );
};

// Internal Component for Tabs
const TabButton: React.FC<{
    label: string; 
    icon: React.ReactNode; 
    isActive: boolean; 
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
            isActive 
            ? 'bg-white text-brand-orange shadow-sm' 
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
        }`}
    >
        {icon}
        <span className="hidden xl:inline">{label}</span>
        <span className="xl:hidden">{label.split(' ')[0]}</span>
    </button>
);

// FeedItem Component
interface FeedItemProps {
    user?: string;
    action?: string;
    time: string;
    avatarBg?: string;
    avatarColor?: string;
    initials?: string;
    noAvatar?: boolean;
    title?: string;
    children?: React.ReactNode;
}

const FeedItem: React.FC<FeedItemProps> = ({ 
    user, 
    action, 
    time, 
    avatarBg, 
    avatarColor, 
    initials, 
    noAvatar, 
    title, 
    children 
}) => {
    return (
        <div className="flex gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group">
            {!noAvatar ? (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarBg || 'bg-gray-200'} ${avatarColor || 'text-gray-600'}`}>
                    {initials}
                </div>
            ) : (
                <div className="w-8 flex justify-center flex-shrink-0 pt-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
            )}
            
            <div className="flex-1">
                <div className="text-xs text-gray-800">
                    {title ? (
                        <span className="font-medium text-gray-500">{title}</span>
                    ) : (
                        <>
                            <span className="font-bold text-blue-600 hover:underline cursor-pointer">{user}</span> <span className="text-gray-700">{action}</span>
                        </>
                    )}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">{time}</div>
                
                {children && <div className="mt-1">{children}</div>}
            </div>
        </div>
    );
};

// Extracted Right Sidebar Component
const RightSidebar = () => (
    <div className="space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
                <button className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#b45309]">
                Copy CC Fillout Data
                </button>
                <button className="w-full bg-[#991B1B] hover:bg-[#7f1d1d] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#7f1d1d]">
                Copy CC Folder Name
                </button>
                <button className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#b45309]">
                Copy CC Tracker Data
                </button>
        </div>

        {/* Awaiting Payment Widget */}
        <FormSection title="Awaiting Payment" icon={<Crown size={14} className="text-white" />} defaultOpen>
                <div className="grid grid-cols-2 gap-4">
                <FormRow label="Payment Follow Up Outcome" value="" info />
                <FormRow label="Last Payment Reminder Sent" value="4/12/2025" />
                <FormRow label="Delay Invoice Reminder" value="" />
                <FormRow label="Delay Invoice Reminder Reason" value="" />
                <div className="col-span-2">
                    <FormRow label="Log Payment Notes" value="" />
                </div>
                <div className="col-span-2">
                    <FormRow label="Awaiting Payment Notes" value="" info />
                </div>
                <FormRow label="DNS Invoice" value={true} type="checkbox" />
                <FormRow label="DNP until full payment is received" value={false} type="checkbox" info />
                </div>
        </FormSection>

        {/* Aircall / Chatter Feed Widget */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                    <span className="bg-[#F472B6] p-1 rounded-sm"><Archive size={12} className="text-white" /></span>
                    <h3 className="text-sm font-bold text-gray-800">Aircall (Customer) for Parent Contact (0)</h3>
                    </div>
            </div>

            {/* Tabs */}
            <div className="flex text-xs font-semibold text-gray-600 border-b border-gray-200 bg-white">
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">SMS/Email</div>
                <div className="px-4 py-3 cursor-pointer text-gray-800 border-b-2 border-brand-orange bg-gray-50">Chatter</div>
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">History</div>
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">Related</div>
            </div>

            {/* Composer */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-0 border border-gray-300 rounded overflow-hidden mb-2">
                    <button className="flex-1 py-1.5 bg-white text-xs font-medium text-gray-700 border-r border-gray-200">Post</button>
                    <button className="flex-1 py-1.5 bg-gray-100 text-xs font-medium text-gray-500 hover:bg-white">Poll</button>
                </div>
                <div className="border border-gray-300 rounded bg-white p-2">
                    <input className="w-full text-sm outline-none text-gray-600 placeholder-gray-400 mb-2" placeholder="Share an update..." />
                    <div className="flex justify-end">
                        <button className="bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-bold py-1 px-4 rounded">Share</button>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-white border-b border-gray-100">
                <button className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50"><ListFilter size={14} className="text-gray-500" /></button>
                <div className="flex-1 relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded text-xs outline-none" placeholder="Search this feed..." />
                </div>
                <button className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50"><RefreshCw size={14} className="text-gray-500" /></button>
            </div>

            {/* Feed Stream */}
            <div className="bg-white max-h-[500px] overflow-y-auto">
                
                {/* Item 1 */}
                <FeedItem 
                    user="Cost Consultants" 
                    action="updated this record." 
                    time="16h ago" 
                    avatarBg="bg-blue-100"
                    avatarColor="text-blue-600"
                    initials="CC"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
                        <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                        <div>Surveying to Review Documents</div>
                    </div>
                </FeedItem>

                {/* Item 2 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="updated this record." 
                    time="23h ago" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
                        <div className="font-medium text-gray-500 text-[10px] uppercase">Deadline Date</div>
                        <div>A blank value to 12/12/2025</div>
                    </div>
                </FeedItem>

                {/* Item 3 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="to Duo Tax Quantity Surveyors Only" 
                    time="23h ago" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-800 mt-1">JH has set the Deadline Date to 2025-12-12</div>
                    <div className="text-[10px] text-gray-400 mt-1">1 view</div>
                </FeedItem>

                {/* Item 4 */}
                <FeedItem 
                    noAvatar
                    title="This record was updated."
                    time="8 December 2025 at 10:14 AM"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2 space-y-2">
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Bookings to Surveying</div>
                        </div>
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Review Documents to Bookings</div>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                        <span className="text-xs text-blue-500 hover:underline cursor-pointer">Show All Updates</span>
                    </div>
                </FeedItem>

                {/* Item 5 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="to Duo Tax Quantity Surveyors Only" 
                    time="8 December 2025 at 12:09 PM" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-800 mt-1">Confirmation inspection time (2025-12-09) sent to tenant.</div>
                    <div className="text-[10px] text-gray-400 mt-1">1 view</div>
                </FeedItem>

                    {/* Item 6 */}
                    <FeedItem 
                    noAvatar
                    title="This record was updated."
                    time="8 December 2025 at 10:11 AM"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2 space-y-2">
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Fillout to Fillout</div>
                        </div>
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Review Documents to Fillout</div>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                        <span className="text-xs text-blue-500 hover:underline cursor-pointer">Show All Updates</span>
                    </div>
                </FeedItem>

                    {/* Item 7 */}
                    <FeedItem 
                    user="Jack Ho" 
                    action="updated this record." 
                    time="5 December 2025 at 2:21 PM" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
                        <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                        <div>Bookings to Awaiting Information</div>
                    </div>
                </FeedItem>

            </div>
        </div>
    </div>
);

export default OpportunityDetailPage;

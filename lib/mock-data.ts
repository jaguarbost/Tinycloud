// Static mock data for TinyCloud. No backend — everything here is hardcoded
// sample content used to render the product demo end to end.

export type ToolStatus = "active" | "sleeping" | "archived" | "in-review";
export type RiskLevel = "low" | "medium" | "high";

export interface Owner {
  name: string;
  initials: string;
  role: string;
  team: string;
}

export const currentUser: Owner = {
  name: "Priya Nair",
  initials: "PN",
  role: "Operations Program Manager",
  team: "Revenue Operations",
};

export const workspace = {
  name: "Northwind Labs",
  domain: "northwindlabs.tinycloud.app",
  plan: "Business",
};

export interface Connector {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "connected" | "available" | "pending";
  toolsUsing: number;
  owner?: string;
  lastSynced?: string;
}

export const connectors: Connector[] = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "Data source",
    description: "Read and write ranges in shared spreadsheets.",
    status: "connected",
    toolsUsing: 6,
    owner: "IT Platform",
    lastSynced: "3 minutes ago",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Notifications",
    description: "Post updates and approvals to channels or DMs.",
    status: "connected",
    toolsUsing: 9,
    owner: "IT Platform",
    lastSynced: "1 minute ago",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Look up and update accounts, contacts, and opportunities.",
    status: "connected",
    toolsUsing: 3,
    owner: "RevOps",
    lastSynced: "18 minutes ago",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data warehouse",
    description: "Query governed tables for reporting tools.",
    status: "connected",
    toolsUsing: 2,
    owner: "Data Platform",
    lastSynced: "1 hour ago",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "Marketing",
    description: "Sync form submissions and marketing lists.",
    status: "available",
    toolsUsing: 0,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Billing",
    description: "Read invoice and subscription data (read-only).",
    status: "available",
    toolsUsing: 0,
  },
  {
    id: "jira",
    name: "Jira",
    category: "Engineering",
    description: "Create and update issues from tool actions.",
    status: "available",
    toolsUsing: 0,
  },
  {
    id: "workday",
    name: "Workday",
    category: "HR",
    description: "Reference org and headcount data (read-only).",
    status: "pending",
    toolsUsing: 0,
    owner: "People Ops — awaiting security review",
  },
];

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  owner: Owner;
  status: ToolStatus;
  risk: RiskLevel;
  createdAt: string;
  lastUsedAt: string;
  weeklyUsers: number;
  totalRuns: number;
  connectors: string[];
  dataSensitivity: "none" | "internal" | "confidential";
  department: string;
  trend: number[];
}

export const tools: Tool[] = [
  {
    id: "t1",
    slug: "vendor-quote-comparator",
    name: "Vendor Quote Comparator",
    description:
      "Upload vendor quotes and instantly compare unit pricing, lead time, and total cost across suppliers.",
    category: "Procurement",
    owner: { name: "Priya Nair", initials: "PN", role: "Operations Program Manager", team: "RevOps" },
    status: "active",
    risk: "medium",
    createdAt: "2025-11-02",
    lastUsedAt: "2 hours ago",
    weeklyUsers: 24,
    totalRuns: 812,
    connectors: ["google-sheets", "slack"],
    dataSensitivity: "internal",
    department: "Procurement",
    trend: [4, 6, 5, 9, 12, 10, 14],
  },
  {
    id: "t2",
    slug: "on-call-handoff-log",
    name: "On-call Handoff Log",
    description:
      "Structured handoff notes for the on-call rotation, with open incidents carried forward automatically.",
    category: "Engineering",
    owner: { name: "Diego Alonso", initials: "DA", role: "Staff Engineer", team: "Platform" },
    status: "active",
    risk: "low",
    createdAt: "2025-08-14",
    lastUsedAt: "35 minutes ago",
    weeklyUsers: 18,
    totalRuns: 1204,
    connectors: ["slack", "jira"],
    dataSensitivity: "internal",
    department: "Engineering",
    trend: [10, 11, 9, 13, 12, 15, 16],
  },
  {
    id: "t3",
    slug: "interview-scorecard",
    name: "Interview Scorecard",
    description:
      "Collects structured interviewer feedback and rolls it up into a single hiring-panel summary.",
    category: "People",
    owner: { name: "Jonah Kwan", initials: "JK", role: "Recruiting Lead", team: "People" },
    status: "active",
    risk: "medium",
    createdAt: "2025-09-30",
    lastUsedAt: "1 day ago",
    weeklyUsers: 31,
    totalRuns: 640,
    connectors: ["google-sheets"],
    dataSensitivity: "confidential",
    department: "People",
    trend: [8, 9, 7, 10, 9, 11, 9],
  },
  {
    id: "t4",
    slug: "expense-approval-tracker",
    name: "Expense Approval Tracker",
    description:
      "Lightweight queue for manager approvals on expenses over policy threshold, with audit trail.",
    category: "Finance",
    owner: { name: "Sara Whitfield", initials: "SW", role: "Finance Manager", team: "Finance" },
    status: "in-review",
    risk: "high",
    createdAt: "2025-12-11",
    lastUsedAt: "4 hours ago",
    weeklyUsers: 12,
    totalRuns: 96,
    connectors: ["salesforce", "slack"],
    dataSensitivity: "confidential",
    department: "Finance",
    trend: [1, 2, 3, 5, 6, 8, 9],
  },
  {
    id: "t5",
    slug: "event-rsvp-board",
    name: "Event RSVP Board",
    description:
      "Simple RSVP + seating tracker for internal events, synced to a shared Google Sheet.",
    category: "Operations",
    owner: { name: "Mei Sasaki", initials: "MS", role: "Workplace Coordinator", team: "Facilities" },
    status: "sleeping",
    risk: "low",
    createdAt: "2025-06-19",
    lastUsedAt: "41 days ago",
    weeklyUsers: 0,
    totalRuns: 233,
    connectors: ["google-sheets"],
    dataSensitivity: "none",
    department: "Facilities",
    trend: [6, 4, 3, 1, 0, 0, 0],
  },
  {
    id: "t6",
    slug: "churn-risk-notes",
    name: "Churn Risk Notes",
    description:
      "Account health notes pulled from Salesforce with a manual risk flag for CSMs.",
    category: "Customer Success",
    owner: { name: "Priya Nair", initials: "PN", role: "Operations Program Manager", team: "RevOps" },
    status: "active",
    risk: "high",
    createdAt: "2025-10-08",
    lastUsedAt: "12 minutes ago",
    weeklyUsers: 19,
    totalRuns: 355,
    connectors: ["salesforce", "snowflake"],
    dataSensitivity: "confidential",
    department: "Customer Success",
    trend: [3, 5, 6, 8, 10, 9, 13],
  },
  {
    id: "t7",
    slug: "warehouse-shift-swap",
    name: "Warehouse Shift Swap",
    description:
      "Lets warehouse staff propose and approve shift swaps without spreadsheet chaos.",
    category: "Operations",
    owner: { name: "Leah Osei", initials: "LO", role: "Ops Manager", team: "Fulfillment" },
    status: "archived",
    risk: "low",
    createdAt: "2025-02-27",
    lastUsedAt: "118 days ago",
    weeklyUsers: 0,
    totalRuns: 421,
    connectors: [],
    dataSensitivity: "internal",
    department: "Fulfillment",
    trend: [2, 1, 1, 0, 0, 0, 0],
  },
  {
    id: "t8",
    slug: "brand-asset-request",
    name: "Brand Asset Request",
    description:
      "Intake form for one-off design requests, auto-routed to the right designer by asset type.",
    category: "Marketing",
    owner: { name: "Owen Farrell", initials: "OF", role: "Brand Designer", team: "Marketing" },
    status: "active",
    risk: "low",
    createdAt: "2025-11-20",
    lastUsedAt: "3 hours ago",
    weeklyUsers: 15,
    totalRuns: 88,
    connectors: ["slack"],
    dataSensitivity: "none",
    department: "Marketing",
    trend: [1, 3, 4, 5, 7, 6, 8],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export interface ApprovalRequest {
  id: string;
  toolName: string;
  toolSlug: string;
  requester: Owner;
  submittedAt: string;
  reason: string;
  risk: RiskLevel;
  dataSensitivity: "none" | "internal" | "confidential";
  connectorsRequested: string[];
  estimatedUsers: number;
}

export const approvals: ApprovalRequest[] = [
  {
    id: "a1",
    toolName: "Expense Approval Tracker",
    toolSlug: "expense-approval-tracker",
    requester: { name: "Sara Whitfield", initials: "SW", role: "Finance Manager", team: "Finance" },
    submittedAt: "2 hours ago",
    reason: "Needs write access to Salesforce opportunity records to flag over-budget expenses.",
    risk: "high",
    dataSensitivity: "confidential",
    connectorsRequested: ["salesforce", "slack"],
    estimatedUsers: 40,
  },
  {
    id: "a2",
    toolName: "Partner NPS Digest",
    toolSlug: "partner-nps-digest",
    requester: { name: "Kwame Asante", initials: "KA", role: "Partner Manager", team: "Partnerships" },
    submittedAt: "6 hours ago",
    reason: "Weekly digest of partner NPS scores pulled from Snowflake, posted to Slack.",
    risk: "medium",
    dataSensitivity: "internal",
    connectorsRequested: ["snowflake", "slack"],
    estimatedUsers: 8,
  },
  {
    id: "a3",
    toolName: "Contractor Access Review",
    toolSlug: "contractor-access-review",
    requester: { name: "Nina Popescu", initials: "NP", role: "IT Security Analyst", team: "IT Security" },
    submittedAt: "1 day ago",
    reason: "Quarterly review checklist referencing Workday contractor records.",
    risk: "high",
    dataSensitivity: "confidential",
    connectorsRequested: ["workday"],
    estimatedUsers: 5,
  },
  {
    id: "a4",
    toolName: "Swag Order Form",
    toolSlug: "swag-order-form",
    requester: { name: "Mei Sasaki", initials: "MS", role: "Workplace Coordinator", team: "Facilities" },
    submittedAt: "1 day ago",
    reason: "Internal swag request form syncing to a Google Sheet inventory tracker.",
    risk: "low",
    dataSensitivity: "none",
    connectorsRequested: ["google-sheets"],
    estimatedUsers: 60,
  },
];

export interface LifecycleItem {
  toolSlug: string;
  toolName: string;
  owner: Owner;
  status: ToolStatus;
  daysInactive: number;
  suggestedAction: "sleep" | "archive" | "decommission" | "keep";
  weeklyUsers: number;
}

export const lifecycleItems: LifecycleItem[] = [
  {
    toolSlug: "event-rsvp-board",
    toolName: "Event RSVP Board",
    owner: { name: "Mei Sasaki", initials: "MS", role: "Workplace Coordinator", team: "Facilities" },
    status: "sleeping",
    daysInactive: 41,
    suggestedAction: "archive",
    weeklyUsers: 0,
  },
  {
    toolSlug: "warehouse-shift-swap",
    toolName: "Warehouse Shift Swap",
    owner: { name: "Leah Osei", initials: "LO", role: "Ops Manager", team: "Fulfillment" },
    status: "archived",
    daysInactive: 118,
    suggestedAction: "decommission",
    weeklyUsers: 0,
  },
  {
    toolSlug: "vendor-quote-comparator",
    toolName: "Vendor Quote Comparator",
    owner: { name: "Priya Nair", initials: "PN", role: "Operations Program Manager", team: "RevOps" },
    status: "active",
    daysInactive: 0,
    suggestedAction: "keep",
    weeklyUsers: 24,
  },
  {
    toolSlug: "brand-asset-request",
    toolName: "Brand Asset Request",
    owner: { name: "Owen Farrell", initials: "OF", role: "Brand Designer", team: "Marketing" },
    status: "active",
    daysInactive: 0,
    suggestedAction: "keep",
    weeklyUsers: 15,
  },
  {
    toolSlug: "q3-budget-scratchpad",
    toolName: "Q3 Budget Scratchpad",
    owner: { name: "Sara Whitfield", initials: "SW", role: "Finance Manager", team: "Finance" },
    status: "sleeping",
    daysInactive: 29,
    suggestedAction: "sleep",
    weeklyUsers: 0,
  },
];

export const governanceMetrics = {
  totalTools: 42,
  activeTools: 27,
  sleepingTools: 8,
  archivedTools: 7,
  ownedByHuman: 41,
  orphaned: 1,
  policyCompliant: 39,
  avgApprovalHours: 6.4,
  riskBreakdown: { low: 24, medium: 13, high: 5 },
  departmentUsage: [
    { department: "RevOps", tools: 9, users: 64 },
    { department: "Engineering", tools: 7, users: 41 },
    { department: "Finance", tools: 6, users: 38 },
    { department: "People", tools: 5, users: 52 },
    { department: "Marketing", tools: 6, users: 29 },
    { department: "Facilities", tools: 5, users: 21 },
    { department: "Fulfillment", tools: 4, users: 17 },
  ],
  monthlyTrend: [
    { month: "Jul", created: 4, decommissioned: 1 },
    { month: "Aug", created: 6, decommissioned: 2 },
    { month: "Sep", created: 5, decommissioned: 1 },
    { month: "Oct", created: 8, decommissioned: 3 },
    { month: "Nov", created: 7, decommissioned: 2 },
    { month: "Dec", created: 9, decommissioned: 4 },
  ],
};

export const recentActivity = [
  { actor: "Diego Alonso", action: "published", target: "On-call Handoff Log", time: "35m ago" },
  { actor: "Priya Nair", action: "requested a connector for", target: "Churn Risk Notes", time: "2h ago" },
  { actor: "Governance bot", action: "flagged inactivity on", target: "Event RSVP Board", time: "3h ago" },
  { actor: "Sara Whitfield", action: "submitted for review", target: "Expense Approval Tracker", time: "4h ago" },
  { actor: "Jonah Kwan", action: "shared", target: "Interview Scorecard", time: "1d ago" },
];

export const examplePrompts = [
  "A form for teammates to request AV equipment for events, with a fulfillment checklist",
  "A dashboard that compares this week's support ticket volume against the last 8 weeks",
  "A tool that lets managers approve or deny expense reports over $500 with one click",
  "A scorecard that averages interview panel ratings and flags split decisions",
];

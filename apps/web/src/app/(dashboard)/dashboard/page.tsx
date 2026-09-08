import { DashboardHeader } from "./components/dashboard-header";
import { StatsGrid } from "./components/stats-grid";
import { RecentForms } from "./components/recent-forms";
import { ResponseActivity } from "./components/response-activity";

export default function DashboardPage() {
  const dummyForms = [
    {
      id: "form_001",
      title: "Customer Feedback",
      status: "published" as const,
      responseCount: 128,
      updatedAt: "2 hours ago",
    },
    {
      id: "form_002",
      title: "Event Registration",
      status: "published" as const,
      responseCount: 84,
      updatedAt: "Yesterday",
    },
    {
      id: "form_003",
      title: "Product Waitlist",
      status: "draft" as const,
      responseCount: 0,
      updatedAt: "2 days ago",
    },
    {
      id: "form_004",
      title: "Job Application",
      status: "published" as const,
      responseCount: 56,
      updatedAt: "3 days ago",
    },
    {
      id: "form_005",
      title: "Contact Form",
      status: "draft" as const,
      responseCount: 0,
      updatedAt: "5 days ago",
    },
  ];

  const dummyResponses = [
    {
      id: "response_001",
      formId: "form_001",
      formTitle: "Customer Feedback",
      respondent: "Anonymous respondent",
      submittedAt: "2 min ago",
    },
    {
      id: "response_002",
      formId: "form_002",
      formTitle: "Event Registration",
      respondent: "Anonymous respondent",
      submittedAt: "18 min ago",
    },
    {
      id: "response_003",
      formId: "form_001",
      formTitle: "Customer Feedback",
      respondent: "Anonymous respondent",
      submittedAt: "42 min ago",
    },
    {
      id: "response_004",
      formId: "form_004",
      formTitle: "Job Application",
      respondent: "Anonymous respondent",
      submittedAt: "1 hr ago",
    },
  ];

  return (
    <div className="px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />

        <StatsGrid />

        <RecentForms forms={dummyForms} />

        <ResponseActivity responses={dummyResponses} />
      </div>
    </div>
  );
}

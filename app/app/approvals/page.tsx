import { AppTopbar } from "@/components/app-topbar";
import { ApprovalsQueue } from "@/components/approvals-queue";
import { approvals } from "@/lib/mock-data";

export const metadata = { title: "Approvals" };

export default function ApprovalsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar
        title="Approvals"
        description="Review connector and access requests before they go live."
      />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <ApprovalsQueue requests={approvals} />
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import SubmitTestimonial from "@/components/SubmitTestimonial";

export default async function FeedbackPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Share Feedback</h1>
          <p className="text-sm text-slate-500 mt-1">Share your experience with MediScript-E</p>
        </div>
        <SubmitTestimonial />
      </div>
    </DashboardLayout>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import ContactMessages from "@/components/ContactMessages";

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Contact Messages</h1>
          <p className="text-sm text-slate-500 mt-1">View messages from the contact form</p>
        </div>
        <ContactMessages />
      </div>
    </DashboardLayout>
  );
}

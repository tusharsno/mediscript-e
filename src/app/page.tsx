import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <LandingPage isLoggedIn={!!session} />
  );
}
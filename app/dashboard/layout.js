import { redirect } from "next/navigation";
import { auth } from "@/libs/auth";
import config from "@/config";

// Server-side component ensuring user authentication.
// Unauthenticated users are redirected to the login page.
// Applied to all /dashboard subpages within /app/dashboard/*** routes
// Custom static UI elements (Navbar, Sidebar, Footer, etc.) can be added here.
// Reference: https://docs.codelaunch.today/tutorials/private
export default async function LayoutPrivate({ children }) {
  const session = await auth();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return <>{children}</>;
}

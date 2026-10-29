import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: { default: "Admin dashboard", template: "%s · BAOSWITCH Admin" },
  // The console is never a search result.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell breadcrumb="Overview">{children}</AdminShell>;
}

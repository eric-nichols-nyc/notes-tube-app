import type { Metadata } from "next";
import { DashboardBar } from "./_components/dashboard-sidebar";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <DashboardBar />
      {children}
    </div>
  );
}

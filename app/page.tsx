import Image from "next/image";
import { DashboardHeader } from "./(dashboard)/dashboard/_components/dashboard-header";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <div className="h-32 rounded-lg bg-gray-200">Notes Tube</div>
      <div className="h-32 rounded-lg bg-gray-200">image </div>
    </div>
  );
}

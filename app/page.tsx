import Image from "next/image";
import { DashboardHeader } from "./(dashboard)/dashboard/_components/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="flex justify-between shadow-md p-2">
        <h1>Notes Tube</h1>
        <Link href="/sign-in">
        <Button>Login</Button>
        </Link>
      </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <div className="h-32 rounded-lg bg-gray-200">copy here</div>
      <div className="h-32 rounded-lg bg-gray-200">image </div>
    </div></div>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export const MarketingNavbar = () => {
  return (
    <div className="flex justify-between shadow-md p-2">
      <div className="flex gap-2 items-center text-lg font-bold tracking-tight transition-colors cursor-pointer hover:text-primary focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900">
        <Image src="/images/logoipsum.svg" alt="logo" width={24} height={24} />
        <h1>NotesTube</h1>
      </div>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </SignedIn>
    </div>
  );
};

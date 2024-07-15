import Image from "next/image";
import { DashboardHeader } from "./(dashboard)/dashboard/_components/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <div className="flex justify-between shadow-md p-2">
        <div className="flex gap-2 items-center text-lg font-bold tracking-tight transition-colors cursor-pointer hover:text-primary focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900">
          <Image
            src="/images/logoipsum.svg"
            alt="logo"
            width={24}
            height={24}
          />
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
      <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-screen px-3 rounded-lg bg-gray-200 flex flex-col align-center">
          <h1 className="text-4xl mt-10 font-semibold mb-4">
            AI Summarizer & Generator for Enhanced Learning
          </h1>
          <h4>
            NoteGPT - YouTube Video Summarizer, PDF Summary, PPT Summary, Image
            Summaries, and more. Create PPTs, Mindmaps, and Notes with NoteGPT
            AI. Improve your learning efficiency by 10x.
          </h4>
        </div>
        <div className="h-screen w-full">
          <div className="h-full w-full flex align-center justify-center">
            <Image
              src="/images/landing.png"
              alt="Photo by Drew Beamer"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

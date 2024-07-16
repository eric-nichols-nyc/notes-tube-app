import Image from "next/image";
import { DashboardHeader } from "../(dashboard)/dashboard/_components/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>

    <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <div className="h-screen px-3 rounded-lg bg-gray-200 flex flex-col align-center">
        <h1 className="text-4xl mt-10 font-semibold mb-4">AI Summarizer & Generator for Enhanced Learning</h1>
        <h4>NoteGPT - YouTube Video Summarizer, PDF Summary, PPT Summary, Image Summaries, and more. Create PPTs, Mindmaps, and Notes with NoteGPT AI. Improve your learning efficiency by 10x.</h4>
      </div>
      <div className="h-screen w-full bg-gray-200 rounded-lg overflow-hidden">
        <div className="h-full w-full flex align-center justify-center">
            <Image src="/images/landing.png" alt="Photo by Drew Beamer" width={500} height={500} className="rounded-md object-cover" />
        </div>
      </div>
    </div></div>
  );
}

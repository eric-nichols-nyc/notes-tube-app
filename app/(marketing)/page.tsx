import Image from "next/image";
import { DashboardHeader } from "../(dashboard)/dashboard/_components/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-screen w-full px-3 rounded-lg bg-gray-200 flex flex-col align-center">
          <h1 className="text-4xl mt-10 font-semibold mb-4">
            AI Summarizer & Generator for Enhanced Learning
          </h1>
          <div className="text-sm flex flex-col gap-4">
          <p>
          Discover the ultimate YouTube companion with our new app, designed to revolutionize how you consume video content. Say goodbye to endless scrolling and guessing games with our innovative summarization feature that distills YouTube videos into concise, informative summaries. Now you can quickly grasp the key points of any video before committing your valuable time.          
          </p>
          <p>
          Whether you’re a busy professional, student, or just someone who loves to stay informed, our app ensures you get the essence of each video in just a few seconds. Simplify your viewing experience and make smarter choices with our game-changing app today!
          </p>
          </div>
     
          <div className="mt-8 flex w-full border">
            <Link href="/youtube-video-summarizer">
              <Button>Try it out!</Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex h-screen w-full bg-gray-200 rounded-lg overflow-hidden">
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

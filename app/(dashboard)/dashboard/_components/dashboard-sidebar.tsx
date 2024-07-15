import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { Notebook, PlusCircle } from "lucide-react";
export const DashboardBar = () => {
  return (
    <div>
      <header>
      <div className="flex w-[256px] h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
              <Link href="/">
              <span className="grid h-10  place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                Logo
              </span>
              </Link>
              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    href="/dashboard/create"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    <PlusCircle size={16} className="inline-block mr-2" />
                    Create
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    <Notebook size={16} className="inline-block mr-2" />
                    <span className="text-sm font-medium"> Notes </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <div className="p-7">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
      </header>
    </div>
  );
};

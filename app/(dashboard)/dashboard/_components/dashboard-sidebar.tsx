import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
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
                  <a
                    href="#"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    Create
                  </a>
                </li>

                <li>
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium"> Notes </span>
                  </summary>
                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Banned Users
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Calendar
                      </a>
                    </li>
                  </ul>
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

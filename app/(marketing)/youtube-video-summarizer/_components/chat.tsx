import { Input } from "@/components/ui/input";
import React from "react";

export const Chat = () => {
  return (
    <div className="container h-72 bg-background flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4 pt-3">
          <div className="grid gap-1.5">
            <div>👋
            Hi, I&apos;m your AI video assistant. Feel free to ask me anything about this video</div>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Input placeholder="Ask me anything about this video." className="w-full" />
      </div>
    </div>
  );
};

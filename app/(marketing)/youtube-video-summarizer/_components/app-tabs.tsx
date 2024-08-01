/**
 * v0 by Vercel.
 * @see https://v0.dev/t/psftlp3L2Cw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "lucide-react";
import { Chat } from "./chat";
import {Transcript} from "./summary-form";
import { Button } from "@/components/ui/button";

interface AppTabsProps {
  transcript: Transcript[];
  markdown: string;
}

export default function AppTabs({ transcript, markdown }: AppTabsProps) {
  const content = transcript.map((tag) => tag.text).join(" ");
  return (
    <Tabs defaultValue="summary" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-3 h-10">
      <TabsTrigger value="summary">AI Summary</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="chat">AI Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript">
        <Card>
          <CardContent className="space-y-2">
          {transcript.length > 0 && (
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {transcript?.map((tag) => (
                  <>
                    <div key={tag.offset} className="tflex gap-2 ext-sm">
                      <Button size="sm" className="bg-slate-300 inline-flex items-center mr-2 text-blue-500">
                        <ClockIcon size={16} className="inline mr-1" />
                        {tag.offset}
                      </Button>
                     <span>
                      {tag.text}
                     </span>
                    </div>
                    <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="summary">
        <Card>
          <CardContent className="space-y-2">
          <ScrollArea className="h-72 w-full rounded-md border p-4">
                <Markdown>{markdown}</Markdown>
              </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chat">
       <Chat content={content} />
      </TabsContent>
    </Tabs>
  );
}

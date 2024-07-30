/**
 * v0 by Vercel.
 * @see https://v0.dev/t/psftlp3L2Cw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "lucide-react";
import { Chat } from "./chat";

interface AppTabsProps {
  transcript: string[];
  copy: string;
}

export default function AppTabs({ transcript, copy }: AppTabsProps) {
  return (
    <Tabs defaultValue="summary" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-3 h-10">
      <TabsTrigger value="summary">AI Summary</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript">
        <Card>
          <CardContent className="space-y-2">
          {transcript.length > 0 && (
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {transcript?.map((tag) => (
                  <>
                    <div key={tag} className="text-sm">
                      <ClockIcon size={16} className="inline mr-2" />
                      {tag}
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
                <Markdown>{copy}</Markdown>
              </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chat">
       <Chat />
      </TabsContent>
    </Tabs>
  );
}

"use client";
import { createTranscript, streamAndSummarizeContent } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readStreamableValue } from "ai/rsc";
import Markdown from "react-markdown";
import React from "react";
import { YTPlayer } from "@/components/youtube-player";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";

export const SumamryForm = () => {
  const [copy, setCopy] = React.useState<string | any>(undefined);
  const [transcript, setTranscript] = React.useState<string[]>([]);
  const [videoId, setVideoId] = React.useState<string | any>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  function getYouTubeVideoID(url: string) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function validateYouTubeUrl(url: string) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  }

  function reduceTextItems(array: any[]) {
    let result = "";
    array.forEach((obj) => {
      setTranscript((prev) => [...prev, Math.floor(obj.offset)+' '+obj.text]);
      result += obj.text;
    });
    return result;
  }

  const handleSubmit = async (data: FormData) => {
    const url = data.get("url") as string;
    console.log(url);
    if (!url) {
      alert("url is required");
      return;
    }
    // if url is not from youtube, return error message
    if (!validateYouTubeUrl(url)) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    // get id from youtube url else show error message
    const videoId = getYouTubeVideoID(url);

    if (!videoId) {
      alert("Video ID could not be found");
      return;
    }
    setVideoId(videoId);

    // get transcript from youtube api
    try {
      const transcript = (await createTranscript(url)) as any;
      console.log(transcript);

      if (Array.isArray(transcript)) {
        const reducedText = reduceTextItems(transcript);
        if (reducedText) {
          console.log("reduced text created");
          const summary = await streamAndSummarizeContent(reducedText);

          if (!summary) {
            console.log("result is empty");
            return;
          }
          console.log("summary text created", videoId);
          for await (const delta of readStreamableValue(summary))
            setCopy(delta ?? "");
        } else {
          console.log("No transcript found");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="flex gap-2 mb-10">
        <Input name="url" placeholder="Enter the URL of the video" />
        <Button
          type="submit"
          onClick={() => {
            setIsLoading(true);
            setVideoId(undefined);
            setCopy(undefined);
            setTranscript([]);
          }}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Please wait
            </>
          ) : (
            "Generate Summary"
          )}
        </Button>
      </form>
      {copy && videoId && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          <div className="grid-cols-1">
            <YTPlayer videoId={videoId} title="Video Title" />
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Transcript
                </h4>
                {transcript?.map((tag) => (
                  <>
                    <div key={tag} className="text-sm">
                      {tag}
                    </div>
                    <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="grid-cols-1">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <Markdown>{copy}</Markdown>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};
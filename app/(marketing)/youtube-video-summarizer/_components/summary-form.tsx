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
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { toast } from "sonner";
import AppTabs from "./app-tabs";

export type Transcript = {
  text: string;
  duration: number;
  offset: string;
  lang?: string;
};

export const SumamryForm = () => {
  const [copy, setCopy] = React.useState<string | any>(undefined);
  const [transcript, setTranscript] = React.useState<Transcript[]>([]);
  const [videoId, setVideoId] = React.useState<string | any>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function convertToMinutesAndSeconds(decimalSeconds: number) {
    // Extract the integer part of the number
    const totalSeconds = Math.floor(decimalSeconds);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds to always be two digits
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

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
      let seconds = convertToMinutesAndSeconds(obj.offset) + " " + obj.text;
      let ts = {
        text: obj.text,
        duration: obj.offset,
        offset: seconds,
        lang: obj.lang,
      };

    
      setTranscript((prev) => [...prev, ts]);

      result += obj.text + " ";
    });
    return result;
  }

  const handleSubmit = async (data: FormData) => {
    const url = data.get("url") as string;
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

    // get transcript from youtube api
    try {
      const transcript = (await createTranscript(url)) as any;
      console.log(transcript);

      if (transcript?.message) {
        toast(transcript.message);
        return;
      }
      if (Array.isArray(transcript)) {
        const reducedText = reduceTextItems(transcript);
        console.log(reducedText);

        if (reducedText) {
          const summary = await streamAndSummarizeContent(reducedText);

          if (!summary) {
            toast("No summary found");
            return;
          }
          if (summary.message) {
            toast(summary.message);
            return;
          }
          setVideoId(videoId);

          for await (const delta of readStreamableValue(summary))
            setCopy(delta ?? "");
        } else {
          toast("No transcript found");
          return;
        }
      }
    } catch (error) {
      console.log(error);
      toast("Error generating summary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="flex gap-2 mb-10">
        <Input
          name="url"
          placeholder="ie. https://www.youtube.com/watch?v=wlY7K_ktAHw"
        />
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
      {isLoading && (
        <div className="text-center">
          <p className="text-sm text-gray-500">Thinking...</p>
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        <div className="grid-cols-1">
          <AspectRatio ratio={16 / 9} className="w-full">
            {videoId && <YTPlayer videoId={videoId} />}
          </AspectRatio>
        </div>
        <div className="grid-cols-1">
          {copy && (
              <AppTabs transcript={transcript} copy={copy} />
          )}
        </div>
      </div>
    </>
  );
};

"use client"; // This is a React Server Component (RSC) directive

// Importing necessary modules and components
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
import { Skeleton } from "@/components/ui/skeleton";

// Defining a type for the Transcript object
export type Transcript = {
  text: string;
  duration: number;
  offset: string;
  lang?: string;
};

// Defining the SummaryForm component
export const SumamryForm = () => {
  // Declaring state variables using React hooks
  const [copy, setCopy] = React.useState<string | any>(undefined);
  const [transcript, setTranscript] = React.useState<Transcript[]>([]);
  const [videoId, setVideoId] = React.useState<string | any>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Function to convert decimal seconds to minutes and seconds format
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

  // Function to extract the video ID from a YouTube URL
  function getYouTubeVideoID(url: string) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Function to validate a YouTube URL
  function validateYouTubeUrl(url: string) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  }

  // Function to reduce an array of text items into a single string
  function reduceTextItems(array: any[]) {
    let result = "";
    array.forEach((obj) => {
      let seconds = convertToMinutesAndSeconds(obj.offset);
      let ts = {
        text: obj.text,
        duration: obj.offset,
        offset: seconds,
        lang: obj.lang,
      };

      // Adding the current transcript item to the transcript state
      setTranscript((prev) => [...prev, ts]);

      result += obj.text + " ";
    });
    return result;
  }

  // Function to handle form submission
  const handleSubmit = async (data: FormData) => {
    const url = data.get("url") as string;
    if (!url) {
      alert("url is required"); // Showing an alert if the URL is missing
      return;
    }
    // Checking if the URL is a valid YouTube URL
    if (!validateYouTubeUrl(url)) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    // Extracting the video ID from the URL
    const videoId = getYouTubeVideoID(url);

    if (!videoId) {
      alert("Video ID could not be found");
      return;
    }

    // Fetching the transcript from the YouTube API
    try {
      const transcript = (await createTranscript(url)) as any;
      console.log("transcript = ", transcript);
      if (!transcript) {
        toast("Transcript is not available for this video!"); // Showing a toast message if there's an error
        return;
      }

      if (transcript?.message) {
        toast(transcript.message); // Showing a toast message if there's an error
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
          setVideoId(videoId); // Updating the video ID state
          setIsLoading(false)
          // Streaming the summary and updating the copy state
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
      setIsLoading(false); // Setting the loading state to false
    }
  };

  // Rendering the component
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
            setIsLoading(true); // Setting the loading state to true
            setVideoId(undefined);
            setCopy(undefined);
            setTranscript([]);
          }}
        >
          {isLoading ? ( // Rendering a loading spinner if the component is loading
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
            "Generate Summary" // Rendering the button text if not loading
          )}
        </Button>
      </form>
      {isLoading && ( // Rendering a loading message if the component is loading
        <div className="grid grid-cols-2 gap-4 items-center justify-center space-x-4w full">
          <div className="grid-cols-1">
            <div className="space-y-2">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
          <div className="grid-cols-1">
            <div className="space-y-2">
             <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        <div className="grid-cols-1">
          <AspectRatio ratio={16 / 9} className="w-full">
            {videoId && <YTPlayer videoId={videoId} />}
          </AspectRatio>
        </div>
        <div className="grid-cols-1">
          {copy && <AppTabs transcript={transcript} copy={copy} />}{" "}
          {/* Rendering the summary */}
        </div>
      </div>
    </>
  );
};

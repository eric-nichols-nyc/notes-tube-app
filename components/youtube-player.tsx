// YouTubePlayer.tsx
import React from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
}

export const YTPlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
    const opts = {
        height: '100%',
        width: '100%',
      };

  return (
    <div className="w-full flex flex-col">
        <div className="border border-black relative w-full pb-[52.25%] overflow-hidden">
          <YouTube
            videoId={videoId}
            className="absolute top-0 left-0 w-full h-full"
            opts={opts} 
          />
        </div>
        {
            title && <h2 className="text-xl font-bold">{title}</h2>
        }
    </div>
  );
};

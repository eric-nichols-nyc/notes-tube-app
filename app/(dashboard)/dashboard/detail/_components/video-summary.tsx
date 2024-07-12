// VideoSummaryComponent.tsx
import React from "react";

interface VideoSummaryProps {
  videoData: {
    youtubeUrl: string;
    transcript: string;
    summary: string;
    highlights: string[];
    keywords: string[];
  };
}

export const VideoSummaryComponent: React.FC<VideoSummaryProps> = ({
  videoData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Left Side: Video and Transcript */}
      <div className="space-y-4">
        <div className="relative pb-[56.2%] overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoData.youtubeUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube Video"
          ></iframe>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <p className="text-gray-700">{videoData.transcript}</p>
        </div>
      </div>

      {/* Right Side: Summary, Highlights, and Keywords */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{videoData.summary}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside text-gray-700">
            {videoData.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {videoData.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

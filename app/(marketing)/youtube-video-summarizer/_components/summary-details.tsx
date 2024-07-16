"use client";

import { YTPlayer } from "@/components/youtube-player";

type SummaryData = {
  summary: string;
  highlights: string[];
  keyInsights: string[];
};

type Data = {
  data: SummaryData;
};

const SummaryDetails = ({ data }: Data) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-2 bg-blue-500 p-4">
        <div className="flex justify-center items-center w-full bg-gray-100">
          <YTPlayer videoId="dQw4w9WgXcQ" title="Never Gonna Give You Up" />
        </div>
      </div>
      <div className="col-span-2 bg-green-500 p-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Summary</h1>
          <p className="mb-6">{data.summary}</p>

          <h2 className="text-xl font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside mb-6">
            {data.highlights.map((highlight, index) => (
              <li key={index} className="mb-1">
                {highlight}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2">Key Insights</h2>
          <ul className="list-disc list-inside">
            {data.keyInsights.map((insight, index) => (
              <li key={index} className="mb-1">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;

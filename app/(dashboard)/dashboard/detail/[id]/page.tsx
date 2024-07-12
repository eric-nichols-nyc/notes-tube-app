import React from 'react'
import { VideoSummaryComponent } from '../_components/video-summary'

const videoData = {
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    transcript: 'This is the transcript of the video...',
    summary: 'This is a summary of the video...',
    highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
    keywords: ['keyword1', 'keyword2', 'keyword3'],
  };
const DatailPage = () => {
  return (
    <div className="container mx-auto p-4">
    <VideoSummaryComponent videoData={videoData} />
  </div>
  )
}

export default DatailPage
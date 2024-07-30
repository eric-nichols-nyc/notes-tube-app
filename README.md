# Notes Tube App

## Overview

Notes Tube App is a web application built with Next.js that allows users to summarize YouTube videos, manage their summaries, and view detailed insights. The app leverages AI to generate transcripts and summaries, making it easier for users to extract key information from videos.

## Features

- **YouTube Video Summarizer**: Generate summaries and transcripts for YouTube videos.
- **User Dashboard**: Manage your video summaries and view detailed insights.
- **API Endpoints**: Interact with the app programmatically via RESTful APIs.

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js, Next.js API routes
- **Styling**: Tailwind CSS
- **Database**: Upstash Redis
- **AI Integration**: OpenAI, YoutubeTranscript

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

    
```bash
    git clone https://github.com/yourusername/notes-tube-app.git
    cd notes-tube-app
    ```
3034e31b-3ce1-4847-82ec-ceb96206fd47


2. Install dependencies:

    
```bash
    npm install
    # or
    yarn install
    ```
0754b626-9b41-4d69-b3a9-72ad320a54a8


3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the necessary environment variables. For example:

    
```env
    NEXT_PUBLIC_API_KEY=your_api_key
    REDIS_URL=your_redis_url
    ```
99bc1bd7-e558-4985-86d3-9fc1dffcb355


### Running the App

To start the development server:


```bash
npm run dev
# or
yarn dev


// create a GET request using next/server
import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(request: NextRequest) {
    // find an id param
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if(!id) {
        return new NextResponse('Missing id', { status: 400 });
    }
    try {
        const videoId = id;
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return NextResponse.json(transcript);
      } catch (error) {
        console.log(error);
        return new NextResponse('Error fetching transcript', { status: 500 });
      }
}

export async function POST(request: NextRequest) {
    const { name } = await request.json();
    return new NextResponse(`Hello, ${name}!`);
}
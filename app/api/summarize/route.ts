// export a GET request using next/server
import { NextRequest, NextResponse } from 'next/server';
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { StreamableValue, createStreamableValue } from "ai/rsc";
export async function GET(request: NextRequest) {
    return new NextResponse('Hello, world!');
}
// create a post request using next/server
export async function POST(request: NextRequest) {
    const {content} = await request.json();
    try{
        const result = await streamText({
            model: openai("gpt-4o"),
            temperature: 0.5,
            messages: [ {role: "system", content: "Summarize" + content+"in one or two paragraphs, as markdown. add a section highlighting the main points and a section with up to four key words. Don't include any external links"}, {role: "user", content: content} ],
          });
          // console.log('summary = ', summary)
          return result.toAIStreamResponse();
    }catch(e){
        console.log('e = ', e)
        return new NextResponse('Error fetching transcript', { status: 500 });
    }
}



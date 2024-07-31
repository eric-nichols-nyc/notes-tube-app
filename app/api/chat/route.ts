


import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    const { messages } = await request.json();
    try {
        const result = await streamText({
            model: openai("gpt-4o"),
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: "Your replies are less than 500 charactere. Please provide more information."
                },
                ...messages
            ],
        });
        return result.toAIStreamResponse();
    } catch (e) {
        console.log('e = ', e)
        return new NextResponse('Error fetching transcript', { status: 500 });
    }
}

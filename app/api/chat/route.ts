


import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    const { messages, content } = await request.json();
    const askQuestion = `${messages}, using this knowledge from this video ${content} in 150 words or less.`;
    try {
        const result = await streamText({
            model: openai("gpt-4o"),
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: askQuestion
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
"use server";
import { YoutubeTranscript } from 'youtube-transcript';
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { StreamableValue, createStreamableValue } from "ai/rsc"
import { Redis } from '@upstash/redis';
import {Ratelimit} from '@upstash/ratelimit';
import { headers } from 'next/headers';

const rateLimit = new Ratelimit({
    redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(2, "600 s"),
});

const ip = headers().get('x-forwarded-for');
export async function createTranscript(videoId:string) {
    const {remaining, limit, success} = await rateLimit.limit(ip!);
    console.log(limit, remaining, success)

        if(!success) {
            return {message: "You have reached your 2 requests per day limit."}
        }
    // try catch for error handling
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return transcript;
    }
    catch (error) {
        console.log(error);
    }
}

export async function streamAndSummarizeContent(content: string): Promise<StreamableValue | any> {
    const {remaining, limit, success} = await rateLimit.limit(ip!);
    console.log(limit, remaining, success)

        if(!success) {
            return {message: "You have reached your 2 requests per day limit."}
        }
    try {
        const result = await streamText({
            model: openai("gpt-4o"),
            temperature: 0.5,
            messages: [ {role: "system", content: "Summarize" + content+"in one or two paragraphs, as markdown. add a section highlighting the main points and a section with up to four key words. Don't include any external links"}, {role: "user", content: content} ],
          });
          return createStreamableValue(result.textStream).value;

    } catch (err) {
        console.log('err = ', err)
    }
}
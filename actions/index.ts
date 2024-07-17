"use server";
import { YoutubeTranscript } from 'youtube-transcript';
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { StreamableValue, createStreamableValue } from "ai/rsc"

export async function createTranscript(videoId:string) {
    // try catch for error handling
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return transcript;
    }
    catch (error) {
        console.log(error);
    }
}

export async function streamAndSummarizeContent(content: string) {
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
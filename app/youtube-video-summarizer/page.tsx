import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { YoutubeTranscript } from 'youtube-transcript';
import SummaryDetails from "./_components/summary-details";

   const data = {
     summary: "Learn how to create a fullstack registration page using Next.js, Drizzle, Neon, Shadcn, and tRPC to validate and store user data in a database.",
     highlights: [
       "Create a modern signup page with form validation and database storage 📝",
       "Implement the signup form schema using Zod and React Hook Form 📋",
       "Use tRPC to send form data to a backend route for user creation 🚀",
       "Hash passwords using bcrypt TS before storing them in the database 🔒",
       "Ensure data is successfully saved in the database and displayed on the admin panel 📊",
       "Organize the signup page outside the admin panel for a seamless user experience 🖥️",
       "Plan for future enhancements like adding authentication features to the admin panel ⚙️"
     ],
     keyInsights: [
       "The tutorial demonstrates the step-by-step process of creating a registration page with form validation and database integration, illustrating the importance of structuring user input for secure data storage. 🔒",
       "By utilizing Zod for form schema validation and React Hook Form for form management, the tutorial showcases best practices for ensuring data accuracy and reliability in web applications. 📋",
       "Leveraging tRPC for communicating with backend routes streamlines the process of sending and processing form data, highlighting the efficiency of using modern tools for web development. 🚀",
       "The inclusion of password hashing using bcrypt TS enhances data security by safeguarding sensitive user information, emphasizing the significance of encryption in protecting user privacy. 🔑",
       "Demonstrating the successful creation and display of user data in the admin panel reinforces the importance of proper data handling and storage mechanisms in building functional web applications. 📊",
       "Separating the signup page from the admin panel showcases the importance of user experience design in creating intuitive and user-friendly interfaces for different functionalities on a website. 🖥️",
       "Planning for future enhancements, such as adding authentication features, underscores the iterative nature of web development and the continuous improvement process in building robust web applications. ⚙️"
     ]
   };

async function createTranscript(videoId:string) {
    // try catch for error handling
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        console.log(transcript);
        return transcript;
    }
    catch (error) {
        console.log(error);
    }
}


const YoutubeVideoSummarizer = async() => {
    const transcript = await createTranscript('https://www.youtube.com/watch?v=jbLa0KBW-jY&t=739s');
    console.log(transcript);
    
  return (
    <div className="container">
      <div>
        <div>
          <div>
            <div>
                <h1>YouTube Video Summarizer</h1>
                <p>Get YouTube transcript and use AI to summarize YouTube videos in one click for free online with NoteGPT YouTube summary tool.</p>
            </div>
            <div>
              <Input placeholder="Enter the URL of the video" />
              <Button>Generate Summary</Button>
            </div>
            <SummaryDetails data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideoSummarizer;

import React from "react";
import { CreateForm } from "./_components/create-form";

const CreatePage = () => {
  return (
    <div className="w-full">
      <div className="h-[60px] shadow-sm flex items-center">
        <h1 className="ml-2 text-lg">Create</h1>
      </div>
      <div className="container flex flex-col w-full mt-[100px]">
        <h1 className="text-2xl font-semi-bold mb-7">Summarize a new YouTube Video / Podcasts</h1>
        <CreateForm />
      </div>
    </div>
  );
};

export default CreatePage;

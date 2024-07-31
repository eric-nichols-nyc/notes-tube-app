import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';
import {useChat} from 'ai/react';

type Message = {
  text: string;
  sender: 'user' | 'other';
}
export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  //const {messages, input, handleInputChange, handleSubmit} = useChat();

  const scroll = () => { 
    const {offsetHeight, scrollHeight, scrollTop} = containerRef.current as HTMLDivElement;
    if(scrollHeight >= scrollTop + offsetHeight) {
      containerRef.current?.scrollTo(0, scrollHeight + 200);
    }
  }

  useEffect(() => {
    scroll();
  },[messages])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Add logic to send the message to the server or handle it in some other way
    }
  };

  return (
    <div className="container h-72 bg-background flex flex-col justify-between">
      <div             
        ref={containerRef} 
        className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 w-full ${
              message.sender === 'user'
                ? 'self-end bg-blue-500 text-white rounded-l-lg rounded-br-lg'
                : 'bg-gray-300 rounded-r-lg rounded-bl-lg'
            }`}
          >
            <div className="p-2">{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="flex p-4">
        <Input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Ask me anything about this video"
          className="flex-grow px-4 py-2 mr-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;


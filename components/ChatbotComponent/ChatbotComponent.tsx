'use client';

import { useState, ChangeEvent } from 'react';
import OpenAI from 'openai';
import { Button } from '@mantine/core';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});

export default function ChatbotComponent() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = async () => {
    setIsLoading(true);

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userInput },
    ]);

    // Make a request to OpenAI for the chat completion
    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, { role: 'user', content: userInput }],
      model: 'gpt-3.5-turbo',
    });

    // Ensure the assistant's response content is not null
    const assistantContent = chatCompletion.choices[0].message.content ?? 'No content available';

    // Add the assistant's response to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'assistant', content: assistantContent },
    ]);

    // Clear the user input field and end the loading state
    setUserInput('');
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <strong>{message.role === 'user' ? 'User' : 'Assistant'}:</strong> {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
      />
      <Button onClick={handleUserInput} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Send'}
      </Button>
    </div>
  );
}

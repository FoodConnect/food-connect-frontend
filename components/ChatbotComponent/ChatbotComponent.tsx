'use client';
import { useState } from "react";
import OpenAI from 'openai';

export default function ChatbotComponent() {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    // Start the loading state
    setIsLoading(true);

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userInput },
    ]);

    // Make a request to OpenAI for the chat completion
    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, { role: 'assistant', content: userInput }],
      model: 'gpt-3.5-turbo',
    });

    // Add the assistant's response to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'assistant', content: chatCompletion.choices[0].message.content },
    ]);

    // Clear the user input field and end the loading state
    setUserInput('');
    setIsLoading(false);
};

  return ()
}

'use client';

import { useState, ChangeEvent } from 'react';
import OpenAI from 'openai';
import { Button, Card, Text, TextInput, Loader, ScrollArea, Container, Paper, Grid, Title } from '@mantine/core';
import { IconRobotFace } from '@tabler/icons-react';

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
    <Container my="md">
      <Grid>
      <Grid.Col span={12}>
        <Title order={2} style={{ color: 'black' }}>Compost Chatbot <IconRobotFace /></Title>
      </Grid.Col>
        <Grid.Col span={12}>
          <Paper
            style={{ padding: '20px', backgroundColor: '#f0fff0', borderRadius: '8px' }}
            shadow="sm"
          >
            <Grid>
              <Grid.Col span={12}>
                <ScrollArea style={{ height: '400px', marginBottom: '20px' }}>
                  {chatHistory.map((message, index) => (
                    <Card
                      key={index}
                      style={{
                        margin: '10px 0',
                        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: message.role === 'user' ? '#a5d6a7' : '#c8e6c9',
                      }}
                    >
                      <Text>
                        <strong>{message.role === 'user' ? 'User' : 'Assistant'}:</strong> {message.content}
                      </Text>
                    </Card>
                  ))}
                  {isLoading && <Loader />}
                </ScrollArea>
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  value={userInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                  placeholder="Type your message"
                  styles={{
                    input: { paddingRight: '100px' },
                  }}
                  rightSection={
                    <Button
                      onClick={handleUserInput}
                      disabled={isLoading}
                      style={{ marginRight: '-90px', height: '44px', backgroundColor: '#4caf50', color: 'white' }}
                    >
                      {isLoading ? 'Loading...' : 'Send'}
                    </Button>
                  }
                />
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

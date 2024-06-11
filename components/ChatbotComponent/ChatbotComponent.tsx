import { useState, ChangeEvent, useEffect } from 'react';
import {
  Button,
  Card,
  Text,
  TextInput,
  Loader,
  ScrollArea,
  Container,
  Paper,
  Grid,
  Title,
} from '@mantine/core';
import { IconRobotFace } from '@tabler/icons-react';
import { sendMessage } from '../ApiRequests/messageToCompostChatbot';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
//   dangerouslyAllowBrowser: true,
// });

export default function ChatbotComponent() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = async () => {
    setIsLoading(true);

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [...prevChat, { role: 'user', content: userInput }]);

    try {
      const assistantContent = await sendMessage(userInput, 'test_session');
      setChatHistory((prevChat) => [...prevChat, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending message:', error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'assistant', content: 'There was an error processing your request.' },
      ]);
    }
    setUserInput('');
    setIsLoading(false);
  };

  // starting message from bot
  useEffect(() => {
    setChatHistory([
      {
        role: 'assistant',
        content:
          'Hello, I am your compost helper! What food items do you need to dispose of today?',
      },
    ]);
  }, []);

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={12}>
          <Paper
            style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}
            withBorder
            shadow="sm"
          >
            <Grid.Col span={12}>
              <Title order={2} style={{ color: 'black', fontSize: '34px' }}>
                Chat with CompostBot <IconRobotFace size="2rem" />
              </Title>
            </Grid.Col>
            <Grid>
              <Grid.Col span={12}>
                <ScrollArea style={{ height: '550px', marginBottom: '20px' }}>
                  {chatHistory.map((message, index) => (
                    <Card
                      key={index}
                      style={{
                        margin: '10px 0',
                        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: message.role === 'user' ? '#cfe8e6' : '#d9ead3',
                      }}
                    >
                      <Text style={{ fontSize: '20px' }}>
                        <strong>{message.role === 'user' ? 'You' : 'CompostBot'}:</strong>{' '}
                        {message.content}
                      </Text>
                    </Card>
                  ))}
                  {isLoading && <Loader />}
                </ScrollArea>
              </Grid.Col>
              <Grid.Col span={12}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                  <TextInput
                    size="lg"
                    value={userInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                    style={{ flex: 1, marginRight: '10px' }}
                    placeholder="Type your message"
                  />
                  <Button
                    size="lg"
                    onClick={handleUserInput}
                    disabled={isLoading}
                    color="green"
                    style={{ fontSize: 'inherit' }}
                  >
                    {isLoading ? 'Loading...' : 'Send'}
                  </Button>
                </div>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

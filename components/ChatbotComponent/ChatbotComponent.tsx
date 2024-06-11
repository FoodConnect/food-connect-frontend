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
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { sendMessage } from '../ApiRequests/messageToCompostChatbot';

interface ExtendedSession extends Session {
  jti?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotComponent() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const [sessionId, setSessionId] = useState('');

  const handleUserInput = async () => {
    if (!session) {
      // eslint-disable-next-line no-alert
      alert('Please sign in to use the CompostBot.');
      return;
    }
    setIsLoading(true);

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [...prevChat, { role: 'user', content: userInput }]);

    try {
      const assistantContent = await sendMessage(userInput, sessionId ?? '');
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
    if (session) {
      console.log('sessionID:', session.jti);
      setSessionId(session.jti);
    } else {
      console.log('No session available');
      setSessionId('unknown_user');
    }
  }, [session]);

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

export const sendMessage = async (query: string, sessionId: string): Promise<string> => {
  const url = process.env.NEXT_PUBLIC_COMPOST_CHATBOT_URL;
  if (!url) {
    throw new Error('COMPOST_CHATBOT_URL is not defined in environment variables');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, session_id: sessionId }),
  });

  if (!response.ok) {
    throw new Error('Error: ${response.statusText');
  }

  const data = await response.json();
  return data.response;
};

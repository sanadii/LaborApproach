// useChatWebSocket.js
import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const useChatWebSocket = (socketUrl) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const { lastMessage, sendMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const receivedMessage = JSON.parse(lastMessage.data);
      setMessageHistory(prev => [...prev, receivedMessage]);
    }
  }, [lastMessage]);

  return { messageHistory, setMessageHistory, sendMessage };
};

export default useChatWebSocket;

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import {
  getMessagesRoute,
  sendMessegeRoute,
  deleteMessegeRoutes,
} from '../utils/apiRoutes';
import ChatHeader from './ChatHeader';
import background from '../assets/black1.jpg';
import PreLoader from './PreLoader';
import Message from './Message';
import { getSocket } from '../redux/slices/socketSlice';

export default function ChatContainer({ selectedUser }) {
  const currentUser = useSelector((state) => state.login.user);
  const connected = useSelector((state) => state.socket.connected);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const scrollRef = useRef();

  // Fetch chat messages
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getMessagesRoute, {
        params: {
          sender_id: currentUser.user_id,
          receiver_id: selectedUser.user_id,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setPreloader(true);
      fetchData();
    }
  }, [selectedUser]);

  // Set up socket listeners
  useEffect(() => {
    if (!connected) return;

    const socket = getSocket();

    const handleIncomingMessage = (msg) => {
      // Check if the message is from/to the selected user
      const isRelevant =
        (msg.sender_id === currentUser.user_id && msg.receiver_id === selectedUser.user_id) ||
        (msg.sender_id === selectedUser.user_id && msg.receiver_id === currentUser.user_id);

      if (isRelevant) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleDeletedMessage = () => {
      fetchData();
    };

    socket.on('message', handleIncomingMessage);
    socket.on('deleted', handleDeletedMessage);

    return () => {
      socket.off('message', handleIncomingMessage);
      socket.off('deleted', handleDeletedMessage);
    };
  }, [connected, selectedUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a new message
  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMessegeRoute, {
        from: currentUser.user_id,
        to: selectedUser.user_id,
        message: msg,
      });

      getSocket().emit('message', {
        sender_id: currentUser.user_id,
        receiver_id: selectedUser.user_id,
        message: msg,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Delete a message
  const handleDeleteMsg = async (msg) => {
    try {
      const response = await axios.delete(
        `${deleteMessegeRoutes}?message_id=${msg.message_id}`
      );

      if (response.status === 200) {
        getSocket().emit('delete');
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <>
      {selectedUser && (
        <Container>
          <ChatHeader user={selectedUser} isOnline={isOnline} />
          {isLoading ? (
            <PreLoader isLoading={isLoading} />
          ) : (
            <div className="chat-messages">
              {messages.map((message) => (
                <Message
                  key={message.message_id}
                  message={message}
                  isCurrentUser={message.receiver_id !== currentUser.user_id}
                  onDelete={handleDeleteMsg}
                />
              ))}
              <div ref={scrollRef} />
            </div>
          )}
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 1fr 10%;
  border-radius: 1.5rem;
  overflow: hidden;
  background-color: #1e1e1e;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  height: 100%;

  @media screen and (max-width: 800px) {
    grid-template-rows: 8% 1fr 8%;
    border-radius: 0.8rem;
    box-shadow: none;
  }

  .chat-messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: auto;
    background: linear-gradient(to bottom, #1e1e1e 10%, rgba(37, 37, 37, 0.5)), url(${background});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 1rem;
    }

    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
  }
`;

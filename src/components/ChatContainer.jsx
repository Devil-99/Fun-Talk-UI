import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import {
  getMessagesRoute,
  sendMessegeRoute,
  deleteMessegeRoutes,
} from '../utils/apiRoutes';
import background from '../assets/black1.jpg';
import PreLoader from './PreLoader';
import Message from './Message';
import { getSocket } from '../redux/slices/socketSlice';
import { toastOptions } from '../utils/toastOptions';

export default function ChatContainer({ selectedUser }) {
  const currentUser = useSelector((state) => state.login.user);
  const connected = useSelector((state) => state.socket.connected);
  const [messages, setMessages] = useState([]);
  const [fetchMsgLoader, setFetchMsgLoader] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const scrollRef = useRef();

  // Fetch chat messages
  const fetchData = async () => {
    try {
      setFetchMsgLoader(true);
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
      setFetchMsgLoader(false);
    }
  };

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      fetchData();
    }
  }, [selectedUser]);

  // Set up socket listeners
  useEffect(() => {
    if (!connected) return;

    const socket = getSocket();

    const handleIncomingMessage = (msg) => {
      const isRelevant =
        (msg.sender_id === currentUser.user_id && msg.receiver_id === selectedUser.user_id) ||
        (msg.sender_id === selectedUser.user_id && msg.receiver_id === currentUser.user_id);

      if (isRelevant) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleDeletedMessage = (msg) => {
      const isRelevantSender =
        (msg.sender_id === currentUser.user_id && msg.receiver_id === selectedUser.user_id) || false;
      const isRelevantReciever =
        (msg.sender_id === selectedUser.user_id && msg.receiver_id === currentUser.user_id) || false;

      if (isRelevantReciever) {
        setMessages((prev) => 
          prev.map(message =>
            message.message_id === msg.message_id ?
              { ...message, message: 'Message deleted' }
              : message
          )
        );        
      }
      if(isRelevantSender){
        setMessages((prev) => prev.filter((message) => message.message_id !== msg.message_id));
      }
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
      setSendLoader(true)
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
      toast.error("Error sending message !", toastOptions);
      console.error("Error sending message:", error);
    }
    finally {
      setSendLoader(false);
    }
  };

  // Delete a message
  const handleDeleteMsg = async (msg) => {
    try {
      const response = await axios.delete(
        `${deleteMessegeRoutes}?message_id=${msg.message_id}`
      );

      if (response.status === 200) {
        getSocket().emit('delete-message', msg);
      }
    } catch (error) {
      toast.error("Error deleting message !", toastOptions);
      console.error("Error deleting message:", error);
    }
  };


  return (
    <>
      {selectedUser && (
        <Container>
          {fetchMsgLoader ? (
            <PreLoader loading={fetchMsgLoader} />
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
          <ChatInput handleSendMsg={handleSendMsg} loading={sendLoader} />
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 10%;
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

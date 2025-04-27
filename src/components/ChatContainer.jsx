import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import { getMessagesRoute, sendMessegeRoute, deleteMessegeRoutes } from '../utils/apiRoutes';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from './ChatHeader';
import background from '../assets/black1.jpg';
import PreLoader from './PreLoader';
import { format } from 'timeago.js';
import { io } from 'socket.io-client';
import { host } from '../utils/apiRoutes';
import Message from './Message';

export default function ChatContainer({ selectedUser, currentUser }) {
    const [messeges, setMesseges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [preloader, setPreloader] = useState(false);
    const [isonline, setIsonline] = useState(false);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        // Check if the socket is not already initialized
        if (!socket.current) {
            // Establish the socket connection with the server only once
            socket.current = io(host);
            console.log("Socket connected:", socket.current.id);

            // Listen for incoming messages from the server
            socket.current.on('message', (msg) => {
                console.log(msg);
                setMesseges((prev) => [...prev, msg]);
            });

            socket.current.on('deleted', () => {
                fetchData();
            })
        }

        // Clean up function to disconnect socket when component unmounts
        return () => {
            if (socket.current) {
                // socket.current.disconnect();
                console.log("Socket disconnected");
            }
        };
    }, []);

    // this render the page whenever a chat is selected
    useEffect(() => {
        if (selectedUser) {
            setPreloader(true);
            fetchData();
        }
    }, [selectedUser]);
    
    async function fetchData() {
        try {
            const response = await axios.get(getMessagesRoute, {
              params: {
                sender_id: currentUser.user_id,
                receiver_id: selectedUser.user_id,
              },
            });
            setMesseges(response.data);
          } catch (error) {
            console.error("Error fetching messages:", error);
          } finally {
            setIsLoading(false);
          }
    }

    const handleSendMsg = async (msg) => {
        try {
            await axios.post(sendMessegeRoute, {
              from: currentUser.user_id,
              to: selectedUser.user_id,
              message: msg,
            });
      
            socket.current.emit('message', {
              sender_id: currentUser.user_id,
              receiver_id: selectedUser.user_id,
              message: msg,
            });
          } catch (error) {
            console.error("Error sending message:", error);
          }
    };

    const handleDeleteMsg = async (msg) => {
        const response = await axios.delete(`${deleteMessegeRoutes}?message_id=${msg.message_id}`);
        if (response.status == 200) {
            socket.current.emit('delete');
        }
    }

    // this works when new msg send or recieved so that the page scroll down to the end.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [messeges]);

    return (
        <>
      {selectedUser && (
        <Container>
          <ChatHeader selectedUser={selectedUser} isOnline={isonline} />
          {isLoading ? (
            <PreLoader isLoading={isLoading} />
          ) : (
            <div className="chat-messages">
              {messeges.map((message) => (
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
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 10px 10px 20px #000000;
  background-color: #252525;
  @media screen and (min-width: 250px) and (max-width: 800px) {
    grid-template-rows: 8% 85% 7%;
    box-shadow: 0px 0px;
  }

  .chat-messages {
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    background: url(${background});
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;
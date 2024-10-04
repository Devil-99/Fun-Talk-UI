import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import { getMessagesRoute, sendMessegeRoute, deleteMessegeRoutes } from '../utils/apiRoutes';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from './ChatHeader';
import { MdDelete } from 'react-icons/md';
import background from '../assets/black1.jpg';
import PreLoader from './PreLoader';
import { format } from 'timeago.js';
import { io } from 'socket.io-client';
import { host } from '../utils/apiRoutes';

export default function ChatContainer({ selectedUser, currentUser }) {
    const [messeges, setMesseges] = useState([]);
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

            socket.current.on('deleted',()=>{
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

    async function fetchData() {
        const response = await axios.get(getMessagesRoute);
        setMesseges(response.data);
        setPreloader(false);
    }

    // this render the page whenever a chat is selected
    useEffect(() => {
        if (selectedUser) {
            setPreloader(true);
            fetchData();
        }
    }, [selectedUser]);

    const handleSendMsg = async (msg) => {
        // Push to Datbase
        const result = await axios.post(sendMessegeRoute, {
            from: currentUser.user_id,
            to: selectedUser.user_id,
            message: msg,
        });
        // Save in the message list for current user
        // setMesseges([...messeges, ...result.data]);
        // Sending through socket for opposite user
        socket.current.emit('message', {
            sender_id: currentUser.user_id,
            receiver_id: selectedUser.user_id,
            message: msg,
        })
    };

    const deleteMsg = async (msg) => {
        const response = await axios.delete(`${deleteMessegeRoutes}?message_id=${msg.message_id}`);
        if(response.status == 200){
            socket.current.emit('delete');
        }
    }

    // this works when new msg send or recieved so that the page scroll down to the end.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [messeges]);

    return (
        <>
            {
                selectedUser && (
                    <Container>
                        <ChatHeader selectedUser={selectedUser} isOnline={isonline} />
                        {
                            preloader ?
                                <PreLoader preloader={preloader} />
                                :
                                <div className='chat-messeges' >
                                    {
                                        messeges.map((messege) => {
                                            return (
                                                <div ref={scrollRef} key={uuidv4()}>
                                                    <div className={`messege ${messege.receiver_id === currentUser.user_id ? "recieved" : "sended"}`}>
                                                        <div className='content'>
                                                            <div className='msgfield'>
                                                                <p>{messege.message}</p>
                                                                {
                                                                    messege.receiver_id === currentUser.user_id ?
                                                                        <p></p> :
                                                                        (<button className='delete' onClick={() => deleteMsg(messege)}><MdDelete /></button>)
                                                                }
                                                            </div>
                                                            <i>{format(messege.timestamp)}</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
overflow: hidden;
border-radius: 1rem;
box-shadow: 10px 10px 20px #000000;
@media screen and (min-width: 250px) and (max-width: 800px){
    grid-template-rows: 8% 85% 7%;
    box-shadow: 0px 0px;
}
.chat-messeges{
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    background: url(${background});
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    @media screen and (min-width: 250px) and (max-width: 800px){
        padding: 1rem 1rem;
    }
    .messege{
        display: flex;
        align-items: center;
        .content{
            display: flex;
            flex-direction: column;
            max-width: 50%;
            overflow-wrap: break-word;
            border-radius: 1rem;
            color: #d1d1d1;
            i{
                text-align:right;
                margin-right:0.5rem;
                font-size:0.5rem;
                @media screen and (min-width: 250px) and (max-width: 800px){
                    font-size: 0.1rem;
                }
            }
            .msgfield{
                display:flex;
                flex-direction:row;
                p{
                    margin: 0.1rem;
                    texi-align:center;
                    @media screen and (min-width: 250px) and (max-width: 800px){
                        font-size: 0.8rem;
                    }
                }
                .delete{
                    background:none;
                    border:none;
                    cursor: pointer;
                    svg{
                        margin:0;
                        font-size: 1.5rem;
                        @media screen and (min-width: 250px) and (max-width: 800px){
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            padding: 0.7rem 0 0.7rem 1rem;
            background-color: #56D2FE;
            color: white;
            background-image: linear-gradient(to left, #56D2FE, #202FFF);
            @media screen and (min-width: 250px) and (max-width: 800px){
                padding: 0.5rem 0 0.5rem 0.5rem;
            }
        }
    }
    .recieved{
        justify-content: flex-start;
        .content{
            padding: 0.7rem 0.8rem 0.7rem 0.8rem;
            background-color: #FF8FB3;
            background-image: linear-gradient(to left, #FF8FB3, #FAC8F4);
            color: black;
            @media screen and (min-width: 250px) and (max-width: 800px){
                padding: 0.5rem;
            }
        }
    }
}
`;

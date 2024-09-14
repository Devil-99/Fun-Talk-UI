import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute , host } from '../utils/apiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import PreLoader from '../components/PreLoader';

function ChatPages() {
  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({username: 'Souvik'});
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLogged, setIsLogged] = useState(true);
  const [preloader, setPreloader] = useState(false);

  useEffect(()=>{
    async function getData(){
      if(!localStorage.getItem("chat-app-user")){
        // navigate('/login');
      }
      else{
        setIsLogged(true);
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
  getData();
  },[]);

  // socket connection establishment
  // useEffect(()=>{
  //   if(currentUser){
  //     socket.current=io(host);
  //     socket.current.emit('add-user',currentUser._id);
  //   }
  // },[currentUser]);

  // useEffect(()=>{
  //   // setPreloader(true);
  //   async function fetchCurrentUser(){
  //     if(currentUser){
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //       // setPreloader(false);
  //     }
  //   }
  // fetchCurrentUser();
  // },[currentUser]);

  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }

  return (<Container>
    {
      preloader? 
      <PreLoader preloader={preloader}/>
      :
      <div className='container'>
        <Contacts allcontacts={contacts} currUser={currentUser} changeChat={handleChatChange}/>
        {
          isLogged && currentChat === undefined ?
          (<Welcome currUser={currentUser} />):
          (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
        }
      </div>
    }
  </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #252525;
gap: 1rem;
.container{
  height: 85vh;
  width: 85vw;
  @media screen and (min-width: 250px) and (max-width: 800px){
    padding-top: 2rem;
    height: 90vh;
    width: 99vw;
  }
  background-color: none;
  display: grid;
  grid-template-columns: 25% 70%;
  gap: 3rem;

  @media screen and (min-width: 250px) and (max-width: 800px){
    grid-template-columns: 30% 67%;
    gap: 0.3rem;
  }
}
`;

export default ChatPages;
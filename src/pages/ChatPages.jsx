import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import PreLoader from '../components/PreLoader';

function ChatPages() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!localStorage.getItem("TechTalk-user")) {
        navigate('/login');
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem("TechTalk-user")));
        setIsLogged(true);
      }
    }
    getData();
  }, []);

  return (
    <Container>
      {
        currentUser &&
        <div className='container'>
          <Contacts currentUser={currentUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          {
            isLogged && selectedUser === null ?
              (<Welcome currentUser={currentUser} />) :
              (<ChatContainer selectedUser={selectedUser} currentUser={currentUser} />)
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
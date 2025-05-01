import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { useSelector } from 'react-redux';
import ChatHeader from '../components/ChatHeader';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/loginSlice';

function ChatPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const savedUser = await JSON.parse(localStorage.getItem("TechTalk-user"));
      if (savedUser) {
        setCurrentUser(savedUser);
        dispatch(login(savedUser));
        setLoading(false);
      } else {
        navigate('/login');
      }
    }
    getData();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Container
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {
        loading || currentUser === null ? (
          <div className='loading'>
            <h1>Loading...</h1>
          </div>
        ) :
          (<div className='container'>
            <Contacts currentUser={currentUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            {
              selectedUser === null ?
                <Welcome currentUser={currentUser}/> :
                <ChatContainer selectedUser={selectedUser} currentUser={currentUser} />
            }
          </div>)
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
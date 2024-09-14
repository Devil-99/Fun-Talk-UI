import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { renameRoute } from '../utils/apiRoutes';
import WelcomeFooter from './WelcomeFooter';
import { TiTick } from "react-icons/ti";

export default function Welcome({ currUser }) {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState(currUser.username);
  const handleRename = (e) => {
    setNewUsername(e.target.value);
  }
  const [editable, setEditable] = useState(false);
  const handleSave = async () => {
    setEditable(false);
    if (newUsername == null)
      navigate('/');
    else {
      const { data } = await axios.post(renameRoute, { currUser, newUsername });
      if (data.status === false) {
        console.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload(true);
      }
    }
  }

  return (
    <>
      {
        currUser && (
          <Container>
            <ChatHeader currentChat={currUser} isOnline={true} />
            <div className='mainBlock'>
              <img src={Robot} alt="robot" />
              <div className='edit'>
                <h1>Welcome</h1>
                {
                  editable ?
                    <>
                      <input className='renameInput' value={newUsername} onChange={handleRename} />
                      <button className='editButton' onClick={() => handleSave()}><TiTick style={{ color: 'greenyellow' }} /></button>
                    </>
                    :
                    <>
                      <h1 className='username'>{currUser.username}</h1>
                      <button className='editButton' onClick={() => setEditable(true)}><AiFillEdit /></button>
                    </>
                }
              </div>
              <h3>Please select a chat to start messaging</h3>
              <WelcomeFooter />
            </div>
          </Container>
        )
      }
    </>

  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
color: white;
overflow: hidden;
border-radius: 1rem;
background-color: #00000060;
box-shadow: 10px 10px 20px #000000;
.mainBlock{
  margin-top:1rem;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .edit{
    display:flex;
    flex-direction:row;
    gap:0.5rem;
    align-items:center;
    .username{
      color: #FF5605;
    }
    .editButton{
      background-color:transparent;
      padding:0;
      margin:0;
      height:50%;
      border-radius:50%;
      border:none;
      cursor:pointer;
      svg{
        color:white;
        font-size:1.5rem;
      }
    }
  }
  h1{
    margin:0.5rem;
    font-size: 2rem;
  }
  h3{
    margin:0.5rem;
    font-size: 1rem;
  }
  @media screen and (min-width: 250px) and (max-width: 500px){
    h1{
      font-size: 1.2rem;
    }
    h3{
      font-size: 0.5rem;
    }
  }
  img{
    @media screen and (min-width: 250px) and (max-width: 500px){
      height: 15rem;
    }
      height: 20rem;
  }
  span{
      color: #FF5605;
  }
}
`;
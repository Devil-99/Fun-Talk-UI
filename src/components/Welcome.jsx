import React from 'react';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';

export default function Welcome({currUser}) {
  return (
    <>
      {
        currUser && (
          <Container>
            <ChatHeader currentChat={currUser}/>
            <div className='mainBlock'>
              <img src={Robot} alt="robot"/>
              <h1>
                  Welcome,<span>{currUser.username}!</span>
              </h1>
              <h3>Please select a chat to start messaging</h3>
              <h3>Click on Your Name to back to Welcome page</h3>
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
.mainBlock{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 250px) and (max-width: 500px){
  h1{
    font-size: 1.2rem;
  }
  h3{
    font-size: 0.8rem;
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
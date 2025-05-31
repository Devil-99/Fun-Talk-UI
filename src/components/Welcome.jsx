import { useState } from 'react';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import WelcomeFooter from './WelcomeFooter';
import AdminPage from '../pages/AdminPage';

export default function Welcome({currentUser}) {
  const [setting, setSetting] = useState('');

  return (
    <>
      {
        currentUser && (
          <Container>
            <ChatHeader user={currentUser} isOnline={true} />
            {
              setting === 'admin' ?
                <AdminPage user={currentUser} setSetting={setSetting}/>
                :
                <div className='mainBlock'>
                  <img src={Robot} alt="robot" />
                  <div className='edit'>
                    <h1>Welcome</h1>
                    <h1 className='username'>{currentUser.username}</h1>
                  </div>
                  <h3>Please select a chat to start messaging</h3>
                  <WelcomeFooter setSetting={setSetting}/>
                </div>
            }
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
background-color: #252525;
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
    align-items:center;
    .username{
      padding: 0;
      margin: 0;
      color: #FF5605;
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
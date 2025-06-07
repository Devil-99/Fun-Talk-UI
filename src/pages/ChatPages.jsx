import { useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChatHeader from '../components/ChatHeader';
// Lazy loading components to optimize performance
const Contacts = lazy(() => import('../components/Contacts'));
const Welcome = lazy(() => import('../components/Welcome'));
const ChatContainer = lazy(() => import('../components/ChatContainer'));

function ChatPages() {
  const currentUser = useSelector((state) => state.login.user);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Container>
      <div className='container'>
        <Suspense fallback={<div>Loading...</div>}>
          <Contacts selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </Suspense>
        <div className='body'>
          <ChatHeader user={selectedUser || currentUser} />
          {
            selectedUser ?
              <Suspense fallback={<div>Loading...</div>}>
                <ChatContainer selectedUser={selectedUser} />
              </Suspense> :
              <Welcome currentUser={currentUser} />
          }
        </div>
      </div>
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
  height: 90vh;
  width: 90vw;
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

  .body{
    display: flex;
    flex-direction: column;
    color: white;
    overflow: hidden;
    border-radius: 1rem;
    background-color: #252525;
    box-shadow: 10px 10px 20px #000000;
  }
}
`;

export default ChatPages;
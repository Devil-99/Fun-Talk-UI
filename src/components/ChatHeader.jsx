import styled from 'styled-components';
import Logout from '../components/Logout';
import { RiRadioButtonLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function ChatHeader({ user }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className='user-details' onClick={() => navigate('/admin')}>
        {
          user.dp ?
            <img
              src={user.dp}
              style={{ width: "2rem", height: "2rem", objectFit: "cover", borderRadius: "50%" }}
            />
            :
            <FaUserCircle style={{ fontSize: '2.5rem', color: 'gray' }} />
        }
        <h1>{user.username}</h1>
        <RiRadioButtonLine style={ user.online? { color: '#AAFF00' } : { color: 'gray' } } />
      </div>
      <Logout />
    </Container>
  )
};

const Container = styled.div`
display: flex;
justify-content: space-between;
background-color: #00000060;
align-items: center;
padding: 1rem;
.user-details{
  display:flex;
  flex-direction:row;
  gap:0.5rem;
  cursor: pointer;
  @media screen and (min-width: 250px) and (max-width: 500px){
    h1{
      font-size: 1.8rem;
    }
  }
    h1{
        margin:0;
        color: white;
    }
}
`;

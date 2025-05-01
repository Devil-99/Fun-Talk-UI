import React from 'react';
import styled from 'styled-components';
import Logout from '../components/Logout';
import { RiRadioButtonLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";

export default function ChatHeader({ user, isOnline }) {
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
            <FaCircleUser style={{ fontSize: '2rem', color: 'gray' }} />
        }
        <h1>{user.username}</h1>
        {isOnline ?
          <div className='online'>
            <RiRadioButtonLine />
          </div>
          :
          <div className='offline'>
            <RiRadioButtonLine />
          </div>
        }
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
padding: 0 1rem;
.user-details{
  display:flex;
  flex-direction:row;
  gap:0.5rem;
  height:50%;
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
    .online{
      svg{
        color:#AAFF00;
      }
    }
    .offline{
      svg{
        color:gray;
      }
    }
}
`;

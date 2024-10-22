import React from 'react';
import styled from 'styled-components';
import Logout from '../components/Logout';
import {RiRadioButtonLine} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader({selectedUser , isOnline}) {
  const navigate = useNavigate();
  return (
    <Container>
            <div className='user-details' onClick={()=>navigate('/admin')}>
                <h1>{selectedUser.username}</h1>
                {isOnline? 
                  <div className='online'>
                    <RiRadioButtonLine/> 
                  </div>
                  : 
                  <div className='offline'>
                    <RiRadioButtonLine/> 
                  </div>
                }
            </div>
            <Logout/>
    </Container>
  )
};

const Container = styled.div`
background-color: #00000060;
display: flex;
justify-content: space-between;
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

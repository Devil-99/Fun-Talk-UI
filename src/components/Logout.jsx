import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.removeItem('TechTalk-user');
    navigate('/login');
  }

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
};

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #FF5605;
border: none;
cursor: pointer;
svg{
    font-size: 1rem;
    color: #ffffff;
    @media screen and (min-width: 250px) and (max-width: 500px){
    font-size: 1rem;
    }
}
`;
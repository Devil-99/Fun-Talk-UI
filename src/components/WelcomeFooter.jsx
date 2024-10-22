import React from 'react';
import styled from 'styled-components';
import { BsFacebook, BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaList, FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

function WelcomeFooter({setSetting}) {
  return (
    <Container>
      <div className='icons'><FaList style={{ color: 'yellow' }} /></div>
      <div className='icons'><FaCalendarAlt style={{ color: 'skyblue' }} /></div>
      <div className='icons' onClick={()=>{setSetting('admin')}}><IoSettings style={{ color: 'gray' }} /></div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  gap: 1rem;
  .icons{
    display: flex;
    justify-contains: center;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    background-color: rgb(50, 50, 50);
    box-shadow: 2px 2px 5px rgb(70, 70, 70);
    border-radius: 5px;
    svg{
      font-size: 1.3rem;
      @media screen and (min-width: 250px) and (max-width: 500px){
        font-size: 1rem;
      }
    }
  }
`;

export default WelcomeFooter;
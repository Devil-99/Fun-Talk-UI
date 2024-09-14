import React from 'react';
import styled from 'styled-components';
import { BsFacebook, BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaList, FaCalendarAlt } from "react-icons/fa";

function WelcomeFooter() {
  return (
    <Container>
      <div className='icons'><FaList style={{ color: 'yellow' }} /></div>
      <div className='icons'><FaCalendarAlt style={{ color: 'skyblue' }} /></div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  gap: 1rem;
  .icons{
    padding: 0.3rem;
    border: 1px solid grey;
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
import React from 'react';
import styled from 'styled-components';
import {BsFacebook , BsWhatsapp , BsInstagram , BsLinkedin} from 'react-icons/bs';

function WelcomeFooter() {
  return (
    <Container>
        <a className='fb' href='https://facebook.com/'><BsFacebook/></a>
        <a className='wp' href='https://web.whatsapp.com/'><BsWhatsapp/></a>
        <a className='insta' href='https://instagram.com/'><BsInstagram/></a>
        <a className='linkedin' href='https://www.linkedin.com/feed/'><BsLinkedin/></a>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
    gap: 1rem;
    .fb{
      background-color: white;
      height:100%;
      border-radius: 50%;
      svg{
        height: 100%;
        width: 100%;
        color: #3b5998;
        font-size: 1.5rem;
        @media screen and (min-width: 250px) and (max-width: 500px){
          font-size: 1rem;
        }
      }
    }
    .wp{
      background-color: #25D366;
      height:100%;
      border-radius: 50%;
      svg{
        height: 100%;
        width: 100%;
        color: white;
        font-size: 1.5rem;
        @media screen and (min-width: 250px) and (max-width: 500px){
          font-size: 1rem;
        }
      }
    }
    .insta{
      background-color: #C13584;
      height:100%;
      background-image: linear-gradient(to bottom,#C13584, #F77737);
      border-radius: 30%;
      svg{
        height: 100%;
        width: 100%;
        color: white;
        font-size: 1.5rem;
        @media screen and (min-width: 250px) and (max-width: 500px){
          font-size: 1rem;
        }
      }
    }
    .linkedin{
      background-color: white;
      height:100%;
      border-radius: 10%;
      svg{
        height: 100%;
        width: 100%;
        color: #0A66C2;
        font-size: 1.5rem;
        @media screen and (min-width: 250px) and (max-width: 500px){
          font-size: 1rem;
        }
      }
    }
`;

export default WelcomeFooter;
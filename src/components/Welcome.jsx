import React from 'react';
import { useNavigate } from 'react-router-dom';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import {BsFacebook , BsWhatsapp , BsInstagram , BsLinkedin} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import axios from 'axios';
import { renameRoute } from '../utils/apiRoutes';

export default function Welcome({currUser}) {
  const navigate = useNavigate();
  const rename = async ()=>{
    const newUsername = prompt("Enter your new Username here.\nUsername should be greater than 3 letters and less than 10 letters !");
    if(newUsername==null)
      navigate('/');
    else{
      const {data} = await axios.post(renameRoute,{currUser,newUsername});
      if(data.status === false){
          console.error(data.msg);
      }
      if(data.status === true){
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          navigate('/login');
      }
    }
  }

  return (
    <>
      {
        currUser && (
          <Container>
            <ChatHeader currentChat={currUser}/>
            <div className='mainBlock'>
              <img src={Robot} alt="robot"/>
              <div className='edit'>
              <h1>
                  Welcome, <span>{currUser.username}!</span>
              </h1>
              <button className='editButton' onClick={rename}><AiFillEdit/></button>
              </div>
              <h3>Please select a chat to start messaging</h3>
              <h3>Click on Your Name to back to Welcome page</h3>

              <div className='social'>
              
              <a className='fb' href='https://facebook.com/'><BsFacebook/></a>
              <a className='wp' href='https://web.whatsapp.com/'><BsWhatsapp/></a>
              <a className='insta' href='https://instagram.com/'><BsInstagram/></a>
              <a className='linkedin' href='https://www.linkedin.com/feed/'><BsLinkedin/></a>
              </div>

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
  .edit{
    display:flex;
    flex-direction:row;
    gap:0.5rem;
    align-items:center;
    .editButton{
      background-color:transparent;
      padding:0;
      margin:0;
      height:50%;
      border-radius:50%;
      border:none;
      cursor:pointer;
      svg{
        color:white;
        font-size:1.5rem;
      }
    }
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
  .social{
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
        font-size: 2rem;
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
        font-size: 2rem;
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
        font-size: 2rem;
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
        font-size: 2rem;
        @media screen and (min-width: 250px) and (max-width: 500px){
          font-size: 1rem;
        }
      }
    }

  }
}
`;
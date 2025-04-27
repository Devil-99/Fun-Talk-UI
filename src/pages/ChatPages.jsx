import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import rain from '../assets/rain-6812_512.gif';
import haze from '../assets/sky-4583_512.gif';

function ChatPages() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [weatherData, setWeatherData] = useState();

  const getWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentUser.city}&units=metric&appid=4580466da90099b152f2a5bf0ec183c1`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    const getData = async () => {
      if (!localStorage.getItem("TechTalk-user")) {
        navigate('/login');
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem("TechTalk-user")));
        setIsLogged(true);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [currentUser])

  return (
    <Container
      style={{
        // backgroundImage:
        //   weatherData.weather[0].main.toLowerCase() === 'rain'
        //     ? `url(${rain})`
        //     : weatherData.weather[0].main.toLowerCase() === 'haze'
        //       ? `url(${haze})`
        //       : 'none',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      {
        currentUser && weatherData &&
        <div className='container'>
          <Contacts currentUser={currentUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          {
            isLogged && selectedUser === null ?
              (<Welcome currentUser={currentUser} />) :
              (<ChatContainer selectedUser={selectedUser} currentUser={currentUser} />)
          }
        </div>
      }
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
  height: 85vh;
  width: 85vw;
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
}
`;

export default ChatPages;
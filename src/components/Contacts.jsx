import { useEffect, useState } from 'react';
import { usersRoute } from '../utils/apiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOptions';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import FunTalk from '../assets/FunTalk.png';
import { FaUserCircle } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";
import axios from 'axios';
import { getSocket } from '../redux/slices/socketSlice';

export default function Contacts({ selectedUser, setSelectedUser }) {
  const currentUser = useSelector((state) => state.login.user);
  const connected = useSelector((state) => state.socket.connected);
  const [allusers, setAllusers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(usersRoute, {
        params: { user_id: currentUser.user_id }
      });

      if (response.status === 200) {
        setAllusers(response.data);
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message, toastOptions);
      } else if (error.request) {
        toast.error('Network error. Please check your connection.', toastOptions);
      } else {
        toast.error('An unexpected error occurred. Please try again.', toastOptions);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!connected) return;

    const socket = getSocket();

    const handleUserLogin = (user) => {
      setAllusers(prevUsers =>
        prevUsers.map(u =>
          u.user_id === user.user_id ? { ...u, online: true } : u
        )
      );
    };

    const handleUserLogout = (user) => {
      setAllusers(prevUsers =>
        prevUsers.map(u =>
          u.user_id === user.user_id ? { ...u, online: false } : u
        )
      );
    };

    socket.on('login', handleUserLogin);
    socket.on('logout', handleUserLogout);

    return () => {
      socket.off('login', handleUserLogin);
      socket.off('logout', handleUserLogout);
    };
  }, [connected]);

  return (
    <Container>
      <div className='contacts'>
        {allusers.length === 0 ? (
          <p style={{ color: '#ccc' }}>No other users available.</p>
        ) : (
          allusers.map((user, index) => (
            <div
              className={`contact ${selectedUser && user.user_id === selectedUser.user_id ? "selected" : ""}`}
              key={index}
              onClick={() => setSelectedUser(user)}
            >
              <div className='username'>
                {user.dp ? (
                  <img
                    src={user.dp}
                    alt='dp'
                    style={{ width: "1.5rem", height: "1.5rem", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <FaUserCircle style={{ fontSize: '1.5rem', color: 'gray' }} />
                )}
                <h3>{user.username}</h3>
                <RiRadioButtonLine
                  style={{
                    color: user.online ? '#AAFF00' : 'gray',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className='current-user'>
        <div className='username' onClick={() => setSelectedUser(null)}>
          🏠 <h3 title="Go to Home">Home</h3>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url(${FunTalk}) no-repeat center center / 60%, #1f1f1f;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: inset 0 0 8px #000, 0 0 10px rgba(0, 0, 0, 0.4);

  .contacts {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: auto;
    padding: 0.5rem;

    &::-webkit-scrollbar {
      width: 0.3rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #666;
      border-radius: 1rem;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.75rem 1rem;
      border-radius: 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
      }

      &.selected {
        background: linear-gradient(135deg, #fb3b13, #ffa836);
        color: white;
      }

      .username {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;

        img{
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          object-fit: cover;
        }

        h3 {
          font-size: 1rem;
          color: white;
          margin: 0;
          word-break: break-word;
        }
      }
    }
  }

  .current-user {
    margin-top: 1rem;
    text-align: center;

    .username {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #ff3305;
      color: white;
      padding: 0rem 1.5rem;
      border-radius: 2rem;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #cb0000;
      }

      @media (max-width: 500px) {
        font-size: 1rem;
        padding: 0.4rem 1rem;
      }
    }
  }

  @media (max-width: 500px) {
    border-radius: 1rem;
    padding: 0.8rem;
    background-size: 90%;
  }
`;

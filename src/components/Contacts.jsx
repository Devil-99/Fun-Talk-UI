import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { usersRoute } from '../utils/apiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOptions';
import { FaCircleUser } from "react-icons/fa6";
import FunTalk from '../assets/FunTalk.png'

export default function Contacts({ currentUser, selectedUser, setSelectedUser }) {
  const [allusers, setAllusers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(usersRoute, { params: { user_id: currentUser.user_id } });

      if (response.status === 200)
        setAllusers(response.data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        toast.error(data.message, toastOptions);
      } else if (error.request) {
        toast.error('Network error. Please check your connection.', toastOptions);
      } else {
        toast.error('An unexpected error occurred. Please try again.', toastOptions);
      }
    }
  }

  useEffect(() => {
    if (currentUser)
      fetchUsers();
  }, []);

  return (
    <Container>
      <div className='contacts'>
        {
          allusers.map((user, index) => {
            return (
              <div className={`contact ${selectedUser && user.user_id === selectedUser.user_id ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedUser(user)}
              >
                <div className='username'>
                  {
                    user.dp ?
                      <img
                        src={user.dp}
                        style={{ width: "1.5rem", height: "1.5rem", objectFit: "cover", borderRadius: "50%" }}
                      />
                      :
                      <FaCircleUser style={{ fontSize: '2rem', color: 'gray' }} />
                  }
                  <h3>{user.username}</h3>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='current-user'>
        <div className='username' onClick={() => setSelectedUser(null)}>
          <h2 title="Go to Home">{"Home"}</h2>
        </div>
      </div>
      <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  overflow: hidden;
  background: url(${FunTalk}) no-repeat center center;
  background-size: 80%;
    background-color: #252525;
  box-shadow: -5px -5px 12px #3a3a3a, 5px 5px 12px #000000;
  border-radius: 3rem;
  padding: 1rem;

  @media screen and (min-width: 250px) and (max-width: 500px) {
    box-shadow: none;
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 28rem;
    padding: 1rem 0;
    overflow-y: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }

    .contact {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #00000090;
      min-height: 3rem;
      width: 90%;
      border-radius: 2rem;
      padding: 0 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out, transform 0.2s;

      &:hover {
        transform: scale(1.03);
        background-color: #121212;
      }

      @media screen and (min-width: 250px) and (max-width: 500px) {
        padding: 0.4rem;
        width: 80%;
        border-radius: 0.8rem;
      }

      .username {
        display: flex;
        align-items: center;
        gap: 1rem;

        h3 {
          margin: 0;
          font-size: 1rem;
          color: white;
        }

        @media screen and (min-width: 250px) and (max-width: 500px) {
          h3 {
            font-size: 0.85rem;
          }
        }
      }
    }

    .selected {
      background: linear-gradient(to right, #fb3b13, #ffa836);
    }
  }

  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;

    .username {
      cursor: pointer;
      text-align: center;

      h2 {
        font-size: 1.4rem;
        background-color: #ff3305;
        transition: background-color 0.3s ease-in-out;
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;

        &:hover {
          background-color: #cb0000;
        }

        @media screen and (min-width: 250px) and (max-width: 500px) {
          font-size: 1rem;
          padding: 0.3rem 1rem;
        }
      }
    }
  }
`;


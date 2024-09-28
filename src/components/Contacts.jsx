import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { usersRoute } from '../utils/apiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOptions';

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
            <div className='brand'>
                <h1>FunTalk</h1>
            </div>
            <div className='contacts'>
                {
                    allusers.map((user, index) => {
                        return (
                            <div className={`contact ${selectedUser && user.user_id === selectedUser.user_id ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedUser(user)}
                            >
                                <div className='username'>
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
grid-template-rows: 10% 80% 10%;
overflow: hidden;
background-color: #00000060;
box-shadow: -5px -5px 12px #3A3A3A, 5px 5px 12px #000000;
border-radius: 3rem;
@media screen and (min-width: 250px) and (max-width: 500px){
    box-shadow: 0px 0px;
    border-radius: 1rem;
}
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: Yellow;
    @media screen and (min-width: 250px) and (max-width: 500px){
        h1{
            font-size: 1.5rem;
        }        
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact{
        display: flex;
        align-items:center;
        background-color: #00000090;
        min-height: 1.5rem;
        width: 90%;
        border-radius: 2rem;
        padding: 0.4rem 0 0.4rem 0;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        @media screen and (min-width: 250px) and (max-width: 500px){
            padding: 0.4rem;    
            width: 75%;
            border-radius: 0.5rem;
        }
        .username{
            overflow: hidden;
            margin-left: 1rem;
            h3{
                font-size: 0.9rem;
                color: white;
            }
            @media screen and (min-width: 250px) and (max-width: 500px){
                margin-left: 0.2rem;
                h3{
                    font-size: 0.8rem;
                    margin: 0.2rem;
                }
            }
            
        }
    }
    .selected{
        background-color: #FB3B13 ;
        background-image: linear-gradient(to right,#FB3B13, #FFA836);
    }
}
.current-user{
    display: flex;
    align-items: center;
    justify-content: center;
    .username{
        cursor: pointer;
        text-align:center;
        h2{
            @media screen and (min-width: 250px) and (max-width: 500px){
                font-size: 1rem;
                padding: 0.25rem 0.8rem 0.25rem 0.8rem;
                margin: 0rem;
            }
            font-size:1.2rem;
            background-color: #FF3305;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #CB0000;
            }
            padding: 0.4rem 1rem 0.4rem 1rem;
            border-radius: 2rem;
            color:white;
        }
    }
}

`;

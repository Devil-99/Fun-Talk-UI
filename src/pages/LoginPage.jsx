import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // importing the toastify css. Without this the notification will not visible.
import axios from 'axios';
import { loginRoute } from '../utils/apiRoutes';
import {toastOptions} from '../utils/toastOptions';

function LoginPage() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        mail: "",
        password: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents page refresh
        if (handleValidation()) {
            try {
                const response = await axios.post(loginRoute, values);
                if (response.status === 200) {
                    localStorage.setItem('TechTalk-user', JSON.stringify(response.data));
                    navigate('/');
                }
            } catch (error) {
                if (error.response) {
                    // Errors returned from the server (4xx, 5xx responses)
                    const { status, data } = error.response;
                    toast.error(data.message, toastOptions);
                } else if (error.request) {
                    // No response from server (network issue)
                    toast.error('Network error. Please check your connection.', toastOptions);
                } else {
                    // Other errors (coding issues, etc.)
                    toast.error('An unexpected error occurred. Please try again.', toastOptions);
                }
            }
        }
    };

    const handleValidation = () => {
        const { mail, password } = values;
        if (mail === "") {
            toast.error("Email is required !", toastOptions);
            return false;
        }
        if (password === "") {
            toast.error("Password is required !", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='Brand'>
                        <h1>FunTalk</h1>
                    </div>
                    <input type="text" placeholder='Email' name='mail' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <button type='submit' onClick={handleSubmit}>Login</button>
                    <span>Don't have an account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color: #232323;
form{
    display:flex;
    flex-direction:column;
    gap: 1rem;
    background-color: #00000060;
    box-shadow: -5px -5px 15px #3A3A3A, 10px 10px 20px #000000;
    border-radius: 4rem;
    padding: 3rem 4rem;
    .Brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap: 1rem;
    }
    h1{
        color:white;
    }
    input{
        background-color:transparent;
        padding: 1rem;
        border: 0.1rem solid #FF5605;
        border-radius: 0.4rem;
        color:white;
        width:1005;
        font-size: 0.8rem;
        &:focus{
            border: 0.1rem solid #FFA136;
            outline:none;
        }
    }
    button{
        background-color: #FF5605;
        background-image: linear-gradient(to left, #FF5605, #FFA136);
        color: white;
        padding: 0.8rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #FF5605;
            background-image: linear-gradient(to right, #FF5605, #FFA136);
        }
    }
    span{
        color: white;
        display:flex;
        font-size:0.8rem;
        justify-content: center;
        a{
            color: #FF5605;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default LoginPage
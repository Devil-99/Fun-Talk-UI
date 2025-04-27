import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // importing the toastify css. Without this the notification will not visible.
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';

function RegisterPage() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents page refresh

        if (handleValidation()) {
            try {
                const response = await axios.post(registerRoute, values);
                if(response.status === 200){
                    navigate('/login');
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    setValues({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    });
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
    }

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const handleValidation = () => {
        const { username, password, confirmPassword } = values;
        if (username.length < 3) {
            setValues((prev) => ({
                ...prev,
                username: ""
            }));
            toast.error("Username length should be greater than 3 !", toastOptions);
            return false;
        }
        if (username.length > 10) {
            setValues((prev) => ({
                ...prev,
                username: ""
            }));
            toast.error("Username length should be less than 10 !", toastOptions);
            return false;
        }
        if (username === "") {
            toast.error("Username is required !", toastOptions);
            return false;
        }
        if (password.length < 5) {
            setValues((prev) => ({
                ...prev,
                password: ""
            }));
            toast.error("Password length should be greater than 5 !", toastOptions);
            return false;
        }
        else if (password !== confirmPassword) {
            setValues((prev) => ({
                ...prev,
                password: "",
                confirmPassword: ""
            }));
            toast.error("Password and Confirm Password should be same !", toastOptions);
            return false;
        }
        else {
            return true;
        }
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
                    <input type="text" placeholder='Username' name='username' value={values.username} onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder='Email' name='email' value={values.email} onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' value={values.password} onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' value={values.confirmPassword} onChange={(e) => handleChange(e)} />
                    <input type="text" placeholder='City' name="city" value={values.city} onChange={(e)=> handleChange(e)} />
                    <button type='submit' onClick={handleSubmit}>Create User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
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
    padding: 2rem 4rem;
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
        font-size:0.8rem;
        a{
            color: #FF5605;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default RegisterPage
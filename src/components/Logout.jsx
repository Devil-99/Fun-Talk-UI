import styled from 'styled-components';
import { logoutRoute } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOptions';
import { BiPowerOff } from 'react-icons/bi';
import { getSocket } from '../redux/slices/socketSlice';

export default function Logout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const connected = useSelector((state) => state.socket.connected);

  const handleClick = async () => {
    try {
      const response = await axios.post(logoutRoute, { userId: user.user_id });
      if (response.status === 200) {
        if(connected){
          const socket = getSocket();
          socket.emit('logout', user);
        }
        localStorage.removeItem('TechTalk-user');
        navigate('/login');
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

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
};

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #FF5605;
border: none;
cursor: pointer;
svg{
    font-size: 1rem;
    color: #ffffff;
    @media screen and (min-width: 250px) and (max-width: 500px){
    font-size: 1rem;
    }
}
`;
import React from 'react';
import styled from 'styled-components';
import { FaList, FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

function WelcomeFooter({ setSetting }) {
  return (
    <Container>
      <div className="icons">
        <ClipLoader color="#FF5605" loading={true} size={45} speedMultiplier={0.5} />
        <FaList className="icon" style={{color: 'yellow'}} />
      </div>
      <div className="icons">
        <ClipLoader color="#FF5605" loading={true} size={45} speedMultiplier={0.5} />
        <FaCalendarAlt className="icon" style={{color: 'skyblue'}} />
      </div>
      <div className="icons" onClick={() => setSetting("admin")}>
        <ClipLoader color="#FF5605" loading={true} size={45} speedMultiplier={0.5} />
        <IoSettings className="icon" style={{color: 'gray'}} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  gap: 1rem;

  .icons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    cursor: pointer;

    .icon {
      position: absolute;
      font-size: 1.3rem; /* Adjust to fit nicely with the loader */
    }

    @media screen and (min-width: 250px) and (max-width: 500px) {
      width: 40px;
      height: 40px;

      .icon {
        font-size: 1rem;
      }
    }
  }
`;

export default WelcomeFooter;

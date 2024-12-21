import React from 'react';
import styled from 'styled-components';
import { MdDelete, MdInfo } from 'react-icons/md';
import { format } from 'timeago.js';

export default function Message({ message, isCurrentUser, onDelete }) {
  return (
    <MessageContainer isCurrentUser={isCurrentUser}>
      <div className="content">
        {isCurrentUser && (
          <div className='actions'>
            <button className="info">
              <MdInfo />
            </button>
            <button className="delete" onClick={() => onDelete(message)}>
              <MdDelete />
            </button>
          </div>
        )}
        <div className="msgfield">
          <p>{message.message}</p>
        </div>
        <i className="time">{format(message.timestamp)}</i>
      </div>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};

  .content {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 1rem;
    padding: 0.5rem;
    max-width: 50%;
    border-radius: 1rem;
    background-color: ${(props) => (props.isCurrentUser ? '#56D2FE' : '#FF8FB3')};
    color: ${(props) => (props.isCurrentUser ? 'white' : 'black')};
    overflow-wrap: break-word;

    .actions {
      display: flex;
      flex-direction: row;
    }

    .msgfield p {
      margin: 0;
      font-size: 1.1rem;
    }

    .time {
      font-size: 0.8rem;
      margin-left: auto;
    }

    .info,
    .delete {
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      svg {
        color: ${(props) => (props.isCurrentUser ? 'white' : 'black')};
        font-size: 1rem;
      }
    }
  }
`;

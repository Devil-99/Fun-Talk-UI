import React from 'react'
import styled from 'styled-components'
import { IoArrowBackCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

function AdminPage({ user, setSetting }) {

  // const handleSave = async () => {
  //   if (newUsername == null)
  //     navigate('/');
  //   else {
  //     const { data } = await axios.post(renameRoute, { currentUser, newUsername });
  //     if (data.status === false) {
  //       console.error(data.msg);
  //     }
  //     if (data.status === true) {
  //       localStorage.setItem('chat-app-user', JSON.stringify(data.user));
  //       navigate('/');
  //       window.location.reload(true);
  //     }
  //   }
  // }

  return (
    <Container>
      <div className='body'>
        <div className='header'>
          <h2 style={{margin: 0, color: '#FF5605'}}>Setting</h2>
          <IoArrowBackCircle style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={()=>setSetting('')}/>
        </div>
        <div className="mainbody">
          <div className='fields'>
            <h2>Username:</h2>
            <h3>{user.username}</h3>
            <MdEdit style={{ cursor:'pointer', color: 'cyan', backgroundColor: 'gray', borderRadius: '2rem', padding: '0.2rem' }} />
          </div>
          <div className='fields'>
            <h2>Email:</h2>
            <h3>{user.user_mail}</h3>
            <MdEdit style={{ cursor:'pointer', color: 'cyan', backgroundColor: 'gray', borderRadius: '2rem', padding: '0.2rem' }} />
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
.body{
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 1px 1px 2px gray;    
    padding: 0.5rem;
  }
  .mainbody{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    box-shadow: 1px 1px 1px gray;

    .fields{
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      h2{
        margin: 0;
      }
      h3{
        margin: 0
      }
    }
  }
}
`

export default AdminPage
import React, { useState } from 'react'
import styled from 'styled-components'
import { IoArrowBackCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';
import { uploadDPRoute } from '../utils/apiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOptions';
import imageCompression from 'browser-image-compression';

function AdminPage({ user, setSetting }) {

  const creation_date = user && user.creation_date;
  const formattedDate = new Date(creation_date);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // Check if size > 1MB
        try {
          const options = {
            maxSizeMB: 1, // Target size in MB
            // maxWidthOrHeight: 1920, // Optional: scale image to a max dimension
            useWebWorker: true, // Use web workers for better performance
          };
          const compressedFile = await imageCompression(file, options);
          setImage(compressedFile);
  
          // Create a preview URL
          const previewUrl = URL.createObjectURL(compressedFile);
          setPreview(previewUrl);
        } catch (error) {
          console.error("Error during image compression:", error);
        }
      } else {
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }
  };

  const handleCancelDP = () => {
    setPreview(null);
  }

  const handleDPUpload = async () => {
    if (!image) {
      toast.warning("Please select an image first!", toastOptions);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("user_id", user.user_id);

    try {
      const response = await axios.post(uploadDPRoute, formData);

      if (response.status === 200) {
        const uploadedImage = response.data.image;

        const userData = JSON.parse(localStorage.getItem("TechTalk-user")); // Retrieve the current user data
        userData.dp = uploadedImage; // Update the dp field
        localStorage.setItem("TechTalk-user", JSON.stringify(userData));

        toast.success("Image uploaded successfully!", toastOptions);
        handleCancelDP();
        window.location.reload();
        return;
      } else {
        toast.error(response.data.message || "Image upload failed!", toastOptions);
        return;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image.", toastOptions);
    }
  };

  return (
    <Container>
      <div className='body'>
        <div className='header'>
          <h2 style={{ margin: 0, color: '#FF5605' }}>Setting</h2>
          <IoArrowBackCircle style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setSetting('')} />
        </div>
        <div className="mainbody">
          <div>
            {
              preview ?
                (
                  <div style={{ marginBottom: "1rem" }}>
                    <img
                      src={preview}
                      alt="Selected Preview"
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                    />
                    <button style={{ padding: "5px 10px", cursor: "pointer" }} onClick={handleDPUpload}>
                      Upload
                    </button>
                    <button style={{ padding: "5px 10px", cursor: "pointer" }} onClick={handleCancelDP}>
                      X
                    </button>
                  </div>
                ) :
                <div style={{ display: 'flex', width: '100%', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
                  {
                    user.dp ?
                      <img
                        src={user.dp}
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                      />
                      :
                      <FaCircleUser style={{ fontSize: '8rem', color: 'gray' }} />
                  }
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
            }
          </div>
          <div className='fields'>
            <h2>Username:</h2>
            <h3>{user.username}</h3>
            <MdEdit style={{ cursor: 'pointer', color: 'cyan', backgroundColor: 'gray', borderRadius: '2rem', padding: '0.2rem' }} />
          </div>
          <div className='fields'>
            <h2>Email:</h2>
            <h3>{user.user_mail}</h3>
            <MdEdit style={{ cursor: 'pointer', color: 'cyan', backgroundColor: 'gray', borderRadius: '2rem', padding: '0.2rem' }} />
          </div>
          <div className='fields'>
            <h2>Creation Date:</h2>
            <h3>{formattedDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</h3>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  )
}


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
    box-shadow: 1px 1px 3px gray, -2px -2px 4px black;    
    padding: 0.5rem;
  }
  .mainbody{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;

    .fields{
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      padding: 1rem 0;
      gap: 1rem;
      align-items: center;
      border-bottom: 1px solid gray;
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
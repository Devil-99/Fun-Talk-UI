import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import styled from 'styled-components';

function PreLoader({loading}) {
  return (
    <Container>
        <PuffLoader
        color="#FF5605"
        loading={loading}
        size={80}
        />
    </Container>
  )
}

const Container = styled.div`
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;
`;

export default PreLoader;
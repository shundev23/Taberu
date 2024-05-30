import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`;

const StyledForm = styled(Box)`
display: flex;
flex-direction: column;
width: 300px;
gap: 20px;
`;

// function Login() {
//     const [htmlContent, setHtmlContent] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:8000/login');
//                 if (!response.ok) {
//                     throw new Error("Server Error");
//                 }
//                 const html = await response.text();
//                 setHtmlContent(html);
//             } catch (error) {
//                 console.error("failured of getting API Data", error);
//                 setError(error.toString());
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <div>
//             {error && <p>Server Error: {error}</p>}
//             {htmlContent ? (
//                 // HTMLコンテンツを安全に挿入
//                 <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//             ) : (
//                 <p>データの読み込み中...</p>
//             )}
//         </div>
//     );
// }

const Login = () => {
    return (
      <StyledContainer>
        <Typography variant="h4">Login</Typography>
        <StyledForm>
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary">Login</Button>
        </StyledForm>
      </StyledContainer>
    );
  };

export default Login;

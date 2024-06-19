import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const responseGoogle = (response) => {
        console.log(response);
        // Google認証情報をバックエンドに送信する処理を追加
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 추가

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const userObject = jwtDecode(credentialResponse.credential);
          onSuccess(userObject);
        }}
        onError={() => {
          onFailure("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

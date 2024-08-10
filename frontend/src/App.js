import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        {accessToken ? (
          <MainPage accessToken={accessToken} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

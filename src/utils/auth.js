import { gapi } from "gapi-script";

export const getAuthHeaders = async () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/youtube.readonly",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          const user = authInstance.currentUser.get();
          const token = user.getAuthResponse().id_token;

          resolve({
            Authorization: `Bearer ${token}`,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

import { gapi } from "gapi-script";

export const getAuthHeaders = async () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: [
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/youtube",
            "https://www.googleapis.com/auth/youtube.force-ssl",
            "https://www.googleapis.com/auth/youtubepartner",
            // 필요한 다른 스코프를 여기에 추가할 수 있습니다.
          ].join(" "),
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

import axios from "axios";

const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axios.post("/api/refresh-token", { refreshToken });
    const { accessToken, newRefreshToken } = response.data;
    saveTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw new Error("토큰 갱신에 실패했습니다.");
  }
};

const validateToken = (token) => {
  if (!token) return false;

  const decodedToken = decodeToken(token);
  if (
    !decodedToken ||
    !decodedToken.exp ||
    Date.now() >= decodedToken.exp * 1000
  ) {
    return false;
  }
  return true;
};

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
};

export { getRefreshToken, refreshAccessToken, validateToken };

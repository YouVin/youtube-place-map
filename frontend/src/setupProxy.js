const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 프록시할 API의 경로
    createProxyMiddleware({
      target: "http://localhost:3000", // 백엔드 서버 주소
      changeOrigin: true,
    })
  );
};

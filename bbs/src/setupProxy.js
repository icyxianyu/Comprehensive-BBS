const {
    createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware(
        "/api", {
            target: "http://127.0.0.1:3333",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "" // 如果是/api开头的请求全部跳至target对应的地址
            }
        }
    ));
    app.use(createProxyMiddleware(
        "/bank", {
            target: "http://127.0.0.1:8000",
            changeOrigin: true,
            pathRewrite: {
                "^/bank": "" // 如果是/api开头的请求全部跳至target对应的地址
            }
        }
    ));
    app.use(createProxyMiddleware(
        "/music", {
            target: "http://127.0.0.1:4000",
            changeOrigin: true,
            pathRewrite: {
                "^/music": "" // 如果是/api开头的请求全部跳至target对应的地址
            }
        }
    ));
};

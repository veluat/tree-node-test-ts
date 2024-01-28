const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            headers: {
                'Access-Control-Allow-Origin': 'https://veluat.github.io/tree-node-test-ts',
                'Access-Control-Allow-Credentials': true,
            },
            changeOrigin: true,
            secure: false,
            target: 'https://test.vmarmysh.com',
        })
    );
};
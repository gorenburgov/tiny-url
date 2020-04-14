const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/tiny', {
            target: 'http://localhost:5000',
        })
    );

    app.use(
        proxy('/source', {
            target: 'http://localhost:5000',
        })
    );
};

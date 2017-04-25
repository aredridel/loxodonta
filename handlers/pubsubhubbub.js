const promiseHandler = require('../bits/promise-handler');

module.exports = function ({server}) {

    server.post('/hub', promiseHandler((req, res) => {
        console.warn(req.headers);
        req.pipe(process.stdout);
        res.end('');
    }));

};

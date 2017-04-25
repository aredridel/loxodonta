const promiseHandler = require('../bits/promise-handler');

module.exports = function ({server, config, db}) {
    server.post('/api/salmon/:id', promiseHandler((req, res) => {
	console.warn(req.headers);
	req.pipe(process.stdout);
	return ''
    }));
};

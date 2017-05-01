const express = require('express');
const replify = require('replify');

const config = require('./config');
const db = require('./db')({config});
const App = require('./app');

const server = express();

server.use((req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
})

const app = new App({ server, config, db });
const ctx = { server, config, db, app };

replify({ name: 'loxodonta', path: '/tmp/repl' }, app, { server, config, db });

require('./handlers/host-meta')(ctx);
require('./handlers/webfinger')(ctx);
require('./handlers/atom')(ctx);
require('./handlers/salmon')(ctx);
require('./handlers/pubsubhubbub')(ctx);

server.listen(process.env.PORT || 8014);

const express = require('express');

const app = express();

const config = require('./config');

const db = require('./db')({config});

app.use((req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
})

const ctx = { app, config, db };

require('./handlers/host-meta')(ctx);
require('./handlers/webfinger')(ctx);
require('./handlers/atom')(ctx);

app.listen(process.env.PORT || 8014);

const express = require('express');
const replify = require('replify');
const ifP = require('if-p');

const server = express();

const config = require('./config');

const db = require('./db')({config});

server.use((req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
})

class App {
	constructor(opts) {
		Object.assign(this, opts);
	}

	addAccount({username, password}) {
		const existing = NotFoundAsNull(this.db.accounts.get(username))
		return ifP(existing,
			() => { throw new Error("user already exists") },
			() => this.db.accounts.put(username, {username, password}));
	}
}

const ctx = { server, config, db };
const app = new App({ server, config, db });

replify({ name: 'loxodonta', path: '/tmp/repl' }, app, ctx);

require('./handlers/host-meta')(ctx);
require('./handlers/webfinger')(ctx);
require('./handlers/atom')(ctx);

server.listen(process.env.PORT || 8014);

function NotFoundAsNull(e) {
	return Promise.resolve(e).catch(e => {
		if (e.name != 'NotFoundError') throw e;
	})
}

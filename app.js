const ifP = require('if-p');

module.exports = class App {
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

function NotFoundAsNull(e) {
	return Promise.resolve(e).catch(e => {
		if (e.name != 'NotFoundError') throw e;
	})
}

const ifP = require('if-p');
const FlakeGen = require('flakeid');
const pubsubhubbub = require('./bits/pubsubhubbub');
const ts = require('internet-timestamp');
const magic = require('magic-signatures');

const flake = new FlakeGen();

module.exports = class App {
	constructor(opts) {
		Object.assign(this, opts);
	}

	addAccount({username, password}) {
		const existing = NotFoundAsNull(this.db.accounts.get(username))
		return ifP(existing,
			() => { throw new Error("user already exists") },
			() => {
				const k = magic.generate(2048);
				const obj = k.then(key => Object.assign({
					username,
					password
				}, key));

				return obj.then(obj => this.db.accounts.put(username, obj));
			})
	}

	post(userPost) {
		const post = Object.assign({
			published: ts(new Date()),
			localid: flake.gen()
		}, userPost);

		this.db.posts.put(post.localid, post);
		// Add to user's posts.
		this.db.postsByAuthor.forUser(post.author).put(post.localid, post.localid);
		this.db.timelines.forUser(post.author).put(post.localid, post.localid);

		// Fan out
		// for each follower,
		//    this.db.timelines.forUser(follower).put(post.localid, post.localid);

		// distribute status to local timelines
		// notify about mentions (salmon)
		// Notify about reblog if it's a reblog (salmon)
		// Notify about new post (PuSH)
		//
		this.notify([`https://${this.config.HOST}/users/${post.author}.atom`]);
		
	}

	notify(urls) {
		pubsubhubbub.publish(this.config.hub, urls)
			.then(() => console.log("Notifying succeeded"), e => console.warn(`Notifying failed: ${e}`))
	}

	dispatchSalmon(salmon) {
	}
}

function NotFoundAsNull(e) {
	return Promise.resolve(e).catch(e => {
		if (e.name != 'NotFoundError') throw e;
	})
}

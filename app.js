const ifP = require('if-p');
const FlakeGen = require('flakeid');

const flake = new FlakeGen();

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

	post(post) {
  	post.localid = flake.gen();
    this.db.posts.put(post.localid, post);
    // Add to user's posts.
    this.db.postsByAuthor.put(post.localid, post.localid);
    this.db.timelines.forUser(post.author).put(post.localid, post.localid);

    // Fan out
    // for each follower,
    //    this.db.timelines.forUser(follower).put(post.localid, post.localid);

    // distribute status to local timelines
    // notify about mentions (salmon)
    // Notify about reblog if it's a reblog (salmon)
    // Notify about new post (PuSH)
	}
}

function NotFoundAsNull(e) {
	return Promise.resolve(e).catch(e => {
		if (e.name != 'NotFoundError') throw e;
	})
}

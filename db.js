const level = require('level');
const levelgraph = require('levelgraph');
const path = require('path');
const promisifyLevelGraph = require('./promisify-levelgraph');
const sublevel = require('level-sublevel');
const levelPromise = require('level-promise');
const levelgraphjsonld = require('levelgraph-jsonld');

module.exports = function() {
    return {
        graph,
        db,
        posts,
        postsByAuthorBase,
        postsByAuthor,
        timelinesBase,
        timelines,
        pubsubhubbubsubsBase,
        pubsubhubbubsubs,
        accounts
    }
}
const db = levelPromise(sublevel(level(path.resolve(__dirname, 'db'), err => {
    if (err) {
        console.warn(`Database error: ${err.stack || err}`);
        process.exit(1);
    }
})));

const accounts = levelPromise(db.sublevel('accounts', { valueEncoding: 'json' }))
const posts = levelPromise(db.sublevel('posts', { valueEncoding: 'json' }));
const postsByAuthorBase = levelPromise(db.sublevel('postsByAuthor', { valueEncoding: 'json' }));
const postsByAuthor = {
    forUser(user) {
        return levelPromise(postsByAuthorBase.sublevel(user, { valueEncoding: 'json' }));
    }
};
const timelinesBase = levelPromise(db.sublevel('timelines', { valueEncoding: 'json' }));
const timelines = {
    forUser(user) {
        return levelPromise(timelinesBase.sublevel(user, { valueEncoding: 'json' }))
    }
};

const pubsubhubbubsubsBase = db.sublevel('pubsubhubbubhsubs', {valueEncoding: 'json'});

const pubsubhubbubsubs = {
    forTopic(topic) {
        return levelPromise(pubsubhubbubsubsBase.sublevel(topic, {valueEncoding: 'json'}));
    }
};

const graph = promisifyLevelGraph(levelgraphjsonld(levelgraph(db.sublevel('graph'))));

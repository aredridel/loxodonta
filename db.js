const leveldown = require('leveldown');
const levelgraph = require('levelgraph');
const levelup = require('levelup');
const path = require('path');
const promisifyLevelGraph = require('./promisify-levelgraph');
const sublevel = require('level-sublevel');
const levelPromise = require('level-promise');

module.exports = function({config}) {
    const db = levelPromise(sublevel(levelup(path.resolve(__dirname, config.db || 'db'), { db: leveldown }, err => {
        if (err) {
            console.warn(`Database error: ${err.stack || err}`);
            process.exit(1);
        }
    })));

    const accounts = levelPromise(db.sublevel('accounts', {
        valueEncoding: 'json'
    }))

    return {
        graph: promisifyLevelGraph(levelgraph(db.sublevel('graph'))),
        db,
        accounts
    }
}

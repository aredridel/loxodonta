const leveldown = require('leveldown');
const levelgraph = require('levelgraph');
const levelup = require('levelup');
const path = require('path');
const promisifyLevelGraph = require('./promisify-levelgraph');
const sublevel = require('level-sublevel');


module.exports = function({config}) {
    const base = sublevel(levelup(path.resolve(__dirname, config.db || 'db'), { db: leveldown }, err => {
        if (err) {
            console.warn(`Database error: ${err.stack || err}`);
            process.exit(1);
        }
    }));

    const db = promisifyLevelGraph(levelgraph(base.sublevel('graph')));

    return db;
}

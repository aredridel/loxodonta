const promisifyLevelGraph = require('./promisify-levelgraph');
const levelup = require('levelup');
const leveldown = require('leveldown');
const sublevel = require('level-sublevel');

const levelgraph = require('levelgraph');
const path = require('path');

const base = sublevel(levelup(path.resolve(__dirname, 'db'), { db: leveldown }, err => {
    if (err) {
        console.warn(`Database error: ${err.stack || err}`);
        process.exit(1);
    }
}));

const db = promisifyLevelGraph(levelgraph(base.sublevel('graph')));

module.exports = db;

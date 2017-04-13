const promisifyLevelGraph = require('./promisify-levelgraph');
const levelup = require('levelup');
const leveldown = require('leveldown');

const levelgraph = require('levelgraph');
const path = require('path');

const db = promisifyLevelGraph(levelgraph(levelup(path.resolve(__dirname, 'db'), { db: leveldown }, err => { 
	if (err) {
		console.warn(`Database error: ${err.stack || err}`);
		process.exit(1);
	}
})));

module.exports = db;

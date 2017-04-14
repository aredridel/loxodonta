'use strict';

const promisify = require('es6-promisify-all');

module.exports = then;

function then(db) {
    promisify(db);
    db.n3 && promisify(db.jsonld);
    db.jsonld && promisify(db.jsonld);

    return db;
}

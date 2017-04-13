'use strict';

const Promise = require('promise');

module.exports = then;

function then(db) {
    return Object.assign({},
    db,
    db.search ? {
        search: Promise.denodeify(db.search.bind(db)),
    } : {},
    db.n3 ? {
        n3: then(db.n3)
    } : {},
    db.jsonld ? {
        jsonld: then(db.jsonld)
    }:  {})
}

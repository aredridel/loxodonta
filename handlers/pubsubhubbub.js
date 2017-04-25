const promiseHandler = require('../bits/promise-handler');
const bodyParser = require('body-parser');
const fetch = require('make-fetch-happen');
const url = require('url');
const qs = require('querystring');
const crypto = require('crypto');
const ifP = require('if-p');

module.exports = function ({server, db}) {

    server.post('/hub', bodyParser.urlencoded(), promiseHandler((req) => {
        const response = {
            'hub.mode': req.body['hub.mode'],
            'hub.topic': req.body['hub.topic'],
            'hub.challenge': crypto.randomBytes(16).toString('hex'),
            'hub.lease_seconds': Math.min(req.body['hub.lease_seconds'] || Infinity, 1209630)
        };

        const verification = fetch(url.resolve(req.body['hub.callback'], `?${qs.stringify(response)}`)).then(r => {
            if (r.statusCode < 200 || r.statusCode > 300) throw new Error("Failed");
            return r.text();
        }).then(r => {
            if (r != response['hub.challenge']) throw new Error("Failed");
        })

        const stored = verification.then(() => ifP(req.body['hub.mode'] == 'subscribe', () => {
            const data = Object.assign({}, req.body, {
                'hub.lease_seconds': Math.min(req.body['hub.lease_seconds'] || Infinity, 1209630)
            });
            return db.pubsubhubbubsubs.forTopic(req.body['hub.topic']).put(req.body['hub.callback'], data);
        }, () => {
            return db.pubsubhubbubsubs.forTopic(req.body['hub.topic']).del(req.body['hub.callback']);
        }));

        const reply = stored.then(() => '');

        return reply;
    }));

};

const promiseHandler = require('../bits/promise-handler');
const bodyParser = require('body-parser');
const fetch = require('make-fetch-happen');
const url = require('url');
const qs = require('querystring');
const crypto = require('crypto');
const ifP = require('if-p');
const collect = require('stream-collector-p');

module.exports = function ({server, db}) {

    server.post('/hub', bodyParser.urlencoded(), promiseHandler((req) => {
        const mode = req.body['hub.mode'];
        const reply = mode == 'publish' ? publish(req)
            : mode == 'subscribe' || mode == 'unsubscribe' ? subscribe(req)
            : error('Invalid mode');

        return reply;

    }));

    function publish(req) {
        const topics = [].concat(req.body['hub.url'])
        const callbacks = topics.map(topic => {
            const targets = collect(db.pubsubhubbubsubs.forTopic(topic).createValueStream())
            return targets.then(targets => targets.map(target => {
                const r = fetch(topic);
                const contentType = r.then(r => r.headers.get('content-type'));
                const body = r.then(r => {
                    return r.buffer()
                });
                const hmac = maybeHMAC(body, target['hub.secret']);
                return Promise.all([body, contentType, hmac]).then(([body, contentType, hmac]) => {
                    return fetch(target['hub.callback'], {
                        method: 'POST',
                        body: body,
                        headers: Object.assign({
                            'content-type': contentType
                        }, hmac ? {
                            'X-Hub-Signature': hmac
                        } : {})
                    })
                    .then(res => res.status >= 200 && res.status < 300 ? res.text() : error(res.status))
                });

            }));
        });
        return Promise.all(callbacks).then(() => '');
    }


    function subscribe(req) {
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
    }

};

function error(msg) {
    throw new Error(msg);
}

function maybeHMAC(content, secret) {
    return Promise.all([content, secret]).then(([content, secret]) => {
        if (!secret) return null;
        const hmac = crypto.createHmac('sha1', secret);
        hmac.update(content);
        const digest = hmac.digest();
        return `sha1=${digest.toString('hex')}`;
    });

}

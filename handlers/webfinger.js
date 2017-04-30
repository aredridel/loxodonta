const url = require('url');
const xrd = require('../xrd-schema');
const XMLSchema = require('xml-schema');
const promiseHandler = require('../bits/promise-handler');

const xrdSchema = new XMLSchema(xrd.xrd);

module.exports = function ({server, db}) {
    server.get('/.well-known/webfinger', promiseHandler((req, res) => {
        const resource = url.parse(req.query.resource);

        const user = db.accounts.get(resource.auth)

        return user.then(user => {
            res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
            return xrdSchema.generate({
                subject: `acct:${user.username}@${resource.host}`,
                alias: `https://${resource.host}/@${user.username}`,
                links: [
                    { rel: "http://webfinger.net/rel/profile-page", type: "text/html", href: `https://${resource.host}/@${user.username}` },
                    { rel: "http://schemas.google.com/g/2010#updates-from", type: "application/atom+xml", href: `https://${resource.host}/users/${user.username}.atom` },
                    { rel: "salmon", href: `https://${resource.host}/api/salmon/${user.username}` },
                    { rel: "magic-public-key", href: `data:application/magic-public-key,${user.public_key}` },
                    { rel: "http://ostatus.org/schema/1.0/subscribe", template: `https://${resource.host}/authorize_follow?acct={uri}` }
                ]
            });
        });
    }));

};

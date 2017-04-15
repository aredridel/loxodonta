const url = require('url');
const xrd = require('../xrd-schema');
const XMLSchema = require('xml-schema');
const promiseHandler = require('../bits/promise-handler');

const xrdSchema = new XMLSchema(xrd.xrd);

module.exports = function ({server, db}) {
    server.get('/.well-known/webfinger', promiseHandler((req, res) => {
        const resource = url.parse(req.query.resource);

        const user = db.accounts.get(resource.auth)

        const responded = user.then(user => {
            res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
            res.end(xrdSchema.generate({
                subject: `acct:${user.username}@${resource.host}`,
                alias: `https://${resource.host}/@${user.username}`,
                links: [
                { rel: "http://webfinger.net/rel/profile-page", type: "text/html", href: `https://${resource.host}/@${user.username}` },
                { rel: "http://schemas.google.com/g/2010#updates-from", type: "application/atom+xml", href: `https://${resource.host}/users/${user.username}.atom` },
                { rel: "salmon", href: `https://${resource.host}/api/salmon/19483` },
                { rel: "magic-public-key", href: "data:application/magic-public-key,RSA.xcRrdBhH1-cgi_JerZiQbNL_63qlLDrG4M_JAJINHqngiUIup53te5HwBVyBITX9aovfoJVdV1QzlVTr2j3PkruXfviStekTdk9PdFSrrYx37Uvk8z1-qIV_qdMgo1D7ypZyAn6LxSKCfDgxmGFQJ200uULF5rdFmNZG-jO4bB_wDOsXd9dEQEpCS4wmKqIrWCFtpDQ9ObZMsUsbynfNmYXRnSxuhFtFfbFfMWKFRoNorB_6XZndQwQU1Dst4ZE6R9Lw2CJIyIl9avHLx5EAnjl1B1oE7LhxE9hDJ-h6ye1qny9c-Cnw5Bp0qkfMw5saWlJDealrTyimaohtoJZhYw==.AQAB" },
                { rel: "http://ostatus.org/schema/1.0/subscribe", template: `https://${resource.host}/authorize_follow?acct={uri}` }
                ]
            }));
        });

        return responded;
    }));

};

const url = require('url');
const xrd = require('../../xrd-schema');
const XMLSchema = require('xml-schema');
const dbP = require('../../db')();

const xrdSchema = new XMLSchema(xrd.xrd);
const query = require('micro-query');

module.exports = async (req, res) => {
    const db = await dbP;
    const q = query(req)
        if (!q.resource) throw new Error("Bad input: supply resource")
        const resource = url.parse(q.resource);

        const user = await db.jsonld.get(q.resource, {})
        console.warn(user)

        if (!user) {
            throw Object.assign(new Error("user not found"), {statusCode: 404})
        }

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

};


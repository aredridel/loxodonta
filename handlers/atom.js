const atom = require('../atom-schema');
const XMLSchema = require('xml-schema');

const atomSchema = new XMLSchema(atom.feed);

module.exports = function ({server, config, db}) {
    server.get('/users/:user.atom', (req, res) => {
        const user = db.accounts.get(req.params.user)

        const responded = user.then(user => {
            console.warn(user, config, req.params);
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            res.end(atomSchema.generate({
                "xmlns:thr": "http://purl.org/syndication/thread/1.0",
                "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
                "xmlns:poco": "http://portablecontacts.net/spec/1.0",
                "xmlns:media": "http://purl.org/syndication/atommedia",
                "xmlns:ostatus": "http://ostatus.org/schema/1.0",
                "xmlns:mastodon": "http://mastodon.social/schema/1.0",
                id: `https://${config.HOST}/users/${user.username}.atom`,
                title: "WIP",
                updated: Date.now(),
                links: [
                    { rel: "alternate", type: "text/html", href: `https://${config.HOST}/@${user.username}` },
                    { rel: "self", type: "application/atom+xml", href: `https://${config.HOST}/users/${user.username}.atom` },
                    { rel: "hub", href: `https://${config.HOST}/api/push` },
                    { rel: "salmon", href: `https://${config.HOST}/api/salmon/19483` },
                ],
                //<logo>https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818</logo>
                author: {
                    id: `https://${config.HOST}/users/${user.username}`,
                    "activity:object-type": "http://activitystrea.ms/schema/1.0/person",
                    uri: `https://${config.HOST}/users/${user.username}`,
                    name: user.username,
                    email: `${user.username}@${config.HOST}`,
                    links: [
                        { rel: "alternate", type: "text/html", href: `https://${config.host}/@${user.username}` },
                        { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" },
                        { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }
                    ],
                    "poco:preferredUsername": req.params.username,
                    "poco:displayName": "WIP",
                    "mastodon:scope": "public"
                },
                entries: []
            }));
        }, err => {
            if (err.name == 'NotFoundError') {
                res.statusCode = 404;
                res.end("Not Found");
            } else {
                throw err;
            }
        }).catch(err => {
            console.warn(err.stack || err);
            res.statusCode = 500;
            res.end('Error');
        });

        return responded;

    });
};

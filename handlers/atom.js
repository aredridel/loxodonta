const atom = require('../atom-schema');
const XMLSchema = require('xml-schema');

const atomSchema = new XMLSchema(atom.feed);

module.exports = function (ctx) {
    ctx.app.get('/users/:user.atom', (req, res) => {
        res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
        res.end(atomSchema.generate({
            "xmlns:thr": "http://purl.org/syndication/thread/1.0",
            "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
            "xmlns:poco": "http://portablecontacts.net/spec/1.0",
            "xmlns:media": "http://purl.org/syndication/atommedia",
            "xmlns:ostatus": "http://ostatus.org/schema/1.0",
            "xmlns:mastodon": "http://mastodon.social/schema/1.0",
            id: `https://${ctx.config.HOST}/users/${req.params.user}.atom`,
            title: "WIP",
            updated: Date.now(),
            links: [
                { rel: "alternate", type: "text/html", href: `https://${ctx.config.HOST}/@${req.params.user}` },
                { rel: "self", type: "application/atom+xml", href: `https://${ctx.config.HOST}/users/${req.params.user}.atom` },
                { rel: "hub", href: `https://${ctx.config.HOST}/api/push` },
                { rel: "salmon", href: `https://${ctx.config.HOST}/api/salmon/19483` },
            ],
            //<logo>https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818</logo>
            author: {
            id: `https://${ctx.config.HOST}/users/${req.params.user}`,
            "activity:object-type": "http://activitystrea.ms/schema/1.0/person",
            uri: `https://${ctx.config.HOST}/users/${req.params.user}`,
            name: req.params.user,
            email: `${req.params.user}@${ctx.config.HOST}`,
            links: [
                { rel: "alternate", type: "text/html", href: "https://mastodon.social/@aredridel" },
                { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" },
                { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }
            ],
            "poco:preferredUsername": req.params.user,
            "poco:displayName": "WIP",
            "mastodon:scope": "public"
            },
            entries: []
        }));
    });
};

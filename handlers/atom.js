const collect = require('stream-collector-p');
const ltx = require('ltx');
const pmap = require('map-p');
const promiseHandler = require('../bits/promise-handler');
const ts = require('internet-timestamp');


module.exports = function ({server, config, db}) {
    server.get('/users/:user.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user)
        const entryIDs = user.then(user => collect(db.timelines.forUser(user.username).createValueStream({reverse: true, limit: 100})));
        const entries = entryIDs.then(ids => pmap(ids, e => db.posts.get(e).catch(err => {
                if (err.name != 'NotFoundError') throw err;
            })))

        return Promise.all([user, entries]).then(([user, entries]) => {
            console.warn(entries);
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            const el = new ltx.Element('feed')
                .c('id').t("WIP").up()
                .c('updated').t(Date.now()).up()
                .c('link', { rel: "alternate", type: "text/html", href: `https://${config.HOST}/@${user.username}` }).up()
                .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.HOST}/users/${user.username}.atom` }).up()
                .c('link', { rel: "hub", href: `https://pubsubhubbub.appspot.com/` }).up()
                .c('link', { rel: "salmon", href: `https://${config.HOST}/api/salmon/${user.username}` }).up()
                .c('logo').t("https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818").up()
                .c('author')
                    .c('id').t(`https://${config.HOST}/users/${user.username}`).up()
                    .c("activity:object-type").t("http://activitystrea.ms/schema/1.0/person").up()
                    .c('uri').t(`https://${config.HOST}/users/${user.username}`).up()
                    .c('name').t(user.username).up()
                    .c('email').t(`${user.username}@${config.HOST}`).up()
                    .c('link', { rel: "alternate", type: "text/html", href: `https://${config.HOST}/@${user.username}` }).up()
                    .c('link', { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" }).up()
                    .c('link', { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }).up()
                    .c("poco:preferredUsername").t(req.params.username).up()
                    .c("poco:displayName").t("WIP").up()
                    .c("mastodon:scope").t("public").up()
                .up()

            entries.forEach(e => {
                el.c('entry')
                    .c('id').t(e.localid).up()
                    .c('published').t(ts(new Date())).up()
                    .c('updated').t(ts(new Date())).up()
                    .c('title').t('New status by test').up()
                    .c('content', {
                        type: 'html',
                        'xml:lang': 'en'
                    }).t(e.content).up()
                    .c('activity:object-type').t('http://activitystrea.ms/schema/1.0/note').up()
                    .c('activity:verb').t('http://activitystrea.ms/schema/1.0/post').up()
                    .c('summary', { 'xml:lang': "en" }).t('dissent from standard trans narratives').up()
                    .c('link', { rel: "mentioned", "ostatus:object-type": "http://activitystrea.ms/schema/1.0/person", href: "https://witches.town/users/jamuraa" }).up()
                    .c('link', { rel: "mentioned", "ostatus:object-type": "http://activitystrea.ms/schema/1.0/collection", href:"http://activityschema.org/collection/public" }).up()
                    .c('mastodon:scope').t('public').up()
                    .c('link', { rel: "alternate", type: "text/html", href: `https://${config.HOST}/users/${user.username}/updates/${e.localid}` }).up()
                    .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.HOST}/users/${user.username}/updates/${e.localid}.atom` }).up()
                .up()
            })

            xmlnsify(el.root());

            return el.root().toString();
        });
    }));
};

function xmlnsify(el) {
    const nsen = {
        "xmlns:thr": "http://purl.org/syndication/thread/1.0",
        "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
        "xmlns:poco": "http://portablecontacts.net/spec/1.0",
        "xmlns:media": "http://purl.org/syndication/atommedia",
        "xmlns:ostatus": "http://ostatus.org/schema/1.0",
        "xmlns:mastodon": "http://mastodon.social/schema/1.0",
    };

    Object.keys(nsen).forEach(qname => {
        el.attr(qname, nsen[qname]);
    });
}

const ltx = require('ltx');
const ts = require('internet-timestamp');

module.exports = {
    as2feed2atom,
    as2entry2atom
};

function xmlnsify(el) {
    const nsen = {
        "xmlns": "http://www.w3.org/2005/Atom",
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

function as2feed2atom(as2, config) {
    const el = new ltx.Element('feed')
        .c('id').t("WIP").up()
        .c('updated').t(as2.updated).up()
        .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/@${as2.actor.id}` }).up()
        .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.host}/users/${as2.actor.id}.atom` }).up()
        .c('link', { rel: "hub", href: `https://pubsubhubbub.appspot.com/` }).up()
        .c('link', { rel: "salmon", href: `https://${config.host}/api/salmon/${as2.actor.id}` }).up()
        .c('logo').t("https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818").up()
        .c('author')
            .c('id').t(`https://${config.host}/users/${as2.actor.id}`).up()
            .c("activity:object-type").t("http://activitystrea.ms/schema/1.0/person").up()
            .c('uri').t(`https://${config.host}/users/${as2.actor.id}`).up()
            .c('name').t(as2.actor.id).up()
            .c('email').t(`${as2.actor.id}@${config.host}`).up()
            .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/@${as2.actor.id}` }).up()
            .c('link', { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" }).up()
            .c('link', { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }).up()
            .c("poco:preferredUsername").t(as2.actor.id).up()
            .c("poco:displayName").t("WIP").up()
            .c("mastodon:scope").t("public").up()
        .up()

    as2.items.forEach(e => {
        const entry = as2entry2atom(e, Object.assign({ standalone: false }, config));
        el.children.push(entry);
        entry.parent = el;
    })

    if (config.standalone || config.standalone == null) xmlnsify(el.root());

    return el.root();
}

function as2entry2atom(e, config) {
    console.warn(e);
    const entry = new ltx.Element('entry')
        .c('id').t(`https://${config.host}/users/${e.actor.id}/updates/${e.id}`).up()
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
        .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/users/${e.actor.id}/updates/${e.id}` }).up()
        .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.host}/users/${e.actor.id}/updates/${e.id}.atom` }).up()

    if (config.standalone || config.standalone == null) xmlnsify(entry.root());

    return entry.root();
}


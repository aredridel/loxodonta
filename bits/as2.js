const ltx = require('ltx');

const ATOMNS = 'http://www.w3.org/2005/Atom';
const ACTIVITYNS = 'http://activitystrea.ms/spec/1.0/';
const POCONS = "http://portablecontacts.net/spec/1.0";
const MASTODONNS = "http://mastodon.social/schema/1.0";

module.exports = {
    as2feed2atom,
    as2entry2atom
};

function xmlnsify(el) {
    const nsen = {
        "xmlns": ATOMNS,
        "xmlns:thr": "http://purl.org/syndication/thread/1.0",
        "xmlns:activity": ACTIVITYNS,
        "xmlns:poco": POCONS,
        "xmlns:media": "http://purl.org/syndication/atommedia",
        "xmlns:ostatus": "http://ostatus.org/schema/1.0",
        "xmlns:mastodon": MASTODONNS,
    };

    Object.keys(nsen).forEach(qname => {
        el.attr(qname, nsen[qname]);
    });
}

function as2feed2atom(as2, config) {
    validate(config);
    const el = new ltx.Element('feed')
        .c('id').t(`https://${config.host}/users/${as2.actor.id}.atom`).up()
        .c('title').t(as2.title).up()
        .c('subtitle').t(as2.subtitle).up()
        .c('updated').t(as2.updated).up()
        .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/@${as2.actor.id}` }).up()
        .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.host}/users/${as2.actor.id}.atom` }).up()
        .c('link', { rel: "hub", href: config.hub }).up()
        .c('link', { rel: "salmon", href: `https://${config.host}/salmon/${as2.actor.id}` }).up()
        .c('logo').t("https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818").up()

    if (config.standalone || config.standalone == null) {
        addAuthor(el, as2.actor, config);
    }

    as2.items.forEach(e => {
        const entry = as2entry2atom(e, Object.assign({ standalone: false }, config));
        el.children.push(entry);
        entry.parent = el;
    })

    if (config.standalone || config.standalone == null) xmlnsify(el.root());

    return el.root();
}

function as2entry2atom(e, config) {
    validate(config);
    const entry = new ltx.Element('entry')
        .c('id').t(`https://${config.host}/users/${e.actor.id}/updates/${e.id}`).up()
        .c('published').t(e.published).up()
        .c('title').t('New status by test').up()
        .c('content', {
            type: 'html',
            'xml:lang': 'en'
        }).t(e.content).up()
        .c('activity:object-type').t('http://activitystrea.ms/schema/1.0/note').up()
        .c('activity:verb').t('http://activitystrea.ms/schema/1.0/post').up()
        //.c('summary', { 'xml:lang': "en" }).t('dissent from standard trans narratives').up()
        //.c('link', { rel: "mentioned", "ostatus:object-type": "http://activitystrea.ms/schema/1.0/person", href: "https://witches.town/users/jamuraa" }).up()
        .c('link', { rel: "mentioned", "ostatus:object-type": "http://activitystrea.ms/schema/1.0/collection", href:"http://activityschema.org/collection/public" }).up()
        .c('mastodon:scope').t('public').up()
        .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/users/${e.actor.id}/updates/${e.id}` }).up()
        .c('link', { rel: "self", type: "application/atom+xml", href: `https://${config.host}/users/${e.actor.id}/updates/${e.id}.atom` }).up()

    if (e.updated) entry.c('updated').t(e.updated)

    if (config.standalone || config.standalone == null) {
        addAuthor(entry, e.actor, config);
        xmlnsify(entry.root());
    }

    return entry.root();
}


function addAuthor(el, actor, config) {
    el.c('author')
        .c('id').t(actor.id).up()
        .c("activity:object-type").t("http://activitystrea.ms/schema/1.0/person").up()
        .c('uri').t(actor.id).up()
        .c('name').t(actor.preferredUsername).up()
        .c('link', { rel: "alternate", type: "text/html", href: actor.id }).up()
        .c('link', { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" }).up()
        .c('link', { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }).up()
        .c("poco:preferredUsername").t(actor.preferredUsername).up()
        .c("poco:displayName").t("WIP2").up()
        .c("mastodon:scope").t("public").up()
    .up()

    if (actor.email) el.c('email').t(actor.id)
}

function validate(config) {
    if (!config.hub) throw new Error("hub required");
    if (!config.host) throw new Error("host required");
}

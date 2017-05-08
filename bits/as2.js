const ltx = require('ltx');

const ATOMNS = 'http://www.w3.org/2005/Atom';
const ACTIVITYNS = 'http://activitystrea.ms/spec/1.0/';
const POCONS = "http://portablecontacts.net/spec/1.0";
const MASTODONNS = "http://mastodon.social/schema/1.0";
const error = require('./error');
const as2tables = require('activitystreams-xl').tables;

module.exports = {
    as2feed2atom,
    as2entry2atom,
    atom2as2
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
        .c('link', { rel: "salmon", href: `https://${config.host}/api/salmon/${as2.actor.id}` }).up()
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
        .c('id').t(`https://${config.host}/users/${actor.id}`).up()
        .c("activity:object-type").t("http://activitystrea.ms/schema/1.0/person").up()
        .c('uri').t(`https://${config.host}/users/${actor.id}`).up()
        .c('name').t(actor.id).up()
        .c('email').t(`${actor.id}@${config.host}`).up()
        .c('link', { rel: "alternate", type: "text/html", href: `https://${config.host}/@${actor.id}` }).up()
        .c('link', { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" }).up()
        .c('link', { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }).up()
        .c("poco:preferredUsername").t(actor.id).up()
        .c("poco:displayName").t("WIP2").up()
        .c("mastodon:scope").t("public").up()
    .up()
}

function validate(config) {
    if (!config.hub) throw new Error("hub required");
    if (!config.host) throw new Error("host required");
}

function atom2as2(xml) {
    console.warn(xml);
    const atom = ltx.parse(xml);
    if (atom.name == 'feed') {
        return {items: atom.children.map(entry2as2)};
    } else if (atom.name == 'entry') {
        return {items: [ entry2as2(atom) ] };
    } else {
        throw new Error(`unrecognized type of element ${atom.name})`);
    }
}

function entry2as2(el) {
    const out = {
        id: getText(el, 'id', ATOMNS),
        title: getText(el, 'title', ATOMNS),
        content: getText(el, 'content', ATOMNS),
        actor: elementToAs2(el.getChild('author', ATOMNS)),
        type: urlToType(getText(el, 'verb', ACTIVITYNS)) || getText(el, 'object-type', ACTIVITYNS) || 'Add',
        object: elementToAs2(el.getChild('object', ACTIVITYNS)),
        target: elementToAs2(el.getChild('target', ACTIVITYNS)),
    };

    return out;
}

function getText(el, name, ns) {
    const sub = el.getChild(name, ns)
    if (sub) return sub.getText();
}


function elementToAs2(el) {
    // TODO: figure out if this is an implicit or explicit event
    if (!el) return;
    const objectTypeUrl = getText(el, 'object-type', ACTIVITYNS);
    const objectType = urlToType(objectTypeUrl) || error(`unknown type '${objectTypeUrl}'`);

    return {
        id: getText(el, 'id', ATOMNS),
        uri: getText(el, 'uri', ATOMNS),
        name: getText(el, 'name', POCONS),
        'mastodon:scope': getText(el, 'scope', MASTODONNS),
        // Handle links?
        email: getText(el, 'email', ATOMNS),
        name: getText(el, 'displayName', POCONS),
        'poco:displayName': getText(el, 'displayName', POCONS),
        'poco:preferredUsername': getText(el, 'preferredUsername', POCONS),
        objectType,
    };
}

function urlToType(url) {
    console.warn(url);
    return as2tables.byURI[url] ?  as2tables.byURI[url].name : null;
    // TODO: handle ostatus URLs.
    // TODO: handle as 1.0 URLs.
}

const date = {
    transform: function(d) {
        return (new Date(d)).toISOString();
    }
};

const author = {
    tag: 'author',
    fields: {
        name: {},
        uri: {},
        email: {}
    },
    map: {
        to: 'name'
    }
};

const link = {
    tag: 'link',
    attributes: {
        href: {},
        rel: {},
        type: {}
    },
    map: {
        to: 'href'
    }
};

const entry = {
    tag: 'entry',
    fields: {
        title: {},
        updated: date,
        summary: {},
        links: link,
        authors: author,
        author: author,
        content: {
            raw: true,
            attributes: {
                type: {
                    default: "xhtml"
                }
            }
        }
    }
};

const feed = {
    tag: 'feed',
    attributes: {
        xmlns: {
            default: "http://www.w3.org/2005/Atom"
        }
    },
    fields: {
        title: {},
        updated: date,
        links: link,
        entries: entry,
        authors: author,
        author: author
    }
};

module.exports = {
    feed,
    author,
    date,
    link,
    entry
};

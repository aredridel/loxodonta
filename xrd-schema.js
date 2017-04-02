const alias = {
    tag: 'Alias'
};

const subject = {
    tag: 'Subject'
};

const links = {
    tag: 'Link',
    attributes: {
        href: {},
        rel: {},
        type: {},
        template: {}
    },
    array: true,
    map: {
        to: 'href'
    }
};

const xrd = {
    tag: 'XRD',
    attributes: {
        xmlns: {
            default: "http://docs.oasis-open.org/ns/xri/xrd-1.0"
        },
        "xmlns:hm": {}
    },
    fields: {
        subject,
        alias,
        links
    }
};

module.exports = {
    xrd,
    subject,
    alias,
    links,
};

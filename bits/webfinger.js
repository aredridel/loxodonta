const fetch = require('make-fetch-happen');
const url = require('url');
const qs = require('querystring');
const ltx = require('ltx');
const mimeMatch = require('mime-match');

module.exports = webfinger;

function webfinger(resource) {
    const host = url.parse(resource).hostname;
    const query = qs.stringify({
        resource
    });
    const target = `https://${host}/.well-known/webfinger?${query}`;
    return fetch(target, { headers: { 'accept': 'application/xrd+xml, application/jrd+json' } })
        .then(res => {
            const type = res.headers.get('content-type');
            return mimeMatch('application/xrd+xml', type) ? res.text().then(parseXML)
                : mimeMatch('application/jrd+json', type) ? res.json()
                : error(`Cannot handle ${res.headers['content-type']}`)
        });
}

function error(msg) {
    throw new Error(msg);
}

function parseXML(xml) {
    const doc = ltx.parse(xml);
    const jrd = {};
    doc.children.forEach(e => {
        if (e.name == 'Alias') {
            if (!jrd.aliases) jrd.aliases = [];
            jrd.aliases.push(e.getText());
        } else if (e.name == 'Link') {
            if (!jrd.links) jrd.links = [];
            jrd.links.push({rel: e.attrs.rel, type: e.attrs.type, href: e.attrs.href});
        }
    });
    return jrd;
}

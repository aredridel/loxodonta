const { text } = require('micro')
const magicSig = require('magic-signatures')
const dbP = require('./db')()
const context = require('./context')
const ltx = require('ltx')
const fetch = require('make-fetch-happen');
const url = require('url');
const webfinger = require('./bits/webfinger');
const dataurl = require('parse-data-url');
const atom2as2 = require('activitystreams-xl').xml.parse;

module.exports = async (req, res) => {
    const db = await dbP
    const ms = magicSig.fromXML(await text(req))
    if (ms.data_type == 'application/atom+xml') {
        const data = magicSig.b64utob(ms.data).toString()
        const address = findAddress(data)

        const wf = await webfinger(`acct:${address}`)
        const keyurl = wf.links.find(e => e.rel == 'magic-public-key').href
        const key = keyurl.indexOf('data:') == 0 ? dataurl(keyurl).toBuffer().toString() : await fetch(keyurl).then(res => {
            if (!res.ok) throw new Error(`Error fetching key`)
            return res.text()
        })

        const verified = magicSig.verify(ms, key)

        const as2event = await atom2as2(verified.data.toString('utf-8'))
        console.warn('verified', as2event)

	if (as2event.type != 'Undo') {
	    await db.jsonld.put(as2event)
	}

	return ""
        // return app.dispatchSalmon(as2event)
    } else {
        throw new Error(`Unknown type ${ms.data_type}`)
    }
}

const ATOMNS = 'http://www.w3.org/2005/Atom';

function findAddress(xml) {
	const doc = ltx.parse(xml);
	const author = doc.getChild('author', ATOMNS);
	const username = author.getChild('name', ATOMNS).getText();
	const u = author.getChild('uri', ATOMNS).getText();
	const host = url.parse(u).host;
	return `${username}@${host}`;
}

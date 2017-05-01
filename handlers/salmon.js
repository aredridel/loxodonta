const promiseHandler = require('../bits/promise-handler');
const sigs = require("magic-signatures");
const bodyParser = require('body-parser');
const url = require('url');
const ltx = require('ltx');
const webfinger = require('../bits/webfinger');
const fetch = require('make-fetch-happen');
const dataurl = require('parse-data-url');

const ATOMNS = 'http://www.w3.org/2005/Atom';

module.exports = function ({server, app}) {
	server.post('/api/salmon/:user', bodyParser.text({type: 'application/magic-envelope+xml'}), promiseHandler((req) => {
		if (req.headers['content-type'] != 'application/magic-envelope+xml') {
			throw new Error(`Unacceptable content-type ${req.headers['content-type']}`);
		}
		if (req.params.user == '19483') req.params.user = 'test';

		const ms = sigs.fromXML(req.body);

		if (ms.data_type == 'application/atom+xml') {
			const data = sigs.b64utob(ms.data).toString();
			const address = findAddress(data);

			const wf = webfinger(`acct:${address}`);
			const keyurl = wf.then(wf => wf.links.find(e => e.rel == 'magic-public-key').href);
			const key = keyurl.then(keyurl => {
				if (keyurl.indexOf('data:') == 0) {
					return dataurl(keyurl).toBuffer().toString();
				} else {
					return fetch(keyurl).then(res => {
						if (!res.ok) throw new Error(`Error fetching key`);
						return res.text();
					})
				}
			});

			const verified = key.then(key => sigs.verify(ms, key));

			return verified.then(() => app.dispatchSalmon(data))
				.then(() => '');
		} else {
			throw new Error(`Unknown type ${ms.data_type}`);
		}


    }));
};

function findAddress(xml) {
	const doc = ltx.parse(xml);
	const author = doc.getChild('author', ATOMNS);
	const username = author.getChild('name', ATOMNS).getText();
	const u = author.getChild('uri', ATOMNS).getText();
	const host = url.parse(u).host;
	return `${username}@${host}`;
}

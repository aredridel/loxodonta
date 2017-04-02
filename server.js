const express = require('express');
const url = require('url');
const XMLSchema = require('xml-schema');

const atom = require('./atom-schema');
const atomSchema = new XMLSchema(atom.feed);

const xrd = require('./xrd-schema');
const xrdSchema = new XMLSchema(xrd.xrd);

const app = express();

const HOST = process.env.HOST || 'test.yayforqueers.net';

app.use((req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
})

app.get('/.well-known/host-meta', (req, res, next) => {
	res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
	res.end(xrdSchema.generate({
	 "xmlns:hm": "http://host-meta.net/xrd/1.0",
	 links: [
		 { rel: "lrdd", type: "application/xrd+xml", template: `https://${HOST}/.well-known/webfinger?resource={uri}` }
	 ]
	}));
});

app.get('/.well-known/webfinger', (req, res, next) => {
	const resource = url.parse(req.query.resource);
	const RESOURCE = resource.auth + '@' + resource.host;
	console.warn('Request for', RESOURCE);
	
	res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
	res.end(xrdSchema.generate({
		subject: `acct:${resource.auth}@${resource.host}`,
		alias: `https://${resource.host}/@${resource.auth}`,
		links: [
		 { rel: "http://webfinger.net/rel/profile-page", type: "text/html", href: `https://${resource.host}/@${resource.auth}` },
		 { rel: "http://schemas.google.com/g/2010#updates-from", type: "application/atom+xml", href: `https://${resource.host}/users/${resource.auth}.atom` },
		 { rel: "salmon", href: `https://${resource.host}/api/salmon/19483` },
		 { rel: "magic-public-key", href: "data:application/magic-public-key,RSA.xcRrdBhH1-cgi_JerZiQbNL_63qlLDrG4M_JAJINHqngiUIup53te5HwBVyBITX9aovfoJVdV1QzlVTr2j3PkruXfviStekTdk9PdFSrrYx37Uvk8z1-qIV_qdMgo1D7ypZyAn6LxSKCfDgxmGFQJ200uULF5rdFmNZG-jO4bB_wDOsXd9dEQEpCS4wmKqIrWCFtpDQ9ObZMsUsbynfNmYXRnSxuhFtFfbFfMWKFRoNorB_6XZndQwQU1Dst4ZE6R9Lw2CJIyIl9avHLx5EAnjl1B1oE7LhxE9hDJ-h6ye1qny9c-Cnw5Bp0qkfMw5saWlJDealrTyimaohtoJZhYw==.AQAB" },
		 { rel: "http://ostatus.org/schema/1.0/subscribe", template: `https://${resource.host}/authorize_follow?acct={uri}` }
		]
	}));
});

app.get('/users/:user.atom', (req, res, next) => {
	res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
	res.end(atomSchema.generate({
		"xmlns:thr": "http://purl.org/syndication/thread/1.0",
		"xmlns:activity": "http://activitystrea.ms/spec/1.0/",
		"xmlns:poco": "http://portablecontacts.net/spec/1.0",
		"xmlns:media": "http://purl.org/syndication/atommedia",
		"xmlns:ostatus": "http://ostatus.org/schema/1.0",
		"xmlns:mastodon": "http://mastodon.social/schema/1.0",
		id: `https://${HOST}/users/${req.params.user}.atom`,
		title: "WIP",
		updated: Date.now(),
		links: [
			{ rel: "alternate", type: "text/html", href: `https://${HOST}/@${req.params.user}` },
			{ rel: "self", type: "application/atom+xml", href: `https://${HOST}/users/${req.params.user}.atom` },
			{ rel: "hub", href: `https://${HOST}/api/push` },
			{ rel: "salmon", href: `https://${HOST}/api/salmon/19483` },
		],
		//<logo>https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818</logo>
		author: {
		 id: `https://${HOST}/users/${req.params.user}`,
		 "activity:object-type": "http://activitystrea.ms/schema/1.0/person",
		 uri: `https://${HOST}/users/${req.params.user}`,
		 name: req.params.user,
		 email: `${req.params.user}@${HOST}`,
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

app.listen(process.env.PORT || 8014);

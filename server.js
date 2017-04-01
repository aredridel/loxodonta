const express = require('express');
const url = require('url');

const app = express();

const HOST = process.env.HOST || 'test.yayforqueers.net';

app.get('/.well-known/host-meta', (req, res, next) => {
	console.warn('Request for host-meta');
	res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
	res.end(`<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:hm="http://host-meta.net/xrd/1.0">
 <Link rel="lrdd" type="application/xrd+xml" template="https://${HOST}/.well-known/webfinger?resource={uri}"/>
</XRD>`);
});

app.get('/.well-known/webfinger', (req, res, next) => {
	const resource = url.parse(req.query.resource);
	const RESOURCE = resource.auth + '@' + resource.host;
	console.warn('Request for', RESOURCE);
	
	res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
	res.end(`<?xml version="1.0"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Subject>acct:${resource.auth}@${resource.host}</Subject>
  <Alias>https://${resource.host}/@${resource.auth}</Alias>
  <Link rel="http://webfinger.net/rel/profile-page" type="text/html" href="https://${resource.host}/@${resource.auth}"/>
  <Link rel="http://schemas.google.com/g/2010#updates-from" type="application/atom+xml" href="https://${resource.host}/users/${resource.auth}.atom"/>
  <Link rel="salmon" href="https://${resource.host}/api/salmon/19483"/>
  <Link rel="magic-public-key" href="data:application/magic-public-key,RSA.xcRrdBhH1-cgi_JerZiQbNL_63qlLDrG4M_JAJINHqngiUIup53te5HwBVyBITX9aovfoJVdV1QzlVTr2j3PkruXfviStekTdk9PdFSrrYx37Uvk8z1-qIV_qdMgo1D7ypZyAn6LxSKCfDgxmGFQJ200uULF5rdFmNZG-jO4bB_wDOsXd9dEQEpCS4wmKqIrWCFtpDQ9ObZMsUsbynfNmYXRnSxuhFtFfbFfMWKFRoNorB_6XZndQwQU1Dst4ZE6R9Lw2CJIyIl9avHLx5EAnjl1B1oE7LhxE9hDJ-h6ye1qny9c-Cnw5Bp0qkfMw5saWlJDealrTyimaohtoJZhYw==.AQAB"/>
  <Link rel="http://ostatus.org/schema/1.0/subscribe" template="https://${resource.host}/authorize_follow?acct={uri}"/>
</XRD>`);
});

app.use((req, res, next) => {
	console.warn(req.originalUrl, req.method);
	next();
});

app.listen(process.env.PORT || 8014);

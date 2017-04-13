const xrd = require('../xrd-schema');
const XMLSchema = require('xml-schema');
const xrdSchema = new XMLSchema(xrd.xrd);

module.exports = function (ctx) {
    ctx.app.get('/.well-known/host-meta', (req, res, next) => {
        res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8');
        res.end(xrdSchema.generate({
        "xmlns:hm": "http://host-meta.net/xrd/1.0",
        links: [
            { rel: "lrdd", type: "application/xrd+xml", template: `https://${ctx.config.HOST}/.well-known/webfinger?resource={uri}` }
        ]
        }));
    });
}

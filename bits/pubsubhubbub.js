const fetch = require('make-fetch-happen');
const qs = require('querystring');

module.exports = {
    publish
}

function publish(hub, urls) {
    const body = qs.stringify({
        'hub.mode': 'publish',
        'hub.url': urls
    });

    return fetch(hub, {
        method: 'POST',
        body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(r => {
        if (r.status > 300) throw new Error(`Failed: ${r.status}`);
        return r;
    });
}

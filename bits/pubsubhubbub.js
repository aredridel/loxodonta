const fetch = require('make-fetch-happen');
const FormData = require('form-data');

module.exports = {
    publish
}

function publish(hub, urls) {
    const body = new FormData();

    body.append('hub.mode', 'publish');

    urls.forEach(url => {
        body.append('hub.url', url);
    })

    return fetch(hub, {
        method: 'POST',
        body
    });
}

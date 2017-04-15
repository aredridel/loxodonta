module.exports = promiseHandler;

function promiseHandler(handler) {
    return function (req, res, next) {
        const response = handler(req, res, next);

        const responded = response.catch(err => {
            if (err.name != 'NotFoundError') throw err;
            res.statusCode = 404;
            res.end("Not Found");
        }).catch(err => {
            console.warn(err.stack || err);
            res.statusCode = 500;
            res.end('Error');
        });

        return responded;
    }
}

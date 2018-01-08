const path = require('path')

const level = require('level')
const levelgraph = require('levelgraph')
const levelgraphjsonld = require('levelgraph-jsonld')
const levelPromise = require('level-promise')

module.exports = function() {
    return dbP
}

async function open(dir) {
    const db = await new Promise((y, n) => {
        const db = level(dir, {}, err => {
            if (err) {
                n(err)
            } else {
                y(db)
            }
        })

    }).then(levelgraph)

    return db
}

function addManifest(db) {
    db.methods = {
        search: { type: 'async' },
        searchStream: { type: 'readable' },
        jsonld: {
            type: 'object',
            methods: {
                get: { type: 'async' },
                put: { type: 'async' }
            }
        }
    }

    return db
}

const dbP = open(process.env.DATABASE_DIR || path.resolve(__dirname, 'db')).then(levelgraphjsonld).then(addManifest).then(levelPromise).catch(err => {
    console.warn(`Database error: ${err.stack || err}`)
    process.exit(1)
})

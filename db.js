const path = require('path')

const level = require('level')
const levelgraph = require('levelgraph')
const levelgraphjsonld = require('levelgraph-jsonld')
const manifest = require('levelgraph-jsonld-manifest')
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

    })


    return levelPromise(manifest(levelgraphjsonld(levelgraph(db))))
}

const dbP = open(process.env.DATABASE_DIR || path.resolve(__dirname, 'db')).catch(err => {
    console.warn(`Database error: ${err.stack || err}`)
    process.exit(1)
})

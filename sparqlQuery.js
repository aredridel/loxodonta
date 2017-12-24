const sparql = new (require('sparqljs').Parser)

module.exports = sparqlQuery

async function sparqlQuery(db, query) {
  const parsed = sparql.parse(query)
  if (parsed.queryType != 'SELECT' || parsed.type != 'query') throw new Error("Only SELECT queries are supported right now")

  let search = []
  const opts = {}

  parsed.where.forEach(w => {
    if (w.type == 'bgp') search = search.concat(w.triples.map(t => {
        const o = {}
        for (let x in t) {
          if (~parsed.variables.indexOf(t[x])) {
            o[x] = db.v(t[x])
          } else {
            o[x] = t[x]
          }
        }
        return o
      }))
    else if (w.type == 'filter') opts.filter = (sol, cb) => (console.log('sol', sol), Promise.resolve(filterFor(w.expression)(sol)).then(x => cb(null, (console.warn('res', x), x)), cb))
    else throw new Error(`Unsupported type "${w.type}"`)
  })

  console.warn(search, opts)

  return await db.search(search, opts)
}

function filterFor(w) {
  console.warn(w)
  if (w.operator == 'regex') {
    const regex = new RegExp(w.args[1].slice(1, w.args[1].length - 2), w.args[2])
    const field = w.args[0]
    return (solution) => (regex.test(solution[field]) ? solution : null)
  } else {
    throw new Error(`Unknown operator "${w.operator}"`)
  }
}

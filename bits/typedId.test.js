const tap = require('estap')
const test = tap()

const typedId = require('./typedId')

test(async t => {
  const id = await typedId.generate('test')
  const id2 = await typedId.generate('test')

  t.true(/^test-/.test(id), 'id starts with type')
  t.true(/^test-/.test(id2), 'id2 starts with type')
  t.true(id.length > 12)
  t.true(/^[A-Z0-9]+$/.test(/^test-(.*)/.exec(id)[1]), 'test ID is all caps and numbers')
  t.notSame(id2, id)

  {
    const [type, id] = id2.split(/-/)
    t.same(typedId.parse(id2), { type, id })
  }
})

const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Post = t.struct({
  id: t.maybe(t.Integer),
  title: t.String,
  content: t.String,
  // createdAt: t.maybe(t.Date),
  // updatedAt: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  Post
)
